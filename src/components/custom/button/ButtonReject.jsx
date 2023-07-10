import { CButton } from '@coreui/react'
import React from 'react'

const ButtonReject = ({label="REJECT", handleButton}) => {
    return (
        <CButton
            className="colorBtn-reject"
            onClick={handleButton}
        >
            {label}
        </CButton>
    )
}

export default ButtonReject