import express from 'express';
import { createListing, getListing, getListings, updateListing, deleteListing, getBookedDates } from '../controllers/listingController.js'
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getListings);
router.get("/:id/booked-dates", getBookedDates);
router.get('/:id', getListing)
router.post('/create', authenticate, createListing);
router.put('/:id', authenticate, updateListing)
router.delete('/:id', authenticate, deleteListing)

export default router