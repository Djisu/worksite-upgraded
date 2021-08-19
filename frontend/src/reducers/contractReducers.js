import {
  CONTRACT_DELETE_FAIL,
  CONTRACT_DELETE_REQUEST,
  CONTRACT_DELETE_SUCCESS,
  CONTRACT_DETAILS_FAIL,
  CONTRACT_DETAILS_REQUEST,
  CONTRACT_DETAILS_SUCCESS,
  CONTRACT_ENTRY_FAIL,
  CONTRACT_ENTRY_REQUEST,
  CONTRACT_ENTRY_RESET,
  CONTRACT_ENTRY_SUCCESS,
  CONTRACT_LIST_FAIL,
  CONTRACT_LIST_REQUEST,
  CONTRACT_LIST_SUCCESS,
} from '../constants/contractConstants'

export const contractListReducer = (
  state = { loading: true, contracts: [] },
  action,
) => {
  switch (action.type) {
    case CONTRACT_LIST_REQUEST:
      return { loading: true }
    case CONTRACT_LIST_SUCCESS:
      return { loading: false, contracts: action.payload }
    case CONTRACT_LIST_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const contractDetailsReducer = (
  state = { contract: {}, loading: true },
  action,
) => {
  switch (action.type) {
    case CONTRACT_DETAILS_REQUEST:
      return { loading: true }

    case CONTRACT_DETAILS_SUCCESS:
      return { loading: false, contract: action.payload }

    case CONTRACT_DETAILS_FAIL:
      return { loading: false, error: action.payload }
      
    default:
      return state
  }
}

/* export const enterContractDetailsReducer = (
  state = { loading: true, contract: {} },
  action,
) => {
  switch (action.type) {
    case CONTRACT_ENTRY_REQUEST:
      return { loading: true }

    case CONTRACT_ENTRY_SUCCESS:
      return { loading: false, contract: action.payload }

    case CONTRACT_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case CONTRACT_ENTRY_RESET:
      return {}

    default:
      return state
  }
} */
export const addToContractReducer = (
  state = { loading: true, contract: {} },
  action,
) => {
  switch (action.type) {
    case CONTRACT_ENTRY_REQUEST:
      return { loading: true }

    case CONTRACT_ENTRY_SUCCESS:
      return { loading: false, contract: action.payload }

    case CONTRACT_ENTRY_FAIL:
      return { loading: false, error: action.payload }

    case CONTRACT_ENTRY_RESET:
      return {}

    default:
      return state
  }
}

export const deleteContractReducer = (
  state = { loading: true, contract: {} },
  action,
) => {
  switch (action.type) {
    case CONTRACT_DELETE_REQUEST:
      return { loading: true }

    case CONTRACT_DELETE_SUCCESS:
      return { loading: false, contract: action.payload }

    case CONTRACT_DELETE_FAIL:
      return { loading: false, error: action.payload }

    default:
      return state
  }
}
