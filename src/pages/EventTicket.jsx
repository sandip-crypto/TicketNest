import React, { useEffect, useRef, useState } from "react";
import QRCode from "react-qr-code";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { Calendar, Clock, MapPin, Download } from "lucide-react";
import { Link, useParams } from "react-router-dom"; // Import useParams for route parameters
import axios from "axios";

const EventTicket = () => {
  const ticketRef = useRef();
  const { id } = useParams(); // Get the transaction ID from the URL parameters
  const [transaction, setTransaction] = useState(null);
  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        // Fetch the transaction by its ID
        const response = await axios.get(
          `/api/v1/event-transaction/single-event-transaction/${id}`
        );
        console.log(response.data);
        if (response?.data?.transaction) {
          setTransaction(response.data.transaction);
          console.log(response.data.transaction);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchTransaction();
  }, [id]); // Re-run when the `id` changes

  const downloadTicket = async (ticketId) => {
    const ticket = ticketRef.current;
    const canvas = await html2canvas(ticket);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save(`ticket-${ticketId}.pdf`);
  };

  if (!transaction) {
    return <p>Loading...</p>; // Return loading state while fetching transaction
  }

  const bookingDate = new Date(transaction.purchaseDate).toLocaleString(
    "en-CA",
    {
      weekday: "long", // "Monday"
      year: "numeric", // "2025"
      month: "long", // "February"
      day: "numeric", // "6"
      hour: "numeric", // "3"
      minute: "numeric", // "29"
      second: "numeric", // "4"
    }
  );

  // Create ticket verification data
  const ticketData = {
    TicketId: transaction.ticketId,
    EventId: transaction.event._id,
    EventTitle: transaction.event.title,
    AttendeeName: transaction.user.username,
    AttendeeEmail: transaction.user.email,
    Quantity: transaction.ticketQuantity,
    BookingDate: bookingDate,
    Type: transaction.ticketType,
  };

  // Convert the ticketData object into the desired string format
  const formattedTicketData = Object.keys(ticketData)
    .map((key) => `${key}: ${ticketData[key] || ""}`) // Use an empty string for empty values
    .join("\n"); // Join the lines with newline characters

  return (
    <>
      <div className="max-w-4xl p-4 mx-auto">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => downloadTicket(transaction.ticketId)}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-teal-600 rounded-lg hover:bg-teal-700"
          >
            <Download className="w-5 h-5" />
            <span>Download Ticket</span>
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-10">
          <div
            ref={ticketRef}
            className="w-full mb-6 overflow-hidden bg-white rounded-lg shadow-lg"
          >
            <div className="relative p-6 text-white bg-teal-600">
              <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-16 -translate-y-16 bg-teal-500 rounded-full"></div>
              <div className="relative">
                <h2 className="mb-2 text-3xl font-bold">
                  {transaction.event.title}
                </h2>
                <p className="text-teal-100">
                  {" "}
                  Category: {transaction.event.category}
                </p>
              </div>
            </div>

            <div className="grid gap-6 p-6 md:grid-cols-3">
              <div className="col-span-2 space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {new Date(
                          transaction.event.startDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">
                        {transaction.event.startTime}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p className="font-medium">
                        {transaction.event.address}, {transaction.event.city}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h3 className="mb-2 font-semibold">Attendee Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{transaction.user.username}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{transaction.user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Ticket ID</p>
                      <p className="font-medium">{transaction.ticketId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">1 ticket</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center pl-6 border-l">
                <div className="p-2 bg-white rounded-lg shadow-sm">
                  <QRCode value={formattedTicketData} size={150} level="H" />
                </div>
                <p className="mt-2 text-sm text-center text-gray-500">
                  Scan to verify ticket
                </p>
              </div>
            </div>

            <div className="p-4 text-sm text-center text-gray-500 bg-gray-50">
              <p>
                This ticket is valid for one-time entry only. Please present
                this ticket at the venue.
              </p>
            </div>
          </div>

          <div>
            <Link
              to={"/ticketnest/events"}
              className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-lg hover:bg-red-700 "
            >
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventTicket;
