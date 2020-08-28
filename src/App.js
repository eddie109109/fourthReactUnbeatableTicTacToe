import React from 'react';
import Footer from "./components/Footer";
import Heading from "./components/Heading";
import Body from "./components/Body";

function App() {
  return (
    <div>
      <div className = "mainWrapper">
        <Heading />
        <Body />
      </div>
      <Footer />
    </div>
  );
}

export default App;
