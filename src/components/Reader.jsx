import React, { useEffect, useRef, useState } from "react";
import ePub from "epubjs";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

const Reader = ({ file }) => {
  const bookRef = useRef(null);
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
  const [location, setLocation] = useState(null);
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const book = ePub(event.target.result);
      setBook(book);
      book.ready.then(() => {
        const rendition = book.renderTo(bookRef.current, {
          width: "100%",
          height: "100%",
        });
        setRendition(rendition);
        rendition.display();
      });
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  const goToNextPage = () => {
    if (rendition && !isFlipping) {
      setIsFlipping(true);
      rendition.next().then(() => setIsFlipping(false));
    }
  };

  const goToPrevPage = () => {
    if (rendition && !isFlipping) {
      setIsFlipping(true);
      rendition.prev().then(() => setIsFlipping(false));
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div className="flex shadow-2xl rounded-lg w-full h-[35rem] overflow-hidden relative bg-gray-100">
        <div ref={bookRef} className="flex w-full h-full"></div>
      </div>
      <div className="mt-4 flex justify-around w-full">
        <button
          onClick={goToPrevPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isFlipping}
        >
          <FontAwesomeIcon icon={faLeftLong} /> Previous
        </button>
        <button
          onClick={goToNextPage}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          disabled={isFlipping}
        >
          Next <FontAwesomeIcon icon={faRightLong} />
        </button>
      </div>
    </div>
  );
};

export default Reader;

// import React, { useEffect, useRef, useState } from "react";
// import ePub from "epubjs";
// import "tailwindcss/tailwind.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

// const Reader = ({ file }) => {
//   const leftPageRef = useRef(null);
//   const rightPageRef = useRef(null);
//   const [book, setBook] = useState(null);
//   const [leftRendition, setLeftRendition] = useState(null);
//   const [rightRendition, setRightRendition] = useState(null);
//   const [isFlipping, setIsFlipping] = useState(false);

 
 
//   useEffect(() => {
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

//       // Start displaying from the very first item in the spine for both pages
//       if (book.spine.items.length > 0) {
//         leftRendition.display(book.spine.items[0].href);
//         if (book.spine.items.length > 1) {
//           rightRendition.display(book.spine.items[1].href);
//         }
//       }
//     });
//   };
//   reader.readAsArrayBuffer(file);
// }, [file]);
//   const goToNextPage = () => {
//     if (leftRendition && rightRendition && !isFlipping) {
//       setIsFlipping(true);
//       Promise.all([leftRendition.next(), rightRendition.next()]).then(() => {
//         setIsFlipping(false);
//       });
//     }
//   };
  
//   const goToPrevPage = () => {
//     if (leftRendition && rightRendition && !isFlipping) {
//       setIsFlipping(true);
//       Promise.all([leftRendition.prev(), rightRendition.prev()]).then(() => {
//         setIsFlipping(false);
//       });
//     }
//   };
//   // return (
//   //   <div className="flex flex-col justify-center items-center h-screen ">
//   //     <div className="flex shadow-lg rounded-lg w-full h-[35rem] overflow-hidden relative bg-gray-100">
//   //       <div className={`flex w-full transition-transform duration-700 ${isFlipping ? "transform rotate-y-180" : ""}`}>
//   //         <div ref={leftPageRef} className="w-1/2 bg-white p-8 border-r border-gray-300 shadow-inner"></div>
//   //         <div className="w-0.5 bg-gray-400"></div> {/* This div acts as the visual division between the two pages */}

//   //         <div ref={rightPageRef} className="w-1/2 bg-white p-8 shadow-inner"></div>
//   //       </div>
//   //     </div>
//   //     <div className="mt-4 flex justify-around  w-full">
//   //       <button
//   //         onClick={goToPrevPage}
//   //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//   //       >
//   //        <FontAwesomeIcon icon={faLeftLong}/> Previous
//   //       </button>
//   //       <button
//   //         onClick={goToNextPage}
//   //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//   //       >
//   //         Next  <FontAwesomeIcon icon={faRightLong}/>
//   //       </button>
//   //     </div>
//   //   </div>
//   // );
//   return (
//     <div className="flex flex-col justify-center items-center h-screen ">
//       <div className="flex shadow-2xl rounded-lg w-full h-[35rem] overflow-hidden relative bg-gray-200 transform rotate-10">
//         <div className={`flex w-full transition-transform duration-700 ${isFlipping ? "transform rotate-y-180" : ""}`}>
//           <div ref={leftPageRef} className="w-1/2 bg-white p-8 border-r border-gray-300 shadow-inner relative">
//             {/* Left page content */}
//             <div className="absolute top-0 right-0 h-full w-2 bg-gradient-to-r from-transparent to-white"></div> {/* Simulate page curvature */}
//           </div>
//           <div className="w-0.5 bg-gray-400"></div> {/* Division between the two pages */}
//           <div ref={rightPageRef} className="w-1/2 bg-white p-8 shadow-inner relative">
//             {/* Right page content */}
//             <div className="absolute top-0 right-0 h-full w-4 bg-gradient-to-r from-transparent to-gray-200"></div> {/* Simulate page curvature */}
//           </div>
//         </div>
//         <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-r from-transparent to-gray-300"></div> {/* Simulate more pages beneath */}
//       </div>
//       <div className="mt-4 flex justify-around w-full">
//         <button
//           onClick={goToPrevPage}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//          <FontAwesomeIcon icon={faLeftLong}/> Previous
//         </button>
//         <button
//           onClick={goToNextPage}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Next  <FontAwesomeIcon icon={faRightLong}/>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Reader;
