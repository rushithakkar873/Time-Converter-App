import React from "react";

const Button : React.FC<{children: React.ReactNode, handleClick: () => void}> = ({children, handleClick}) => {
    return (
        <button className="px-4 py-2 text-white bg-secondaryColor rounded-md drop-shadow-md hover:bg-primaryColor" onClick={handleClick}>
            {children}
        </button>
    );
};

export default Button;