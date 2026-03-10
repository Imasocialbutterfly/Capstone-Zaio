import Listing from "../models/ListingModel.js";

export const createListing = async (req, res) => {
    try {
        console.log('Creating listing with data:', req.body);
        console.log('User ID:', req.user._id);

        if (!req.user || !req.user._id) {
            return res.status(401).json({ error: 'User not authenticated' });
        }

        const listingData = {
            ...req.body,
            host: req.user._id
        };

        const requiredFields = ['title', 'description', 'address', 'price', 'propertyType', 'bedrooms', 'bathrooms', 'maxGuests'];
        for (const field of requiredFields) {
            if (!listingData[field]) {
                return res.status(400).json({ error: `${field} is required` });
            }
        }

        if (!listingData.address.street || !listingData.address.city || !listingData.address.country) {
            return res.status(400).json({ error: 'Address must include street, city, and country' });
        }

        if (!listingData.images || listingData.images.length === 0) {
            return res.status(400).json({ error: 'At least one image is required' });
        }

        listingData.price = parseFloat(listingData.price);
        listingData.bedrooms = parseInt(listingData.bedrooms);
        listingData.bathrooms = parseInt(listingData.bathrooms);
        listingData.maxGuests = parseInt(listingData.maxGuests);

        if (isNaN(listingData.price) || listingData.price <= 0) {
            return res.status(400).json({ error: 'Price must be a positive number' });
        }

        const listing = new Listing(listingData);
        await listing.save();

        await listing.populate('host', 'username email');

        console.log('Listing created successfully:', listing._id);

        res.status(201).json(listing);
    } catch (error) {
        console.error('Error creating listing:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }

        if (error.code === 11000) {
            return res.status(400).json({ error: 'Duplicate listing found' });
        }

        res.status(500).json({
            error: error.message || 'Failed to create listing'
        });
    }
};

export const getListings = async (req, res) => {
    try {
        const { page = 1, limit = 10, city, country, minPrice, maxPrice, propertyType } = req.query;

        const filter = {};
        if (city) filter['address.city'] = new RegExp(city, 'i');
        if (country) filter['address.country'] = new RegExp(country, 'i');
        if (propertyType) filter.propertyType = propertyType;

        if (minPrice || maxPrice) {
            filter.price = {};
            if (minPrice) filter.price.$gte = parseInt(minPrice);
            if (maxPrice) filter.price.$lte = parseInt(maxPrice);
        }

        const listings = await Listing.find(filter)
            .populate('host', 'username email')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Listing.countDocuments(filter);

        res.json({
            listings,
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error('Error fetching listings:', error);
        res.status(500).json({
            error: error.message || 'Failed to fetch listings'
        });
    }
};

export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate('host', 'username email');

        if (!listing) {
            return res.status(404).json({
                error: 'Listing not found'
            });
        }

        res.json(listing);
    } catch (error) {
        console.error('Error fetching listing:', error);
        res.status(500).json({
            error: error.message || 'Failed to fetch listing'
        });
    }
};

export const updateListing = async (req, res) => {
    try {
        console.log('Update request received:', req.params.id);
        console.log('User ID:', req.user._id);
        console.log('Request body:', req.body);

        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                error: 'Listing not found'
            });
        }

        if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Unauthorized to update this listing'
            });
        }

        const updateData = { ...req.body };

        if (updateData.images && updateData.images.length > 0) {
            updateData.images = updateData.images;
        }

        if (updateData.price) updateData.price = parseFloat(updateData.price);
        if (updateData.bedrooms) updateData.bedrooms = parseInt(updateData.bedrooms);
        if (updateData.bathrooms) updateData.bathrooms = parseInt(updateData.bathrooms);
        if (updateData.maxGuests) updateData.maxGuests = parseInt(updateData.maxGuests);

        if (updateData.address && typeof updateData.address === 'object') {
            updateData.address = {
                ...listing.address,
                ...updateData.address
            };
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            {
                new: true,
                runValidators: true
            }
        ).populate('host', 'username email');

        if (!updatedListing) {
            return res.status(404).json({ error: 'Listing not found after update' });
        }

        console.log('Listing updated successfully:', updatedListing._id);
        res.json(updatedListing);
    } catch (error) {
        console.error('Error updating listing:', error);

        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ error: messages.join(', ') });
        }

        res.status(400).json({
            error: error.message || 'Failed to update listing'
        });
    }
};

export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            return res.status(404).json({
                error: 'Listing not found'
            });
        }

        if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({
                error: 'Unauthorized to delete this listing'
            });
        }

        await Listing.findByIdAndDelete(req.params.id);
        res.json({
            message: 'Listing deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting listing:', error);
        res.status(500).json({
            error: error.message || 'Failed to delete listing'
        });
    }
};