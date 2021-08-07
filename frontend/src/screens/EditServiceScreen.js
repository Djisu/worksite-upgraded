//THIS FUNCTION IS USED TO MAKE CHANES TO AN EXISTING SERVICE.
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { detailsService, updateService } from '../actions/serviceActions'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import { SERVICE_UPDATE_RESET } from '../constants/serviceConstants'
import { storage } from '../firebase'

export default function ServiceScreen(props) {
  const serviceId = props.location.state.id
  const category = props.location.state.category
  const picture = props.location.state.image

  console.log('picture=', picture)

  //const [category, setCategory] = useState('') //
  const [name, setName] = useState('')
  let [image, setImage] = useState([])
  const [unitPrice, setUnitPrice] = useState(0)
  const [description, setDescription] = useState('')
  let [delay, setDelay] = useState(0)
  const [transdate, setTransDate] = useState()
  const [photo, setPhoto] = useState('')

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const { loading, error, service } = serviceDetails

  //console.log('props.location.state is=oooooooooooo', props.location.state)

  const serviceUpdate = useSelector((state) => state.serviceUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = serviceUpdate

  const dispatch = useDispatch()

  const flag = {
    button: 1,
  }

  useEffect(() => {
    if (successUpdate) {
      props.history.push('/servicelist')
    }
    if (!service || service._id !== serviceId || successUpdate) {
      dispatch({ type: SERVICE_UPDATE_RESET })
      dispatch(detailsService(serviceId))
    } else {
      //setCategory(props.location.state.category)
      setName(service.name)
      setImage(service.image)
      setUnitPrice(service.unitPrice)
      setDescription(service.description)
      setDelay(service.delay)
    }
  }, [dispatch, successUpdate, props.history]) // [service, dispatch, serviceId, successUpdate, props.history])

  const rating = 0
  const numReviews = 0

  const redirect = props.location.search
    ? props.location.search.split('=')[1]
    : '/'

  const [url, setUrl] = useState(null)
  const [progress, setProgress] = useState(0)

  const handleChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0])
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (flag.button === 1) {
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
      //return //image
    }

    if (flag.button === 2) {
      console.log('in state.button === 2 submit form')
      // setEmail(userInfo.email)
      if (delay === 0) {
        console.log('Delay not found!!')
        return
      }
      if (delay > 0) {
        console.log('delay===', delay)

        delay = parseInt(delay)

        let myDate = new Date()
        let newDate = new Date(myDate.setDate(myDate.getDate() + delay))

        setTransDate(new Date())
        //setExpireDate(newDate)
      }

      if (
        document.querySelector('img').src ===
        'http://via.placeholder.com/200X200'
      ) {
        console.log('in submitHandler no image selected')
        return
      }

      setPhoto(document.querySelector('img').src)

      if (photo === 'http://via.placeholder.com/200X200') {
        return
      }

      image = document.querySelector('img').src

      console.log('delay=================', delay)

      console.log('about to dispatch(updateService ', {
        _id: serviceId,
        name,
        image,
        unitPrice,
        description,
        delay,
      })
      dispatch(
        updateService({
          _id: serviceId,
          name,
          image,
          unitPrice,
          description,
          delay,
        }),
      )
    }
  }

  return (
    <div>
      <Link to="/serviceList">Back to results</Link>
      <div className="col-2">
        <form className="form" onSubmit={submitHandler}>
          <div>
            <h1>Edit Old Service</h1>
          </div>
          {/* {!userInfo && <h4>Add email address to your profile</h4>} */}
          {loadingUpdate && <LoadingBox></LoadingBox>}
          {errorUpdate && <MessageBox variant="danger">{error}</MessageBox>}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <img
                  className="medium"
                  src={picture}
                  alt={props.location.state.name}
                />
              </div>
              Service Id: {serviceId}
              <div>
                <label>
                  Give your service a nice name
                  <br />
                  <input
                    type="text"
                    id="name"
                    placeholder="Name"
                    // value={props.location.state.name}
                    onChange={(e) => setName(e.target.value)}
                  ></input>
                </label>
              </div>
              <br />
              <div>
                <label>
                  Describe your service
                  <br />
                  <textarea
                    type="text"
                    id="description"
                    placeholder="Description"
                    // value={props.location.state.description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </label>
              </div>
              <br />
              <br />
              <div>
                <label>
                  State the unit price of your service <br />
                  <input
                    type="float"
                    id="unitPrice"
                    placeholder="Enter the unit price for your service"
                    // value={props.location.state.unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                  ></input>
                  per contract/day/hour: state in description
                </label>
              </div>
              <br />
              <div>
                <label>
                  Give the number of days to display your service
                  <br />
                  <input
                    type="number"
                    id="delay"
                    placeholder="Number of days"
                    onChange={(e) => setDelay(e.target.value)}
                  ></input>
                </label>
              </div>
              <br />
              <br />
              {/*  Owner's Email: {service.email}
              <br /> */}
              <br />
              <br />
              <br />
              <label />
              <button
                className="primary"
                type="submit"
                onClick={() => (flag.button = 2)}
              >
                Update Service
              </button>
              <div>
                <label />
                <div>
                  Already have an account?{' '}
                  <Link to={`/signin?redirect=${redirect}`}>Sign-In</Link>
                </div>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  )
}
