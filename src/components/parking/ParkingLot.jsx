import React, { useEffect, useState } from "react";
import { Stage, Layer, Rect } from "react-konva";
import { fetchParkingLot, updateParkingLot } from "../../api/api";

const ParkingLot = () => {
  const [floor, setFloor] = useState(1);
  const [parkingLot, setParkingLot] = useState(null);

  useEffect(() => {
    fetchParkingLot(floor).then((res) => setParkingLot(res.data[0]));
    console.log("Fetching parking lot data for floor:", floor);
  }, [floor]);

  return (
    <div>
      <h3>Select Floor</h3>
      <select value={floor} onChange={(e) => setFloor(e.target.value)}>
        <option value={1}>Floor 1</option>
        <option value={2}>Floor 2</option>
        <option value={3}>Floor 3</option>
      </select>
      
      {/* {parkingLot && (
        <Stage width={1000} height={600}>
          <Layer>
            {parkingLot.slots.map((slot, index) => (
              <Rect key={index} x={slot.x} y={slot.y} width={slot.width} height={slot.height} strokeWidth={1} stroke="red" fill="#E2E6EA" draggable />
            ))}
          </Layer>
        </Stage>
      )} */}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
  <rect width="800" height="400" fill="white"/>
  
  <rect x="20" y="20" width="760" height="360" fill="none" stroke="black" stroke-width="1.5"/>
  
  <g stroke="black" stroke-width="1">
    <line x1="60" y1="20" x2="60" y2="80" />
    <line x1="90" y1="20" x2="90" y2="80" />
    <line x1="120" y1="20" x2="120" y2="80" />
    <line x1="150" y1="20" x2="150" y2="80" />
    <line x1="180" y1="20" x2="180" y2="80" />
    <line x1="210" y1="20" x2="210" y2="80" />
    <line x1="240" y1="20" x2="240" y2="80" />
    <line x1="270" y1="20" x2="270" y2="80" />
    <line x1="300" y1="20" x2="300" y2="80" />
    <line x1="330" y1="20" x2="330" y2="80" />
    <line x1="360" y1="20" x2="360" y2="80" />
    <line x1="390" y1="20" x2="390" y2="80" />
    <line x1="420" y1="20" x2="420" y2="80" />
    <line x1="450" y1="20" x2="450" y2="80" />
    <line x1="480" y1="20" x2="480" y2="80" />
    <line x1="510" y1="20" x2="510" y2="80" />
    <line x1="540" y1="20" x2="540" y2="80" />
    <line x1="570" y1="20" x2="570" y2="80" />
    <line x1="600" y1="20" x2="600" y2="80" />
    <line x1="630" y1="20" x2="630" y2="80" />
    <line x1="660" y1="20" x2="660" y2="80" />
    <line x1="690" y1="20" x2="690" y2="80" />
    <line x1="720" y1="20" x2="720" y2="80" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <line x1="150" y1="160" x2="150" y2="240" />
    <line x1="180" y1="160" x2="180" y2="240" />
    <line x1="210" y1="160" x2="210" y2="240" />
    <line x1="240" y1="160" x2="240" y2="240" />
    <line x1="270" y1="160" x2="270" y2="240" />
    <line x1="300" y1="160" x2="300" y2="240" />
    <line x1="330" y1="160" x2="330" y2="240" />
    <line x1="360" y1="160" x2="360" y2="240" />
    <line x1="390" y1="160" x2="390" y2="240" />
    <line x1="420" y1="160" x2="420" y2="240" />
    <line x1="450" y1="160" x2="450" y2="240" />
    <line x1="480" y1="160" x2="480" y2="240" />
    <line x1="510" y1="160" x2="510" y2="240" />
    <line x1="540" y1="160" x2="540" y2="240" />
    <line x1="570" y1="160" x2="570" y2="240" />
    <line x1="600" y1="160" x2="600" y2="240" />
    <line x1="630" y1="160" x2="630" y2="240" />
    
    <line x1="150" y1="200" x2="650" y2="200" stroke-width="1.5"/>
  </g>
  
  <g stroke="black" stroke-width="1">
    <line x1="60" y1="320" x2="60" y2="380" />
    <line x1="90" y1="320" x2="90" y2="380" />
    <line x1="120" y1="320" x2="120" y2="380" />
    <line x1="150" y1="320" x2="150" y2="380" />
    <line x1="180" y1="320" x2="180" y2="380" />
    <line x1="210" y1="320" x2="210" y2="380" />
    <line x1="240" y1="320" x2="240" y2="380" />
    <line x1="270" y1="320" x2="270" y2="380" />
    <line x1="300" y1="320" x2="300" y2="380" />
    <line x1="330" y1="320" x2="330" y2="380" />
    <line x1="360" y1="320" x2="360" y2="380" />
    <line x1="390" y1="320" x2="390" y2="380" />
    <line x1="420" y1="320" x2="420" y2="380" />
    <line x1="450" y1="320" x2="450" y2="380" />
    <line x1="480" y1="320" x2="480" y2="380" />
    <line x1="510" y1="320" x2="510" y2="380" />
    <line x1="540" y1="320" x2="540" y2="380" />
    <line x1="570" y1="320" x2="570" y2="380" />
    <line x1="600" y1="320" x2="600" y2="380" />
    <line x1="630" y1="320" x2="630" y2="380" />
    <line x1="660" y1="320" x2="660" y2="380" />
    <line x1="690" y1="320" x2="690" y2="380" />
    <line x1="720" y1="320" x2="720" y2="380" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <line x1="20" y1="120" x2="80" y2="120" />
    <line x1="20" y1="150" x2="80" y2="150" />
    <line x1="20" y1="180" x2="80" y2="180" />
    <line x1="20" y1="210" x2="80" y2="210" />
    <line x1="20" y1="240" x2="80" y2="240" />
    <line x1="20" y1="270" x2="80" y2="270" />
    <line x1="20" y1="300" x2="80" y2="300" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <line x1="720" y1="120" x2="780" y2="120" />
    <line x1="720" y1="150" x2="780" y2="150" />
    <line x1="720" y1="180" x2="780" y2="180" />
    <line x1="720" y1="210" x2="780" y2="210" />
    <line x1="720" y1="240" x2="780" y2="240" />
    <line x1="720" y1="270" x2="780" y2="270" />
    <line x1="720" y1="300" x2="780" y2="300" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="20" y="20" width="40" height="60" fill="none" stroke="black" />
    <path d="M 20,20 L 60,60" />
    <path d="M 20,30 L 60,70" />
    <path d="M 20,40 L 60,80" />
    <path d="M 20,50 L 50,80" />
    <path d="M 20,60 L 40,80" />
    <path d="M 20,70 L 30,80" />
    <path d="M 30,20 L 60,50" />
    <path d="M 40,20 L 60,40" />
    <path d="M 50,20 L 60,30" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="740" y="20" width="40" height="60" fill="none" stroke="black" />
    <path d="M 740,80 L 780,40" />
    <path d="M 740,70 L 780,30" />
    <path d="M 740,60 L 780,20" />
    <path d="M 740,50 L 770,20" />
    <path d="M 740,40 L 760,20" />
    <path d="M 740,30 L 750,20" />
    <path d="M 750,80 L 780,50" />
    <path d="M 760,80 L 780,60" />
    <path d="M 770,80 L 780,70" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="20" y="320" width="40" height="60" fill="none" stroke="black" />
    <path d="M 20,320 L 60,360" />
    <path d="M 20,330 L 60,370" />
    <path d="M 20,340 L 60,380" />
    <path d="M 20,350 L 50,380" />
    <path d="M 20,360 L 40,380" />
    <path d="M 20,370 L 30,380" />
    <path d="M 30,320 L 60,350" />
    <path d="M 40,320 L 60,340" />
    <path d="M 50,320 L 60,330" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="740" y="320" width="40" height="60" fill="none" stroke="black" />
    <path d="M 740,380 L 780,340" />
    <path d="M 740,370 L 780,330" />
    <path d="M 740,360 L 780,320" />
    <path d="M 740,350 L 770,320" />
    <path d="M 740,340 L 760,320" />
    <path d="M 740,330 L 750,320" />
    <path d="M 750,380 L 780,350" />
    <path d="M 760,380 L 780,360" />
    <path d="M 770,380 L 780,370" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="150" y="160" width="40" height="40" fill="none" stroke="black" />
    <path d="M 150,160 L 190,200" />
    <path d="M 150,170 L 180,200" />
    <path d="M 150,180 L 170,200" />
    <path d="M 150,190 L 160,200" />
    <path d="M 160,160 L 190,190" />
    <path d="M 170,160 L 190,180" />
    <path d="M 180,160 L 190,170" />
  </g>
  
  <g stroke="black" stroke-width="1">
    <rect x="650" y="160" width="40" height="40" fill="none" stroke="black" />
    <path d="M 650,200 L 690,160" />
    <path d="M 660,200 L 690,170" />
    <path d="M 670,200 L 690,180" />
    <path d="M 680,200 L 690,190" />
    <path d="M 650,190 L 680,160" />
    <path d="M 650,180 L 670,160" />
    <path d="M 650,170 L 660,160" />
  </g>
  
  <g stroke="black" fill="none">
    <polygon points="400,100 395,95 405,95" fill="black" />
    <line x1="400" y1="95" x2="400" y2="105" />
    
    <polygon points="400,130 395,135 405,135" fill="black" />
    <line x1="400" y1="135" x2="400" y2="125" />
    
    <polygon points="120,200 125,195 125,205" fill="black" />
    <line x1="125" y1="200" x2="115" y2="200" />
    
    <polygon points="680,200 675,195 675,205" fill="black" />
    <line x1="675" y1="200" x2="685" y2="200" />
    
    <polygon points="400,300 395,305 405,305" fill="black" />
    <line x1="400" y1="305" x2="400" y2="295" />
  </g>
  
  <text x="400" y="280" font-family="Arial" font-size="12" text-anchor="middle">PARKING RAMP @ 6.08%</text>
  
  <g font-family="Arial" font-size="12" text-anchor="middle">
    <circle cx="630" cy="50" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="630" y="54">27</text>
    
    <circle cx="630" cy="180" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="630" y="184">21</text>
    
    <circle cx="630" cy="220" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="630" y="224">21</text>
    
    <circle cx="630" cy="350" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="630" y="354">27</text>
    
    <circle cx="50" cy="270" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="50" y="274">9</text>
    
    <circle cx="750" cy="270" r="12" fill="white" stroke="black" stroke-width="1" />
    <text x="750" y="274">9</text>
  </g>
  
  <g stroke="black" stroke-width="1" fill="none">
    <rect x="20" y="20" width="40" height="60" />
    <rect x="25" y="25" width="30" height="50" />
    <line x1="25" y1="35" x2="55" y2="35" />
    <line x1="25" y1="45" x2="55" y2="45" />
    <line x1="25" y1="55" x2="55" y2="55" />
    <line x1="25" y1="65" x2="55" y2="65" />
    
    <rect x="740" y="320" width="40" height="60" />
    <rect x="745" y="325" width="30" height="50" />
    <line x1="745" y1="335" x2="775" y2="335" />
    <line x1="745" y1="345" x2="775" y2="345" />
    <line x1="745" y1="355" x2="775" y2="355" />
    <line x1="745" y1="365" x2="775" y2="365" />
  </g>
</svg>
    </div>
  );
};

export default ParkingLot;
