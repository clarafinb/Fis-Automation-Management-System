import { CButton, CCol, CRow } from '@coreui/react'
import React from 'react'

const ButtonSubmit = ({label="SAVE", handleButton, type="button"}) => {
    return (
        <CButton 
            className="colorBtn-yellow" 
            type={type} 
            onClick={handleButton}
        >
            {label}
        </CButton>
    )
}

export default ButtonSubmit