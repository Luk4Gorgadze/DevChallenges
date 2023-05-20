import React from "react";
import { motion } from "framer-motion";
import { LineWobble } from "@uiball/loaders";

const Loading = () => {
  return (
    <div className="Loader">
      <div>Uploading...</div>
      <div  className="LoadDiv">
        <LineWobble className="LoadDiv" size={360} lineWeight={7} speed={1.75} color="#2f80ed" />
      </div>
    </div>
  );
};

export default Loading;
