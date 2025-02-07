import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomePage from "./HomePage";

const RedirectToHomePage = () => {
  const navigate = useNavigate();
  const [typedUrl, setTypedUrl] = useState(window.location.pathname);

  useEffect(() => {
    const handleUrlChange = () => {
      setTypedUrl(window.location.pathname);
    };

    window.addEventListener("popstate", handleUrlChange);
    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, []);

  useEffect(() => {
    if (typedUrl !== "/ticketnest/explore/home") {
      navigate("/ticketnest/explore/home");
    }
  }, [typedUrl, navigate]);

  return (
    <div>
      <HomePage />
    </div>
  );
};

export default RedirectToHomePage;
