import React, { useEffect, useRef, useState } from "react";
import ePub from "epubjs";
import "tailwindcss/tailwind.css";

const Reader = ({ file }) => {
  const leftPageRef = useRef(null);
  const rightPageRef = useRef(null);
  const [book, setBook] = useState(null);
  const [leftRendition, setLeftRendition] = useState(null);
  const [rightRendition, setRightRendition] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

 
  // useEffect(() => {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const book = ePub(event.target.result);
  //     setBook(book);
  
  //     book.ready.then(() => {
  //       const leftRendition = book.renderTo(leftPageRef.current, {
  //         width: "100%",
  //         height: "100%",
  //       });
  //       const rightRendition = book.renderTo(rightPageRef.current, {
  //         width: "100%",
  //         height: "100%",
  //       });
  //       setLeftRendition(leftRendition);
  //       setRightRendition(rightRendition);
  
  //       // Adjusted logic to display the first and second pages correctly
  //       // Find the first non-cover item for the left page
  //       const firstItem = book.spine.items.find((item) => !item.href.includes('cover'));
  //       leftRendition.display(firstItem.href);
  
  //       // Find the second item for the right page, if it exists
  //       const secondItemIndex = book.spine.items.findIndex((item) => item.href === firstItem.href) + 1;
  //       if (book.spine.items[secondItemIndex]) {
  //         rightRendition.display(book.spine.items[secondItemIndex].href);
  //       }
  //     });
  //   };
  //   reader.readAsArrayBuffer(file);
  // }, [file]);
  useEffect(() => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const book = ePub(event.target.result);
    setBook(book);

    book.ready.then(() => {
      const leftRendition = book.renderTo(leftPageRef.current, {
        width: "100%",
        height: "100%",
      });
      const rightRendition = book.renderTo(rightPageRef.current, {
        width: "100%",
        height: "100%",
      });
      setLeftRendition(leftRendition);
      setRightRendition(rightRendition);

      // Start displaying from the very first item in the spine for both pages
      if (book.spine.items.length > 0) {
        leftRendition.display(book.spine.items[0].href);
        if (book.spine.items.length > 1) {
          rightRendition.display(book.spine.items[1].href);
        }
      }
    });
  };
  reader.readAsArrayBuffer(file);
}, [file]);
  const goToNextPage = () => {
    if (leftRendition && rightRendition && !isFlipping) {
      setIsFlipping(true);
      Promise.all([leftRendition.next(), rightRendition.next()]).then(() => {
        setIsFlipping(false);
      });
    }
  };
  
  const goToPrevPage = () => {
    if (leftRendition && rightRendition && !isFlipping) {
      setIsFlipping(true);
      Promise.all([leftRendition.prev(), rightRendition.prev()]).then(() => {
        setIsFlipping(false);
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <div className="flex shadow-lg rounded-lg w-full h-[30rem] overflow-hidden relative">
        <div className={`flex w-full transition-transform duration-700 ${isFlipping ? "transform rotate-y-180" : ""}`}>
          <div ref={leftPageRef} className="w-1/2 bg-white p-8"></div>
          <div ref={rightPageRef} className="w-1/2 bg-white p-8"></div>
        </div>
      </div>
      <div className="mt-4">
        <button
          onClick={goToPrevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-l"
        >
          Previous
        </button>
        <button
          onClick={goToNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Reader;
