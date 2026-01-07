import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import TaskForm from './components/TaskForm'
import TaskTable from './components/TaskTable'
import TaskRow from './components/TaskRow'
import EditTask from './components/EditTask'

const App = () => {
  return (
  <>
  <Router>
    <Routes>
     
    <Route path='/' element={<TaskForm/>}/>
    <Route  path='/tasktable' element={<TaskTable/>}/>
    <Route  path='/tasktedit/:id' element={<EditTask/>}/>

    <Route path='/taskrow/:id' element={<TaskRow/>}/>
    </Routes>
  </Router>
  </>
  )
}

export default App
