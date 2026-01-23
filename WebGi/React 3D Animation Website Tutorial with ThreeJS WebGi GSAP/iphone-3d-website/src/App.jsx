import { useRef } from "react";

import DisplaySection from "./components/DisplaySection";
import Jumbotron from "./components/Jumbotron";
import Nav from "./components/Nav";
import SoundSection from "./components/SoundSection";
import WebgiViewer from "./components/WebgiViewer";

function App() {
  const webgiViewerRef = useRef();
  const handlePreview = () => {
    if (webgiViewerRef.current) {
      webgiViewerRef.current.triggerPreview();
    }
  };

  return (
    <div className="App">
      <Nav />
      <Jumbotron />
      <SoundSection />
      <DisplaySection triggerPreview={handlePreview} />
      <WebgiViewer ref={webgiViewerRef} />
    </div>
  );
}

export default App;
