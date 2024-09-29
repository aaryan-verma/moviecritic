import { FC, useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import Cards from "../Cards/Cards";
import axiosInstance from "../../utils/axiosInstance";

const Card: FC = () => {

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
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axiosInstance.get<Movie[]>("/movies");
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Filter movies based on the search query
  const filteredMovies = movies.filter((movie) =>
    movie.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-5">
      <div className="text-3xl">The best movie reviews site!</div>
      <div className="mt-5 flex flex-col">
        <div className="border-blue-600 border-2 w-full sm:w-80 flex justify-center items-center px-2 rounded-md">
          <CiSearch fontSize={24} />
          <input
            type="text"
            placeholder="Search for your favorite movie"
            className="w-80 p-2 focus:outline-none font-semibold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="mt-5 w-full">
          <Cards movies={filteredMovies} />
        </div>
      </div>
    </div>
  );
};

export default Card;
