import React, { useState, useRef, useEffect } from "react";
import {
  Trash2,
  Plus,
  Save,
  Theater,
  Users,
  Calendar,
  Clock,
  Film,
} from "lucide-react";

const TheaterForm = () => {
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [sections, setSections] = useState([]);
  const [currentSection, setCurrentSection] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    eventType: "play", // play, musical, drama, etc.
    director: "",
    cast: "",
    duration: "",
    language: "",
    ageRestriction: "",
    genre: "",
    venue: {
      name: "",
      address: "",
      capacity: 0,
    },
    shows: [],
    ticketingInfo: {
      salesStartDate: "",
      salesEndDate: "",
      refundPolicy: "",
    },
    facilities: {
      parking: false,
      foodBeverage: false,
      wheelchair: false,
      ac: false,
    },
  });

  const [showTimes, setShowTimes] = useState([
    {
      date: "",
      time: "",
      price: "",
    },
  ]);

  // Canvas dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 600;
  const SEAT_SIZE = 20;
  const SEAT_SPACING = 5;

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);

    // Set canvas size
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    drawSeatMap();
  }, [sections]);

  const drawSeatMap = () => {
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw sections
    sections.forEach((section, sectionIndex) => {
      const startX = section.x;
      const startY = section.y;

      // Draw seats
      for (let row = 0; row < section.rows; row++) {
        for (let col = 0; col < section.columns; col++) {
          const x = startX + col * (SEAT_SIZE + SEAT_SPACING);
          const y = startY + row * (SEAT_SIZE + SEAT_SPACING);

          ctx.fillStyle = section.color;
          ctx.fillRect(x, y, SEAT_SIZE, SEAT_SIZE);
          ctx.strokeStyle = "#000";
          ctx.strokeRect(x, y, SEAT_SIZE, SEAT_SIZE);

          // Draw seat number
          ctx.fillStyle = "#000";
          ctx.font = "10px Arial";
          const seatNumber = row * section.columns + col + 1;
          ctx.fillText(seatNumber.toString(), x + 5, y + 15);
        }
      }

      // Draw section label
      ctx.fillStyle = "#000";
      ctx.font = "bold 14px Arial";
      ctx.fillText(section.name, startX, startY - 10);
    });
  };

  const handleCanvasMouseDown = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a section
    sections.forEach((section, index) => {
      if (
        x >= section.x &&
        x <= section.x + section.columns * (SEAT_SIZE + SEAT_SPACING) &&
        y >= section.y &&
        y <= section.y + section.rows * (SEAT_SIZE + SEAT_SPACING)
      ) {
        setSelectedSeat({ sectionIndex: index, x: section.x, y: section.y });
        setIsDragging(true);
      }
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (!isDragging || selectedSeat === null) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSections = [...sections];
    newSections[selectedSeat.sectionIndex].x = x;
    newSections[selectedSeat.sectionIndex].y = y;
    setSections(newSections);
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setSelectedSeat(null);
  };

  const addSection = () => {
    if (!currentSection) return;

    const newSection = {
      ...currentSection,
      x: 50,
      y: 50 + sections.length * 100,
      color: `hsl(${Math.random() * 360}, 70%, 80%)`, // Random pastel color
    };

    setSections([...sections, newSection]);
    setCurrentSection(null);
  };

  const removeSection = (index) => {
    const newSections = sections.filter((_, i) => i !== index);
    setSections(newSections);
  };

  const addShowTime = () => {
    setShowTimes([...showTimes, { date: "", time: "", price: "" }]);
  };

  const removeShowTime = (index) => {
    setShowTimes(showTimes.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const theaterData = {
      ...formData,
      sections,
      showTimes,
    };

    try {
      const response = await fetch("/api/theaters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(theaterData),
      });

      if (response.ok) {
        alert("Theater event created successfully!");
        // Reset form or redirect
      } else {
        throw new Error("Failed to create theater event");
      }
    } catch (error) {
      console.error("Error creating theater event:", error);
      alert("Failed to create theater event. Please try again.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center mb-8 space-x-4">
          <Theater className="w-8 h-8 text-teal-600" />
          <h1 className="text-3xl font-bold text-gray-900">
            Create Theater Event
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Basic Information
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Event Type
                </label>
                <select
                  value={formData.eventType}
                  onChange={(e) =>
                    setFormData({ ...formData, eventType: e.target.value })
                  }
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                >
                  <option value="play">Play</option>
                  <option value="musical">Musical</option>
                  <option value="drama">Drama</option>
                  <option value="comedy">Comedy</option>
                  <option value="opera">Opera</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Show Times */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Show Times
              </h2>
              <button
                type="button"
                onClick={addShowTime}
                className="flex items-center px-3 py-2 text-sm font-medium text-white bg-teal-600 rounded-md hover:bg-teal-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Show
              </button>
            </div>
            {showTimes.map((show, index) => (
              <div key={index} className="flex items-center mb-4 space-x-4">
                <input
                  type="date"
                  value={show.date}
                  onChange={(e) => {
                    const newShowTimes = [...showTimes];
                    newShowTimes[index].date = e.target.value;
                    setShowTimes(newShowTimes);
                  }}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <input
                  type="time"
                  value={show.time}
                  onChange={(e) => {
                    const newShowTimes = [...showTimes];
                    newShowTimes[index].time = e.target.value;
                    setShowTimes(newShowTimes);
                  }}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={show.price}
                  onChange={(e) => {
                    const newShowTimes = [...showTimes];
                    newShowTimes[index].price = e.target.value;
                    setShowTimes(newShowTimes);
                  }}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={() => removeShowTime(index)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Seat Map */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-gray-800">
              Seat Map
            </h2>

            {/* Section Creator */}
            <div className="p-4 mb-6 border rounded-md bg-gray-50">
              <h3 className="mb-4 text-lg font-medium">Add New Section</h3>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
                <input
                  type="text"
                  placeholder="Section Name"
                  onChange={(e) =>
                    setCurrentSection({
                      ...currentSection,
                      name: e.target.value,
                    })
                  }
                  className="border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Rows"
                  onChange={(e) =>
                    setCurrentSection({
                      ...currentSection,
                      rows: parseInt(e.target.value),
                    })
                  }
                  className="border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <input
                  type="number"
                  placeholder="Columns"
                  onChange={(e) =>
                    setCurrentSection({
                      ...currentSection,
                      columns: parseInt(e.target.value),
                    })
                  }
                  className="border-gray-300 rounded-md shadow-sm focus:border-teal-500 focus:ring-teal-500"
                />
                <button
                  type="button"
                  onClick={addSection}
                  className="flex items-center justify-center px-4 py-2 text-white bg-teal-600 rounded-md hover:bg-teal-700"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Section
                </button>
              </div>
            </div>

            {/* Section List */}
            <div className="mb-4">
              <h3 className="mb-2 text-lg font-medium">Sections</h3>
              <div className="space-y-2">
                {sections.map((section, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 rounded-md bg-gray-50"
                  >
                    <span className="font-medium">{section.name}</span>
                    <div className="flex items-center space-x-4">
                      <span>
                        {section.rows} rows × {section.columns} columns
                      </span>
                      <button
                        type="button"
                        onClick={() => removeSection(index)}
                        className="p-1 text-red-600 hover:text-red-800"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div className="overflow-hidden border rounded-lg">
              <canvas
                ref={canvasRef}
                onMouseDown={handleCanvasMouseDown}
                onMouseMove={handleCanvasMouseMove}
                onMouseUp={handleCanvasMouseUp}
                onMouseLeave={handleCanvasMouseUp}
                className="w-full bg-white"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="flex items-center px-6 py-3 text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
            >
              <Save className="w-5 h-5 mr-2" />
              Create Theater Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TheaterForm;
