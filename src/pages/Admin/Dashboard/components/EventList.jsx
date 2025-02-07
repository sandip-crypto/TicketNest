import React from "react";

const EventList = () => {
  const events = [
    {
      id: 1,
      name: "Summer Music Festival",
      type: "Concert",
      date: "2023-07-15",
      tickets: 5000,
    },
    {
      id: 2,
      name: "Comic Con",
      type: "Convention",
      date: "2023-08-22",
      tickets: 10000,
    },
    {
      id: 3,
      name: "Local Theater Play",
      type: "Theater",
      date: "2023-06-30",
      tickets: 200,
    },
    {
      id: 4,
      name: "NBA Finals Game",
      type: "Sports",
      date: "2023-06-10",
      tickets: 20000,
    },
    {
      id: 5,
      name: "Tech Conference",
      type: "Conference",
      date: "2023-09-05",
      tickets: 3000,
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 dark:text-white">
        Events
      </h1>
      <div className="mt-4">
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Tickets Available</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {events.map((event) => (
                  <tr
                    key={event.id}
                    className="text-gray-700 dark:text-gray-400"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{event.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{event.type}</td>
                    <td className="px-4 py-3 text-sm">{event.date}</td>
                    <td className="px-4 py-3 text-sm">{event.tickets}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventList;
