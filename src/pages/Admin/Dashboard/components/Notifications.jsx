import React, { useState } from "react";

const initialNotifications = [
  { id: 1, message: "New user registered", read: false },
  { id: 2, message: "New event created", read: false },
  { id: 3, message: "Ticket sales report ready", read: true },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  return (
    <div>
      <h1 className="mb-6 text-3xl font-semibold text-gray-800 dark:text-white">
        Notifications
      </h1>
      <div className="p-4 bg-white rounded-lg shadow dark:bg-gray-800">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`p-4 mb-4 rounded ${
              notif.read
                ? "bg-gray-100 dark:bg-gray-700"
                : "bg-blue-100 dark:bg-blue-900"
            }`}
          >
            <p className="text-gray-800 dark:text-gray-200">{notif.message}</p>
            {!notif.read && (
              <button
                onClick={() => markAsRead(notif.id)}
                className="mt-2 text-blue-500 hover:text-blue-700"
              >
                Mark as read
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
