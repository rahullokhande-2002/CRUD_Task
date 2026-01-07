import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const TaskForm = () => {
  const [data, setdata] = useState({ taskTitle: "", taskDescription: "", taskStatus: "", priority: "", dueDate: "" })

   const nav = useNavigate()

  const dataHandler = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value })
    console.log(data)
  }

  const Submitdata = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(`http://localhost:3000/tasks`, data)
      setdata(result.data)
      setdata({ taskTitle: "", taskDescription: "", taskStatus: "", priority: "", dueDate: "" });
      nav('/tasktable')
    } catch (err) {
      console.log(err)
    }

    setdata({ taskTitle: "", taskDescription: "", taskStatus: "", priority: "", dueDate: "" })
  }
  return (
    <>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h4 className="mb-0">Add New Task</h4>
              </div>
              <div className="card-body p-4">
                <form id="taskForm" onSubmit={(e) => Submitdata(e)}>
                  <div className="mb-3">
                    <label htmlFor="taskTitle" className="form-label">Task Title</label>
                    <input type="text" className="form-control" id="taskTitle" name="taskTitle" value={data.taskTitle} onChange={(e) => dataHandler(e)} required />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="taskDescription" className="form-label">Task Description</label>
                    <textarea className="form-control" id="taskDescription" name="taskDescription" value={data.taskDescription} rows="3" onChange={(e) => dataHandler(e)} required></textarea>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="taskStatus" className="form-label">Status</label>
                    <select className="form-select" id="taskStatus" name="taskStatus" value={data.taskStatus} onChange={(e) => dataHandler(e)} required>
                      <option value="">Select Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Complete">Complete</option>
                      <option value="In Progress">In Progress</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="priority" className="form-label">Priority</label>
                    <select className="form-select" id="priority" name="priority" value={data.priority} onChange={(e) => dataHandler(e)} required>
                      <option value="">Select Priority</option>
                      <option value="High">High</option>
                      <option value="Medium">Medium</option>
                      <option value="Low">Low</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="dueDate" className="form-label">Due Date</label>
                    <input type="date" className="form-control" id="dueDate" name="dueDate" value={data.dueDate} onChange={(e) => dataHandler(e)} required />
                  </div>

                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Save Task</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  )
}

export default TaskForm
