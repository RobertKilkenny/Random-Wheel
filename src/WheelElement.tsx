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
    declareWinner: (winner: Option) => void;
}

const WheelElement: React.FC<WheelElementProps> = ({ elements, cheat = -1, declareWinner }) => {
    const [rotation, setRotation] = useState(0);
    const length = elements.length;
    const wheelAngle = 360 / (length);
    if(cheat == -1){
      cheat = Math.round(Math.random() * (length - 1)) + 1;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          const randRotatCount = Math.ceil(Math.random() * 15) + 10;
          const shift = Math.floor(Math.random() * wheelAngle * 14 / 15 + wheelAngle / 30);
          const driftFix = length != 4 ? (length - 4) / 8 * wheelAngle : 0;
          const newRotation = Math.ceil((cheat - 2) * wheelAngle - driftFix + randRotatCount * 360 + shift);
          setRotation(newRotation);
          console.log(`Element ${cheat} has won\nShift: ${shift}\nAngle: ${wheelAngle}\n\nList:`);
          for(let i = 0; i < length; i++){
            console.log(`\n${i+1}. ${elements[i].description} -> color: ${elements[i].color}`)
          }
          console.log
          const doneTimer = setTimeout(() => {
            declareWinner(elements[cheat - 1]);
          }, 5000);
        return () => clearTimeout(doneTimer);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    const list = (
        <>
          {
          
          elements.map((element, index) => (
            <div key={index}>
              <div
                className="element"
                style={{ '--i': index.toString(),
                  '--clr': element.color,
                  '--deg': wheelAngle.toString() + "deg",
                  '--clip': clipReference.get(length) ? clipReference.get(length) : "100%"
                } as React.CSSProperties}
              >
                <span>
                  {element.description}
                </span>
              </div>
              {(length < 4) && <div className='fix-holder'>
                  <div className='left-fix'>

                  </div>
                  <div className='right-fix'>

                  </div>
                </div>}
            </div>
          ))}
        </>
      );

    return (
      <div className='wheel-holder'>
        <div className="wheel" style={{ transform: `rotate(${-rotation}deg)` }}>
            {list}
        </div>
        <div className='dial-holder'>
            <div className='dial' />
        </div>
      </div>

    )
  }
  
  export default WheelElement