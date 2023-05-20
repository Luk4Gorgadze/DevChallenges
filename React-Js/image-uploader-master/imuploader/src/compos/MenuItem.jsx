import React from "react";
import { useState } from "react";
import {BsCheck} from "react-icons/bs"
const MenuItem = ({ img }) => {
  const [showPopup, setShowPopup] = useState(false);
  const copyToClipboard = () => {
    handleClick();
    navigator.clipboard
      .writeText(img)
      .then(() => {
        console.log("Image link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy image link:", error);
      });
  };

  const handleClick = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 1000);
  };

  return (
    <div className="MenuItem">
      <img className="MenuImg" src={img} onClick={copyToClipboard} alt="" />
      {showPopup && <div className="popup">Copied <BsCheck className="copied"/></div>}
      {/* <div>sheesh</div> */}
    </div>
  );
};

export default MenuItem;
