// SlotSelect.js
import React, { useEffect, useState } from 'react';

const SlotSelect = ({ doctorId }) => {
    const [slots, setSlots] = useState([]);

    useEffect(() => {
        if (doctorId) {
            fetch(`http://localhost:8080/slots/fetch?doctorId=${doctorId}`)
                .then(response => response.json())
                .then(data => setSlots(data))
                .catch(error => console.error('Error fetching slots:', error));
        }
    }, [doctorId]);

    return (
        <select>
            <option value="">Select Slot</option>
            {slots.map(slot => (
                <option key={slot.slotId} value={slot.slotId}>
                    {new Date(slot.startTime).toLocaleString()} - {new Date(slot.endTime).toLocaleString()}
                </option>
            ))}
        </select>
    );
};

export default SlotSelect;
