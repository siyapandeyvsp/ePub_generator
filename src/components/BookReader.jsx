import React, { useState } from "react";
import Reader from "./Reader"; // Make sure the path is correct

const BookReader = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isReading, setIsReading] = useState(false);

  const dropHandler = (event) => {
    event.preventDefault();
    if (event.dataTransfer.items && event.dataTransfer.items[0]) {
      const file = event.dataTransfer.items[0].getAsFile();
      if (file.type === "application/epub+zip") {
        setSelectedFile(file);
        setIsReading(false);
      } else {
        alert("Please drop an .epub file only.");
      }
    }
  };

  const fileSelectHandler = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/epub+zip") {
      setSelectedFile(file);
      setIsReading(false);
    } else {
      alert("Please select an .epub file.");
    }
  };

  const dragOverHandler = (event) => {
    event.preventDefault();
    event.currentTarget.style.border = "2px solid #000";
  };

  const dragLeaveHandler = (event) => {
    event.currentTarget.style.background = "";
    event.currentTarget.style.border = "";
  };

  const dragEnterHandler = (event) => {
    event.currentTarget.style.background = "#eee";
  };

  const startReading = () => {
    setIsReading(true);
  };

  return (
    // <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8 flex justify-center">
      <main className="container m-auto max-w-screen-lg h-[30rem] flex justify-center items-center">
        <article
          aria-label="File Upload Modal"
          className="relative h-full flex flex-col bg-white shadow-xl rounded-md w-full"
          onDrop={dropHandler}
          onDragOver={dragOverHandler}
          onDragLeave={dragLeaveHandler}
          onDragEnter={dragEnterHandler}
        >
          {!selectedFile && (
            <section className="h-full overflow-auto p-8 w-full flex flex-col justify-center items-center">
              <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center w-full h-full">
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center sm:w-full w-3/4">
                  <span>Drag and drop your .epub file anywhere or </span>
                </p>
                <input
                  id="hidden-input"
                  type="file"
                  accept=".epub"
                  className="hidden"
                  onChange={fileSelectHandler}
                />
                <label
                  htmlFor="hidden-input"
                  className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none cursor-pointer"
                >
                  Upload a file
                </label>
              </header>
            </section>
          )}
          {selectedFile && !isReading && (
            <section className="flex flex-col items-center justify-center h-full px-20">
              <div className="flex sm:flew-row flex-col justify-center items-center mb-4">
                <h1 className="font-semibold sm:text-lg text-gray-800 border rounded-md  w-96 flex items-center ">
                  <div className="bg-gray-100 py-2 px-2 text-gray-700">Selected File:</div>
                  <div className="px-2 truncate w-56">{selectedFile.name}</div>
                </h1>
                <button
                  id="continue"
                  onClick={startReading}
                  className="rounded-md px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-lg focus:shadow-outline focus:outline-none   mt-5"
                >
                  Continue
                </button>
              </div>
            </section>
          )}
          {selectedFile && isReading && <Reader file={selectedFile} />}
        </article>
      </main>
    // </div>
  );
};

export default BookReader;
