import express from 'express';
import { creatListing, getListing, getListings, updateListing, deleteListing, createListing } from '../controllers/listingController'
import { authenticate } from '../middleware/auth';

const router = express.Router();

router.post('/', getListings);
router.get('/:id', getListing)
router.post('/create', authenticate, createListing);
router.put('/:id', authenticate, updateListing)
router.delete('/:id', authenticate, deleteListing)

export default router