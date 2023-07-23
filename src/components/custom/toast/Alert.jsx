import { CAlert, } from '@coreui/react'
import React from 'react'

const Alert = ({ message = "", visible, setVisible }) => {
  return (
    <>
      <CAlert color="danger" dismissible visible={visible} onClose={() => setVisible(false)}>
        {message} <br />
        must be filled !
      </CAlert>
    </>
  )


}

export default Alert