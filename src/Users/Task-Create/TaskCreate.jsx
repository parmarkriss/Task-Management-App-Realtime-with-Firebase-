import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { get, ref, set } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';

const TaskCreate = () => {
    const navigate = useNavigate();
    const [userlist, setUserList] = useState([]);
    const [formdata, setFormData] = useState({
        title: '',
        description: '',
        status: '',
        assigned_user: '',
        deadline: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formdata, [e.target.name]: e.target.value });
    };

    const getUserList = () => {
        const userRef = ref(db, 'users'); 
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const userList = Object.keys(data).map((key) => ({ id: key, ...data[key] }));
                    setUserList(userList.filter((user) => user.email !== null && user.email !== undefined)); 
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 

        const taskId = uuidv4(); 
        set(ref(db, 'tasks/' + taskId), formdata)
            .then(() => {
                console.log("Task added to database");
                setFormData({ 
                    title: '',
                    description: '',
                    status: '',
                    assigned_user: '',
                    deadline: '',
                });
            })
            .catch((dbError) => {
                console.error("Error adding task to database:", dbError);
            });
            navigate('/');
    };

    useEffect(() => {
        getUserList();
    }, []);

    return (
        <div className='container-sm'>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                    <input
                        type="text"
                        name='title'
                        className="form-control"
                        id="exampleInputtitle1"
                        onChange={handleChange}
                        value={formdata.title}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <textarea
                        name='description'
                        className="form-control"
                        id="exampleInputDescription1"
                        rows={6}
                        onChange={handleChange}
                        value={formdata.description}
                    />
                </div>

                <div className='d-flex'>
                    <div className="col-4 me-3 mb-3">
                        <label htmlFor="status" className='form-label'>Select Status</label>
                        <select
                            name='status'
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleChange}
                            value={formdata.status}
                        >
                            <option value="">Select Status</option>
                            <option value="Todo">Todo</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Done">Done</option>
                        </select>
                    </div>

                    <div className="col-4 me-3 mb-3">
                        <label htmlFor="assigned_user" className='form-label'>Assigned User</label>
                        <select
                            name='assigned_user'
                            className="form-select"
                            aria-label="Default select example"
                            onChange={handleChange}
                            value={formdata.assigned_user}
                        >
                            <option value="">Select User</option>
                            {userlist.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {`${item.username || item.name} <${item.email}>`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="col-4 me-3 mb-3">
                        <label htmlFor="deadline" className='form-label'>Deadline </label>
                        <input
                            type="date"
                            onChange={handleChange}
                            className='form-control'
                            name='deadline'
                            id='deadline'
                            value={formdata.deadline}
                            min={new Date().toISOString().split("T")[0]}
                        />
                    </div>
                </div>

                <button type="submit" className="btn btn-success">Create New Task</button>
            </form>
        </div>
    );
};

export default TaskCreate;
