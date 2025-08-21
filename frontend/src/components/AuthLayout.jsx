import axios from "axios";
import { useEffect } from "react";
import { Navigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Container, Loading } from "../components";
import { verifyLogin } from "../store/authSlice";
import { cookieChecked } from "../store/authSlice";
import toast from "react-hot-toast";

export default function Protected({ children, authentication = true }) {
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.status);
  const cookieCheckedStatus = useSelector((state) => state.auth.cookieChecked);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performInitialCheck = async () => {
      if (!cookieCheckedStatus) {
        try {
          const refreshResponse = await axios.post("/api/v1/auth/refresh");
          if(refreshResponse.status === 200){
            toast.success("Session refreshed");
            const userResponse = await axios.get("/api/v1/user");
            const user = userResponse.data.data.currentUser;
            dispatch(verifyLogin(user));
          }
        } catch (error) {
          toast.error("Session expired, please login again");
        } finally {
          dispatch(cookieChecked());
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    performInitialCheck();
  }, [dispatch, cookieCheckedStatus]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if(authentication && !authStatus){
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
}
