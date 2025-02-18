import React, { useState } from 'react';

const Vision = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('');
  const [tableData, setTableData] = useState([
    { time: '', scheduled: '', actualDone: '', waiting: '' },
  ]);

  const handlePeriodChange = (period) => {
    setSelectedPeriod(period);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedData = [...tableData];
    updatedData[index][name] = value;
    setTableData(updatedData);
  };

  const addRow = () => {
    setTableData([...tableData, { time: '', scheduled: '', actualDone: '', waiting: '' }]);
  };

  return (
    <div className="vision-container">
      <h2>Vision</h2>
      <div className="">
        <h3 className='text-black fw-bold'>Choose Your Vision</h3>
        <button onClick={() => handlePeriodChange('Weekly')} className='btn btn-primary m-3'>Weekly</button>
        <button onClick={() => handlePeriodChange('Monthly')} className='btn btn-primary m-3'>Monthly</button>
        <button onClick={() => handlePeriodChange('Yearly')} className='btn btn-primary m-3'>Yearly</button>
      </div>
      <h3>Selected: {selectedPeriod}</h3>

      <table>
        <thead>
          <tr>
            <th>Time</th>
            <th>Scheduled</th>
            <th>Actual Done</th>
            <th>Waiting</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  name="time"
                  value={row.time}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="scheduled"
                  value={row.scheduled}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="actualDone"
                  value={row.actualDone}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="waiting"
                  value={row.waiting}
                  onChange={(e) => handleInputChange(index, e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={addRow}>Add Row</button>
    </div>
  );
};

export default Vision;
