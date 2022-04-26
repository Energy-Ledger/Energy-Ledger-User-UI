import React, { useEffect,useState } from 'react';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import BatchListing from '../views/batches/BatchListing';
import elxService from "../services/elx.service";
import blockchainService from "../services/blockchain.service";
import Spinner from "../components/common/Spinner";
import alertService from "../services/alert.service";
// import AuditorUpdateBatch from "./batches/AuditorUpdateBatch"
import configService from "../services/config.service";
import confirmationService from '../services/confirmation.service';
import { useDispatch } from "react-redux";
import { logout } from "../actions/auth";


const UserDashboard = () => {
    const dispatch = useDispatch();

    const { isLoggedIn, user } = useSelector(state => state.auth);
    const { batches } = useSelector(state => state);
    const [loading, setLoading] = useState(false);
    const [elxBalance, setElxBalance] = useState(0);
    const [bnbBalance, setBnbBalance] = useState(0);
    const [isMetaConnect, setIsMetaConnect] = useState(true);
    const profileHashUrl = configService.createIpfsUrl(user.profileHash);

    useEffect(() => {

        (async () => {
          const connectedWallet=await blockchainService.getConnectedAddress();
          if(user?.wallet_address){
              if(connectedWallet!==user?.wallet_address){
                
                setIsMetaConnect(true)

                let _confirmResponse =  await confirmationService.showAlert(
                    "Error!", 
                    "Please login to metamask OR Connect with valid user",
                    "warning",
                    true
                  ); 
                  if (_confirmResponse) {
                    dispatch(logout());
                    alertService.showSuccess('User logout successfully');
                  }
            }else{
              setIsMetaConnect(false)
    
            }
          }
          
        })();
    
      } , [isLoggedIn , user?.wallet_address]);

    useEffect(() => {    
        const getElxPrice = async () => {
          setLoading(true);
          try {
            //   alert(isMetaConnect)
              if(!isMetaConnect){
                  let balance = await elxService.getElxBalance(user.wallet_address);
                  setElxBalance(balance)
                  setLoading(false);
                }
                  
            
          } catch (error) {
            setLoading(false);
            alertService.showError(error.message);
          }
        };

        // get BNB balance
        const getBnbBalance = async () => {

            try {
            let _walletDetails = await blockchainService.getWalletDetails();
            let _bnbBalance = Number(_walletDetails.data.walletBalance);
            _bnbBalance = _bnbBalance.toFixed(4);
            setBnbBalance(_bnbBalance)
            
            } catch (error) {

            alertService.showError(error.message);
            }
        };
  
      (async () => {
        await  getElxPrice();
        await  getBnbBalance();
        })();    
    }, [isMetaConnect, user.wallet_address]);
    return (
        <div className="">
                        {loading && <Spinner/>}

             {/* <AuditorUpdateBatch showAuditorModal={showAuditorModal} setShowAuditorModal={setShowAuditorModal}/> */}
            <div className="content text-coalblack">
                <div className="bg-white rounded-xl border shadow-sm p-6 mb-8">
                    <div className="inline-flex items-center max-w-full w-full">
                        <div className="h-16 w-16 min-w-[4rem] rounded-full overflow-hidden">
                            <img className="w-full h-full object-cover" 
                            src={profileHashUrl || ""}
                            onError={ (e)=>{e.onerror = null; e.target.src= "../../images/profile.svg";}}
                            alt="" />
                        </div>
                        <div className="ml-3 w-full max-w-full overflow-hidden">
                            <h4 className="text-xl font-semibold text-coalblack capitalize">{ user.role.charAt(0).toUpperCase()+ user.role.slice(1)}</h4>
                            <p className="text-sm font-medium truncate ">{user.wallet_address}</p>
                        </div>
                    </div>
                </div>
                {/* cards */}
                <div className="mb-8">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Contact No</h6>
                            <h2 className="text-xl font-semibold my-1">{user.contactNo}</h2>
                        </div>

                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Role</h6>
                            <h2 className="text-xl font-semibold my-1">{ user.role.charAt(0).toUpperCase()+ user.role.slice(1)}</h2>
                        </div>
                        <Link
                        to={`/${user.role}/batches`}
                        >
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Total Batches</h6>
                            <h2 className="text-xl font-semibold my-1">{ batches.totalBatches}</h2>
                        </div>
                        </Link>
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">ELX Balance</h6>
                            <h2 className="text-xl font-semibold my-1">{elxBalance}</h2>
                        </div>
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-blue-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">BNB Balance</h6>
                            <h2 className="text-xl font-semibold my-1">{bnbBalance}</h2>
                        </div>

                        {/* <div className="p-6 absolute right-2">
                        <Link to={`/${user.role}/settings`} type="button" className="text-center mb-3 px-4 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex mr-3">
                            <img src="../images/wh-edit.svg" alt="" />
                            <span className="ml-2 text-xs font-semibold">Edit</span>
                        </Link>
                        </div> */}
                    </div>
                </div>
                {!isMetaConnect &&
                <BatchListing isDashboard={true}/> }

                {/* table */}
              
            </div>
        </div>
    )
}
export default UserDashboard