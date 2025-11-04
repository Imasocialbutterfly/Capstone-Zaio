import mongoose from 'mongoose';

const listingSchema = mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: 100
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        maxlength: 1000
    },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    amenities: [{
        type: String
    }],
    images: [{
        url: { type: String, required: true },
        caption: String
    }],
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    propertyType: {
        type: String,
        enum: ['apartment', 'house', 'guesthouse', 'condo', 'cabin', 'other'],
        required: true
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 0
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 0
    },
    maxGuests: {
        type: Number,
        required: true,
        min: 1
    },
    availability: [{
        start: Date,
        end: Date,
        available: { type: Boolean, default: true }
    }],
    rules: [{
        type: String
    }]
}, { timestamps: true });


listingSchema.index({ "address.city": 1, "address.country": 1 });

const Listing = mongoose.model('Listing', listingSchema);

export default Listing;