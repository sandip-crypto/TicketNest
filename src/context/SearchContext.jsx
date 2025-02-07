import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const SearchContext = createContext();

// Provider Component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Simulate an API call for search results
  useEffect(() => {
    if (searchTerm.trim()) {
      // Simulate fetching search results from the backend or front-end data
      // Here you would actually call an API or filter your data.
      const fetchResults = async () => {
        try {
          const response = await fetch(
            `/api/v1/search/search-across-collections, {
            params: {
            searchTerm}}`
          );
          const data = await response.json();
          setSearchResults(data.results);
        } catch (err) {
          console.error(err);
        }
      };
      fetchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, searchResults }}
    >
      {children}
    </SearchContext.Provider>
  );
};

// Custom hook to use search context
export const useSearch = () => {
  return useContext(SearchContext);
};