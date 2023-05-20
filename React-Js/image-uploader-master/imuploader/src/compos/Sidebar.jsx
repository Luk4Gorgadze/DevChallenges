import React from "react";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { motion } from "framer-motion";
import { storage } from "../firebase";
import MenuItem from "./MenuItem";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
const variants = {
  open: { opacity: 1, left: "1%", top: "10%" },
  closed: { opacity: 0, left: "-100%", top: "10%" },
};

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState([]);

  const getImages = () => {
    const imageListRef = ref(storage, "images/");

    listAll(imageListRef).then(async (Response) => {
      const promises = Response.items.map((item) => {
        return getDownloadURL(item);
      });
      const newImages = await Promise.all(promises);
      newImages.reverse();
      setImages(newImages);
      // console.log(newImages);
    });
  };
  

  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
    getImages();
  };
  return (
    <div>
      <AiOutlineMenu className="menuBtn" onClick={handleToggle}>
        Sheesh
      </AiOutlineMenu>
      <motion.div
        className="sideBar"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
      >
        <h3>Images of other users 🤫</h3>
        {isOpen && images.map((image,i) => {
          console.log(image)
          return <MenuItem img={image} key = {i}/>;
        })}
      </motion.div>
    </div>
  );
};

export default Sidebar;
