import React from 'react'
import { useRedux } from '../../utils/hooks'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CDropdownHeader,
} from '@coreui/react'
import {
  cilSettings,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'

import avatar8 from '../../assets/images/avatars/8.jpg'
import * as actions from '../../config/redux/Global/actions'

const AppHeaderDropdown = () => {
  const { dispatch, Global } = useRedux();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const nav = useNavigate();

  const handleLogOut = (event) => {

    dispatch(actions.actionResetUser());
    removeCookie('user');

    nav("/login");

    event.preventDefault()
    event.stopPropagation()

  }

  const handleDetailProfile = () => {
    nav("/profile");
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={avatar8} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">{Global?.user?.fullname}</CDropdownHeader>
        <CDropdownItem onClick={handleDetailProfile}>
          <CIcon icon={cilUser} className="me-2" />
          Profile
        </CDropdownItem>
        <CDropdownItem href="#">
          <CIcon icon={cilSettings} className="me-2" />
          Settings
        </CDropdownItem>
        <CDropdownItem onClick={handleLogOut}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Log Out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown
