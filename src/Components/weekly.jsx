



// import React, { useState } from "react";
// import { FaPlus, FaTrash } from "react-icons/fa";


// const timeSlots = [
//   '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
//   '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', 
//   '01:00 PM', '01:30 PM', '02:00 PM', '02:30 PM', 
//   '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM', 
//   '05:00 PM', '05:30 PM'
// ];

// const WeeklyViewForm = () => {
//   const [tasks, setTasks] = useState(
//     Array.from({ length: 6 }, () =>
//       Array.from({ length: 18 }, () => [""]) 
//     )
//   );


//   const handleTaskChange = (dayIndex, timeIndex, taskIndex, value) => {
//     const newTasks = tasks.map((day, dIdx) =>
//       day.map((slot, tIdx) =>
//         dIdx === dayIndex && tIdx === timeIndex
//           ? slot.map((task, i) => (i === taskIndex ? value : task))
//           : slot
//       )
//     );
//     setTasks(newTasks);
//   };
  

  
//   const addTask = (dayIndex, timeIndex) => {
//     const newTasks = [...tasks];
//     newTasks[dayIndex][timeIndex].push("");
//     setTasks(newTasks);
//   };

  
//   const removeTask = (dayIndex, timeIndex, taskIndex) => {
//     const newTasks = [...tasks];
//     newTasks[dayIndex][timeIndex].splice(taskIndex, 1); 
//     setTasks(newTasks);
//   };
//   const handleSubmit = async () => {
//     const formattedTasks = tasks[0].map((_, timeIndex) => ({
//       time: timeSlots[timeIndex],  // Correctly map the time slot
//       monday: tasks[0][timeIndex].join(", ") || 'No Task',
//       tuesday: tasks[1][timeIndex].join(", ") || 'No Task',
//       wednesday: tasks[2][timeIndex].join(", ") || 'No Task',
//       thursday: tasks[3][timeIndex].join(", ") || 'No Task',
//       friday: tasks[4][timeIndex].join(", ") || 'No Task',
//       saturday: tasks[5][timeIndex].join(", ") || 'No Task',
//     }));
  
//     console.log('🚀 Sending formatted tasks:', formattedTasks);
  
//     try {
//       const response = await fetch('http://localhost:5000/api/save-tasks', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ tasks: formattedTasks }),
//       });
  
//       if (!response.ok) {
//         const errorText = await response.text();
//         throw new Error(`HTTP Error ${response.status}: ${errorText}`);
//       }
  
//       const data = await response.json();
//       alert("Tasks Saved successfuully");
//       console.log('✅ Tasks saved successfully!', data);
//     } catch (err) {
//       console.error('❌ Error saving tasks:', err.message);
//     }
//   };
  
  

//   return (
//     <div>
//       <h4>Weekly View</h4>
//       <table className="table table-bordered">
//         <thead>
//           <tr>
//             <th>Time</th>
//             <th>Monday</th>
//             <th>Tuesday</th>
//             <th>Wednesday</th>
//             <th>Thursday</th>
//             <th>Friday</th>
//             <th>Saturday</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Array.from({ length: 18 }, (_, timeIndex) => {
//             const time = new Date();
//             time.setHours(9 + Math.floor(timeIndex / 2), (timeIndex % 2) * 30);
//             const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//             return (
//               <tr key={timeString}>
//                 <td>{timeString}</td>
//                 {Array.from({ length: 6 }, (_, dayIndex) => (
//                   <td key={dayIndex}>
//                     {tasks[dayIndex][timeIndex].map((task, taskIndex) => (
//                       <div key={taskIndex} className="d-flex align-items-center mb-1">
//                         <input
//                           type="text"
//                           className="form-control me-2"
//                           value={task}
//                           onChange={(e) => handleTaskChange(dayIndex, timeIndex, taskIndex, e.target.value)}
//                           placeholder="Enter task"
//                         />
//                         <button
//                           className="btn btn-sm btn-outline-success me-1"
//                           onClick={() => addTask(dayIndex, timeIndex)}
//                         >
//                           <FaPlus />
//                         </button>
//                         <button
//                           className="btn btn-sm btn-outline-danger"
//                           onClick={() => removeTask(dayIndex, timeIndex, taskIndex)}
//                         >
//                           <FaTrash />
//                         </button>
//                       </div>
//                     ))}
//                   </td>
//                 ))}
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>

