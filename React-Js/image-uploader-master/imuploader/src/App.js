import "./App.css";
import Uploader from "./compos/Uploader";
import Loading from "./compos/Loading";
import Success from "./compos/Success";
import { useState } from "react";
import Footer from "./compos/Footer";
import Canvas from './compos/Canvas';
import Sidebar from "./compos/Sidebar";

const draw = context => {
  // Insert your canvas API code to draw an image
  
};
function App() {
  const [image, setImage] = useState(null);
  const [fileNames, setFileNames] = useState([]);
  const [imageLink, setImageLink] = useState("none");
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="App">
      {/* <Canvas draw={draw} height={200} width={200} /> */}
      <Sidebar/>
      <div className="container">
        {!uploaded && !loading && (
          <Uploader
            setImageLink={setImageLink}
            setLoading={setLoading}
            setUploaded={setUploaded}
          />
        )}
        {loading && <Loading />}

        {uploaded && <Success imageLink={imageLink} setUploaded={setUploaded}/>}
      </div>

      <Footer />
    </div>
  );
}

export default App;
