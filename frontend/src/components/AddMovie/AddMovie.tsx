import React, { FC, useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useLocation, useNavigate } from "react-router-dom";

const AddMovie: FC = () => {
  const [name, setName] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const movie = location.state?.movie; 
    if (movie) {
      setName(movie.name);
      // Ensure the date is in the YYYY-MM-DD format
      const formattedDate = new Date(movie.releaseDate).toISOString().split("T")[0];
      setReleaseDate(formattedDate);
    }
  }, [location.state]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      if (location.state?.movie) {
        // Edit existing movie
        await axiosInstance.put(`/movies/${location.state.movie.id}`, {
          name: name,
          releaseDate: releaseDate,
        });
        alert("Your movie has been updated!");
      } else {
        // Create new movie
        await axiosInstance.post("/movies/", {
          name: name,
          releaseDate: releaseDate,
        });
        alert("Your movie has been added!");
      }

      navigate("/");
    } catch (error) {
      console.error("Error adding/updating movie:", error);
      alert("Failed to add/update the movie. Please try again.");
    }
  };

  return (
    <div className="mt-28 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4">
          {location.state?.movie ? "Edit Movie" : "Add New Movie"}
        </h2>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Movie Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="releaseDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Release Date
          </label>
          <input
            type="date"
            id="releaseDate"
            placeholder="Release Date"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ml-auto block"
        >
          {location.state?.movie ? "Update Movie" : "Create Movie"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
