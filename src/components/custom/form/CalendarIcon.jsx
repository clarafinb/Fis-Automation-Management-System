import React, { forwardRef } from 'react';

const CalendarIcon = forwardRef(({ value, onClick, onChange, required }, ref) => (
    <>
        <input
            value={value}
            className="example-custom-input form-control"
            onClick={onClick}
            onChange={onChange}
            ref={ref}
            required={required}
            placeholder={'dd-mm-yyyy'} 
        />
    </>
));

CalendarIcon.displayName = 'CalendarIcon';
export default CalendarIcon;