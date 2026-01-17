import { useState } from 'react'

import UserPostFilter from './component/UserPostFilter'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <UserPostFilter/>
    </>
  )
}

export default App
