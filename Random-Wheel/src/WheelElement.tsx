import React, { useEffect, useState } from 'react';
import './WheelElement.css'
import Option from "./Option.ts"

const clipReference = new Map<number, string>([
    [4, "99%"],
    [5, "83%"],
    [6, "72%"],
    [7, "64%"],
    [8, "58%"],
    [9, "53%"],
    [10, "48.5%"],
    [11, "44.75%"],
    [12, "41.75%"],
]);

interface WheelElementProps {
    elements: Option[];
    cheat: number;
}

const WheelElement: React.FC<WheelElementProps> = ({ elements, cheat = -1 }) => {
    const [rotation, setRotation] = useState(0);
    const wheelAngle = 360 / (elements.length);

    useEffect(() => {
        const timer = setTimeout(() => {
          if(cheat == -1){
            cheat = Math.round(Math.random() * (elements.length - 1)) + 1;
          }
          const randRotatCount = Math.ceil(Math.random() * 15) + 10;
          const shift = Math.floor(Math.random() * wheelAngle * 11 / 12 + wheelAngle / 24);
          const newRotation = Math.ceil((cheat - 2) * wheelAngle + randRotatCount * 360 + shift);
          setRotation(newRotation);
          console.log(`Element ${cheat} was chosen.\ntotal: ${newRotation}`);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const list = (
        <>
          {
          
          elements.map((element, index) => (
            <div
              key={index}
              className="element"
              style={{ '--i': index.toString(),
                '--clr': element.color,
                '--deg': wheelAngle.toString() + "deg",
                '--clip': clipReference.get(elements.length)} as React.CSSProperties}
            >
              <span>
                {element.description}
              </span>
            </div>
          ))}
        </>
      );
    return (<>
        <div className="wheel" style={{ transform: `rotate(${-rotation}deg)` }}>
            {list}
        </div>
        <div className='dial-holder'>
            <div className='dial' />
            <div className='pointer' />
        </div>
    </>

    )
  }
  
  export default WheelElement