import React, { useRef, useState } from "react";
import { FaDropbox } from "react-icons/fa";
import { storage } from "../firebase";
import {ref, uploadBytes,listAll,getDownloadURL} from "firebase/storage";
import {v4} from "uuid";


const Uploader = ({setImageLink, setLoading,setUploaded}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const wrapperRef = useRef(null);
  const onDragEnter = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.add("coverImgDragover");
  };
  const onDragLeave = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.remove("coverImgDragover");
  };
  const onDrop = (e) => {
    e.preventDefault();
    wrapperRef.current.classList.remove("coverImgDragover");

    onFileDrop(e);
  };
  const [currImage, setCurrImage] = useState(null);

  const onFileDrop = (e) => {
    const newFile = e.dataTransfer.files[0];
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes.includes(newFile.type)) {
      setCurrImage(newFile);
      console.log(newFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(newFile);
    } else {
      alert("Invalid file type. Only JPEG and PNG files are allowed.");
    }
  };

  const handleFileChange = (event) => {
    if (!event.target.files.length) return;
    const newFile = event.target.files[0];
    // Do something with the selected file
    const allowedTypes = ["image/jpeg", "image/png"];

    if (allowedTypes.includes(newFile.type)) {
      setCurrImage(newFile);
      console.log(newFile);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target.result);
      };
      reader.readAsDataURL(newFile);
    } else {
      alert("Invalid file type. Only JPEG and PNG files are allowed.");
    }
  };

  const uploadImage = () => {
    if (currImage == null) return;
    setLoading(true)
    const timestamp = Date.now(); // Get the current timestamp
    const fileName = `${timestamp}_${currImage.name+ v4()}`;
    const imageRef = ref(storage, `images/${fileName}`);
    const imageListRef = ref(storage,"images/")

    uploadBytes(imageRef,currImage).then(() => {

      listAll(imageListRef).then((Response) => {
        // Sort the items based on their timestamps in descending order
        // const sortedItems = Response.items.sort((a, b) => b.name.localeCompare(a.name));
        const im = Response.items[Response.items.length-1]
        getDownloadURL(im).then((url) => {
          setImageLink(url)
          setLoading(false)
          setUploaded(true)
        })
      })
    })

  }
   

  return (
    <div className="upload">
      <div className="header">Upload your image</div>
      <div className="manual">File should be Jpeg,Png...</div>
      <div
        className="coverImg"
        ref={wrapperRef}
        onDragEnter={onDragEnter}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={onDragLeave}
        onDrop={(e) => onDrop(e)}
      >
        {currImage && <img className="currImage" src={imageSrc} alt="eh" />}
        {!currImage && (
          <div>
            <FaDropbox className="dropbox gray" />
            <div className="manual gray">Drag & drop your image here</div>
          </div>
        )}
      </div>
      <div>Or</div>
      <form action=""></form>
      <div className="fileSection">
        <label className="label">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <span>Choose a file</span>
        </label>
        <button className="uploadBtn" onClick={uploadImage}>Upload</button>
      </div>
    </div>
  );
};

export default Uploader;
