import React from "react";
import DOMPurify from "dompurify";

const RenderContent = ({ content }) => {
  const sanitizedContent = DOMPurify.sanitize(content);
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: sanitizedContent, // Render HTML as actual content
      }}
    />
  );
};

export default RenderContent;
