import { useState } from 'react'
import './App.css'
import Option from './Option.ts'
import WheelElement from './WheelElement.tsx'

function App() {
    const elements = [new Option("#F00", "Test 1"),
        // new Option("#FF0", "Test 2"),
        // new Option("#0F0", "Test 3"),
        // new Option("#62F", "Test 4"),
        // new Option("#909", "Test 5"),
        // new Option("#700", "Test 6"),
        // new Option("#007", "Test 7"),
        // new Option("#F0F", "Test 8"),
        // new Option("#770", "Test 9"),
        new Option("#707", "Test 10"),
        new Option("#077", "Test 11"),
        new Option("#AAF", "Test 12")
    ]

    const [winner, setWinner] = useState<Option>();

    return (
    <div id='Website Holder' className='site-holder'>
        <div className='page-holder'>
                <span className='web-title'>Spin that Wheel!</span>
                <WheelElement elements={elements} cheat={-1} declareWinner={setWinner}/>
            {
                winner !== undefined && <div className='done-holder'>
                    <div className='done-bar' style={{"--clr": winner.color} as React.CSSProperties}>
                        "{winner.description}" has won!
                    </div>
                </div>
            }
        </div>
    </div>
    )
}

export default App
