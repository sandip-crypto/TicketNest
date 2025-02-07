import React from "react";
import { useSearch } from "../../context/SearchContext";
import Layout from "./layout/Layout";

const GlobalSearchResults = () => {
  const { searchResults } = useSearch();

  return (
    <Layout>
      {searchResults.length > 0 && (
        <div className="absolute left-0 z-10 w-full mt-2 bg-white rounded-lg shadow-lg top-full">
          <ul>
            {searchResults.map((result) => (
              <li
                key={result.id}
                className="p-2 cursor-pointer hover:bg-gray-100"
              >
                {result.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Layout>
  );
};

export default GlobalSearchResults;
