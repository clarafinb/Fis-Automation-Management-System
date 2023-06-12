import React, { useState, useEffect } from 'react';
import { CFormSwitch } from '@coreui/react';

const ToggleSwitch = ({checked,handleChecked,size = "lg", projectId}) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsChecked(checked())
  }, [checked])

  const handleToggle = () => {
    setIsChecked(!isChecked)
    handleChecked(!isChecked,projectId)
  };

  return (
    <div>
      <CFormSwitch
        size = {size}
        id = "toggle-switch"
        className = "md-4"
        checked = {isChecked}
        onChange = {handleToggle}
      />
    </div>
  );
};

export default ToggleSwitch;
