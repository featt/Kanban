import { Container } from '@chakra-ui/react'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Main from './components/Main'
import Register from './components/Register'


function App() {
  useEffect(() => {
    !localStorage.getItem('accessToken') && <Navigate to='/login'/>
  }, [])

  return (
    <Container display='flex' minW='100%' h='100vh' bg='black' px='0'> 

      <Routes>             
        <Route path='/register' element={<Register/>} />      
        <Route path='/login' exact  element={<Login/>} />  
        <Route path='/' element={<Main/>} />      
      </Routes>      
      
    </Container>
  )
}

export default App
