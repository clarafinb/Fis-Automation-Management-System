import { combineReducers } from 'redux'
import Global from './Global/reducers'
import Dashboard from './Dashboard/reducers'
import DashboardOpsLead from './DashboardOpsLead/reducers'


const reducer = combineReducers({
  Global,
  Dashboard,
  DashboardOpsLead
})

export default reducer