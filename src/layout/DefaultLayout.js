import React, { useEffect } from 'react'
import { useRedux } from '../utils/hooks'
import { 
  AppContent, 
  AppSidebar, 
  AppFooter, 
  AppHeader 
} from '../components/index'
import { useCookies } from "react-cookie"
import * as actions from '../config/redux/Global/actions'

const DefaultLayout = () => {
  const [cookies, setCookie] = useCookies(["user"]);
  const { dispatch } = useRedux();

  useEffect(() => {
		if(cookies?.user){
      dispatch(actions.actionSetReduxUser(cookies.user))
    }
	}, []);
  
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
