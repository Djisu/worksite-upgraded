import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import * as reactAdmin from 'ra-core'
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
  //servicefeesDetailsReducer,
  servicefeesListReducer,
  addToServicefeesReducer,
  getServicefeesReducer,
  //deleteServicefeesReducer,
  //servicefeesUpdateReducer,
  //getServicefeesReducer,
} from './reducers/servicefeesReducers'

import {
  userDetailsReducer,
  userListReducer,
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
  servicefees: {
    servicefeesItems: localStorage.getItem('servicefeesItems')
      ? JSON.parse(localStorage.getItem('servicefeesItems'))
      : {},
    servicefeesDetails: localStorage.getItem('servicefeesDetails')
      ? JSON.parse(localStorage.getItem('servicefeesDetails'))
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

  servicefeesList: servicefeesListReducer,
  //servicefeesDetails: servicefeesDetailsReducer,
  //servicefeesUpdate: servicefeesUpdateReducer,
  addToServicefees: addToServicefeesReducer,
  servicefees: addToServicefeesReducer,
  //deleteServicefees: deleteServicefeesReducer,
  getServicefees: getServicefeesReducer,

  contractList: contractListReducer,
  contractDetails: contractDetailsReducer,
  addToContract: addToContractReducer,
  deleteContract: deleteContractReducer,

  cart: cartReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
)

store.dispatch(
  reactAdmin.registerResource({
    name: 'myStuff',
    hasList: true,
    hasEdit: false,
    hasShow: false,
    hasCreate: false,
  }),
)

export default store
