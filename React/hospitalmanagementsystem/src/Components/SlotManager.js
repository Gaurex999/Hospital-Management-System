import React, { useEffect, useState } from 'react';
import DoctorNavbar from './DoctorNavBar';

const SlotManager = () => {
    const [doctorId, setDoctorId] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [slotDate, setSlotDate] = useState('');
    const [slots, setSlots] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedDoctorId = localStorage.getItem("doctorId");
        if (storedDoctorId) {
            setDoctorId(storedDoctorId);
        }
    }, []);

    const validateInput = () => {
        if (!doctorId || !startTime || !endTime || !slotDate) {
            setError('All fields are required.');
            return false;
        }
        return true;
    };

    const handleGenerateSlots = () => {
        if (!validateInput()) return;

        const generateUrl = 'http://localhost:8080/slots/generate';
        const requestBody = {
            doctorId: parseInt(doctorId),
            startTime: startTime,
            endTime: endTime,
            slotDate: slotDate
        };

        fetch(generateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text); });
            }
            console.log('Slots generated successfully');
            fetchSlots(); // Fetch slots after generating
        })
        .catch(err => {
            console.error('Error during slot generation:', err);
            setError(err.message || 'Failed to generate slots.');
        });
    };

    const fetchSlots = () => {
        const storedDoctorId = localStorage.getItem("doctorId");
        if (!storedDoctorId) {
            setError('Doctor ID not found.');
            return;
        }

        const fetchUrl = `http://localhost:8080/slots/fetch?doctorId=${storedDoctorId}`;
        
        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setSlots(data);
                } else {
                    throw new Error('Unexpected response format');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                setError('Failed to fetch slots.');
            });
    };

    const formatTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', backgroundColor: '#f7f7f7', borderRadius: '10px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
            <DoctorNavbar/>
            <h1>Slot Manager</h1>
            <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'black' }}>
                    Start Time (YYYY-MM-DDTHH:MM:SS):
                    <input
                        type="text"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </label>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'black' }}>
                    End Time (YYYY-MM-DDTHH:MM:SS):
                    <input
                        type="text"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </label>
                <label style={{ display: 'block', marginBottom: '10px', fontWeight: 'bold', color: 'black' }}>
                    Slot Date (YYYY-MM-DD):
                    <input
                        type="text"
                        value={slotDate}
                        onChange={(e) => setSlotDate(e.target.value)}
                        style={{ width: '100%', padding: '8px', marginTop: '5px', marginBottom: '15px', border: '1px solid #ccc', borderRadius: '5px' }}
                    />
                </label>
                <button
                    onClick={handleGenerateSlots}
                    style={{ padding: '10px 20px', marginRight: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Generate Slots
                </button>
                <button
                    onClick={fetchSlots}
                    style={{ padding: '10px 20px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    Fetch Slots
                </button>
            </div>
            <div>
                {error && <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>}
                <div className="slot-list">
                    <h2>Available Slots:</h2>
                    {slots.length === 0 ? (
                        <p>No slots available</p>
                    ) : (
                        <table style={{ width: '100%', borderCollapse: 'collapse', color: 'black' }}>
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>Start Time</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>End Time</th>
                                    <th style={{ border: '1px solid #ccc', padding: '10px', backgroundColor: '#007bff', color: 'white' }}>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slots.map((slot, index) => (
                                    <tr key={index}>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{formatTime(slot.startTime)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{formatTime(slot.endTime)}</td>
                                        <td style={{ border: '1px solid #ccc', padding: '10px' }}>{slot.slotDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SlotManager;
