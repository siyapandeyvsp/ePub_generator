// src/components/Page.js
import React from 'react';

function Page({ content, index }) {
  return (
    <div className="border p-4 rounded ">
      <h2 className="text-xl font-bold mb-2">Page {index + 1}</h2>
      <p>{content}</p>
    </div>
  );
}

export default Page;
