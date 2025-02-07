import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const GameForm = () => {
  const [game, setGame] = useState({
    type: "game",
    name: "",
    thumbnail: "",
    description: "",
    price: "",
    teams: "",
    sport: "",
    venue: "",
    date: "",
    time: "",
    duration: "",
    ageRestriction: "",
    ticketQuantity: "",
    promoCode: "",
    seatingArrangement: "",
    availableShows: [],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setGame({ ...game, [name]: value });
  };

  const handleAddShow = () => {
    if (game.date && game.time) {
      setGame({
        ...game,
        availableShows: [
          ...game.availableShows,
          {
            date: game.date,
            time: game.time,
            ticketQuantity: game.ticketQuantity,
          },
        ],
        date: "",
        time: "",
        ticketQuantity: "",
      });
    }
  };

  const handleRemoveShow = (index) => {
    const updatedShows = game.availableShows.filter((_, i) => i !== index);
    setGame({ ...game, availableShows: updatedShows });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Game Data Submitted:", game);
    // Here you can add logic to send the data to a server or perform other actions
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl p-6 mx-auto my-5 space-y-4 bg-white rounded-lg shadow-md dark:bg-gray-800"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">Add New Game</h2>
      <input
        type="text"
        name="name"
        placeholder="Game Event Name"
        value={game.name}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="thumbnail"
        placeholder="Thumbnail URL"
        value={game.thumbnail}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <textarea
        name="description"
        placeholder="Game Description"
        value={game.description}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      ></textarea>
      <input
        type="number"
        name="price"
        placeholder="Ticket Price"
        value={game.price}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="teams"
        placeholder="Teams (e.g., Team A vs Team B)"
        value={game.teams}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="sport"
        placeholder="Sport"
        value={game.sport}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="venue"
        placeholder="Venue"
        value={game.venue}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="duration"
        placeholder="Game Duration (e.g., 90 minutes)"
        value={game.duration}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <select
        name="ageRestriction"
        value={game.ageRestriction}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Age Restriction</option>
        <option value="All Ages">All Ages</option>
        <option value="18+">18+</option>
        <option value="21+">21+</option>
      </select>
      <div className="flex space-x-2">
        <input
          type="date"
          name="date"
          value={game.date}
          onChange={handleInputChange}
          className="w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
        <input
          type="time"
          name="time"
          value={game.time}
          onChange={handleInputChange}
          className="w-1/2 p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        />
      </div>
      <input
        type="number"
        name="ticketQuantity"
        placeholder="Available Tickets"
        value={game.ticketQuantity}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
        required
      />
      <input
        type="text"
        name="promoCode"
        placeholder="Promotional Code (if any)"
        value={game.promoCode}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      />
      <select
        name="seatingArrangement"
        value={game.seatingArrangement}
        onChange={handleInputChange}
        className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-white"
      >
        <option value="">Select Seating Arrangement</option>
        <option value="General Admission">General Admission</option>
        <option value="Reserved Seating">Reserved Seating</option>
      </select>
      <button
        type="button"
        onClick={handleAddShow}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
      >
        <FaPlus className="inline-block mr-2" />
        Add Show
      </button>
      {game.availableShows.length > 0 && (
        <div>
          <h4 className="mb-2 font-medium text-gray-900 dark:text-white">
            Available Shows:
          </h4>
          <ul className="space-y-2">
            {game.availableShows.map((show, index) => (
              <li
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md dark:bg-gray-700"
              >
                <span>
                  {show.date} at {show.time} - {show.ticketQuantity} Tickets
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveShow(index)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <FaMinus />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="submit"
        className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Add Game Event
      </button>
    </form>
  );
};

export default GameForm;
