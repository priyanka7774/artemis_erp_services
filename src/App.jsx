import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// import LoginPage from './components/LoginPage';
import AuthPage from './Components/AuthPage';
import Vision from './Components/vision';
import Dashboard from './Components/Dashboard';
// import Try from "./Components/"
import TaskUploadForm from './Components/TaskUploadForm';
// import EmployeeTaskDashboard from './Components/EmployeeTaskDashboard';

import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  return (
    <Router>
      <div className="vh-100 d-flex flex-column" style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1615873968403-ccf8a3a5a1fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fG1vZGVybiUyMGhvdXNlfGVufDB8fHx8MTcwNzc1MTY1Mw&ixlib=rb-4.0.3&q=80&w=1080")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white'
      }}>
        <div className="d-flex justify-content-between align-items-center p-3 bg-dark bg-opacity-75">
          <h3>Matoshri Group</h3>
          
          <div>
            <Link to="/" className="btn btn-light me-2">Home</Link>
            <Link to="/AuthPage" className="btn btn-warning me-2">Doer</Link>
            <Link to="/login" className="btn btn-info me-2">Admin</Link>
            {/* <Link to="/try" className="btn btn-success me-2">Try</Link> */}
          </div>
        </div>

        <div className="container text-center mt-5">
          <Routes>
            <Route path="/" element={<h1 className='text-black text-center p-5'>Welcome to Matoshri Group</h1>} />
            
            <Route path="/AuthPage" element={<AuthPage />} />
            <Route path="/Vision" element={<Vision />} />
           <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/try" element={<Try/>} />  */}
          
          </Routes>
        </div>
      </div>  
    </Router>
  );
}

export default App;

