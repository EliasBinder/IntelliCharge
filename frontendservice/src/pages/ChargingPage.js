import gastronomy from "../images/gastronomy.svg";
import shopping from "../images/shopping.svg";
import help from "../images/help.svg";
import discover from "../images/discoverImg.png"
import activities from "../images/activitiesImg.svg"
import carBattery from "../util/carBattery.json"
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";

function ChargingPage() {
  
  const navigate = useNavigate();
  // Define a function to get the style based on the active div
 
  
  const handleClick = (path) => {
    navigate(path);
  };

  return (
    <div className="box">
      <div className="main">
        <div className="overlap">
          <div className="overlap-group">
            <div className="getting-bored">Getting bored?</div>
              <div className="container-gastronomy"  
              onClick={() => handleClick('/gastronomy')}>
            
                <div className="text-gastronomy">Gastronomy</div>
                <img
                  className="gastronomy-img"
                  alt="Gastronomy img"
                  src={gastronomy}
                />
                </div>
            <div className="container-shops"
              onClick={() => handleClick('/shops')}
            >
              <div className="text-shops">Shops</div>
              <img
                className="shopping-img"
                alt="Shopping img"
                src={shopping}
              />
            </div>
            <div className="container-discover"
              onClick={() => handleClick('/discover')}
              
            >
              <div className="text-discover">Discover</div>
              <img
                className="discover-img"
                alt="Discover img"
                src={discover}
              />
            </div>
            <div className="container-activities" onClick={() => handleClick('/activities')}
              
            >
              <div className="text-activities">Activities</div>
              <img
                className="activities-img"
                alt="Activities img"
                src={activities}
              />
            </div>
          </div>
          <div className="container-charging">
               
              <Lottie className="carbattery" animationData={carBattery} loop={true} />            
              <div className="text-h-left">00:13:00 h left</div>
              <div className="text-car-power">Power: 6.0 kWh</div>
              <div className="text-kwh">0.0121 kWh</div>
            
            <div className="text-charging">Charging...</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChargingPage;
