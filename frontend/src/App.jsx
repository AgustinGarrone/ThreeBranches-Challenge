import { ChakraProvider } from '@chakra-ui/react'
import './App.css'
import { Home } from './pages/Home'

function App() {

  return (
    <ChakraProvider>
        <Home></Home>
    </ChakraProvider>
  )
}

export default App
