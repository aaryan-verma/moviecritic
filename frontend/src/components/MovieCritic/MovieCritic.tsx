import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

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

const MovieDetail: FC = () => {
  const { movieId } = useParams<{ movieId: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axiosInstance.get<Review[]>(`/reviews/${movieId}`);

        if (response.data.length > 0) {
          const reviewData = response.data;
          const firstReview = reviewData[0];
          setMovie({
            id: firstReview.movieId,
            name: "Movie Title Here",
            releaseDate: "Release Date Here",
            averageRating:
              reviewData.reduce((acc, review) => acc + review.rating, 0) /
              reviewData.length,
            Reviews: reviewData,
          });
        }
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  const handleDelete = async (reviewId: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this review?");
    if (confirmDelete) {
      try {
        await axiosInstance.delete(`/reviews/${reviewId}`);
        alert("Review deleted successfully!");

        setMovie((prevMovie) =>
          prevMovie
            ? {
                ...prevMovie,
                Reviews: prevMovie.Reviews.filter((rev) => rev.id !== reviewId),
              }
            : null
        );
      } catch (error) {
        console.error("Error deleting review:", error);
        alert("Failed to delete the review. Please try again.");
      }
    }
  };

  const handleEdit = (review: Review) => {
    navigate(`/review`, { state: { review } });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div className="border-2 m-2 p-2 flex flex-col gap-[0.75rem]">No reviews available for this movie.</div>;
  }

  return (
    <div className="p-5">
      <div className="mt-5 flex justify-between items-center">
        <div className="text-2xl font-bold">Reviews</div>
        <div className="text-purple-500 font-bold">
          {movie.averageRating !== null ? `${movie.averageRating}/10` : "N/A"}
        </div>
      </div>
      <div className="mt-5">
        {movie.Reviews.length > 0 ? (
          movie.Reviews.map((review) => (
            <div key={review.id} className="border-2 p-2 mt-2 flex flex-col gap-[0.75rem]">
              <div className="flex justify-between items-center">
                <p>{review.comments}</p>
                <p className="text-purple-500">{review.rating}/10</p>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="italic">By {review.reviewer}</p>
                </div>
                <div className="flex flex-wrap gap-4">
                  <FaEdit
                    className="cursor-pointer"
                    color="gray"
                    onClick={() => handleEdit(review)}
                  />
                  <MdDelete
                    className="cursor-pointer"
                    color="gray"
                    onClick={() => handleDelete(review.id)}
                  />
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No reviews available for this movie.</p>
        )}
      </div>
    </div>
  );
  
};

export default MovieDetail;
