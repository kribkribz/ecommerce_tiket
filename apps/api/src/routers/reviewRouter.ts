import { Router } from 'express';
import * as reviewController from '../controllers/reviewController';
import { tokenVerify } from '../middleware/tokenVerifyUsers';

const router = Router();

// Route to submit a new review
router.post('/submit', tokenVerify, reviewController.submitReview);

// Route to update an existing review
router.put('/update/:reviewId', tokenVerify, reviewController.updateReview);

// Route to delete a review
router.delete('/delete/:reviewId', tokenVerify, reviewController.deleteReview);

// Route to get reviews for a specific event or product
router.get('/event/:eventId', reviewController.getReviewsByEvent);

// Route to get a specific review
router.get('/:reviewId', reviewController.getReviewById);

export default router;