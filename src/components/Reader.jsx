import React, { useEffect, useRef } from "react";
import ePub from "epubjs";

const Reader = ({ file }) => {
  const epubRef = useRef(null);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const book = ePub(event.target.result);
      const rendition = book.renderTo(epubRef.current, {
        width: "100%",
        height: "100%",
      });

      rendition.display();
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  return <div className="w-full h-full border rounded-md overflow-auto" ref={epubRef}></div>;
};

export default Reader;
