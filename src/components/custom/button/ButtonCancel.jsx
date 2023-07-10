import { CButton } from '@coreui/react'
import React from 'react'

const ButtonCancel = ({label="CANCEL", handleButton}) => {
    return (
        <CButton
            className="colorBtn-cancel"
            onClick={handleButton}
        >
            {label}
        </CButton>
    )
}

export default ButtonCancel