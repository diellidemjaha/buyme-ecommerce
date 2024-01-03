import { useState } from 'react'
import HelloWorld from './HelloWorld';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<HelloWorld />
    </>
  )
}

export default App
