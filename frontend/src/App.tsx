import React from "react";
import "./App.css";
import Carousel from './components/Carousel'
import iPhone from './assets/iphone.png'
import airPods from './assets/airpods.png'
import tablet from './assets/tablet.png'

function App() {
  return <div className="App">
      <Carousel autoPlay={true}>
        <div className="page page-iphone">
          <p className="title">xPhone</p>
          <p className="text">Lots to love. Less to spend.</p>
          <p className="text">Starting at $399.</p>
          <img src={iPhone} alt="iPhone" />
        </div>
        <div className="page page-tablet">
          <p className="title">Tablet</p>
          <p className="text">Just the right amount of everything.</p>
          <img src={tablet} alt="tablet"/>
        </div>
        <div className="page page-airpods">
          <p className="title">Buy a Tablet or xPhone for collage.</p>
          <p className="title">Get airPods</p>
          <img src={airPods} alt="airPods" />
        </div>
      </Carousel>
    </div>;
}

export default App;
