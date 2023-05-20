import React from "react";
import { BsFillCheckCircleFill, BsGear } from "react-icons/bs";
const Success = ({ imageLink, setUploaded}) => {
  const handleCopyClick = () => {
    navigator.clipboard
      .writeText(imageLink)
      .then(() => {
        console.log("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy link:", error);
      });
  };

  return (
    <div className="UploadedPanel">
      <BsFillCheckCircleFill className="checkMark" />
      <div className="header">Uploaded Successfully!</div>
      <img className="uploadedIm" src={imageLink} alt="" />
      <div className="copyLink">
        <div className="linker">
          <input type="text" value={imageLink} className="copyText" readOnly />
          <button className="btn" onClick={handleCopyClick}>
            Copy Link
          </button>
        </div>
      </div>
      <div className="upAnother" onClick={() => setUploaded(false)}>Upload another?</div>
    </div>
  );
};

export default Success;