//       <button className="btn btn-primary mt-3" onClick={handleSubmit}>
//         Submit
//       </button>
//     </div>
//   );
// };

// export default WeeklyViewForm;
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const TaskDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        taskTitle: "",
        description: "",
        assignedTo: "",
        category: "",
        priority: "Medium",
        repeat: false,
        frequency: "",
        startDate: "",
        dueDate: "",
        link: "",
        attachment: null,
        voiceNote: null,
    });
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetchUsers();
        fetchCategories();
        fetchTasks();
    }, []);

    const fetchUsers = async () => {
        const usersList = await getUsers();
        setUsers(usersList);
    };

    const fetchCategories = async () => {
        const categoryList = await getCategoriesTask();
        setCategories(categoryList);
    };

    const fetchTasks = async () => {
        const taskList = await getTasks();
        setTasks(taskList);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, attachment: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await submitTask(formData);
        setShowModal(false);
        fetchTasks();
    };

    const handleStatusChange = async (rowIndex, newStatus) => {
        await updateTaskStatus(rowIndex, newStatus);
        fetchTasks();
    };

    const handleDelete = async (rowIndex) => {
        if (window.confirm("Are you sure you want to delete this task?")) {
            await deleteTask(rowIndex);
            fetchTasks();
        }
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Task Dashboard</h2>
            <button className="btn btn-primary mb-3" onClick={() => setShowModal(true)}>
                <i className="fas fa-plus"></i> Add New Task
            </button>

            <div className="row">
                {tasks.length > 0 ? (
                    tasks.map((task, index) => (
                        <div className="col-md-6 mb-4" key={index}>
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{task.taskTitle}</h5>
                                    <p className="card-text">{task.description}</p>
                                    <p><strong>Assigned to:</strong> {task.assignedTo}</p>
                                    <p><strong>Category:</strong> {task.category}</p>
                                    <p><strong>Priority:</strong> {task.priority}</p>
                                    <p><strong>Due Date:</strong> {task.dueDate}</p>

                                    <div className="d-flex justify-content-between">
                                        <div>
                                            <button className="btn btn-sm btn-outline-info me-1" onClick={() => handleStatusChange(task.rowIndex, "In Progress")}>In Progress</button>
                                            <button className="btn btn-sm btn-outline-warning me-1" onClick={() => handleStatusChange(task.rowIndex, "Pending")}>Pending</button>
                                            <button className="btn btn-sm btn-outline-success me-1" onClick={() => handleStatusChange(task.rowIndex, "Completed")}>Completed</button>
                                        </div>
                                        <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.rowIndex)}>
                                            <i className="fas fa-trash"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No tasks found</p>
                )}
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal fade show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title text-black">Add New Task</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label text-black">Task Title</label>
                                        <input type="text" className="form-control" name="taskTitle" value={formData.taskTitle} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">Description</label>
                                        <textarea className="form-control" name="description" value={formData.description} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">Assigned To</label>
                                        <select className="form-select" name="assignedTo" onChange={handleInputChange} required>
                                            <option value="">Select User</option>
                                            {users.map((user, index) => (<option key={index} value={user}>{user}</option>))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">Category</label>
                                        <select className="form-select" name="category" onChange={handleInputChange} required>
                                            <option value="">Select Category</option>
                                            {categories.map((cat, index) => (<option key={index} value={cat}>{cat}</option>))}
                                        </select>
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label text-black">Due Date</label>
                                        <input type="date" className="form-control" name="dueDate" value={formData.dueDate} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label className="form-label">Attachment</label>
                                        <input type="file" className="form-control" onChange={handleFileChange} />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                        <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaskDashboard;

// Mock API Functions
async function getUsers() {
    return ["John Doe", "Jane Smith", "Emily Johnson"];
}

async function getCategoriesTask() {
    return ["Development", "Marketing", "Design"];
}

async function getTasks() {
    return [
        { taskTitle: "Sample Task", description: "Test Task", assignedTo: "John Doe", category: "Development", priority: "High", dueDate: "2025-03-01", rowIndex: 1 }
    ];
}

async function submitTask(taskData) {
    console.log("Task Submitted", taskData);
}

async function updateTaskStatus(rowIndex, newStatus) {
    console.log("Task Updated", rowIndex, newStatus);
}

async function deleteTask(rowIndex) {
    console.log("Task Deleted", rowIndex);
}
