import React from 'react'
//import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsContract } from '../actions/contractActions'
//import ServiceList from '../components/ServiceList'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { deleteContract } from '../actions/contractActions'

function ContractListScreen(props) {
  const dispatch = useDispatch()

  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  //console.log('userInfo.email:', userInfo.email)

  const contractDetails = useSelector((state) => state.contractDetails)

  // console.log('contractDetails========================', contractDetails)

  const { loading, error, contract } = contractDetails

  // console.log('loading, error==', loading, error)  //Object.keys(service)
  // console.log('contracts:XXXXXX', contract)

  const removeFromContractHandler = (id) => {
    //delete action
    console.log('in  removeFromContractHandler = (contract._id)', id)
    dispatch(deleteContract(id))

    dispatch(detailsContract(userInfo.email))
  }

  /*  useEffect(() => {
    console.log('in dispatch(detailsContract(userInfo.email))')

    dispatch(detailsContract(userInfo.email))
  }, [dispatch, userInfo.email]) */

  return (
    <div>
      <Link to="/">Back to results</Link>
      {!contract && <h3>No contracts here!!</h3>}
      {!contract && !loading}
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">This is error: {error}</MessageBox>
      ) : (
        contract && (
          <div className="row center">
            {contract.map((item) => (
              <div key={item._id} className="card">
                {/* <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <img className="medium" src={item.image} alt={item.name} />
                </div> */}
                <div className="card-body">
                  {/* <span>{category}</span> */}
                  <br />
                  <br />
                  <ul>
                    {/*  <li>
                      <span>{item.service}</span>
                    </li> */}
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
                    className="primary"
                    onClick={() => removeFromContractHandler(item._id)}
                  >
                    Delete
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
