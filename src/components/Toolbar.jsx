import { faBold, faHighlighter, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

const Toolbar = ({ applyFormat }) => {
  return (
    <div className='flex space-x-2 mb-4'>
    <button 
    className='px-4 py-2 bg-gray-200 text-black rounded'
    onClick={()=>applyFormat('bold')}
    >
        <FontAwesomeIcon icon={faBold}/>
    </button>
    <button
        className="px-4 py-2 bg-gray-200 text-black rounded"
        onClick={() => applyFormat('italic')}
      >
        <FontAwesomeIcon icon={faItalic} />
      </button>
      <button
        className="px-4 py-2 bg-gray-200 text-black rounded"
        onClick={() => applyFormat('underline')}
      >
        <FontAwesomeIcon icon={faUnderline} />
      </button>
      <button
        className="px-4 py-2 bg-gray-200 text-black rounded"
        onClick={() => applyFormat('highlight')}
      >
        <FontAwesomeIcon icon={faHighlighter} />
      </button>
    </div>
  )
}

export default Toolbar
