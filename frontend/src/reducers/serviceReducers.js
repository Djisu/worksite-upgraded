import {
  SERVICE_ADD_SUCCESS,
  SERVICE_DELETE_FAIL,
  SERVICE_DELETE_REQUEST,
  SERVICE_DELETE_SUCCESS,
  SERVICE_DETAILS_FAIL,
  SERVICE_DETAILS_REQUEST,
  SERVICE_DETAILS_SUCCESS,
  SERVICE_ENTRY_FAIL,
  SERVICE_ENTRY_REQUEST,
  SERVICE_ENTRY_RESET,
  SERVICE_ENTRY_SUCCESS,
  SERVICE_GET_FAIL,
  SERVICE_GET_REQUEST,
  SERVICE_GET_SUCCESS,
  SERVICE_LIST_FAIL,
  SERVICE_LIST_REQUEST,
  SERVICE_LIST_SUCCESS,
  SERVICE_REVIEW_CREATE_FAIL,
  SERVICE_REVIEW_CREATE_REQUEST,
  SERVICE_REVIEW_CREATE_RESET,
  SERVICE_REVIEW_CREATE_SUCCESS,
  SERVICE_UPDATE_FAIL,
  SERVICE_UPDATE_REQUEST,
  SERVICE_UPDATE_RESET,
  SERVICE_UPDATE_SUCCESS,
} from '../constants/serviceConstants'

export const serviceListReducer = (
  state = { loading: true, services: [] },
  action,
) => {
  switch (action.type) {
    case SERVICE_LIST_REQUEST:
      return { loading: true }

    case SERVICE_LIST_SUCCESS:
      return { loading: false, services: action.payload }

    case SERVICE_LIST_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const serviceDetailsReducer = (
  state = { service: {}, loading: true },
  action,
) => {
  switch (action.type) {
    case SERVICE_DETAILS_REQUEST:
      return { loading: true }

    case SERVICE_DETAILS_SUCCESS:
      return { loading: false, service: action.payload }

    case SERVICE_DETAILS_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const enterServiceDetailsReducer = (
  state = { loading: true, service: {} },
  action,
) => {
  switch (action.type) {
    case SERVICE_ENTRY_REQUEST:
      return { loading: true }

    case SERVICE_ENTRY_SUCCESS:
      return { loading: false, service: action.payload }

    case SERVICE_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case SERVICE_ENTRY_RESET:
      return {}

    default:
      return state
  }
}
export const addToServiceReducer = (
  state = { loading: true, service: {} },
  action,
) => {
  switch (action.type) {
    case SERVICE_ENTRY_REQUEST:
      return { loading: true }

    case SERVICE_ENTRY_SUCCESS:
      return { loading: false, service: action.payload }

    case SERVICE_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case SERVICE_ENTRY_RESET:
      return {}

    case SERVICE_ADD_SUCCESS:
      return { loading: false, success: true }

    default:
      return state
  }
}

export const deleteServiceReducer = (
  state = { loading: true, service: {} },
  action,
) => {
  switch (action.type) {
    case SERVICE_DELETE_REQUEST:
      return { loading: true }

    case SERVICE_DELETE_SUCCESS:
      return { loading: false, service: action.payload }

    case SERVICE_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const getServiceReducer = (
  state = { service: {}, loading: true },
  action,
) => {
  switch (action.type) {
    case SERVICE_GET_REQUEST:
      return { loading: true }

    case SERVICE_GET_SUCCESS:
      return { loading: false, service: action.payload }

    case SERVICE_GET_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}

export const serviceReviewCreateReducer = (
  state = { loading: true, review: {} },
  action,
) => {
  switch (action.type) {
    case SERVICE_REVIEW_CREATE_REQUEST:
      return { loading: true }

    case SERVICE_REVIEW_CREATE_SUCCESS:
      return { loading: false, review: action.payload }

    case SERVICE_REVIEW_CREATE_FAIL:
      return { loading: false, error: action.payload }

    case SERVICE_REVIEW_CREATE_RESET:
      return {}

    default:
      return state
  }
}

export const serviceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case SERVICE_UPDATE_REQUEST:
      return { loading: true }

    case SERVICE_UPDATE_SUCCESS:
      return { loading: false, success: true }

    case SERVICE_UPDATE_FAIL:
      return { loading: false, error: action.payload }

    case SERVICE_UPDATE_RESET:
      return {}

    default:
      return state
  }
}
