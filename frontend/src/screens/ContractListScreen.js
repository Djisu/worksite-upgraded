import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
//import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import { detailsContract } from '../actions/contractActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deleteContract } from '../actions/contractActions'

function ContractListScreen(props) {
  const dispatch = useDispatch()
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin
  const contractDetails = useSelector((state) => state.contractDetails)
  const { loading, error, contract } = contractDetails

  const removeFromContractHandler = (_id) => {
    //Confirm deletion
    if (window.confirm('Do you want to delete contract?') === false) {
      return
    }

    dispatch(deleteContract(_id))
    dispatch(detailsContract(userInfo.email))
    props.history.push('/')
  }

  const editContractHandler = (item) => {
    props.history.push('/editContract', item)
  }

  useEffect(() => {
    dispatch(detailsContract(userInfo.email))
  }, [dispatch, userInfo.email])

  useEffect(() => {
    if (!contractDetails) {
      alert('You have NO contracts yet')
      props.history.push('/')
    }
  }, [contractDetails, props.history])

  return (
    <div>
      <Link to="/">Back to results</Link>
      {!contract && <h3 style={{ color: 'red' }}>No contracts here!!</h3>}
      {!contract && !loading && <h3>No contracts for you found</h3>}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        contract && (
          <table className="table">
            <thead style={{ backgroundColor: 'blueviolet', color: 'white' }}>
              <tr>
                <th>IMAGE</th>
                <th>SERVICE NAME</th>
                <th>DESCRIPTION</th>
                <th>DOCUMENTS LIST</th>
                <th>UNIT PRICE</th>
                <th>QUANTITY</th>
                <th>TOTAL COST</th>
                <th>ACTIVITY</th>
              </tr>
            </thead>
            {contract.map((item) => (
              <tr key={item._id}>
                <td style={{ textAlign: 'center', padding: '2rem' }}>
                  <img className="small" src={item.image} alt={item.name} />
                </td>
                <td>{item.service}</td>
                <td>{item.description}</td>
                <td>
                  {item.documents.map((document, index) => (
                    <li key={index} style={{ fontSize: '10px' }}>
                      <a href={document} target="blank">
                        Click to download document
                      </a>
                    </li>
                  ))}
                </td>
                <td>{item.unitPrice}</td>
                <td>{item.quantity}</td>
                <td>{item.totalCost}</td>
                <td>
                  <button
                    className="delete small"
                    onClick={() => removeFromContractHandler(item._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="primary small"
                    onClick={() => editContractHandler(item)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </table>
        )
      )}
    </div>
  )
}

export default ContractListScreen
