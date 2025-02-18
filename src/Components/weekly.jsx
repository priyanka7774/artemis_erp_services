





import React, { useState } from 'react';
import { FaPlus, FaTrash } from 'react-icons/fa';

const Weekly = () => {
  const initialTasks = Array(6).fill().map(() => Array(18).fill().map(() => [''])); // 18 slots for 9 hours with 30-minute intervals
  const [tasks, setTasks] = useState(initialTasks);

  const addTask = (dayIndex, timeIndex) => {
    const newTasks = tasks.map((day, dIndex) =>
      day.map((timeSlot, tIndex) =>
        dIndex === dayIndex && tIndex === timeIndex
          ? [...timeSlot, '']
          : timeSlot
      )
    );
    setTasks(newTasks);
  };

  const removeTask = (dayIndex, timeIndex, taskIndex) => {
    const newTasks = tasks.map((day, dIndex) =>
      day.map((timeSlot, tIndex) => {
        if (dIndex === dayIndex && tIndex === timeIndex) {
          const updatedSlot = timeSlot.filter((_, idx) => idx !== taskIndex);
          return updatedSlot.length === 0 ? [''] : updatedSlot;
        }
        return timeSlot;
      })
    );
    setTasks(newTasks);
  };

  const handleTaskChange = (dayIndex, timeIndex, taskIndex, value) => {
    const newTasks = tasks.map((day, dIndex) =>
      day.map((timeSlot, tIndex) => {
        if (dIndex === dayIndex && tIndex === timeIndex) {
          const updatedSlot = [...timeSlot];
          updatedSlot[taskIndex] = value;
          return updatedSlot;
        }
        return timeSlot;
      })
    );
    setTasks(newTasks);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Map tasks to a structured format for submission
    const submittedData = tasks.map((day, dayIndex) =>
      day.map((timeSlot, timeIndex) => ([
        {
          day: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][dayIndex],
          time: `${9 + Math.floor(timeIndex / 2)}:${(timeIndex % 2) * 30 === 0 ? '00' : '30'}`,
          tasks: timeSlot.filter(task => task.trim() !== '') // Exclude empty tasks
        }
      ]))
    );

    // Flatten the data and filter empty slots (no tasks)
    const nonEmptyData = submittedData.flat().filter(slot => slot.tasks.length > 0);

    console.log('Submitted Data:', nonEmptyData);

    if (nonEmptyData.length === 0) {
      alert('No valid tasks to submit!');
      return; // Stop if there's nothing to submit
    }

    try {
      const response = await fetch('http://localhost:5000/api/save-tasks', {
        method: 'POST',
        body: JSON.stringify(nonEmptyData),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to save data');
      }

      const result = await response.json();
      alert('Data saved successfully!');
      console.log('Server Response:', result);
    } catch (error) {
      console.error('Submit Error:', error);
      alert(`Failed to save data: ${error.message}`);
    }
  };

  return (
    <div>
      <h4>Weekly View</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Time</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 18 }, (_, timeIndex) => {
            const time = new Date();
            time.setHours(9 + Math.floor(timeIndex / 2), (timeIndex % 2) * 30);
            const timeString = time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

            return (
              <tr key={timeString}>
                <td>{timeString}</td>
                {Array.from({ length: 6 }, (_, dayIndex) => (
                  <td key={dayIndex}>
                    {tasks[dayIndex][timeIndex].map((task, taskIndex) => (
                      <div key={taskIndex} className="d-flex align-items-center mb-1">
                        <input
                          type="text"
                          className="form-control me-2"
                          value={task}
                          onChange={(e) => handleTaskChange(dayIndex, timeIndex, taskIndex, e.target.value)}
                          placeholder="Enter task"
                        />
                        <button
                          className="btn btn-sm btn-outline-success me-1"
                          onClick={() => addTask(dayIndex, timeIndex)}
                        >
                          <FaPlus />
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeTask(dayIndex, timeIndex, taskIndex)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    ))}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <button className="btn btn-primary mt-3" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default Weekly;
