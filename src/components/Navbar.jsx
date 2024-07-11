import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let title;

  if (window.location.href.includes('ebook-generator'))
    {title='eBook Generator'}
  else if (window.location.href.includes('ebook-reader')){
    title='eBook Reader';
  }
    const navigate = useNavigate();
    return (
        <div className="container max-w-screen-lg flex items-center justify-between px-12 rounded-lg py-5 rounded-b-none text-gray-800 relative bg-gray-100">
            <button className="flex items-center z-10"
                onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon={faArrowLeft} />
            </button>
            <div className="flex-grow flex items-center justify-center">
                <h1 className="text-2xl font-bold text-center  text-gray-800"> {/* Adjusted mb-4 to mb-0 */}
                   {title}
                </h1>
            </div>
            <div className="w-8"></div>
        </div>
    );
};

export default Navbar;