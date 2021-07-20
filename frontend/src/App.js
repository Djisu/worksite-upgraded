import React from 'react'
import { Link } from 'react-router-dom'
import { BrowserRouter, Route } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen'
import ServiceScreen from './screens/ServiceScreen'

import ServiceListScreen from './screens/ServiceListScreen'
/* import ShippingAddressScreen from './screens/ShippingAddressScreen'
import PaymentMethodScreen from './screens/PaymentMethodScreen' */

//import CartScreen from './screens/CartScreen'
import { useDispatch, useSelector } from 'react-redux'
import SigninScreen from './screens/SigninScreen'
import RegisterScreen from './screens/RegisterScreen'
import ContractScreen from './screens/ContractScreen'
import { signout } from './actions/userActions'
/* import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import OrderHistoryScreen from './screens/OrderHistoryScreen' */
import ProfileScreen from './screens/ProfileScreen'
import PrivateRoute from './components/PrivateRoute'
import ContractListScreen from './screens/ContractListScreen'
import RateServiceScreen from './screens/RateServiceScreen'
import EditServiceScreen from './screens/EditServiceScreen'
import EditContractScreen from './screens/EditContractScreen'
// import { detailsContract } from './actions/contractActions'
//import { detailsService } from './actions/serviceActions'

function App() {
  const userSignin = useSelector((state) => state.userSignin)
  const { userInfo } = userSignin

  const contract = useSelector((state) => state.contract)
  const { contractDetails } = contract

  const serviceDetails = useSelector((state) => state.serviceDetails)
  const { loading, error, service } = serviceDetails || ''

  const dispatch = useDispatch()

  /* useEffect(() => {
    if (contractDetails) {
      console.log('in useEffect')
      dispatch(detailsContract(userInfo.email))
    }
  }, [dispatch, contractDetails, userInfo.email]) */

  const signoutHandler = () => {
    console.log('About to signout')
    dispatch(signout())
  }

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link className="brand" to="/">
              iwork
            </Link>
          </div>
          <div>
            {contractDetails.length > 0 && (
              <span className="badge">{contractDetails.length}</span>
            )}
            {userInfo ? (
              // {userInfo.employmentStatus !== "Employer"
              <div className="dropdown">
                <Link to="#">
                  {userInfo.name} <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/profile">User Profile</Link>
                  </li>

                  <li>
                    <Link to="#signout" onClick={signoutHandler}>
                      Sign Out
                    </Link>
                  </li>
                </ul>
                {userInfo && userInfo.employmentStatus === 'Employee' && (
                  <div className="dropdown">
                    <ul
                      className="dropdown-content"
                      style={{ fontSize: '10px', textAlign: 'left' }}
                    >
                      {!service ? (
                        <h3>No service found for you</h3>
                      ) : (
                        <div className="dropdown">
                          <li>
                            <Link to="/Service">Enter your service</Link>
                          </li>
                          <li>
                            <Link to="/serviceList">List your services</Link>
                          </li>
                          <li>
                            <Link to="/contractlist">List your Contracts</Link>
                          </li>
                          <li>
                            <Link to="/editService">Edit your Service</Link>
                          </li>
                          <li>
                            <Link to="/editContract">Edit your Contract</Link>
                          </li>
                        </div>
                      )}

                      <li>
                        <Link to="/profile">User Profile</Link>
                      </li>

                      <li>
                        <Link to="#signout" onClick={signoutHandler}>
                          Sign Out
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
                {/* </ul> */}
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}

            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <Link to="#admin">
                  Admin <i className="fa fa-caret-down"></i>
                </Link>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  {/* <li>
                    <Link to="/servicelist">Services</Link>
                  </li> */}
                  {/* <li>
                    <Link to="/contractlist">Contracts</Link>
                  </li> */}
                  <li>
                    <Link to="/userlist">Users</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main>
          {/* <Route path="/cart/:id?" component={CartScreen}></Route> */}
          {/* <Route path="/service/:id" component={ServiceScreen}></Route> */}
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/service" component={ServiceScreen}></Route>
          <Route path="/serviceList" component={ServiceListScreen}></Route>

          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/register" component={RegisterScreen}></Route>
          <Route path="/contract" component={ContractScreen}></Route>
          <Route path="/contractList" component={ContractListScreen}></Route>
          <Route path="/rateService" component={RateServiceScreen}></Route>
          <Route path="/editService" component={EditServiceScreen}></Route>
          <Route path="/editContract" component={EditContractScreen}></Route>
          {/*  <Route path="/shipping" component={ShippingAddressScreen}></Route>
          <Route path="/payment" component={PaymentMethodScreen}></Route>
          <Route path="/placeorder" component={PlaceOrderScreen}></Route>
          <Route path="/order/:id" component={OrderScreen}></Route>
          <Route path="/orderhistory" component={OrderHistoryScreen}></Route> */}

          <PrivateRoute
            path="/profile"
            component={ProfileScreen}
          ></PrivateRoute>
        </main>
        <footer className="row center">
          Copyright &copy; {new Date().getFullYear()} iwork
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
