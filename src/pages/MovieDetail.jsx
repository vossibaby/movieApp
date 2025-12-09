import { useParams } from "react-router";
import { API_BASE_URL, API_OPTIONS } from "../api";
import { useEffect, useState } from "react";
import { Spinner } from "../components/Spinner";

export const MovieDetail = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);

  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
    <div className="text-white ">
      <h1>{movie?.title}</h1>
      <h3>{movie?.overview}</h3>
    </div>
  );
};
