import React from "react";
import { useNavigate } from "react-router";
import { Button } from "../components";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="p-6">
      <div className="flex md:flex-row flex-col justify-center">
        <div className="flex-1 mb-4 text-left">
          <div className="text-5xl font-bold mb-4 underline cursor-pointer">
            <span onClick={() => navigate("/movies")}>
              Experience Cinema Like Never Before
            </span>
          </div>
          <div className="text-xl font-semibold">
            Your gateway to the latest blockbusters, premium seats, and unforgettable movie experiences
          </div>
        </div>
        <div className="flex-1 text-left">
          <div className="text-xl mb-2">
            Discover the magic of movies with seamless booking, instant confirmations, 
            and access to the best theaters in your city. From the latest releases to 
            timeless classics, we bring the cinema to your fingertips.
          </div>
          <ul className="list-disc text-xl list-inside mb-2">
            <li>🎬 Latest movies & showtimes</li>
            <li>🎟️ Instant booking confirmation</li>
            <li>💺 Choose your perfect seats</li>
            <li>🏆 Premium theater experience</li>
          </ul>
          <Button
            type="button"
            bgColor="bg-green-600"
            hoverBgColor="hover:bg-green-700"
            textColor="text-white"
            className="mt-4"
            onClick={() => navigate("/movies")}
          >
            Start Booking Now
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
