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
              Book Your Movie Tickets with Movie Booking System
            </span>
          </div>
          <div className="text-xl font-semibold">
            Movie Booking System is a platform for booking movie tickets
          </div>
        </div>
        <div className="flex-1 text-left">
          <div className="text-xl mb-2">
            At Movie Booking System, we are committed to helping you make the most of
            your movie tickets. We provide movie booking services.
          </div>
          <ul className="list-disc text-xl list-inside mb-2">
            <li>Convenience</li>
            <li>Trust</li>
          </ul>
          <Button
            type="button"
            bgColor="bg-green-600"
            hoverBgColor="hover:bg-green-700"
            textColor="text-white"
            className="mt-4"
            onClick={() => navigate("/movies")}
          >
            Get Tickets
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
