import React, { useState } from 'react'
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import id from 'date-fns/locale/id';
import "../../../scss/datepicker.scss"
import CalendarIcon from './CalendarIcon';
import moment from 'moment';

registerLocale('id', id)

const DateInput = ({
    name,
    value,
    onChange,
    required = false
}) => {

    const formatedDate = value ?
        moment(value, 'YYYY-MM-DD').toDate() :
        null

    return (
        <>
            <DatePicker
                dateFormat="dd-MM-yyyy"
                selected={formatedDate}
                onChange={(date) => onChange(date, name)} //pass name as string
                required={required}
                customInput={<CalendarIcon />}
                dayClassName={() => "example-datepicker-day-class"}
                popperClassName="example-datepicker-class"
                todayButton="TODAY"
            />
        </>
    )


}

export default DateInput