import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const EditTask = () => {
  const { id } = useParams(); // Get task ID from URL
  const navigate = useNavigate();
  const [task, setTask] = useState({
    taskTitle: '',
    taskDescription: '',
    taskStatus: '',
    priority: '',
    dueDate: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Fetch task data on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/${id}`);
        setTask(response.data);
      } catch (err) {
        setError('Failed to load task');
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(`http://localhost:3000/tasks/${id}`, task);
      setSuccess('Task updated successfully!');
      setTimeout(() => navigate('/'), 1500); // Redirect after success
    } catch (err) {
      setError('Failed to update task');
    }
  };

  if (loading) return <div className="container mt-5"><h3>Loading...</h3></div>;

  return (
    <Container className="mt-5">
      <h2>Edit Task</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Task Title</Form.Label>
          <Form.Control
            type="text"
            name="taskTitle"
            value={task.taskTitle}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Task Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="taskDescription"
            value={task.taskDescription}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Task Status</Form.Label>
          <Form.Select
            name="taskStatus"
            value={task.taskStatus}
            onChange={handleChange}
          >
            <option value="">Select Status</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Priority</Form.Label>
          <Form.Select
            name="priority"
            value={task.priority}
            onChange={handleChange}
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            name="dueDate"
            value={task.dueDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="me-2">
          Update Task
        </Button>
        <Button variant="secondary" onClick={() => navigate('/')}>
          Cancel
        </Button>
      </Form>
    </Container>
  );
};

export default EditTask;
