import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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

ToggleSwitch.propTypes = {
  checked: PropTypes.func.isRequired,
  size: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
  projectId: PropTypes.func.isRequired,
};

export default ToggleSwitch;
