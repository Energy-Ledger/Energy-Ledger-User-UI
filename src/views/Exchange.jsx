import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../components/common/Spinner";
import alertService from "../services/alert.service";
import { useNavigate } from 'react-router-dom';
import elxService from "../services/elx.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../components/common/TextError";
import * as Yup from "yup";
import blockchainService from "../services/blockchain.service";
import userService from "../services/user.service";
import { useDispatch } from "react-redux";
import { setMessage } from '../actions/message';
import bridgeService from '../services/bridge.service';
import { ethers } from "ethers";
import confirmationService from '../services/confirmation.service';
import configService from '../services/config.service';
import apiService from '../services/api.service';



const Exchange = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [exchangeType, setExchangeType] = useState("");
  const [bnbElxBalance, setBnbElxBalance] = useState(0);
  const [ethElxBalance, setEthElxBalance] = useState(0);
  const [refreshList, setRefreshList] = useState(0);
  const [bnbFees, setBnbFees] = useState(0);
  const [ethFees, setEthFees] = useState(0);
  const [ethElxBridgeBalance, setEthElxBridgeBalance] = useState(0);
  const [bscElxBridgeBalance, setBscElxBridgeBalance] = useState(0);


  useEffect(() => {
       (async () => {
        
        setLoading(true);
      await window.ethereum.enable();
      if(window.ethereum.networkVersion===configService.getBlockchainNetworkId()){
       setExchangeType("BnbToEth")
      }else if(window.ethereum.networkVersion===configService.ethChainId()){
       setExchangeType("EthToBnb")
      }
      await getBSCElxbalance();
      await getEthExBalance();
      await getBSCElxBridgeBalance();
      await getETHElxBridgeBalance();
      setLoading(false);
        })();
  }, [refreshList]);

     const getBSCElxbalance = async () => {
      try {
        let response = await bridgeService.getBscElxBalance();
      
        let balance = Number(response.data);
        balance = balance.toFixed(4);
        setBnbElxBalance(balance)
        let bnbFees = await bridgeService.getBnbElxFee();
        setBnbFees(bnbFees.data);

      } catch (error) {
        alertService.showError(error.message);
      }
    };
     const getEthExBalance = async () => {
      try {
        let response = await bridgeService.getEthElxBalance();
    
        let balance = Number(response.data);
      balance = balance.toFixed(4);
   
      setEthElxBalance(balance)
      let ethFees = await bridgeService.getEthElxFee();
      setEthFees(ethFees.data);
      } catch (error) {
        alertService.showError(error.message);
      }
    };



  const initialValues = {
    _exchangeAmt: ""
  };



  const validationSchemaBnb = Yup.object().shape({
    _exchangeAmt: Yup.number()
      .required("ELX Amount is required")
      .typeError('you must specify a number')
      .moreThan(0, 'Min value 0.')
      .max(bnbElxBalance , `Amount should be less than ${bnbElxBalance} Elx.`)
  });
  const validationSchemaEth = Yup.object().shape({
    _exchangeAmt: Yup.number()
      .required("ELX Amount is required")
      .typeError('you must specify a number')
      .moreThan(0, 'Min value 0.')
      .max(ethElxBalance , `Amount should be less than ${ethElxBalance} Elx.`)
  });


  const switchElxAmount = async (_formInput,{resetForm}) => {
    try {
     
      setLoading(true);
      let _exchangeAmt=  await blockchainService.parseUnits(_formInput._exchangeAmt , false);
      let bnbSwapFees=  await blockchainService.parseUnits(bnbFees , false);
      let ethSwapFees=  await blockchainService.parseUnits(ethFees , false);
      
     
      let walletAddress = await blockchainService.getConnectedAddress();
     
    
      let admin_wallet_address=walletAddress;
      var current = new Date();
     
      if(exchangeType==="BnbToEth"){

        if(Number(ethElxBridgeBalance) < Number(_formInput._exchangeAmt))
        {
          setLoading(false);
          alertService.showError("Insufficient ELX liquidity in ETH contract, please try again later");
          return;
        }

       
        let checkAllowance = await userService.bridgeBSCAllowance(walletAddress);

        if (checkAllowance.status === 'success') {
        const _nonce = current.getTime();

          let _response = await bridgeService.bnbToEth(_exchangeAmt , _nonce , bnbSwapFees);
          if (_response.status === 'failure') {
            setLoading(false)
            alertService.showError(_response.message);
  
          } else {
            let _txHash = _response.data.hash;
  
            setLoading(false);
  
            let pendingMsg = {
              status: true,
              type: "pending",
              message: "Your transaction is in process",
              data: _txHash,
              showOkButton: false,
            }
  
            dispatch(setMessage(pendingMsg));
  
            await _response.data.wait();
  
  
            let completeMsg = {
              status: true,
              type: "success",
              message: "ELX burn successfully from BSC",
              hint: "( Shortly you will get ELX in ETH Network )",
              data: _txHash,
              showOkButton: true,
            }
            dispatch(setMessage(completeMsg));
            let _history={
              network_type:1,
              user_address:admin_wallet_address,
              amount:_formInput._exchangeAmt,
              nonce:_nonce,
              initiate_tx_hash:_txHash,
              status:0,
             }
             let _rec=await apiService.addBridgeRecord(_history);
            setLoading(false);
            setRefreshList(oldKey => oldKey +1)
            resetForm({_formInput:''})

  
          }
  
        }
        else {
          setLoading(false)
          alertService.showError(checkAllowance.message);
        }
      }else{
        if(Number(bscElxBridgeBalance) < Number(_formInput._exchangeAmt))
        {
          setLoading(false);
          alertService.showError("Insufficient ELX liquidity in BSC contract, please try again later");
          return;
        }

        let checkAllowance = await userService.bridgeEthAllowance(walletAddress);
        if (checkAllowance.status === 'success') {
          const _nonce = current.getTime();
          let _response = await bridgeService.ethToBnb(_exchangeAmt , _nonce , ethSwapFees);
          if (_response.status === 'failure') {
            setLoading(false)
            alertService.showError(_response.message);
  
          } else {
            let _txHash = _response.data.hash;
  
            setLoading(false);
  
            let pendingMsg = {
              status: true,
              type: "pending",
              message: "Your transaction is in process",
              data: _txHash,
              showOkButton: false,
            }
  
            dispatch(setMessage(pendingMsg));
  
            await _response.data.wait();
  
  
            let completeMsg = {
              status: true,
              type: "success",
              message: "ELX burn successfully from ETH",
              hint: "( Shortly you will get ELX in BSC Network )",
              data: _txHash,
              showOkButton: true,
            }
            dispatch(setMessage(completeMsg));
            let _history={
              network_type:2,
              user_address:admin_wallet_address,
              amount:_formInput._exchangeAmt,
              nonce:_nonce,
              initiate_tx_hash:_txHash,
              status:0,
             }
             let _rec=await apiService.addBridgeRecord(_history);
            setLoading(false);
            setRefreshList(oldKey => oldKey +1)
            resetForm({_formInput:''})

  
          }
  
        }
        else {
          setLoading(false)
          alertService.showError(checkAllowance.message);
        }
      }

      
    } catch (error) {

      alertService.showError(error.message);

    }
  }

  const ExchangeType = async(value) => {
    // setExchangeType(value)
  
    let type=(value==="BnbToEth")?"Binance":((value==="EthToBnb")?"Ethereum":"");
    if(type!==""){

      let _confirmResponse = await confirmationService.showConfirm(
        "Please switch your network", 
        `Currently you have connected with ${type==="Ethereum"?"Binance":"Ethereum"} Network`,
        "warning"
      );
      
      if(_confirmResponse){
        let v=await bridgeService.switchUserNetwork(type);
        if(v.status==="success"){
          alertService.showSuccess(v.message);
          setExchangeType(value)
          window.location.reload();
              }else{
          alertService.showError(v.message);
          
  
        }
      }
    }
  }



  const getBSCElxBridgeBalance = async () => {
    try {
      let response = await bridgeService.getBscElxBridgeContractBalance();
      let balance = Number(response.data);
      balance = balance.toFixed(4);
      setBscElxBridgeBalance(balance)

    } catch (error) {
      alertService.showError(error.message);
    }
  };
  const getETHElxBridgeBalance = async () => {
    try {
      let response = await bridgeService.getEthElxBridgeContractBalance();
      let balance = Number(response.data);
      balance = balance.toFixed(4);
      setEthElxBridgeBalance(balance)

    } catch (error) {
      alertService.showError(error.message);
    }
  };
  return (
    <div className="">
      {loading && <Spinner />}

      <div className="mb-6">
                    <div className="grid lg:grid-cols-2 px-20 grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">BSC Balance</h6>
                            <h2 className="text-xl font-semibold my-1">{bnbElxBalance}  (ELX)</h2>
                          </div>

                          <div className="bg-white rounded-xl border shadow-sm p-6">
                                <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                    <img src="../images/basket.svg" alt="" />
                                </div>
                                <h6 className="text-xs font-semibold text-slate-gray">ETH Balance</h6>
                                <div className="mb-4">
                                {/* Total reward amount: */}
                                <h2 className="text-xl font-semibold my-1">{ethElxBalance} (ELX)</h2>                                                                        
                                </div>
                                <div>
                       
                        </div>
                                {/* <h2 className="text-xl font-semibold my-1">{adminStakeAmt}  (ELX)</h2> */}
                            </div>

                          </div>
                        </div>


      <div className="relative lg:w-1/2 mx-auto max-w-full ">
        {/*content*/}
        <div className="border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
          {/*header*/}

          {/*body*/}
          <div className="relative lg:px-8 lg:py-12 p-4 flex-auto">
            <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
              Fastest cross-chain swaps
            </h3>
            <Formik
              initialValues={initialValues}
              validationSchema={exchangeType==="BnbToEth"?validationSchemaBnb:validationSchemaEth}
              onSubmit={switchElxAmount}
              enableReinitialize
            >

<Form autoComplete="off">
                <label htmlFor="email" style={{ display: 'block' }} className='mb-2 text-sm'>
                  Exchange To
                </label>
                <div className="relative mb-4">
                  <Field as="select" name="color" onChange={(e) => ExchangeType(e.target.value)} value={exchangeType} className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block mb-2 p-3 pl-14 w-full">
                    <option value="">Select</option>
                    <option value="EthToBnb">Ethereum to BSC Smart Chain</option>
                    <option value="BnbToEth">BSC Smart Chain to Ethereum</option>
                  </Field>
                  {exchangeType==="EthToBnb" && 
                     <img width={30} height={30} src="/images/ethereum.png" className='absolute top-1/2 left-3 -translate-y-1/2' />
                  }
                  {exchangeType==="BnbToEth" &&
                    <img width={30} height={30} src="/images/bnb-icon.svg" className='absolute top-1/2 left-3 -translate-y-1/2' />
                  }
                  </div>
                <div className='flex items-center justify-between mb-2 '>
                  <label className='block text-sm'>
                    Enter ELX Amount
                  </label>
                  
                </div>
                  {exchangeType==="EthToBnb" && <>
                 
                
                <Field type="" name="_exchangeAmt" id="_exchangeAmt"  className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block mb-2 p-3 w-full" placeholder="Enter ETH ELX Amount" required="" />
                </>
                  }
              
                  {exchangeType==="BnbToEth" &&
                  <>
                  
                <Field type="text" name="_exchangeAmt" id="_exchangeAmt"  className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block mb-2 p-3 w-full" placeholder="Enter BSC ELX Amount" required="" />
                
                  </>
                  }
              
                <ErrorMessage name="_exchangeAmt" component={TextError} />
                
              <div className="w-full flex items-center justify-between mt-4">
              {exchangeType==="BnbToEth" && <div className='text-sm'>Transaction Fee: {bnbFees || 0} BNB</div>}
                  {exchangeType==="EthToBnb" && <div className='text-sm'>Transaction Fee: {ethFees || 0} ETH</div>}
                <button type="submit" className="text-sm text-center w-40  px-4 py-3 inline-block bg-blue-600 rounded-md text-white outline-none shadow-lg ">
                  <span className="text-center mx-auto text-sm font-semibold">Confirm</span>
                </button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Exchange