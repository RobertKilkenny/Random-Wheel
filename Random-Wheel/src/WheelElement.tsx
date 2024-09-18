import React, { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
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
    const [isDone, setIsDone] = useState(false);
    const [doneElement, setDoneElement] = useState<ReactElement>()
    const wheelAngle = 360 / (elements.length);
    if(cheat == -1){
      cheat = Math.round(Math.random() * (elements.length - 1)) + 1;
    }

    useEffect(() => {
        const timer = setTimeout(() => {
          const randRotatCount = Math.ceil(Math.random() * 15) + 10;
          const shift = Math.floor(Math.random() * wheelAngle * 11 / 12 + wheelAngle / 24);
          const newRotation = Math.ceil((cheat - 2) * wheelAngle + randRotatCount * 360 + shift);
          setRotation(newRotation);
          console.log(`Element ${cheat} has won\n\nList:`);
          for(let i = 0; i < elements.length; i++){
            console.log(`\n${i+1}. ${elements[i].description} -> color: ${elements[i].color}`)
          }
          console.log
          const doneTimer = setTimeout(() => {
            setIsDone(true);
          }, 4000);
          setDoneElement(
            <div className='done-holder'>
              <div className='done-bar' style={{ '--clr': `${elements[cheat - 1].color}` } as React.CSSProperties}>
                {elements[cheat - 1].description}
              </div>
            </div>
            );
        return () => clearTimeout(doneTimer);
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
        {isDone && doneElement}
    </>

    )
  }
  
  export default WheelElement