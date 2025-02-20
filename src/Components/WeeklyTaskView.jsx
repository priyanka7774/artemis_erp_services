




import { useState, useEffect } from "react";
import axios from "axios";

const WeeklyTaskView = ({ startDate, endDate }) => {
    const [weeklyTasks, setWeeklyTasks] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`/api/getWeeklyTasks?startDate=${startDate}&endDate=${endDate}`)
            .then(res => {
                console.log("API Response:", res.data); // Log the API response for debugging
                if (res.data) {
                    setWeeklyTasks(res.data);
                } else {
                    console.error("No tasks found for the given date range.");
                    setWeeklyTasks({});
                }
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching tasks:", err);
                setLoading(false);
            });
    }, [startDate, endDate]);

    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    if (loading) {
        return <div>Loading tasks...</div>;
    }

    return (
        <table border="1">
            <thead className="text-black">
                <tr>
                    <th className="text-black">Time</th>
                    {days.map(day => <th key={day}>{day}</th>)}
                </tr>
            </thead>
            <tbody>
                {Object.entries(weeklyTasks).length > 0 ? (
                    Object.entries(weeklyTasks).map(([time, tasks]) => (
                        <tr key={time}>
                            <td className="text-black">{time}</td>
                            {days.map(day => (
                                <td key={day} className="text-black">
                                    {tasks?.[day] || "-"}
                                </td>
                            ))}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan={7} className="text-black">
                            No tasks available for the selected date range.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default WeeklyTaskView;
