import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
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
    if (window.confirm('Do you want to delete contract?') == false) {
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
  }, [contractDetails])

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
          <div className="row center">
            {contract.map((item) => (
              <div key={item._id} className="card">
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <img className="medium" src={item.image} alt={item.name} />
                </div>
                <div className="card-body">
                  <br />
                  <br />
                  <ul>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>
                        {' '}
                        Service Name: {item.service}
                      </span>
                    </li>
                    <li>
                      <span style={{ fontWeight: 'bold' }}>
                        Description:{item.description}
                      </span>
                    </li>
                    <br />
                    <li>
                      Contract Documents:
                      <span>
                        {item.documents.map((document, index) => (
                          <li key={index}>
                            <a href={document} target="blank">
                              Click to download document
                            </a>
                          </li>
                        ))}
                      </span>
                    </li>
                    <br />
                    <li>
                      <span>Unit Price: {item.unitPrice}</span>
                    </li>
                    <li>
                      <span>Quantity Requested: {item.quantity}</span>
                    </li>
                    <li>
                      <span>Total Cost: {item.totalCost}</span>
                    </li>
                  </ul>
                  <br />
                  <br />
                  <button
                    className="delete block"
                    onClick={() => removeFromContractHandler(item._id)}
                  >
                    Delete
                  </button>
                  <br />
                  <br />
                  <button
                    className="primary block"
                    onClick={() => editContractHandler(item)}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  )
}

export default ContractListScreen
