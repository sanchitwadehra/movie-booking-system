import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import apiClient from "../api/axios";
import toast from "react-hot-toast";
import { setMovies } from "../store/movieSlice";
import { Loading, Button } from "../components";

function Movies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { movieStatus, movieData } = useSelector((state) => state.movie);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await apiClient.get("/api/v1/db/movies");
        if (response.data.success) {
          toast.dismiss();
          dispatch(setMovies(response.data.data));
        }
      } catch (error) {
        toast.dismiss();
        toast.error(error.response?.data?.message || "Failed to fetch movies");
      }
    };

    if (!movieStatus) {
      toast.loading("Fetching movies...");
      fetchMovies();
    }
  }, [movieStatus, dispatch]);

  if (!movieStatus) {
    return <Loading />;
  }

  return (
    <div className="p-6 w-full">
      <div className="text-2xl text-center font-semibold mb-8">Now Showing</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movieData?.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-96 object-cover"
            />
            <div className="p-4 flex flex-col items-center">
              <h3 className="text-xl font-bold mb-2 text-center">
                {movie.name}
              </h3>
              <Button
                onClick={() =>
                  navigate(
                    `/cinemas/${movie._id}`
                  )
                }
                className="w-full mt-4"
              >
                Get Tickets
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Movies;
