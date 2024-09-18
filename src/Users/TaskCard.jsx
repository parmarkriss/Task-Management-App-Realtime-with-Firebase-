import React from 'react';
import { Link } from 'react-router-dom';

const TaskCard = ({ props, handleDelete }) => {
    const { key, title, status, description, assigned_user_name, deadline } = props;

    return (
        <div className="task-card-container bg-white p-3 mb-4 shadow rounded mt-3">
            <div className="task-card-header d-flex justify-content-between align-items-center">
                <h5 className="task-title mb-0">{title}</h5>
                <span className={`badge bg-${status === 'Done' ? 'success' : status === 'In Progress' ? 'warning' : 'secondary'}`}>
                    {status}
                </span>
            </div>
            <div className="task-card-body mt-3">
                <p className="text-muted mb-1">
                    <strong>Description:</strong> {description}
                </p>
                <p className="text-muted mb-1">
                    <strong>Assigned to:</strong> {assigned_user_name}
                </p>
                <p className="text-muted">
                    <strong>Deadline:</strong> {deadline}
                </p>
            </div>
            <div className="task-card-footer d-flex justify-content-between mt-4">
                <Link to={`/tasks/${key}/edit`} className="btn btn-outline-primary btn-sm">
                    Edit Task
                </Link>
                <button className="btn btn-outline-danger btn-sm" onClick={() => handleDelete(key)}>
                    Delete Task
                </button>
            </div>
        </div>
    );
};

export default TaskCard;
