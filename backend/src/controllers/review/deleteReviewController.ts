import { Request, Response } from "express";
import Review from "../../models/review";
import { updateAverageRating } from "./addReviewController";

export const deleteReview = async (req: Request, res: any) => {
  const { reviewId } = req.params;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    const movieId = review.movieId;

    await Review.destroy({ where: { id: reviewId } });

    // After deleting the review, recalculate the average rating for the movie
    await updateAverageRating(movieId);

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting review", error });
  }
};
