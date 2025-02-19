// import React, { useState, useEffect } from "react";
// import { Container, Row, Col, Card, Table, ProgressBar, Button, Nav } from "react-bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";

// const EmployeeTaskDashboard = () => {
//   const [view, setView] = useState("weekly");
//   const [tasks, setTasks] = useState([]);
//   const [affirmation, setAffirmation] = useState("You are doing great! Keep up the amazing work.");

//   useEffect(() => {
//     fetchTasks(view);
//   }, [view]);

//   const fetchTasks = (filter) => {
//     // Fetch tasks based on filter (daily, weekly, monthly, yearly)
//     // Mock data for now
//     const allTasks = [
//       { id: 1, title: "Task A", description: "Complete report", priority: "High", dueDate: "2025-02-20", status: "Pending" },
//       { id: 2, title: "Task B", description: "Update website", priority: "Medium", dueDate: "2025-02-22", status: "In Progress" },
//     ];
//     setTasks(allTasks);
//   };

//   return (
//     <Container fluid>
//       <Row>
//         {/* Sidebar Navigation */}
//         <Col md={2} className="bg-dark text-white vh-100 p-3">
//           <h4>Dashboard</h4>
//           <Nav className="flex-column">
//             <Nav.Link className="text-white" onClick={() => setView("dashboard")}>Dashboard</Nav.Link>
//             <Nav.Link className="text-white" onClick={() => setView("mytasks")}>My Tasks</Nav.Link>
//             <Nav.Link className="text-white" onClick={() => setView("reports")}>Reports</Nav.Link>
//           </Nav>
//         </Col>

//         {/* Main Content */}
//         <Col md={10} className="p-4">
//           {/* Affirmation Message */}
//           <Card className="mb-3 p-3 text-center bg-light">
//             <h5>{affirmation}</h5>
//           </Card>

//           {/* Task Progress */}
//           <Card className="mb-3 p-3">
//             <h6>Task Progress</h6>
//             <ProgressBar now={30} label={`30%`} />
//           </Card>

//           {/* View Selection */}
//           <Nav variant="tabs" activeKey={view} onSelect={(selectedView) => setView(selectedView)}>
//             <Nav.Item>
//               <Nav.Link eventKey="daily">Daily</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="weekly">Weekly</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="monthly">Monthly</Nav.Link>
//             </Nav.Item>
//             <Nav.Item>
//               <Nav.Link eventKey="yearly">Yearly</Nav.Link>
//             </Nav.Item>
//           </Nav>

//           {/* Task Table */}
//           <Card className="mt-3 p-3">
//             <h6>Tasks</h6>
//             <Table striped bordered hover>
//               <thead>
//                 <tr>
//                   <th>Task Title</th>
//                   <th>Description</th>
//                   <th>Priority</th>
//                   <th>Due Date</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {tasks.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.title}</td>
//                     <td>{task.description}</td>
//                     <td>{task.priority}</td>
//                     <td>{task.dueDate}</td>
//                     <td>{task.status}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card>

//           {/* Request Deadline Extension */}
//           <Card className="mt-3 p-3">
//             <h6>Request Deadline Extension</h6>
//             <Button variant="warning">Request Extension</Button>
//           </Card>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EmployeeTaskDashboard;
