import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  addToContractReducer,
  contractDetailsReducer,
  contractListReducer,
  deleteContractReducer,
} from './reducers/contractReducers'

import {
  serviceDetailsReducer,
  serviceListReducer,
  enterServiceDetailsReducer,
  addToServiceReducer,
  deleteServiceReducer,
  serviceReviewCreateReducer,
  serviceUpdateReducer,
  getServiceReducer,
} from './reducers/serviceReducers'
import {
  userDetailsReducer,
  userRegisterReducer,
  userSigninReducer,
  userUpdateProfileReducer,
} from './reducers/userReducer'

localStorage.clear()

const initialState = {
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
  service: {
    serviceItems: localStorage.getItem('serviceItems')
      ? JSON.parse(localStorage.getItem('serviceItems'))
      : {},
    serviceDetails: localStorage.getItem('serviceDetails')
      ? JSON.parse(localStorage.getItem('serviceDetails'))
      : {},
  },
  contract: {
    contractDetails: localStorage.getItem('contractDetails')
      ? JSON.parse(localStorage.getItem('contractDetails'))
      : {},
  },
}

const reducer = combineReducers({
  serviceList: serviceListReducer,
  serviceDetails: serviceDetailsReducer,
  serviceReviewCreate: serviceReviewCreateReducer,
  serviceUpdate: serviceUpdateReducer,
  enterServiceDetails: enterServiceDetailsReducer,
  addToService: addToServiceReducer,
  service: addToServiceReducer,
  deleteService: deleteServiceReducer,
  getService: getServiceReducer,

  contractList: contractListReducer,
  contractDetails: contractDetailsReducer,
  addToContract: addToContractReducer,
  deleteContract: deleteContractReducer,

  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
)

export default store
