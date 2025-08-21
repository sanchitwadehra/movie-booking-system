import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Loading, Input, Button } from "../components";
import { Navigate } from "react-router";
import axios from "axios";
import { verifyLogin } from "../store/authSlice";
import toast from "react-hot-toast";
import validator from "validator";


function Auth() {
  const auth = useSelector((state) => state.auth.status);
  const route = useSelector((state) => state.route.route);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const passwordInputRef = useRef(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validator.isEmail(email) ) {
      toast.error("Invalid email");
      return;
    }
    if (!validator.isStrongPassword(password)) {
      toast.error("Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character");
      return;
    }
    try {
      const response = await axios.post("/api/v1/auth", { email, password });
      if (response.status === 200) {
        toast.success("Login successful");
        dispatch(verifyLogin(response.data.data.user));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!auth) {
      setLoading(false);
    }
  }, [auth]);

  if (auth && route) {
    return <Navigate to={route} />;
  } else if (auth && !route) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-full flex flex-col items-center">
      <div className="text-2xl text-center font-semibold mb-4">
        Login/Signup
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-4"
      >
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              passwordInputRef.current.focus();
            }
          }}
        />
        <div className="relative w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)}
            ref={passwordInputRef}
            className="pr-12"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            )}
          </button>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
}

export default Auth;
