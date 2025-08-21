import { useEffect } from "react";
import { Outlet } from "react-router";
import { Header, Footer, Container } from "./components";
import { Toaster } from "react-hot-toast";

function App() {
  useEffect(() => {
    const setSystemTheme = () => {
      const prefersDarkMode = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      if (prefersDarkMode) {
        document.querySelector("html").classList.add("dark");
      } else {
        document.querySelector("html").classList.remove("dark");
      }
    };

    // Set the theme initially
    setSystemTheme();

    // Listen for changes in system theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    mediaQuery.addEventListener("change", setSystemTheme);

    // Cleanup listener on unmount
    return () => mediaQuery.removeEventListener("change", setSystemTheme);
    // document.querySelector("html").classList.add("dark");
  }, []);

  return (
    <>
      {/* This is our new toast portal. It's invisible until you call it. */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
      <Header />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;