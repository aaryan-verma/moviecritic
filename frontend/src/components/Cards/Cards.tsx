import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from "../../utils/axiosInstance";

interface Review {
  id: number;
  movieId: number;
  rating: number;
  reviewer: string;
  comments: string;
}

interface Movie {
  id: number;
  name: string;
  releaseDate: string;
  averageRating: number | null;
  Reviews: Review[];
}

interface CardsProps {
  movies: Movie[];
}

const Cards: FC<CardsProps> = ({ movies }) => {
  const navigate = useNavigate();

  const handleDelete = async (movieId: number) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this movie and its reviews?"
    );
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/movies/${movieId}`);
        alert("Movie deleted successfully!");
      } catch (error) {
        console.error("Error deleting movie:", error);
        alert("Failed to delete the movie. Please try again.");
      }
    }
  };

  const handleEdit = (movie: Movie) => {
    navigate(`/movie`, { state: { movie } });
  };

  const formatReleaseDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };

    const day = date.getDate();
    const monthYear = date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    });

    const suffix = (day: number) => {
      if (day % 10 === 1 && day !== 11) return 'st';
      if (day % 10 === 2 && day !== 12) return 'nd';
      if (day % 10 === 3 && day !== 13) return 'rd';
      return 'th';
    };

    const [month, year] = monthYear.split(' ');

    return `${day}${suffix(day)} ${month}, ${year}`;
  };

  return (
    <div className="mt-5 flex flex-wrap gap-5">
      {movies.map((movie) => (
        <div
          key={movie.id}
          className="bg-[#D3D7F7] w-full sm:w-72 md:w-80 lg:w-96 p-4 rounded-sm cursor-pointer"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <div className="font-semibold mb-4 mt-4">{movie.name}</div>
          <div className="italic mb-4">
            Released: {formatReleaseDate(movie.releaseDate)}
          </div>
          <div className="font-bold mb-4">
            Rating:{" "}
            {movie.averageRating !== null
              ? Number.isInteger(movie.averageRating)
                ? `${movie.averageRating}/10`
                : `${movie.averageRating.toFixed(2)}/10`
              : "N/A"}
          </div>
          <div className="flex flex-wrap gap-4 justify-end">
            <FaEdit
              className="cursor-pointer"
              color="gray"
              fontSize={20}
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(movie);
              }}
            />
            <MdDelete
              className="cursor-pointer"
              fontSize={20}
              color="gray"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(movie.id);
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cards;
