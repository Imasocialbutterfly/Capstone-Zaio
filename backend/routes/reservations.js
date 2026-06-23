import express from "express";
import Reservation from "../models/ReservationModel.js";
import Listing from "../models/ListingModel.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();


router.post("/", authenticate, async (req, res) => {
  try {
    const { listingId, startDate, endDate, guests, totalPrice } = req.body;
    const userId = req.user.id;

    if (!listingId || !startDate || !endDate || !guests) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (start >= end) {
      return res.status(400).json({ error: "Check-out must be after check-in" });
    }
    if (start < today) {
      return res.status(400).json({ error: "Start date cannot be in the past" });
    }

    const conflict = await Reservation.findOne({
      listingId,
      status: { $ne: "cancelled" },
      $or: [
        { startDate: { $lt: end }, endDate: { $gt: start } },
      ],
    });

    if (conflict) {
      return res.status(409).json({ error: "Selected dates are not available" });
    }

    const reservation = new Reservation({
      listingId,
      guestId: userId,
      startDate: start,
      endDate: end,
      guests,
      totalPrice,
      status: "confirmed",
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    console.error("Create reservation error:", error);
    res.status(500).json({ error: "Failed to create reservation" });
  }
});


router.get("/my-reservations", authenticate, async (req, res) => {
  try {
    const reservations = await Reservation.find({ guestId: req.user.id })
      .populate("listingId")
      .populate("guestId");

    res.json(reservations);
  } catch (error) {
    console.error("Fetch reservations error:", error);
    res.status(500).json({ error: "Failed to load reservations" });
  }
});


router.delete("/:id", authenticate, async (req, res) => {
  try {
    const reservation = await Reservation.findOneAndDelete({
      _id: req.params.id,
      guestId: req.user.id,            // only the owner can delete
    });

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.json({ message: "Reservation deleted" });
  } catch (error) {
    console.error("Delete reservation error:", error);
    res.status(500).json({ error: "Failed to delete reservation" });
  }
});



export default router;