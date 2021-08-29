import Axios from 'axios'

import {
  SERVICEFEES_LIST_FAIL,
  SERVICEFEES_LIST_REQUEST,
  SERVICEFEES_LIST_SUCCESS,
  SERVICEFEES_ENTRY_REQUEST,
  SERVICEFEES_ENTRY_FAIL,
  SERVICEFEES_ENTRY_SUCCESS,
  SERVICEFEES_GET_REQUEST,
  SERVICEFEES_GET_SUCCESS,
  SERVICEFEES_GET_FAIL,
} from '../constants/servicefeesConstants'

export const listServicefees = () => async (dispatch) => {
  //console.log('in listServices')
  dispatch({
    type: SERVICEFEES_LIST_REQUEST,
  })
  try {
    //console.log('in serviceActions before')
    const { data } = await Axios.get('/api/servicefees')

    if (!data) {
      console.log('no servicefees 000000000')
    }
    dispatch({
      type: SERVICEFEES_LIST_SUCCESS,
      payload: data[0].serviceFees,
    })

    //console.log('DATA IS: ', data[0].serviceFees)
    localStorage.setItem('servicefeesItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICEFEES_LIST_FAIL,
      payload: error.message,
    })
  }
}
export const addToServicefees = (serviceFees) => async (dispatch, getState) => {
  console.log('in addToServicefees')

  dispatch({ type: SERVICEFEES_ENTRY_REQUEST })

  try {
    const {
      userSignin: { userInfo },
    } = getState()

    const { data } = await Axios.post(
      '/api/servicefees',
      {
        serviceFees,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      },
    )
    dispatch({ type: SERVICEFEES_ENTRY_SUCCESS, payload: data }) // data.service
    // dispatch({ type: SERVICE_ADD_SUCCESS, payload: data })

    localStorage.setItem('servicefeesItems', JSON.stringify(data)) // data.service
  } catch (error) {
    dispatch({
      type: SERVICEFEES_ENTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

/* export const detailsServicefees = (servicefees) => async (dispatch) => {
  dispatch({ type: SERVICEFEES_DETAILS_REQUEST })
  try {
    console.log('in detailsService serviceEmail==', servicefees)

    const { data } = await Axios.get(`/api/services`)

   // console.log('serviceEmail==' + serviceEmail)
    console.log('detailsService data=====', data)

    dispatch({
      type: SERVICEFEES_DETAILS_SUCCESS,
      payload: data,
    })
    localStorage.setItem('servicefeesDetails', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICEFEES_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} */

/* export const deleteServicefees = (id) => async (dispatch, getState) => {
  console.log('in deleteServicefees' + id)

  dispatch({ type: SERVICEFEES_DELETE_REQUEST, payload: id })

  try {
    const { data } = await Axios.delete(`/api/servicefees/${id}`)

    dispatch({ type: SERVICEFEES_DELETE_SUCCESS, payload: data })
    localStorage.removeItem('servicefeesItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICEFEES_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
} */

export const getServicefees = () => async (dispatch, getState) => {
  console.log('in getServicefees ')

  dispatch({
    type: SERVICEFEES_GET_REQUEST,
  })

  console.log(
    '  after dispatch({ type: SERVICEFEES_LIST_REQUEST, payload: id }) ',
  )

  try {
    const { data } = await Axios.get(`/api/servicefees`)

    console.log('data=', data)

    dispatch({ type: SERVICEFEES_GET_SUCCESS, payload: data })

    localStorage.setItem('servicefeesItems', JSON.stringify(data))
  } catch (error) {
    dispatch({
      type: SERVICEFEES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
