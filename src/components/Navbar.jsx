import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate=useNavigate();
  return (
    <div className="container max-w-screen-lg h-10 flex items-center justify-between px-10 rounded-lg shadow-xl bg-white text-gray-800 ">
      <button className="flex items-center"
      onClick={()=>navigate(-1)}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
      <div className="flex-grow flex items-center justify-center">
        <h1 className="text-3xl font-bold ">
          <span>eBook House</span>
        </h1>
      </div>
      <div className="w-8"> </div>
    </div>
  );
};

export default Navbar;