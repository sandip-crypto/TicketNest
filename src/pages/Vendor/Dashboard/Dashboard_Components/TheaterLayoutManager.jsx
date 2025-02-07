import React, { useState, useEffect } from "react";

const TheaterLayoutManager = ({ onLayoutConfirm }) => {
  const [sections, setSections] = useState([]);
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionPrice, setNewSectionPrice] = useState("");
  const [newSectionRows, setNewSectionRows] = useState("");
  const [newSectionColumns, setNewSectionColumns] = useState("");
  const [newRowGap, setNewRowGap] = useState("");
  const [newColumnGap, setNewColumnGap] = useState("");
  const [rowGaps, setRowGaps] = useState({});
  const [columnGaps, setColumnGaps] = useState({});
  const [removedSeats, setRemovedSeats] = useState({});

  useEffect(() => {
    const layoutConfig = {
      sections,
      rowGaps,
      columnGaps,
      removedSeats,
    };
    onLayoutConfirm(layoutConfig);
  }, [sections, rowGaps, columnGaps, removedSeats, onLayoutConfirm]);

  const generateSection = (name, basePrice, rowCount, columnCount) => {
    const sectionRows = [];
    let currentRow = "A";

    for (let i = 0; i < rowCount; i++) {
      const seats = [];

      for (let j = 1; j <= columnCount; j++) {
        seats.push({
          id: `${name}-${currentRow}-${j}`,
          row: currentRow,
          column: j,
          price: basePrice,
          category: name,
        });
      }

      sectionRows.push({
        name: currentRow,
        seats,
      });

      currentRow = String.fromCharCode(currentRow.charCodeAt(0) + 1);
    }

    return {
      name,
      basePrice,
      rows: sectionRows,
    };
  };

  const handleAddSection = (e) => {
    e.preventDefault();
    if (
      newSectionName &&
      newSectionPrice &&
      newSectionRows &&
      newSectionColumns
    ) {
      const newSection = generateSection(
        newSectionName,
        Number(newSectionPrice),
        Number(newSectionRows),
        Number(newSectionColumns)
      );
      setSections((prev) => [...prev, newSection]);
      setNewSectionName("");
      setNewSectionPrice("");
      setNewSectionRows("");
      setNewSectionColumns("");
    }
  };

  const handleAddRowGap = (e) => {
    e.preventDefault();
    const [sectionName, rowName] = newRowGap.split("-");
    if (sectionName && rowName) {
      setRowGaps((prev) => ({
        ...prev,
        [sectionName]: [...(prev[sectionName] || []), rowName],
      }));
      setNewRowGap("");
    }
  };

  const handleAddColumnGap = (e) => {
    e.preventDefault();
    const [sectionName, rowName, columnNumber] = newColumnGap.split("-");
    if (sectionName && rowName && columnNumber) {
      setColumnGaps((prev) => ({
        ...prev,
        [`${sectionName}-${rowName}`]: [
          ...(prev[`${sectionName}-${rowName}`] || []),
          Number(columnNumber),
        ],
      }));
      setNewColumnGap("");
    }
  };

  const removeSeat = (sectionName, rowName, seatColumn) => {
    setRemovedSeats((prev) => ({
      ...prev,
      [`${sectionName}-${rowName}-${seatColumn}`]: true,
    }));
  };

  return (
    <div className="w-full max-w-6xl p-4 mx-auto overflow-hidden bg-white rounded-lg shadow-lg sm:p-6 dark:bg-gray-700">
      <h2 className="mb-6 text-2xl font-bold dark:text-gray-300">
        Theater Layout Manager
      </h2>

      {/* Form for adding new section */}
      <form className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-gray-300">
        <h3 className="mb-2 text-lg font-semibold">Add New Section</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input
            type="text"
            value={newSectionName}
            onChange={(e) => setNewSectionName(e.target.value)}
            placeholder="Section Name"
            className="w-full p-2 border rounded dark:text-gray-300 dark:bg-gray-700"
          />
          <input
            type="number"
            value={newSectionPrice}
            onChange={(e) => setNewSectionPrice(e.target.value)}
            placeholder="Base Price"
            className="w-full p-2 border rounded dark:text-gray-300 dark:bg-gray-700"
          />
          <input
            type="number"
            value={newSectionRows}
            onChange={(e) => setNewSectionRows(e.target.value)}
            placeholder="Number of Rows"
            className="w-full p-2 border rounded dark:text-gray-300 dark:bg-gray-700"
          />
          <input
            type="number"
            value={newSectionColumns}
            onChange={(e) => setNewSectionColumns(e.target.value)}
            placeholder="Number of Columns"
            className="w-full p-2 border rounded dark:text-gray-300 dark:bg-gray-700"
          />
        </div>
        <button
          className="w-full px-4 py-2 mt-4 text-white transition-all duration-300 bg-teal-500 rounded hover:bg-teal-600 sm:w-auto"
          onClick={handleAddSection}
        >
          Add Section
        </button>
      </form>

      {/* Form for adding gaps */}
      <div className="p-4 mb-6 bg-gray-100 rounded-lg dark:bg-gray-700 dark:text-black">
        <h3 className="mb-2 text-lg font-semibold dark:text-gray-300">
          Add Gaps
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form>
            <input
              type="text"
              value={newRowGap}
              onChange={(e) => setNewRowGap(e.target.value)}
              placeholder="Section-Row (e.g., Platinum-B)"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddRowGap}
              className="w-full px-4 py-2 mt-2 text-white transition-all duration-300 bg-teal-500 rounded hover:bg-teal-600"
            >
              Add Row Gap
            </button>
          </form>
          <form>
            <input
              type="text"
              value={newColumnGap}
              onChange={(e) => setNewColumnGap(e.target.value)}
              placeholder="Section-Row-Column (e.g., Platinum-A-5)"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddColumnGap}
              className="w-full px-4 py-2 mt-2 text-white transition-all duration-300 bg-teal-500 rounded hover:bg-teal-600"
            >
              Add Column Gap
            </button>
          </form>
        </div>
      </div>

      {/* Render theater layout */}
      <div className="space-y-8">
        <div className="flex items-center justify-center w-full h-8 bg-gray-800 rounded-t-lg">
          <span className="text-sm font-bold text-white">Screen</span>
        </div>

        {sections.map((section) => (
          <div key={section.name} className="space-y-4 place-items-center">
            <h3 className="text-lg font-semibold dark:text-gray-300">
              {section.name} - Rs. {section.basePrice}
            </h3>

            <div className="space-y-4">
              {section.rows.map((row, rowIndex) => (
                <React.Fragment key={row.name}>
                  <div className="flex flex-wrap items-start gap-4">
                    <span className="w-8 font-bold text-right">{row.name}</span>
                    <div className="flex flex-wrap gap-2">
                      {row.seats.map((seat, seatIndex) => (
                        <React.Fragment key={seat.id}>
                          {removedSeats[
                            `${section.name}-${row.name}-${seat.column}`
                          ] ? (
                            <div className="w-5 h-5 sm:w-7 sm:h-7" />
                          ) : (
                            <div
                              className="flex items-center justify-center w-5 h-5 text-xs font-bold text-black border border-teal-500 cursor-pointer sm:w-7 sm:h-7 hover:bg-red-200"
                              onClick={() =>
                                removeSeat(section.name, row.name, seat.column)
                              }
                            >
                              {seat.column}
                            </div>
                          )}
                          {columnGaps[`${section.name}-${row.name}`]?.includes(
                            seatIndex + 1
                          ) && <div className="w-5 sm:w-7" />}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                  {rowGaps[section.name]?.includes(row.name) && (
                    <div className="h-6" />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheaterLayoutManager;
