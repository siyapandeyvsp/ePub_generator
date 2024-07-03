// src/App.js
import { useState } from 'react';
import BookEditor from './components/BookEditor';

function App() {
  const [pages, setPages] = useState([]);

  return (
    <div className=" flex justify-center sm:items-center h-screen bg-gray-50 sm:p-8 overflow-hidden ">
      <div className="max-w-5xl mx-auto  shadow-lg rounded-lg p-6  min-w-3/4 bg-gray-100 w-full">
        <h1 className="text-2xl font-bold text-center mb-4">eBook Generator</h1>
        <BookEditor pages={pages} setPages={setPages} />
      </div>
    </div>
  );
}

export default App;
