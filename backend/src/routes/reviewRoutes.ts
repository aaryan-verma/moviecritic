import { Router } from "express";
import { getReviewsByMovie } from "../controllers/review/getReviewsByMovieController";
import { addReview } from "../controllers/review/addReviewController";
import { getAverageRating } from "../controllers/review/getAverageRating";
import { editReview } from "../controllers/review/editReviewController";
import   { deleteReview } from "../controllers/review/deleteReviewController";

const router = Router();

router.get("/:movieId", getReviewsByMovie);
router.post("/", addReview);
router.get("/:movieId/average-rating", getAverageRating);
router.put('/:reviewId', editReview);
router.delete('/:reviewId', deleteReview);

export default router;
