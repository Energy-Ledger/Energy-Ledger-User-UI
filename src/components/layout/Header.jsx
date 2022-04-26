import React, { useEffect, Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/solid'
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom';
import { logout } from "../../actions/auth";
import alertService from "../../services/alert.service";
import { Link } from "react-router-dom";
import blockchainService from "../../services/blockchain.service";
import confirmationService from "../../services/confirmation.service";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProcessingBox from './ProcessingBox';
import configService from '../../services/config.service';
import bridgeService from '../../services/bridge.service';
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}




const Header = () => {
  const location = useLocation();
  const {isLoggedIn, user } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);



  useEffect(() => {

    (async () => {
      if(user?.wallet_address){
        return new Promise(function(resolve,reject){
          Promise.all([ blockchainService.getBlockchainProvider(true),  blockchainService.getBlockchainProvider() , blockchainService.getETHProvider(true) , blockchainService.getETHProvider(),  blockchainService.initContractInstance("dashboard") , blockchainService.initElxContractInstance()]).then(function(data){
            resolve(data);
        });
        });
        
        // await blockchainService.initElxContractInstance()

        }else{
          return new Promise(function(resolve,reject){
            Promise.all([ blockchainService.getBlockchainProvider(true),  blockchainService.getBlockchainProvider() ,  blockchainService.initContractInstance() ]).then(function(data){
              resolve(data);
          });
          });
          
        }
      
      
    })();

  } , [isLoggedIn , user?.wallet_address]);

  useEffect(() => {
    (async () => {
      await window.ethereum.enable();
      let bridgeUrls=[`/${user.role}/exchange`
                      ]
     if(!bridgeUrls.includes(location.pathname)){

    
       if(window.ethereum.networkVersion!==configService.getBlockchainNetworkId()){
         let _confirmResponse=await confirmationService.showAlert(
           "Warning!", 
           "Please select BNB Network",
           "warning"
         );
         if(_confirmResponse.isConfirmed===true){
           console.log(_confirmResponse.isConfirmed)
           let v=await bridgeService.switchUserNetwork("Binance");
          if(v.status==="success"){
            alertService.showSuccess(v.message);
            window.location.reload();
                }else{
            alertService.showError(v.message);
    
          }
        }    
         } 
     }
    })();
  });
 
  const userRole=user?.role;
  // console.log(userRole)

   const dispatch = useDispatch();
   const navigate = useNavigate();

 
  const logOut = async () => {
    let _confirmResponse = await confirmationService.showConfirm(
      "Are you sure?",
      "You want to logout"
    );
    if (_confirmResponse === false) {
      return false;
    } else {
      alertService.showSuccess("You have successfully logged out");
      dispatch(logout());
      navigate("/");
    }
  };
  

    return (
      <header className="flex flex-wrap">
        {message ?<ProcessingBox
        type={message.type}
        message={message.message}
        data={message.data}
        hint={message.hint || ""}
        showOkButton={message.showOkButton}
        />:""}
        <nav className="flex w-screen justify-between bg-white border-b text-gray-600">
          <div className="container p-4 flex justify-between">
            <div className="flex items-center">
              <button className="w-10 h-10 flex items-center justify-center mr-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h7"
                  />
                </svg>
              </button>
              <h2 className="font-semibold text-coalblack text-2xl md:inline-block hidden">
                Welcome to Energy Ledger
              </h2>
            </div>

            <div className="inline-flex">
              {/* <div className="relative mx-4 w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border">
              <a href="#" ><img src="../images/noti-bell.svg" alt="" /></a>
              <span className="px-1 h-4 w-auto rounded-full bg-dark-red text-white text-xs justify-center items-center flex absolute -top-1 -right-2">3</span>
            </div> */}

              {/* <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex justify-center rounded-md bg-white text-sm font-medium text-gray-700  h-10 w-full items-center">
                    <div className="relative mx-4 w-10 h-10 rounded-full bg-gray-50 inline-flex justify-center items-center border">
                      <Link to="#">
                        <img src="../images/noti-bell.svg" alt="" />
                      </Link>
                      <span className="px-1 h-4 w-auto rounded-full bg-dark-red text-white text-xs justify-center items-center flex absolute -top-1 -right-2">
                        3
                      </span>
                    </div>
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="w-full block p-3 border-b border-gray-200">
                      <h3 className="text-base font-semibold">Notifications</h3>
                    </div>
                    <div className="py-1 pl-3 max-h-80 overflow-y-auto">
                      <Menu.Item className="py-3 w-full flex items-center border-b border-gray-200">
                        {({ active }) => (
                          <div className="">
                            <div className="w-8 h-8 min-w-[2rem] inline-flex items-center justify-center mr-2">
                              <img
                                src="../images/profile.svg"
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <p className="text-xs leading-5">
                              <Link to="#" className="font-semibold">
                                Jacks Smith
                              </Link>{" "}
                              has assigned new batch. let’s perform the task
                              <Link
                                to="#"
                                className="text-blue-600 font-medium ml-2"
                              >
                                Update Batch
                              </Link>
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item className="py-3 w-full flex items-center border-b border-gray-200">
                        {({ active }) => (
                          <div className="">
                            <div className="w-8 h-8 min-w-[2rem] inline-flex items-center justify-center mr-2">
                              <img
                                src="../images/profile.svg"
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <p className="text-xs leading-5">
                              <Link to="#" className="font-semibold">
                                Jacks Smith
                              </Link>{" "}
                              has assigned new batch. let’s perform the task
                              <Link
                                to="#"
                                className="text-blue-600 font-medium ml-2"
                              >
                                Update Batch
                              </Link>
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item className="py-3 w-full flex items-center border-b border-gray-200">
                        {({ active }) => (
                          <div className="">
                            <div className="w-8 h-8 min-w-[2rem] inline-flex items-center justify-center mr-2">
                              <img
                                src="../images/profile.svg"
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <p className="text-xs leading-5">
                              <Link to="#" className="font-semibold">
                                Jacks Smith
                              </Link>{" "}
                              has assigned new batch. let’s perform the task
                              <Link
                                to="#"
                                className="text-blue-600 font-medium ml-2"
                              >
                                Update Batch
                              </Link>
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item className="py-3 w-full flex items-center border-b border-gray-200">
                        {({ active }) => (
                          <div className="">
                            <div className="w-8 h-8 min-w-[2rem] inline-flex items-center justify-center mr-2">
                              <img
                                src="../images/profile.svg"
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <p className="text-xs leading-5">
                              <Link to="#" className="font-semibold">
                                Jacks Smith
                              </Link>{" "}
                              has assigned new batch. let’s perform the task
                              <Link
                                to="#"
                                className="text-blue-600 font-medium ml-2"
                              >
                                Update Batch
                              </Link>
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                      <Menu.Item className="py-3 w-full flex items-center border-b border-gray-200">
                        {({ active }) => (
                          <div className="">
                            <div className="w-8 h-8 min-w-[2rem] inline-flex items-center justify-center mr-2">
                              <img
                                src="../images/profile.svg"
                                className="w-full h-full"
                                alt=""
                              />
                            </div>
                            <p className="text-xs leading-5">
                              <Link to="#" className="font-semibold">
                                Jacks Smith
                              </Link>{" "}
                              has assigned new batch. let’s perform the task
                              <Link
                                to="#"
                                className="text-blue-600 font-medium ml-2"
                              >
                                Update Batch
                              </Link>
                            </p>
                          </div>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu> */}

              <div className="relative">
                {/* <img className="absolute top-0 left-0 pointer-events-none" src="../images/profile.svg" alt="" /> */}
                {/* <div className="h-10 w-10 min-w-[64px] rounded-full overflow-hidden absolute top-0 left-0 pointer-events-none">
                <img className="w-full h-full object-cover" src="../images/profile.svg" alt="" />
              </div>
              <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
              <select className="text-gray-600 h-10 pl-12 pr-8 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                <option>Jacks Smith</option>
                <option>Red</option>
                <option>Blue</option>
              </select> */}

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center rounded-md bg-white text-sm font-medium text-gray-700  h-10 w-full items-center">
                      <img
                        className="w-10 h-10 object-cover mr-2"
                        src={user.profileHashUrl || ""}
                        onError={(e) => {
                          e.onerror = null;
                          e.target.src = "../../images/profile.svg";
                        }}
                        alt=""
                      />{" "}
                      {user.name}
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                      {userRole!=='users' &&  <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`${userRole}/settings`}
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              Account settings
                            </Link>
                          )}
                        </Menu.Item>}
                      
                        <Menu.Item>
                          {({ active }) => (
                            <button
                              type="submit"
                              className={classNames(
                                active
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-700",
                                "block w-full text-left px-4 py-2 text-sm"
                              )}
                              onClick={logOut}
                            >
                              Sign out
                            </button>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
}
export default Header