import {
  SERVICEFEES_ENTRY_FAIL,
  SERVICEFEES_ENTRY_REQUEST,
  SERVICEFEES_ENTRY_RESET,
  SERVICEFEES_ENTRY_SUCCESS,
  SERVICEFEES_GET_FAIL,
  SERVICEFEES_GET_REQUEST,
  SERVICEFEES_GET_SUCCESS,
  SERVICEFEES_LIST_FAIL,
  SERVICEFEES_LIST_REQUEST,
  SERVICEFEES_LIST_SUCCESS,
} from '../constants/servicefeesConstants'

/* export const SERVICEFEES_LIST_REQUEST = 'SERVICEFEES_LIST_REQUEST'
export const SERVICEFEES_LIST_SUCCESS = 'SERVICEFEES_LIST_SUCCESS'
export const SERVICEFEES_LIST_FAIL = 'SERVICEFEES_LIST_FAIL'

export const SERVICEFEES_ENTRY_REQUEST = 'SERVICEFEES_ENTRY_REQUEST'
export const SERVICEFEES_ENTRY_SUCCESS = 'SERVICEFEES_ENTRY_SUCCESS'
export const SERVICEFEES_ENTRY_FAIL = 'SERVICEFEES_ENTRY_FAIL'
export const SERVICEFEES_ENTRY_RESET = 'SERVICEFEES_ENTRY_RESET'

export const SERVICEFEES_GET_REQUEST = 'SERVICEFEES_GET_REQUEST'
export const SERVICEFEES_GET_SUCCESS = 'SERVICEFEES_GET_SUCCESS'
export const SERVICEFEES_GET_FAIL = 'SERVICEFEES_GET_FAIL'
 */

export const servicefeesListReducer = (
  state = { loading: true, servicefees: [] },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_LIST_REQUEST:
      return { loading: true }

    case SERVICEFEES_LIST_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

/* export const servicefeesDetailsReducer = (
  state = { servicefees: {}, loading: true },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_DETAILS_REQUEST:
      return { loading: true }

    case SERVICEFEES_DETAILS_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
} */

export const enterServicefeesDetailsReducer = (
  state = { loading: true, servicefees: {} },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_ENTRY_REQUEST:
      return { loading: true }

    case SERVICEFEES_ENTRY_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case SERVICEFEES_ENTRY_RESET:
      return {}

    default:
      return state
  }
}
export const addToServicefeesReducer = (
  state = { loading: true, servicefees: {} },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_ENTRY_REQUEST:
      return { loading: true }

    case SERVICEFEES_ENTRY_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case SERVICEFEES_ENTRY_RESET:
      return {}

    /*  case SERVICEFEES_ADD_SUCCESS:
      return { loading: false, success: true }
 */
    default:
      return state
  }
}
/* 
export const deleteServicefeesReducer = (
  state = { loading: true, servicefees: {} },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_DELETE_REQUEST:
      return { loading: true }

    case SERVICEFEES_DELETE_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
*/
export const getServicefeesReducer = (
  state = { servicefees: [], loading: true },
  action,
) => {
  switch (action.type) {
    case SERVICEFEES_GET_REQUEST:
      return { loading: true }

    case SERVICEFEES_GET_SUCCESS:
      return { loading: false, servicefees: action.payload }

    case SERVICEFEES_GET_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

/* export const servicefeesUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICEFEES_UPDATE_REQUEST:
      return { loading: true }

    case SERVICEFEES_UPDATE_SUCCESS:
      return { loading: false, successfees: true }

    case SERVICEFEES_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case SERVICEFEES_UPDATE_RESET:
      return {}

    default:
      return state
  }
}
 */
