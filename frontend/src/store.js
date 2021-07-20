import { createStore, compose, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { cartReducer } from './reducers/cartReducers'
import {
  addToContractReducer,
  contractDetailsReducer,
  contractListReducer,
  deleteContractReducer,
  enterContractDetailsReducer,
} from './reducers/contractReducers'
// import {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderMineListReducer,
//   orderPayReducer,
// } from './reducers/orderReducers'
import {
  serviceDetailsReducer,
  serviceListReducer,
  enterServiceDetailsReducer,
  addToServiceReducer,
  deleteServiceReducer,
  serviceReviewCreateReducer,
  serviceUpdateReducer,
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
    /* contractItems: localStorage.getItem('contractItems')
      ? JSON.parse(localStorage.getItem('contractItems'))
      : {}, */
    contractDetails: localStorage.getItem('contractDetails')
      ? JSON.parse(localStorage.getItem('contractDetails'))
      : {},
  },

  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},
    paymentMethod: 'PayPal',
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

  contractList: contractListReducer,
  contractDetails: contractDetailsReducer,
  enterContractDetails: enterContractDetailsReducer,
  addToContract: addToContractReducer,
  deleteContract: deleteContractReducer,
  contract: contractListReducer,

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
