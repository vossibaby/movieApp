import { Navigate, useNavigate, useParams } from "react-router";
import { API_BASE_URL, API_OPTIONS } from "../api";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";
import { Button } from "../components/Button";

export const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const fetchMovie = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const endpoint = `${API_BASE_URL}/movie/${id}`;

      const response = await fetch(endpoint, API_OPTIONS);
      if (!response.ok) {
        throw new Error("Failed to fetch movie");
      }
      const data = await response.json();
      if (data.response === "False") {
        setErrorMessage(data.Error || "Failed to fetch movie");
        setMovie(null);
        return;
      }
      setMovie(data || null);
    } catch (error) {
      console.error(`Error fetching movie: ${error}`);
      setErrorMessage("Error fetching movie. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) return <Spinner />;

  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <div className="bg-hero-pattern p-14 w-full h-screen bg-center bg-cover z-0 text-white flex justify-center relative">
      <img
        className="bg-dark-100 rounded-2xl shadow-inner shadow-light-100/10 "
        src={
          movie.poster_path
            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
            : "/no-movie.png"
        }
        alt={movie.title}
      />
      <div className="max-w-xl ml-10 justify-items-start flex flex-col gap-y-2">
        <h1 className="flex justify-center">{movie?.title}</h1>

        <h3 className="flex">{movie?.overview}</h3>
        <span className="flex text-amber-200 mt-6">
          Slogan: &nbsp;
          <h3 className="text-white">{movie?.tagline || "N/A"}</h3>
        </span>
        <p className="text-white">
          <span className="text-amber-200">Raiting: &nbsp;</span>
          {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
        </p>
        <p className="text-white">
          <span className="text-amber-200">Release Date: &nbsp;</span>
          {movie?.release_date}
        </p>
        <div className="absolute bottom-0 pb-14">
          <Button className="" onClick={() => navigate(-1)} />
        </div>
      </div>
    </div>
  );
};
