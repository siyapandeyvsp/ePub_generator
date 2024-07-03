// src/App.js
import React, { useState } from 'react';
import BookEditor from './components/BookEditor';

function App() {
  const [pages, setPages] = useState([]);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">eBook Generator</h1>
        <BookEditor pages={pages} setPages={setPages} />
      </div>
    </div>
  );
}

export default App;
