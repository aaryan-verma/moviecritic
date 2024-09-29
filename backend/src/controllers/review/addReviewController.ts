import { Request, Response } from "express";
import Review from "../../models/review";
import sequelize from "../../config/db";
import Movie from "../../models/movie";


//Function to update the average rating of a movie after adding a new review
export const updateAverageRating = async (movieId: number) => {
  try {
    const averageRatingResult = await Review.findOne({
      where: { movieId },
      attributes: [
        [sequelize.fn("AVG", sequelize.col("rating")), "averageRating"],
      ],
    });

    console.log("averageRatingResult", averageRatingResult)

    const averageRating: any = averageRatingResult?.get("averageRating");

    if (averageRating !== null) {
      const modifiedAverageRating = parseFloat(averageRating).toFixed(2);
      await Movie.update({ averageRating: modifiedAverageRating }, { where: { id: movieId } });
    } else {
      await Movie.update({ averageRating: null }, { where: { id: movieId } });
    }
  } catch (error) {
    console.error("Error updating average rating:", error);
  }
};

export const addReview = async (req: Request, res: Response) => {
  const { movieId, rating, reviewer, comments } = req.body;

  try {
    const review = await Review.create({
      movieId,
      rating,
      reviewer,
      comments,
    });

    await updateAverageRating(movieId);
    res.status(201).json(review);
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({ message: "Error adding review", error });
  }
};
