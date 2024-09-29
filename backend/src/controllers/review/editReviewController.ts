// import { Request, Response } from "express";
// import Review from "../../models/review";

// export const editReview = async (req: Request, res: any) => {
//   const { reviewId } = req.params;
//   const { rating, reviewer, comments } = req.body;
//   try {
//     const review = await Review.findByPk(reviewId);

//     if (!review) {
//       return res.status(404).json({ message: "Review not found" });
//     }

//     review.rating = rating !== undefined ? rating : review.rating;
//     review.reviewer = reviewer !== undefined ? reviewer : review.reviewer;
//     review.comments = comments !== undefined ? comments : review.comments;

//     await review.save();

//     res.json(review);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating review", error });
//   }
// };


import { Request, Response } from "express";
import Review from "../../models/review";
import { updateAverageRating } from "./addReviewController"; // Assuming the function is exported from addReviewController

export const editReview = async (req: Request, res: any) => {
  const { reviewId } = req.params;
  const { rating, reviewer, comments } = req.body;

  try {
    const review = await Review.findByPk(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    review.rating = rating !== undefined ? rating : review.rating;
    review.reviewer = reviewer !== undefined ? reviewer : review.reviewer;
    review.comments = comments !== undefined ? comments : review.comments;

    await review.save();

    // After updating the review, recalculate the average rating for the movie
    await updateAverageRating(review.movieId);

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Error updating review", error });
  }
};
