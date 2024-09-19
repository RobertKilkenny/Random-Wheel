import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import './App.css'
import Option from './Option.ts'
import WheelElement from './WheelElement.tsx'

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Function to generate a random color if needed
function generateRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function App() {
    const query = useQuery();
    
    // Parse the elements from the URL
    // Example: elements=F00-Test1,FF0-Test2,0F0-Test3,...
    const queryElements = query.get('elements');
    const queryCheat = query.get('cheat');

    const [elements, setElements] = useState<Option[]>([]);
    const [cheat, setCheat] = useState(-1);
    const [winner, setWinner] = useState<Option>();

    useEffect(() => {
        if (queryElements) {
            const parsedElements = queryElements.split(',').map((item) => {
                const parts = item.split('-');
                let color: string;
                let description: string;

                if (parts.length === 2) {
                    color = "#" + parts[0];
                    description = parts[1];
                } else if (parts.length === 1) {
                    color = generateRandomColor();
                    description = parts[0];
                } else {
                    color = '#000';
                    description = 'Used Invalid format';
                }
                return new Option(color, description);
            });
            setElements(parsedElements);
            if (queryCheat && queryElements.length >= Number(queryCheat)){
                setCheat(Number(queryCheat));
            }
        }
    }, [queryElements, queryCheat]);

    return (
        <div id='Website Holder' className='site-holder'>
            <div className='page-holder'>
                <span className='web-title'>Spin that Wheel!</span>
                {
                    elements.length > 0 && (
                        <WheelElement elements={elements} cheat={cheat} declareWinner={setWinner} />
                    )
                }
                {
                    winner !== undefined && (
                        <div className='done-holder'>
                            <div className='done-bar' style={{ "--clr": winner.color } as React.CSSProperties}>
                                "{winner.description}" has won!
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
}

export default App;
