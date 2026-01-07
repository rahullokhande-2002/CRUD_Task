import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const TaskTable = () => {
    const [data, setData] = useState([]); 

    const fetchInfo = async () => {
        try {
            const result = await axios.get('http://localhost:3000/tasks');
            setData(result.data);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchInfo();
    }, []); 

    const dataDelete = async (id) => {
        try {
            setData(prev => prev.filter((val) => val.id !== id));
            await axios.delete(`http://localhost:3000/tasks/${id}`);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
            <div className="container mt-4">
                <h2>Tasks</h2>
                <div className="table-responsive">
                    <table className="table table-striped table-hover">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Task Title</th>
                                <th>Task Description</th>
                                <th>Task Status</th>
                                <th>Priority</th>
                                <th>Due Date</th>
                                <th>Actions</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((val) => (
                                <tr key={val.id}>
                                    <td>{val.id}</td>
                                    <td>{val.taskTitle}</td>
                                    <td>{val.taskDescription}</td>
                                    <td>
                                        <span className="badge bg-info">{val.taskStatus}</span>
                                    </td>
                                    <td>
                                        <span className="badge bg-warning">{val.priority}</span>
                                    </td>
                                    <td>{val.dueDate}</td>
                                    <td>
                                        <Link to={`/tasktedit/${val.id}`} className="btn btn-sm btn-outline-primary me-2">
                                            <i className="fas fa-edit me-1"></i>Edit
                                        </Link>
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => window.confirm("Are You Sure?") && dataDelete(val.id)}
                                        >
                                            <i className="fas fa-trash me-1"></i>Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TaskTable;
