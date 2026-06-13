import mongoose from 'mongoose';

const reservationSchema = new mongoose.Schema({
    listingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true,
    },

    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    startDate: {
        type: Date,
        required: true,
    },

    endDate: {
        type: Date,
        required: true,
    },

    guests: {
        adults: Number,
        children: Number,
        infants: Number,
    },

    totalPrice: Number,

    status: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        default: "confirmed",
    }
},
    {
        timestamps: true,
    }
);

export default mongoose.model("Reservation", reservationSchema);