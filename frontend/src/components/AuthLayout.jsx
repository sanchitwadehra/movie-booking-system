import axios from "axios";
import { useEffect } from "react";

export default function Protected({ children, authentication = true }) {
  useEffect(() => {
    axios.get("/api/v1/health").then((res) => {
      console.log(res);
    });
  }, []);
  return <>{children}</>;
}