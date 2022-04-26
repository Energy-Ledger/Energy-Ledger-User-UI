import React from 'react';
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Spinner = () => {
  const style = { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" };
  return (
    <div style={style} className="w-full h-full bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
        <Loader type="Oval" color="#ffffff" height={35} width={35}  />        
    </div>
  )
}

export default Spinner
