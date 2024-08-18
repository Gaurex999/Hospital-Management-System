import React, { useState, useEffect } from 'react';

const SlotSelect = ({ doctorId, onSlotChange, selectStyle, slots: propSlots }) => {
    const [slots, setSlots] = useState(propSlots || []);

    useEffect(() => {
        if (doctorId) {
            fetch(`http://localhost:8080/api/bookings/slots/${doctorId}`)
                .then(response => response.json())
                .then(data => setSlots(data))
                .catch(error => console.error('Error fetching slots:', error));
        }
    }, [doctorId]);

    useEffect(() => {
        // Update slots if propSlots changes
        if (propSlots) {
            setSlots(propSlots);
        }
    }, [propSlots]);

    const handleChange = (event) => {
        onSlotChange(event.target.value);
    };

    return (
        <select onChange={handleChange} style={selectStyle}>
            <option value="">Select Slot</option>
            {slots.map(slot => (
                <option 
                    key={slot.slotId} 
                    value={slot.slotId}
                    disabled={slot.isBooked} // Disable the option if slot is booked
                >
                    {slot.startTime} - {slot.endTime} {slot.isBooked ? '(Booked)' : ''}
                </option>
            ))}
        </select>
    );
};

export default SlotSelect;
