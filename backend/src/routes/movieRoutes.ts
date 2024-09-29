import { Router } from "express";
import { getMovies } from "../controllers/movie/getMoviesController";
import { createMovie } from "../controllers/movie/createMoviesController";
import { deleteMovie } from "../controllers/movie/deleteMoviesController";
import { editMovie } from "../controllers/movie/editMoviesController";

const router = Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", editMovie);
router.delete("/:id", deleteMovie);

export default router;
