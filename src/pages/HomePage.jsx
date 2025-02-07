import React from "react";
import MovieList from "./MovieList";
import EventList from "./EventList";
import Layout from "./../components/layout/Layout";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { user } = useAuth();
  return (
    <Layout>
      <MovieList />
      <hr className="container mx-auto max-w-[70rem]" />
      <EventList />
      {/* {user?.role} {user?.username} */}
    </Layout>
  );
};

export default HomePage;
