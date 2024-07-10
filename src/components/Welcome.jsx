import { useNavigate } from "react-router-dom";
const Welcome = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <div className="bg-gray-900 sm:h-96 h-full flex items-center justify-center px-20 rounded-3xl shadow-xl shadow-gray-500/40 hover:shadow-gray-900/40 hover:shadow-3xl ">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold">
            Welcome to <span className="animate-pulse">eBook House</span>
          </h1>
          <p className="mt-4 text-xl">Select any one option</p>

          <div className="flex   items-center justify-center  gap-10 mt-10 ">
            <button
            
            
                onClick={()=>
                        setTimeout(()=>{
                            navigate('/ebook-generator')
                        },500)
                        }
              className="button w-40 h-16 bg-yellow-500 rounded-lg cursor-pointer select-none
    active:translate-y-2 active:[box-shadow:0_0px_0_0_#cda434,0_0px_0_0_#fde04741]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#f59e0b,0_15px_0_0_#fde04741]
    border-b-[1px] border-yellow-400
  "
            >
              <span className="flex flex-col justify-center items-center h-full text-gray-900 text-lg ">
                eBook Generator
              </span>
            </button>
            <button
                        onClick={()=>
                        setTimeout(()=>{
                            navigate('/ebook-reader')
                        },500)
                        }

              className="button w-40 h-16 bg-yellow-500 rounded-lg cursor-pointer select-none
    active:translate-y-2 active:[box-shadow:0_0px_0_0_#cda434,0_0px_0_0_#fde04741]
    active:border-b-[0px]
    transition-all duration-150 [box-shadow:0_10px_0_0_#f59e0b,0_15px_0_0_#fde04741]
    border-b-[1px] border-yellow-400
  "
            >
              <span className="flex flex-col justify-center items-center h-full text-gray-900 text-lg ">
                eBook Reader
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
