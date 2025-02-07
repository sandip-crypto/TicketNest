import React, { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemType = "BOX";

// Draggable Box Component
const DraggableBox = ({ id, moveBox, deleteBox }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.id !== id) {
        moveBox(draggedItem.id, id);
        draggedItem.id = id;
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        width: "60px",
        height: "60px",
        backgroundColor: "lightblue",
        margin: "5px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        border: "1px solid black",
        cursor: "grab",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      <button
        onClick={() => deleteBox(id)}
        style={{
          background: "red",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        ❌
      </button>
    </div>
  );
};

// Main Grid Component
const DragDropGrid = () => {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [boxes, setBoxes] = useState(
    Array.from({ length: rows * cols }, (_, i) => i)
  );

  const generateGrid = () => {
    setBoxes(Array.from({ length: rows * cols }, (_, i) => i));
  };

  const moveBox = (fromId, toId) => {
    const newBoxes = [...boxes];
    const fromIndex = newBoxes.indexOf(fromId);
    const toIndex = newBoxes.indexOf(toId);
    [newBoxes[fromIndex], newBoxes[toIndex]] = [
      newBoxes[toIndex],
      newBoxes[fromIndex],
    ];
    setBoxes(newBoxes);
  };

  const deleteBox = (id) => {
    setBoxes(boxes.filter((box) => box !== id));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ marginBottom: "20px" }}>
        <input
          type="number"
          value={rows}
          onChange={(e) => setRows(Number(e.target.value))}
          placeholder="Rows"
          style={{ marginRight: "10px" }}
        />
        <input
          type="number"
          value={cols}
          onChange={(e) => setCols(Number(e.target.value))}
          placeholder="Columns"
          style={{ marginRight: "10px" }}
        />
        <button
          onClick={generateGrid}
          style={{ background: "blue", color: "white" }}
        >
          Generate Grid
        </button>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${cols}, 60px)`,
          gap: "10px",
        }}
      >
        {boxes.map((id) => (
          <DraggableBox
            key={id}
            id={id}
            moveBox={moveBox}
            deleteBox={deleteBox}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default DragDropGrid;
