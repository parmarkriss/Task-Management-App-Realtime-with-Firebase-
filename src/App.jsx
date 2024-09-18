import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Register/Register'
import Layout from './Components/Layout'
import Login from './Login/Login'
import Home from './Users/Home'
import TaskCreate from './Users/Task-Create/TaskCreate'
import TaskEdit from './Users/Task-Edit/TaskEdit'
function App() {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout/>}>
          <Route path='/' element={<Home/>}> </Route>
          <Route path='/task-create' element={<TaskCreate/>}></Route>
          <Route path='/tasks/:taskId/edit' element={<TaskEdit />} />
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
