import './App.css'
import Option from './Option.ts'
import WheelElement from './WheelElement.tsx'

function App() {
  const elements = [new Option("#F00", "Test 1"),
    new Option("#FF0", "Test 2"),
    new Option("#0F0", "Test 3"),
    new Option("#62F", "Test 4")
  ]
  return (
    <div id='Website Holder' className='site-holder'>
      <div className='page-holder'>
        <h2>Spin That Wheel!</h2>
          <WheelElement elements={elements}/>
      </div>
    </div>
  )
}

export default App
