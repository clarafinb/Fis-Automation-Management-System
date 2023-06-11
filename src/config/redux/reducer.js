import { combineReducers } from 'redux'
import Global from './Global/reducers'
import Dashboard from './Dashboard/reducers'


const reducer = combineReducers({
  Global,
  Dashboard
})

export default reducer