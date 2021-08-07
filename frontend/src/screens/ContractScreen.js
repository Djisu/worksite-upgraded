import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Link } from 'react-router-dom'
import { addToContract } from '../actions/contractActions'

import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'

import { storage } from '../firebase'

export default function ContractScreen(props) {
  console.log('props.location.state=', props.location.state)

  let newState
  newState = newState ? props.location.state : ''
  console.log('props.location.state.name: ', props.location.state.name)

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  if (!props) {
    window.alert('You have not selected a service')
    props.history.push(redirect)
  }
  const dispatch = useDispatch()

  const state = {
    button: 1,
  }

  let serviceList = useSelector((state) => state.serviceList)
  let { services } = serviceList

  console.log('services====', services)

  let userSignin = useSelector((state) => state.userSignin)
  let { userInfo } = userSignin

  let userRegister = useSelector((state) => state.userRegister)
  let { loading, error } = userRegister

  let [delay, setDelay] = useState(0)
  let [transDate, setTransDate] = useState(new Date())
  let [completeDate, setCompleteDate] = useState(new Date())
  let [description, setDescription] = useState('')
  let [documents, setDocuments] = useState([])
  let [comments, setComments] = useState('')
  let [quantity, setQuantity] = useState(0)

  let [user, setUser] = useState(userInfo._id)
  let [serviceEmail, setServiceEmail] = useState(props.location.state.email)
  let [email, setEmail] = useState(userInfo.email)
  let [telno, setTelno] = useState(userInfo.telno)

  let unitPrice = 0
  unitPrice = unitPrice ? props.location.state.unitPrice : 0

  let servid = ''
  servid = servid ? props.location.state._id : ''

  let [totalCost, setTotalCost] = useState(0)
  let [isPaid, setIsPaid] = useState(false)
  let [isCompleted, setIsCompleted] = useState(false)
  let [service, setService] = useState(props.location.state.name) //props.location.state._id
  let [imagex, setImagex] = useState(props.location.state.image)

  //let user = ''
  /* user = user ? userInfo._id : ''
 setUser(user) */

  //let serviceEmail = ''
  /*  serviceEmail = serviceEmail ? props.location.state.email : ''
  setServiceEmail(serviceEmail) */

  // let email = ''
  /*  email = email ? userInfo.email : ''
  setEmail(email) */

  //let telno = ''
  /*  telno = telno ? userInfo.telno : ''
  setTelno(telno) */

  /* let serviceName = ''
  serviceName = serviceName ? props.location.state.name : '' */

  const [image, setImage] = useState(null)
  const [url, setUrl] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const handleServiceChange = (e) => {
    setService(e.target.value)
  }

  useEffect(() => {
    if (!userInfo) {
      props.history.push(redirect)
    }
  }, [props.history, redirect, userInfo]) //

  const submitHandler = (e) => {
    e.preventDefault()

    if (state.button === 1) {
      console.log('instate.button === 1 uploadImage')

      const uploadTask = storage.ref(`images/${image.name}`).put(image)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
          )
          setProgress(progress)
        },
        (error) => {
          console.log(error)
        },
        () => {
          storage
            .ref('images')
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setUrl(url)
            })
        },
      )

      console.log('After waiting', documents)
    }

    if (state.button === 3) {
      console.log('in state.button === 3')

      if (
        documents.includes(document.querySelector('img').src) !==
        'http://via.placeholder.com/200X200'
      ) {
        setDocuments((documents) => [
          ...documents,
          document.querySelector('img').src,
        ])
        console.log('documents====', documents)
      } else {
        console.warn('document already selected. select another document')
      }
    }

    if (state.button === 2) {
      console.log('in state.button === 2 ')

      // setService(props.location.state.name)

      console.log('description=', description)

      //delay = parseInt(delay)
      console.log('delay again is===', delay)

      let myDate = new Date()
      let newDate = new Date(myDate.setDate(myDate.getDate() + delay))

      console.log('newDate=', newDate)

      const varTotalCost = quantity * props.location.state.unitPrice

      console.log('varTotalCost======', varTotalCost)

      setTransDate(new Date())
      setCompleteDate(newDate)
      setComments('No comments for now')
      setIsPaid(false)
      setIsCompleted(false)
      //setService(props.location.state.name) //props.location.state._id
      //setQuantity(quantity)
      console.log('service name==', service)

      setTotalCost(quantity * props.location.state.unitPrice)

      console.log('documents:', documents)

      console.log('totalCost======', totalCost)

      if (!delay) {
        alert('Enter the expected days')
      } else if (!description) {
        alert('Enter the contract description')
      } else if (!quantity) {
        alert('Enter the quantity expected')
      } else if (!services[0].unitPrice) {
        alert('Unit Price cannot be empty')
      } else if (!totalCost) {
        alert('Total cost cannot be empty')
      }

      dispatch(
        addToContract(
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
          imagex,
        ),
      )
      props.history.push('/')
      //Initialize states here
      /*  setDelay(0)
      setDescription('')
      setDocuments([])
      setComments('')
      setQuantity(0)
      setTotalCost(0) */
    }
  }

  return (
    <div>
      <Link to="/">Back to results</Link>
      <div className="col-2">
        {!services && <h4>No service selected yet</h4>}

        {!userInfo && (
            <h4 style={{ color: 'red' }}>
              Register before request for service
            </h4>
          ) &&
          props.history.push(redirect)}

        {!services && props.history.push(redirect)}

        {loading && <LoadingBox></LoadingBox>}
        {error && <MessageBox variant="danger">{error}</MessageBox>}

        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Create New Contract</h1>
          </div>
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <img
              className="medium"
              src={props.location.state.image}
              alt={props.location.state.name}
            />
          </div>
          Service selected: {props.location.state.name}
          <div>
            <label>
              Give the number of days to complete contract
              <br />
              <input
                type="number"
                id="delay"
                placeholder="Number of days"
                requires
                onBlur={(e) => console.log('onBlur delay=', e.target.value)}
                onChange={(e) => setDelay(e.target.value)}
              ></input>
            </label>
          </div>
          <br />
          <div>
            <label>
              Give details of work to be done
              <br />
              <textarea
                type="text"
                id="description"
                placeholder="Decribe what to be done"
                requires
                onBlur={(e) => console.log('description====', description)}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </label>
          </div>
          <br />
          <label style={{ color: 'blue' }}>
            {' '}
            Unit Price: {props.location.state.unitPrice}
          </label>
          <div>
            <label>
              State quantity to be produced
              <br />
              <input
                type="number"
                id="quantity"
                placeholder="Enter the quantity needed"
                requires
                onBlur={(e) =>
                  setTotalCost(props.location.state.unitPrice * e.target.value)
                }
                onChange={(e) => setQuantity(e.target.value)}
              ></input>
            </label>
          </div>
          <label style={{ color: 'blue' }}>
            {' '}
            Total Cost: {props.location.state.unitPrice * quantity}
          </label>
          <div>
            <div>
              <progress value={progress} max="100" />
              <br />
              <input
                type="file"
                placeholder="Select and drag image url here."
                onChange={handleChange}
              />
              <button
                className="primary"
                type="submit"
                onClick={() => (state.button = 1)}
              >
                Upload Image
              </button>
              <br />
              {url}
              <br />
              <button
                className="primary"
                type="submit"
                onClick={() => (state.button = 3)}
              >
                Add Image to Image List
              </button>
              <br />
              <br />
              <img
                className="medium"
                src={url || 'http://via.placeholder.com/300'}
                alt="firebase-images"
              />
              <br />
              Copy image link and paste it in upload work documents
            </div>
          </div>
          <br />
          <button
            className="primary"
            type="submit"
            onClick={() => (state.button = 2)}
          >
            Add Contract
          </button>
          <div>
            <h4>Documents List:</h4>
            {documents.map((document) => (
              <p key={document}>{document}</p>
            ))}
          </div>
          <div>
            <label />
            <div>
              Already have an account?{' '}
              <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
