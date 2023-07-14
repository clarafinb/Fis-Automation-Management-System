import { CButton, CCol, CRow } from '@coreui/react'
import React from 'react'

const ButtonSubmit = ({label="SAVE", handleButton, type="button",className=""}) => {
    return (
        <CButton 
            className={`colorBtn-yellow ${className}`} 
            type={type} 
            onClick={handleButton}
        >
            {label}
        </CButton>
    )
}

export default ButtonSubmit