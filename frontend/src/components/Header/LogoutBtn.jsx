import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { Button } from "../../components";
import axios from "axios";
import toast from "react-hot-toast";

function LogoutBtn({closeMenu}) {
  const dispatch = useDispatch();

  const handleLogout = async (e) => {
    e.preventDefault();
    closeMenu();

    const logoutToastId = toast.loading("Logging out...");

    try {
      const response = await axios.post("/api/v1/auth/logout");

      if (response.status === 200) {
        toast.dismiss(logoutToastId);
        toast.success("Logged out successfully!");

        dispatch(logout());
        console.log("Logged Out successfully");
      } else {
        console.error("Failed to Logout:", response.data.message);
      }
    } catch (error) {
      toast.dismiss(logoutToastId);
      toast.error("Logout failed. Please try again.");
      console.error("Error in logging out:", error.message);
    }

    closeMenu();
  };

  return (
    <div className="w-full">
      <Button
        type="button"
        bgColor="bg-red-600"
        hoverBgColor="hover:bg-red-700"
        textColor="text-white"
        className="w-full"
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );
}

export default LogoutBtn;
