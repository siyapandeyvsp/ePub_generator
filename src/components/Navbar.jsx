import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div className="container max-w-screen-lg  flex items-center justify-between px-10 rounded-lg rounded-b-none text-gray-800 relative ">
      <button className="flex items-center absolute top-8 left-6  z-10 "
      onClick={()=>navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex-grow flex items-center justify-center">
       
      </div>
      <div className="w-8"> </div>
    </div>
  );
};

export default Navbar;