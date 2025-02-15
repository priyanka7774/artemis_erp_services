





// import { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function DoerForm() {
//   const [name, setName] = useState('');
//   const [dob, setDob] = useState('');
//   const navigate = useNavigate();


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/add-doer', { name, dob });
//       console.log(response.data);
//       alert('Logined');
//       setName('');
//       setDob('');
//       navigate('/vision'); 
//     } catch (error) {
//       console.error('Failed to submit data', error);
//       alert('Failed to add record');
//     }
//   };

  
//   const handleLogin = () => {
//     // Check login validation if needed
//     alert('Logged in successfully!');
//     navigate('/vision'); // Navigate to vision page
//   };

//   return (
//     <div className="bg-light p-4 rounded shadow-sm" style={{ maxWidth: '400px', margin: '100px auto' }}>
//        <h3 className='text-black fw-bold p-3'>Login</h3>
//     <form onSubmit={handleSubmit}>
//     <div className="mb-3">
//       <label className="form-label fw-bold text-black">Name</label>
//         <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
//       </div>

//       <div className='mb-3'>
//       <label className="form-label fw-bold text-black ">Date of Birth</label>
//         <input type="date" className="form-control" value={dob} onChange={(e) => setDob(e.target.value)} required />
//       </div>

//       <button type="submit" className='btn btn-primary'> Login </button>
//     </form>
//     </div>
//   );
// }

// export default DoerForm;
