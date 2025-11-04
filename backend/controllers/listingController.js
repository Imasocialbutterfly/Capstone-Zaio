import Listing from "../models/ListingModel";

export const createListing = async (req, res) => {
    try {
        const lisitngData = {
            ...req.body,
            host: req.user._id
        };

        const listing = new Listing(lisitngData);
        await listing.populate('host', 'username profile')

        res.status(201).json(listing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

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
            if (maxPrice) filter.price.$lte = parseInt(maxPrice)
        }

        const listings = await Listing.find(filter)
            .populate('host', 'username profile')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await Listing.countDocuments(filter);

        res.json({
            listings,
            totalPages: Math.cell(total / limit),
            cuurentPage: page,
            total
        })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
};

export const getListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)
            .populate('host', 'username profile')

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' })
        }

        res.json(listing)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export const updateListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' })
        }

        if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to update the listing' })
        }

        const updatedListing = await Listing.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        ).populate('host', 'username profile')

        res.json(updateListing)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

export const deleteListing = async (req, res) => {
    try {
        const listing = await Listing.findById(req.params.id)

        if (!listing) {
            return res.status(404).json({ error: 'Listing not found' })
        }

        if (listing.host.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(403).json({ error: 'Unauthorized to delete the listing' })
        }

        await Listing.findByIdAndDelete(req.params.id)
        res.json({ messgage: 'Listing deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}