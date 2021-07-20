import Axios from 'axios'
//import { bindActionCreators } from '../../node_modules/redux/index'
import {
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_DETAILS_FAIL,
  CONTRACT_LIST_FAIL,
  CONTRACT_LIST_REQUEST,
  CONTRACT_LIST_SUCCESS,
  CONTRACT_ENTRY_REQUEST,
  CONTRACT_ENTRY_FAIL,
  CONTRACT_ENTRY_SUCCESS,
  CONTRACT_DELETE_REQUEST,
  CONTRACT_DELETE_SUCCESS,
  CONTRACT_DELETE_FAIL,
} from '../constants/contractConstants'

export const enterContractDetails = (contract) => async (
  dispatch,
  getState,
) => {
  dispatch({ type: CONTRACT_ENTRY_REQUEST, payload: contract })

  try {
    const {
      userSignin: { userInfo },
    } = getState()
    const { data } = await Axios.post('/api/contracts', contract, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    })
    dispatch({ type: CONTRACT_ENTRY_SUCCESS, payload: data.contract })
  } catch (error) {
    dispatch({
      type: CONTRACT_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const listContracts = () => async (dispatch) => {
  console.log('in listContracts')
  dispatch({
    type: CONTRACT_LIST_REQUEST,
  })
  try {
    console.log('in listContracts before')
    const { data } = await Axios.get('/api/contracts')

    console.log('in contractActions after====data.length' + data.length)

    if (!data) {
      console.log('no contract 000000000')
    }
    dispatch({
      type: CONTRACT_LIST_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: CONTRACT_LIST_FAIL,
      payload: error.message,
    })
  }
}
export const addToContract = (
  user,
  delay,
  transDate,
  completeDate,
  description,
  documents,
  comments,
  quantity,
  unitPrice,
  totalCost,
  isPaid,
  isCompleted,
  service,
  email,
  telno,
  serviceEmail,
) => async (dispatch, getState) => {
  console.log('in addToContract')

  dispatch({ type: CONTRACT_ENTRY_REQUEST })

  try {
    const {
      userSignin: { userInfo },
    } = getState()

    const { data } = await Axios.post(
      '/api/contracts',
      {
        user,
        delay,
        transDate,
        completeDate,
        description,
        documents,
        comments,
        quantity,
        unitPrice,
        totalCost,
        isPaid,
        isCompleted,
        service,
        email,
        telno,
        serviceEmail,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    )
    dispatch({ type: CONTRACT_ENTRY_SUCCESS, payload: data.contract }) //data.contract
    localStorage.setItem('contractItems', JSON.stringify(data.contract))

    console.log('data=', data)
  } catch (error) {
    dispatch({
      type: CONTRACT_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const detailsContract = (email) => async (dispatch) => {
  console.log(' in detailsContract email====', email)

  dispatch({ type: CONTRACT_DETAILS_REQUEST, payload: email })

  try {
    const { data } = await Axios.get(`/api/contracts/${email}`)

    console.log(' in detailsContract  data=====', data)

    dispatch({
      type: CONTRACT_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('contractDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONTRACT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteContract = (id) => async (dispatch, getState) => {
  console.log('in deleteContract' + id)

  dispatch({ type: CONTRACT_DELETE_REQUEST, payload: id })

  try {
    const { data } = await Axios.delete(`/api/contracts/${id}`)

    dispatch({ type: CONTRACT_DELETE_SUCCESS, payload: data })
    localStorage.removeItem('contractItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: CONTRACT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
