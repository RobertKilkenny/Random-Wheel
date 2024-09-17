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
}

const WheelElement: React.FC<WheelElementProps> = ({ elements }) => {
    const [rotation, setRotation] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => {
            const newRotation = Math.ceil(Math.random() * 3600);
            setRotation(newRotation);
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
                '--deg': (360 / (elements.length)).toString() + "deg",
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
        <div className="wheel" style={{ transform: `rotate(${rotation}deg)` }}>
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