import { useEffect, useRef, useState } from "react";
import ePub from "epubjs";
import "tailwindcss/tailwind.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faChevronLeft, faChevronRight, faLeftLong, faRightLong } from "@fortawesome/free-solid-svg-icons";

const Reader = ({ file }) => {
  const bookRef = useRef(null);
  const [book, setBook] = useState(null);
  const [rendition, setRendition] = useState(null);
const [isFlipping, setIsFlipping] = useState(false);
const [isAtStart, setIsAtStart] = useState(true);
const [isAtEnd, setIsAtEnd] = useState(false);


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
        rendition.display().then(()=>updateNavigationControls(rendition));
        rendition.on('relocated',(location)=>{
          updateNavigationControls(rendition);
        });
      });
    };
    reader.readAsArrayBuffer(file);
  }, [file]);

  const updateNavigationControls = (rendition) => {
    const currentLocation = rendition.currentLocation();
    const startCfi = currentLocation?.start?.cfi ?? 'Start CFI not available';
    const endCfi = currentLocation?.end?.cfi ?? 'End CFI not available';

    // Update button availability based on currentLocation
    // This is a simplified example. You might need to adjust the logic based on how your book's CFIs are structured
    setIsAtStart(currentLocation.atStart || false);
    setIsAtEnd(currentLocation.atEnd || false);

    console.log('Current Start CFI:', startCfi);
    console.log('Current End CFI:', endCfi);
  };
  const goToNextPage = () => {
    
    if (rendition && !isFlipping ) {
      setIsFlipping(true);
      rendition.next().then(() => setIsFlipping(false));
    }
  };

  const goToPrevPage = () => {
    if (rendition && !isFlipping ) {
      setIsFlipping(true);
      rendition.prev().then(() => setIsFlipping(false));
    }
  };

  // return (
  //   <div className="flex flex-col justify-center items-center h-screen">
  //     <div className="flex shadow-2xl rounded-lg w-full h-[35rem] overflow-hidden relative bg-gray-100 ">
  //       <div ref={bookRef} className="flex w-full h-full "></div>
  //     </div>
  //     <div className="mt-4 flex justify-around w-full">
  //       <button
  //         onClick={goToPrevPage}
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //         disabled={isFlipping}
  //       >
  //         <FontAwesomeIcon icon={faLeftLong} /> Previous
  //       </button>
  //       <button
  //         onClick={goToNextPage}
  //         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  //         disabled={isFlipping}
  //       >
  //         Next <FontAwesomeIcon icon={faRightLong} />
  //       </button>
  //     </div>
  //   </div>
  // );

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-white ">
      <div className="relative flex shadow-2xl rounded-lg w-full h-[35rem] overflow-hidden ">
        <div ref={bookRef} className="flex w-full h-full  px-12 "></div>
        <button
          onClick={goToPrevPage}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-300  hover:bg-gray-200 hover:bg-opacity-45 rounded font-bold py-2 px-2 disabled:text-transparent disabled:bg-transparent"
          disabled={isAtStart}
          style={{ fontSize: "2rem" }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button
          onClick={goToNextPage}
          className="absolute right-2 top-1/2 transform -translate-y-1/2  text-gray-400  hover:bg-gray-300 hover:bg-opacity-45 rounded font-bold py-2 px-2 disabled:text-transparent disabled:bg-transparent"
          disabled={isAtEnd }
          style={{ fontSize: "2rem" }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Reader;
