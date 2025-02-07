export const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { header: "3" }, { font: [] }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [{ script: "sub" }, { script: "super" }], // Subscript and superscript
    [{ color: [] }, { background: [] }], // Text color and background color
    [{ align: [] }], // Text alignment
    [{ indent: "-1" }, { indent: "+1" }], // Indentation controls
    ["link", "image", "video"], // Add link, image, and video options
    [{ size: [] }], // Font size options
    [{ header: [4, 5, 6] }], // Heading levels 4, 5, 6
    ["clean"], // Clear formatting
    ["horizontal"], // Horizontal rule
    ["table"], // Insert table (you can integrate a custom table module if needed)
  ],
  clipboard: {
    // Prevent pasting in a problematic format (keeping it clean)
    matchVisual: false,
  },
};

// Define custom styles as a JavaScript object
// export const editorStyles = {
//   container: {
//     width: "100%",
//     padding: "8px 16px",
//     marginTop: "8px",
//     backgroundColor: "var(--background-color)", // Dynamic background
//     color: "var(--text-color)", // Dynamic text color
//     borderRadius: "8px",
//     border: "none",
//   },
//   toolbar: {
//     backgroundColor: "var(--toolbar-background)", // Dynamic toolbar background
//     borderBottom: "1px solid var(--toolbar-border)", // Dynamic border
//   },
//   editor: {
//     backgroundColor: "var(--editor-background)", // Dynamic editor background
//     color: "var(--text-color)", // Dynamic text color
//     minHeight: "170px",
//     padding: "10px",
//     borderRadius: "8px",
//     fontFamily: "Arial, sans-serif",
//   },
// };
export const editorStyles = {
  container: {
    width: "100%",
    padding: "8px 16px",
    marginTop: "8px",
    backgroundColor: "var(--background-color)", // Dynamic background
    color: "var(--text-color)", // Dynamic text color
    borderRadius: "8px",
    border: "none",
    minHeight: "300px", // Adjust the height of the entire container
  },
  toolbar: {
    backgroundColor: "var(--toolbar-background)", // Dynamic toolbar background
    borderBottom: "1px solid var(--toolbar-border)", // Dynamic border
    padding: "8px", // Add padding for better spacing
  },
  editor: {
    backgroundColor: "var(--editor-background)", // Dynamic editor background
    color: "var(--text-color)", // Dynamic text color
    minHeight: "250px", // Set a default minHeight for the text area inside the editor
    height: "auto", // Let it grow according to the content
    padding: "10px",
    borderRadius: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    overflowY: "auto", // Ensures scrolling when content overflows
  },
};
