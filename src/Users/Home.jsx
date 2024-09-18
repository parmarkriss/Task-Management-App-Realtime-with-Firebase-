import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from './TaskCard';
import { db } from '../../firebase';
import { get, ref, remove } from 'firebase/database';

const Home = () => {
    const [tasklist, setTaskList] = useState({
        todo: {},
        in_progress: {},
        done: {},
    });
    const [users, setUsers] = useState({});
    const [usersLoaded, setUsersLoaded] = useState(false); // Flag to ensure users are loaded

    const getTaskList = () => {
        const taskRef = ref(db, 'tasks');
        get(taskRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const filter_data = {
                        todo: {},
                        in_progress: {},
                        done: {}
                    };
                    Object.keys(data).forEach(key => {
                        const item = data[key];
                        filter_data[item.status.toLowerCase().replace(' ', '_')][key] = {
                            ...item,
                            key,
                            assigned_user_name: users[item.assigned_user]?.email || 'Unknown', // Use email
                        };
                    });
                    setTaskList(filter_data);
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching tasks:", error);
            });
    };

    const getUserList = () => {
        const userRef = ref(db, 'users');
        get(userRef)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    const usersData = {};
                    Object.keys(data).forEach(key => {
                        usersData[key] = { email: data[key].email || 'Unknown' }; // Map user ID to email
                    });
                    setUsers(usersData);
                    setUsersLoaded(true); // Set flag when users are loaded
                } else {
                    console.log("No data available");
                }
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    };

    const handleDelete = (taskId) => {
        const taskRef = ref(db, `tasks/${taskId}`);
        remove(taskRef)
            .then(() => {
                console.log("Task deleted successfully");
                getTaskList(); // Refresh task list after deletion
            })
            .catch((error) => {
                console.error("Error deleting task:", error);
            });
    };

    useEffect(() => {
        getUserList();
    }, []);

    useEffect(() => {
        if (usersLoaded) {
            getTaskList();
        }
    }, [usersLoaded]);

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-3 mb-3">
                    <div className="bg-primary text-white px-3 py-2 rounded">Todo</div>
                    <div>
                        {Object.keys(tasklist["todo"]).map(key => (
                            <TaskCard key={key} props={tasklist["todo"][key]} handleDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="bg-warning text-white px-3 py-2 rounded">In Progress</div>
                    <div>
                        {Object.keys(tasklist["in_progress"]).map(key => (
                            <TaskCard key={key} props={tasklist["in_progress"][key]} handleDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <div className="bg-success text-white px-3 py-2 rounded">Done</div>
                    <div>
                        {Object.keys(tasklist["done"]).map(key => (
                            <TaskCard key={key} props={tasklist["done"][key]} handleDelete={handleDelete} />
                        ))}
                    </div>
                </div>
                <div className="col-md-3 mb-3">
                    <Link className='btn btn-dark' to={'/task-create'}>Add New Task</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
