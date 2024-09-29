import { Request, Response } from "express";
import Movie from "../../models/movie";
import Review from "../../models/review";
import { Op } from "sequelize";

export const createMovie = async (req: Request, res: any) => {
  const { name, releaseDate } = req.body;
  try {
    console.log(name, releaseDate, "getting request");
    
    const existingMovie = await Movie.findOne({
      where: {
        name: {
          [Op.iLike]: name,
        },
      },
    });

    if (existingMovie) {
      return res.status(400).json({ message: "Movie with this name already exists" });
    }

    const movie = await Movie.create({
      name,
      releaseDate,
    });
    res.json(movie);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating movie", error });
  }
};
