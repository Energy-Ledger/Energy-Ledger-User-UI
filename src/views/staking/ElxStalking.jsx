import React, { useEffect, useState } from 'react';
import Spinner from "../../components/common/Spinner";
import alertService from "../../services/alert.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../components/common/TextError";
import stakingService from "../../services/staking.service";
import confirmationService from "../../services/confirmation.service";
import { useSelector , useDispatch} from "react-redux";

import * as Yup from "yup";
import userService from '../../services/user.service';
import { setMessage } from '../../actions/message';
import elxService from '../../services/elx.service';
import userApiService from '../../services/userApi.service';
import blockchainService from '../../services/blockchain.service';


const ELX_stalking = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [refreshList, setRefreshList] = useState(0);
    const [rewardOfBalance, setRewardOfBalance] = useState(0);

    const [elxBalance, setElxBalance] = useState(0);
    const [elxStakingBalance, setElxStakingBalance] = useState("");
    useEffect(() => {
        const getStakingBalance = async () => {
            setLoading(true);
            try {
                let balance = await stakingService.getStakingBalance(user.wallet_address);
                setElxStakingBalance(balance.balance)
                let _elxbalance = await elxService.getElxBalance(user.wallet_address);
                setElxBalance(_elxbalance)

                setRewardOfBalance(balance.rewardOfBalance)
                setLoading(false);

            } catch (error) {
                setLoading(false);
                alertService.showError(error.message);
            }
        };

        (async () => {
            await getStakingBalance();
        })();
    }, [refreshList, user.wallet_address]);

    const initialValues = {
        _stake: "",

    };
    const initialValuesForRemove = {
        _stakeReturn: "",

    };

    const validationSchema = Yup.object().shape({
        _stake: Yup.number()
        .required("ELX Amount is required")
        .typeError('you must specify a number')
        .moreThan(0, 'Min value 0.')
        .max(elxBalance, `Remove staked amount should be less than ${elxBalance}.`)     

                
        });
   
    const validationSchemaForRemove = Yup.object().shape({
        _stakeReturn: Yup.number()
        .required("ELX Amount is required")
        .typeError('you must specify a number')
        .moreThan(0, 'Min value 0.')     
        .max(elxStakingBalance, `Remove staked amount should be less than ${elxStakingBalance}.`)     
        });

    const addStaking = async (_formInput , {resetForm}) => {
        try {
            setLoading(true)
            let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
            if(checkAllowance.status==='success'){
            let _response = await stakingService.createStaking(_formInput);
            if (_response.status === "failure") {
                alertService.showError(_response.message);
                setLoading(false);
                return false;
              }    
                
              let _txHash = _response.data.hash;
            
              let pendingMsg = {
                status: true,
                type: "pending",
                message: "Your transaction is in process",
                data: _txHash,
                showOkButton: false,
              }
              dispatch(setMessage(pendingMsg));   
              setLoading(false)
        
              await _response.data.wait();
     
            //  get block number and create stake in db

            const publicProvider = await blockchainService.getPublicProvider();
            const txInfo = await publicProvider.getTransaction(_txHash);
            let insertCreateStake = await userApiService.insertCreateStake(txInfo.blockNumber);

              let completeMsg = {
                status: true,
                type: "success",
                message: _response.message,
                data: _txHash,
                showOkButton: true,
              }
              dispatch(setMessage(completeMsg));
              setRefreshList(oldKey => oldKey +1)
              resetForm({_formInput:''})
        }else{
            setLoading(false)
            alertService.showError(checkAllowance.message);
        }
        } catch (error) {

            alertService.showError(error.message);

        }
    }
    const removeStaking = async (_formInput  , {resetForm}) => {
        try {
            // console.log(_formInput);
            setLoading(true)
            let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
            if(checkAllowance.status==='success'){
            let _response = await stakingService.removeStaking(_formInput);

            if (_response.status === "failure") {
                alertService.showError(_response.message);
                setLoading(false);
                return false;
              }
        
             let _txHash=_response.data.hash;
            
              let pendingMsg = {
                status: true,
                type: "pending",
                message: "Your transaction is in process",
                data: _txHash,
                showOkButton: false,
              }
              dispatch(setMessage(pendingMsg));   
              setLoading(false)
        
              await _response.data.wait();

            //  get block number and remove stake in db
        
              const publicProvider = await blockchainService.getPublicProvider();
              const txInfo = await publicProvider.getTransaction(_txHash);
              let insertRemoveStake = await userApiService.insertRemoveStake(txInfo.blockNumber);

              let completeMsg={
                status: true,
                type: "success",
                message: _response.message,
                data: _txHash,
                showOkButton: true,
              }
              dispatch(setMessage(completeMsg));
              setRefreshList(oldKey => oldKey +1)
              resetForm({_formInput:''})

        }else{
            setLoading(false)
            alertService.showError(checkAllowance.message);
        }
        } catch (error) {

            alertService.showError(error.message);

        }
    }
    const WithdrawReward=async()=>{
        let _confirmResponse = await confirmationService.showConfirm(
            "Are you sure!", 
            "You want to withdraw Rewards"
          );
          if(_confirmResponse){
            try {
                setLoading(true)
                let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
                if(checkAllowance.status==='success'){

                let _response = await stakingService.withdrawReward();
                if (_response.status === "failure") {
                    alertService.showError(_response.message);
                    setLoading(false);
                    return false;
                  }
            
                
                  let pendingMsg={
                    status: true,
                    type: "pending",
                    message: "Your transaction is in process",
                    data: _response.data.hash,
                    showOkButton: false,
                  }
                  dispatch(setMessage(pendingMsg));   
                  setLoading(false)
            
                  await _response.data.wait();
            
                  let completeMsg={
                    status: true,
                    type: "success",
                    message: _response.message,
                    data: _response.data.hash,
                    showOkButton: true,
                  }
                  dispatch(setMessage(completeMsg));
                  setRefreshList(oldKey => oldKey +1)
            }else{
                setLoading(false)
                alertService.showError(checkAllowance.message);
            }
         
            } catch (error) {
    
                alertService.showError(error.message);
    
            }
        }
        }
    return (

        <div className="">
                        <div className="mb-8">
                    <div className="grid lg:grid-cols-2 px-20 grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Staked Amount</h6>
                            <h2 className="text-xl font-semibold my-1">{elxStakingBalance} ELX</h2>
                        </div>
                      
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Reward Balance</h6>
                            <h2 className="text-xl font-semibold my-1">{rewardOfBalance} ELX  <span className="ml-2">
                    <button type="button" title="You got the reward but but didn't withdrawal">
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
                          d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </button>
                  </span></h2>
                  {rewardOfBalance > 0 && <button type="button" onClick={WithdrawReward} className="text-sm w-full mt-4 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                                    <span className="text-center mx-auto text-sm font-semibold">Withdraw Reward</span>
                                </button> }
                        </div>
                        {/* <div className="bg-white rounded-xl border shadow-sm p-6">
                           
                            <button type="button" onClick={WithdrawReward} className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                                    <span className="text-center mx-auto text-sm font-semibold">Withdraw Reward</span>
                                </button>
                        </div> */}
                        </div>
                        </div>
                        <div className="grid lg:grid-cols-2 grid-cols-1 gap-4 justify-center items-center h-full">

                        {loading && <Spinner/>}
            <div className="relative w-full block max-w-full ">
                {/*content*/}
                <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    {/*body*/}
                    <div className="relative lg:px-8 lg:py-12 p-4 flex-auto">
                        <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
                            ELX Staking
                        </h3>
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={addStaking}
                            enableReinitialize
                        >
                            <Form autoComplete="off">
                                <div className="mb-4">
                                    <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">ELX Amount to stake<span className="text-dark-red">*</span></label>
                                    <Field type="text" name="_stake" id="_stake" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="ELX Staking Amount" required="" />
                                    <ErrorMessage name="_stake" component={TextError} />
                                </div>

                                <button type="submit" className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                                    <span className="text-center mx-auto text-sm font-semibold">Submit</span>
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>

            <div className="relative w-full mx-auto max-w-full ">
                {/*content*/}
                <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    {/*body*/}
                    <div className="relative lg:px-8 lg:py-12 p-4 flex-auto">
                        <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
                            ELX Remove Staking
                        </h3>
                        <Formik
                            initialValues={initialValuesForRemove}
                            validationSchema={validationSchemaForRemove}
                            onSubmit={removeStaking}
                            enableReinitialize
                        >
                            <Form autoComplete="off">
                                <div className="mb-4">
                                    <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Remove Staking Amount<span className="text-dark-red">*</span></label>
                                    <Field type="text" name="_stakeReturn" id="_stakeReturn" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Remove Staking Amount" required="" />
                                    <ErrorMessage name="_stakeReturn" component={TextError} />
                                </div>

                                <button type="submit" className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                                    <span className="text-center mx-auto text-sm font-semibold">Submit</span>
                                </button>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </div>



            
        </div>
        </div>


    )
}
export default ELX_stalking