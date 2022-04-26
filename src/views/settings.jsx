import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import Spinner from "../components/common/Spinner";
import TextError from "../components/common/TextError";
import * as Yup from "yup";
import userService from "../services/user.service.js";
import alertService from "../services/alert.service";
import storageService from "../services/storage.service";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {   LOGIN_SUCCESS } from "../actions/types";
import fileService from "../services/file.service";  
import configService from "../services/config.service";
import { setMessage } from "../actions/message";
import blockchainService from "../services/blockchain.service";
import UserApiService from "../services/userApi.service";

const Settings = () => {

    const dispatch = useDispatch();
    const {user}=useSelector(state=>state.auth);
    const [name , setName]= useState("");
    const [contactNo , setContactNo]= useState("");
    const [isActive , setIsActive]= useState("");
    const [role , setRole]= useState("");
    const [companyName , setCompanyName]= useState("");
    const [profileHash, setProfileHash] = useState("");
    const [contactAddress , setContactAddress]= useState("");
    const [email , setEmail]= useState("");
    const [loading , setLoading]= useState(false);
    const [actionFees , setActionFees]= useState(0);
    
    const _placeholder = "/images/user-demo-img.svg";
    const [previewImage, setPreviewImage] = useState({
      image: null,
      source: null,
    });
   
    useEffect(() => {
        (async () => {
            const getUserSetting = async (_walletAddress) => {
                try {
                    setLoading(true)
                    // let staking = await userService.getStakingAllowance("0x518478d9B0f70967D5b705A0B179EC85A74f771a");
                    let getActionFee = await userService.getActionFee();
                    if(getActionFee){
                      let fees=  await userService.formatUnits(getActionFee['_userEditFee'] , true);
                        setActionFees(fees);
                    }
                    let response = await userService.getUserSetting(_walletAddress);
                    if (response.type === 'failed') {
                        setLoading(false)
                        alertService.showError(response.message);
                    } else {
                        // console.log(response);
                        setName(response.name)
                        setContactNo(response.contactNo)
                        setIsActive(response.isActive)
                        setRole(response.role)
                        setEmail(response.email)
                        setContactAddress(JSON.parse(atob(response.extraData)).contactAddress)
                        setCompanyName(JSON.parse(atob(response.extraData)).companyName)
                        // console.log(response)
                        setLoading(false)
                        // console.log(response.name)
                        setProfileHash(response.profileHash);
                        setPreviewImage({
                            ...previewImage,
                            image: configService.createIpfsUrl(response.profileHash)                            
                        });
                    }

                } catch (error) {
                    alertService.showError(error.message);
                }
            };
            await getUserSetting(user.wallet_address);
        })();
    }, [user.wallet_address]);



    const initialValues = {
        name: name,
        contactNo: contactNo,
        companyName: companyName,
        contactAddress: contactAddress,
        email:email
    };

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
       
        contactNo: Yup.string().matches(phoneRegExp, 'Contact number is not valid')
            .required("Contact number is required")
            .min(10, "Contact number should be of greater than 10 characters")
            .max(15, "Contact number should be of less than 15 characters"),
            email: Yup.string()
      .email("Please enter valid email")
      .required("Email is required"),
      companyName: Yup.string()
      .required("Company Name is required")
      .max(100, "Company Name should be of less than 100 characters"),
      contactAddress: Yup.string()
      .required("Contact Address is required")
      .max(255, "Contact Address should be of less than 255 characters"),
      
    });

    const onSelectFile = async (e) => {
      if (!e.target.files || e.target.files.length === 0) {
        return false;
      }

      if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif)$/)) {
        alertService.showError(
          "Only jpg, jpeg, png, gif file formats are allowed."
        );
        return false;
      }
      const fileSize = Math.round(e.target.files[0].size / 1024);
      if (fileSize > 10240) {
        alertService.showError("File size should be less than 10 MB");
        return false;
      }

      const objectUrl = URL.createObjectURL(e.target.files[0]);

      const reader = new window.FileReader();
      reader.readAsArrayBuffer(e.target.files[0]);

      reader.onloadend = async () => {
        setPreviewImage({
          image: objectUrl,
          source: Buffer(reader.result),
        });
      };
    };

    const settingUpdate = async(_formInput) => {
            try {
            
                setLoading(true)
                let extraData = {
                    companyName: _formInput.companyName,
                    contactAddress: _formInput.contactAddress,
                  };
                
                _formInput.isActive=isActive;
                // _formInput.profileHash=profileHash;
                _formInput.role=role;
                _formInput.extraData=btoa(JSON.stringify(extraData));
                _formInput.email=email;
                _formInput.profileHash = profileHash;

                if (previewImage.source != null && previewImage.source !== "") {
                  let _fileResp = await fileService.uploadFile(
                    previewImage.source
                  );
                  _formInput.profileHash = _fileResp.data.hash;
                } 

                try{

                    let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
                    if(checkAllowance.status==='success'){
                       let _response =  await userService.updateSetting(_formInput);
                      //  <Processing props={_response}/>

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
        data: _response.data.hash,
        showOkButton: false,
      }
      dispatch(setMessage(pendingMsg));   
      setLoading(false)

      await _response.data.wait();

      const publicProvider = await blockchainService.getPublicProvider();
      const txInfo = await publicProvider.getTransaction(_txHash);
      let _updRecord = await UserApiService.updateUser(txInfo.blockNumber);

      let completeMsg={
        status: true,
        type: "success",
        message: _response.message,
        data: _txHash,
        showOkButton: true,
      }
      dispatch(setMessage(completeMsg));
          setLoading(false)
              const authUser=storageService.getObject('authUser');
              authUser.contactNo=_formInput.contactNo
              authUser.name=_formInput.name
              authUser.profileHash = _formInput.profileHash 
              authUser.profileHashUrl = configService.createIpfsUrl(_formInput.profileHash)
              storageService.setObject('authUser' , authUser);
              dispatch({
                  type: LOGIN_SUCCESS,
                  payload: { user: authUser },
                });
                    
      

                    }else{
                        setLoading(false)
                        alertService.showError(checkAllowance.message);
                    }
                
              

            } catch (error) {
                setLoading(false)
                alertService.showError(error.message);
            }
            } catch (error) {
                setLoading(false)

                alertService.showError(error.message);
            }
    };

     
    
    return (
      <div className="flex justify-center items-center h-full">
        {loading && <Spinner />}
       
        <div className="relative lg:w-1/3 md:w-1/2 w-full mx-auto max-w-full ">
          {/*content*/}
          <div className=" border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*header*/}

            {/*body*/}
            <div className="relative lg:p-6 p-4 flex-auto">
              <h3 className="text-2xl text-coalblack font-semibold leading-normal mb-4">
              Account Settings
              </h3>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={settingUpdate}
                enableReinitialize
              >
                <Form autoComplete="off">
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-coalblack block mb-2"
                    >
                      Name
                    </label>
                    <Field
                      type=""
                      id=""
                      name="name"
                      className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                      placeholder="Name"
                      required=""
                    />
                    <ErrorMessage name="name" component={TextError} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-coalblack block mb-2"
                    >
                      Company Name<span className="text-dark-red">*</span>
                    </label>
                    <Field
                      type="text"
                      name="companyName"
                      id="companyName"
                      className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                      placeholder="Company Name"
                      required=""
                    />
                    <ErrorMessage name="companyName" component={TextError} />
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-coalblack block mb-2"
                    >
                      Address<span className="text-dark-red">*</span>
                    </label>
                    <Field
                      type="text"
                      name="contactAddress"
                      id="contactAddress"
                      className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                      placeholder="Address"
                      required=""
                    />
                    <ErrorMessage name="contactAddress" component={TextError} />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-coalblack block mb-2"
                    >
                      Email ID<span className="text-dark-red">*</span>
                    </label>
                    <Field
                      type="text"
                      name="email"
                      id=""
                      className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                      placeholder="Email ID"
                      required=""
                    />
                    <ErrorMessage name="email" component={TextError} />
                  </div>

                  {/* <div className="mb-4">
                                    <label htmlhtmlFor="" className="text-sm font-medium text-coalblack block mb-2">Company Name</label>
                                    <Field
                                        type=""
                                        id=""
                                        name="companyName"
                                        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                                        placeholder="Company Name"
                                        required=""
                                    />
                                    <ErrorMessage
                                        name="companyName"
                                        component={TextError}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlhtmlFor="" className="text-sm font-medium text-coalblack block mb-2">Address</label>
                                    <Field
                                        type=""
                                        id=""
                                        name="address"
                                        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                                        placeholder="Address"
                                        required=""
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component={TextError}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlhtmlFor="" className="text-sm font-medium text-coalblack block mb-2">Email ID</label>
                                    <Field
                                        type=""
                                        id=""
                                        name="emailId"
                                        className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                                        placeholder="Email Id"
                                        required=""
                                    />
                                    <ErrorMessage
                                        name="emailId"
                                        component={TextError}
                                    />
                                </div> */}

                  <div className="mb-4">
                    <label
                      htmlFor=""
                      className="text-sm font-medium text-coalblack block mb-2"
                    >
                      Phone Number
                    </label>
                    <Field
                      type=""
                      id=""
                      name="contactNo"
                      className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3"
                      placeholder="Contact No"
                      required=""
                    />
                    <ErrorMessage name="contactNo" component={TextError} />
                  </div>
                  <div className="rounded-lg relative border p-3 text-center overflow-hidden h-40 w-full">
                    <input
                      className="absolute top-0 left-0 w-full h-full opacity-0 z-10 cursor-pointer"
                      type="file"
                      onChange={(e) => onSelectFile(e)}
                    />
                    <div className="flex items-center flex-wrap flex-col justify-center h-full">
                      <img
                        className="mb-2"
                        src={previewImage.image || profileHash}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = _placeholder;
                        }}
                        // src="/images/user-demo-img.svg"
                        alt="Profile"
                      />
                      {!previewImage.image && profileHash && (
                        <p className="m-0 text-slate-gray">Upload File</p>
                      )}
                    </div>
                  </div>
                  {/* <div className="mb-4">
                                    <div className="flex items-center justify-between">
                                        <label htmlhtmlFor="" className="text-sm font-medium text-coalblack block mb-2">isActive</label>
                                        <div className="inline-flex items-center justify-end w-full">
                                        <label for="toggleB" className="flex items-center cursor-pointer">
                                                <div className="relative">
                                                <input type="checkbox" id="toggleB" className="sr-only"  defaultChecked={isActive}/>
                                                    <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
                                                    <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
                                                    </div>
                                                    
                                                    </label>
                                                    </div>
                                                    </div>
                                                    
                                                    
                                                    
                                                </div> */}

                  <label
                    htmlFor=""
                    className="text-sm font-medium text-coalblack block mb-2"
                  >
                    Transaction Fee: {actionFees} ELX
                  </label>
                  <button
                    type="submit"
                    className="text-sm w-full mt-10 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex"
                  >
                    <span className="text-center mx-auto text-sm font-semibold">
                      Confirm
                    </span>
                  </button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    );
}
export default Settings