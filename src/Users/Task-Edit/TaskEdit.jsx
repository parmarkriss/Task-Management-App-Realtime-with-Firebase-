import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase';
import { ref, get, set } from 'firebase/database';

const TaskEdit = () => {
    const { taskId } = useParams();
    const navigate = useNavigate();
    const [formdata, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        assigned_user: '',
        deadline: '',
    });

    useEffect(() => {
        const taskRef = ref(db, `tasks/${taskId}`);
        get(taskRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setFormData(snapshot.val()); // Populate form with existing task data
                } else {
                    console.log("Task not found");
                }
            })
            .catch((error) => {
                console.error("Error fetching task:", error);
            });
    }, [taskId]);

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const taskRef = ref(db, `tasks/${taskId}`);
        set(taskRef, formdata)
            .then(() => {
                console.log("Task updated successfully");
                navigate('/'); // Redirect to home page after update
            })
            .catch((error) => {
                console.error("Error updating task:", error);
            });
    };

    return (
        <div className='container-sm'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        name='title'
                        className="form-control"
                        id="title"
                        onChange={handleChange}
                        value={formdata.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        name='description'
                        className="form-control"
                        id="description"
                        rows={6}
                        onChange={handleChange}
                        value={formdata.description}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        name='status'
                        className="form-select"
                        onChange={handleChange}
                        value={formdata.status}
                    >
                        <option value="Todo">Todo</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="assigned_user" className="form-label">Assigned User</label>
                    <input
                        type="text"
                        name='assigned_user'
                        className="form-control"
                        id="assigned_user"
                        onChange={handleChange}
                        value={formdata.assigned_user}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="deadline" className="form-label">Deadline</label>
                    <input
                        type="date"
                        name='deadline'
                        className="form-control"
                        id="deadline"
                        onChange={handleChange}
                        value={formdata.deadline}
                    />
                </div>
                <button type="submit" className="btn btn-success">Update Task</button>
            </form>
        </div>
    );
};

export default TaskEdit;
