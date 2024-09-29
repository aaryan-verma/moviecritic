import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

const Header: FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="p-5 flex flex-col md:flex-row justify-between items-center bg-gray-200 w-full">
      <div>
        <h3 className="font-bold cursor-pointer text-center md:text-left" onClick={() => navigate("/")}>
          MOVIECRITIC
        </h3>
      </div>
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-4 md:mt-0">
        <div className="text-blue-600 border-[1px] bg-white border-blue-600 w-full md:w-40 text-center rounded-md">
          <button
            className="font-bold w-full p-2"
            onClick={() => navigate("/movie")}
          >
            Add new movie
          </button>
        </div>
        <div className="bg-blue-600 border-blue-600 hover:bg-blue-700 text-white w-full md:w-40 text-center border-[1px] rounded-md">
          <button
            className="text-white font-bold w-full p-2 rounded-md"
            onClick={() => navigate("/review")}
          >
            Add new review
          </button>
        </div>
      </div>

    </nav>
  );
};

export default Header;
