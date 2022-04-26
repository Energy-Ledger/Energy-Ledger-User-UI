import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import Spinner from "../../components/common/Spinner";
import alertService from "../../services/alert.service";
import elxService from "../../services/elx.service";
import { ErrorMessage, Field, Form, Formik } from "formik";
import TextError from "../../components/common/TextError";
import { useDispatch } from "react-redux";

import * as Yup from "yup";
import userService from '../../services/user.service';
import { useSelector } from 'react-redux';
import { setMessage } from '../../actions/message';
import blockchainService from '../../services/blockchain.service';


const BuyElx = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [elxPrice , setElxPrice]= useState(0);
    const [decimal , setDecimal]= useState(0);
    const [elxAmount , setElxAmount]= useState("");
    const [elxAmountBNB , setElxAmountBNB]= useState("");
    const [bnbBalance , setBnbBalance]= useState(0);
    const [elxBalance , setElxBalance]= useState(0);
    const [refreshRecord , setRefreshRecord]= useState(0);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {    
          const getElxPrice = async () => {
            setLoading(true);
            try {
              let response = await elxService.getElxPrice();
              setElxPrice(response.exchangeRate);
              setDecimal(response.decimal);
              let _walletDetails = await blockchainService.getWalletDetails();
              let _bnbBalance = Number(_walletDetails.data.walletBalance);
              _bnbBalance = _bnbBalance.toFixed(4);
              setBnbBalance(_bnbBalance)
              let balance = await elxService.getElxBalance(user.wallet_address);
              setElxBalance(balance)
              setLoading(false);
              
            } catch (error) {
              setLoading(false);
              alertService.showError(error.message);
            }
          };
    
        (async () => {
          await  getElxPrice();
          })();    
      }, [refreshRecord, user.wallet_address]);

      const initialValues = {
        _elxAmount: elxAmount,
        _elxAmountBnb: elxAmountBNB,
      
      };

      const validationSchema = Yup.object().shape({
          
          _elxAmount: Yup.number()
        .required("ELX Amount is required")
        .typeError('you must specify a number')
        .moreThan(0, 'Min value 0.')     
        .max(bnbBalance*elxPrice, `Amount should be less than ${bnbBalance*elxPrice} Elx.`),     
        _elxAmountBnb: Yup.number()
        .required("Amount is required")
        .typeError('you must specify a number')
        .moreThan(0, 'Min value 0.')     
        .max(bnbBalance, `Amount should be less than ${bnbBalance} BNB.`) 
        .test('len', 'Must be less than 7 characters', val => val?val.toString().length < 8:'')     
      });

      const purchaseElx =  async (_formInput ) => {
        try {
            _formInput._bnbAmount=(elxAmount/elxPrice)*Math.pow(10, decimal);
          setLoading(true)
          let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
          if(checkAllowance.status==='success'){

           let _response= await elxService.purchaseElx(_formInput);
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
          setElxAmount("")
          setElxAmountBNB("")
          setRefreshRecord(oldRec=>oldRec+1);
     
        }else{
            setLoading(false)
            alertService.showError(checkAllowance.message);
        }
    }catch(error){

      alertService.showError(error.message);

    }
    }

    const updateElxAmount=(value)=>{
      setElxAmount(value)
      setElxAmountBNB(value/elxPrice)
    }
    const updateBnbAmount=(value)=>{
      setElxAmountBNB(value)
      setElxAmount(value*elxPrice)
    }


    return (
        <div className="">
            {loading && <Spinner/>}
            <div className="mb-8">
                    <div className="grid lg:grid-cols-3 grid-cols-1 gap-4">
                        <div className="bg-white rounded-xl border shadow-sm p-6">
                            <div className="w-12 h-12 rounded-full bg-red-300 inline-flex justify-center items-center float-right">
                                <img src="../images/basket.svg" alt="" />
                            </div>
                            <h6 className="text-xs font-semibold text-slate-gray">Elx Balance</h6>
                            <h2 className="text-xl font-semibold my-1">{elxBalance} ELX</h2>
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
                Buy ELX
                    </h3>
                    <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={purchaseElx}
                                    enableReinitialize
                                >
                                    <Form autoComplete="off">
                        <div className="mb-4">
                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">ELX Purchase Amount (1 BNB = {elxPrice} ELX)</label>
                            <div className="block relative">
                              <div className="relative mb-4">
                                <Field type="text" name="_elxAmount" id="_elxAmount" onChange={(e) => updateElxAmount( e.target.value)} value={elxAmount} className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 pl-14" placeholder="Enter ELX Amount" required="" />
                                {/* <ErrorMessage name="_elxAmount" component={TextError} /> */}
                                <img className="w-8 h-8 inline-block absolute top-2 left-2" src="/images/elx-icon.svg" alt=""/>
                              </div>
                              <div className="h-12 w-12 absolute right-3 top-1/2 -translate-y-1/2 bg-white shadow-sm z-10 rounded-full flex items-center justify-center">
                              <img className="w-8 h-8 inline-block" src="/images/swap-icon.svg" alt=""/>
                              </div>
                              <div className="relative">
                                <Field type="text" name="_elxAmountBnb" id="_elxAmountBnb" onChange={(e) => updateBnbAmount( e.target.value)} value={elxAmountBNB} className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3 pl-14" placeholder="Enter BNB Amount" required="" />
                                                <ErrorMessage name="_elxAmountBnb" component={TextError} />
                                <img className="w-8 h-8 inline-block absolute top-2 left-2" src="/images/bnb-icon.svg" alt=""/>
                              </div>
                            </div>

                            {/* <input type="text" id="" value={elxPrice.toFixed(20).replace(/\.?0+$/,"")} className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="ELX Purchase Amount" required="" /> */}
                            {/* <input type="text" id="" value={elxPrice.toFixed(20).replace(/\.?0+$/,"")} className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="ELX Purchase Amount" required="" /> */}
                        </div>
                        <div className="flex justify-between mb-12">
                            <div className="inline-flex text-sm font-medium">
                                <img className="mr-2" src="./images/binance.svg" alt="" />Total BNB
                            </div>
                            <p className="font-bold text-md text-coalblack">{elxPrice > 0 && elxAmount/elxPrice}</p>
                        </div>
                        <div className="mt-6">
                            <p className="text-sm font-normal text-coalblack">BNB are required to purchase the ELX Token. To purchase more BNB Please <Link to="#" className="font-medium text-indigo-500">Click here</Link>.</p>
                        </div>
                        <button type="submit" className="text-sm w-full mt-4 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                            <span className="text-center mx-auto text-sm font-semibold">Confirm</span>
                        </button>
                    </Form>
                    </Formik>
                </div>
            </div>
            </div>
        </div>
   

    )
}
export default BuyElx