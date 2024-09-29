import { Request, Response } from "express";
import Movie from "../../models/movie";
import { Op } from "sequelize";

export const editMovie = async (req: Request, res: any) => {
  const { id } = req.params;
  const { name, releaseDate } = req.body;

  const movieId = parseInt(id, 10);

  if (isNaN(movieId)) {
    return res.status(400).json({ message: "Invalid movie ID" });
  }

  try {
    const movie = await Movie.findOne({ where: { id: movieId } });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (name) {
      const existingMovie = await Movie.findOne({
        where: {
          name,
          id: { [Op.ne]: movieId },
        },
      });

      if (existingMovie) {
        return res.status(400).json({ message: "Movie with this name already exists" });
      }
    }

    movie.name = name ?? movie.name;
    movie.releaseDate = releaseDate ?? movie.releaseDate;
    await movie.save();

    return res.json(movie);

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error updating movie", error });
  }
};
