import React , {useEffect,useState} from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import TextError from "../../components/common/TextError";
import alertService from "../../services/alert.service";
import batchService from "../../services/batch.service";
import userService from "../../services/user.service";
import Spinner from "../../components/common/Spinner";
import {isEmpty} from "lodash";
import { useSelector } from "react-redux";
import fileService from "../../services/file.service";  
import configService from "../../services/config.service";
import { setMessage } from "../../actions/message";
import { useDispatch } from "react-redux";

// add new batch popup starts
export default function AuditorUpdateBatch({showAuditorModal , setShowAuditorModal , auditorBatchId=[] , auditorUpdateData , setRefreshBatchList}) {
  const [loading , setLoading]= useState(false);
    const [actionFees , setActionFees]= useState(0);
    const {user}=useSelector(state=>state.auth);
    const _placeholder = "/images/user-demo-img.svg";
    const _pdfIcon = "/images/pdf-icon.svg";
    const dispatch = useDispatch();

    const [previewImage, setPreviewImage] = useState({
      image: null,
      source: null,
    });
    const [profileHash, setProfileHash] = useState();

    useEffect(() => {
        (async () => {
            const getFees = async () => {
                try {
                    setLoading(true)
                    let getActionFee = await userService.getActionFee();
                    if(getActionFee){
                      let fees=  await userService.formatUnits(getActionFee['_auditorBatchUpdateFee'] , true);
                        setActionFees(fees);
                        setLoading(false)
                    }else{
                        setLoading(false)
                        alertService.showError("something went wrong");
                    }
                   

                } catch (error) {
                    alertService.showError(error.message);
                }
            };
            await getFees();
        })();
    }, []);
    
    useEffect(() => {
      
          if(!isEmpty(auditorUpdateData)){
            // console.log("auditorUpdateData" , auditorUpdateData);
            setProfileHash(auditorUpdateData.documentHash);
            // setPreviewImage({
            //     ...previewImage,
            //     image: configService.createIpfsUrl(auditorUpdateData.documentHash)                            
            // });
          }else{
            setProfileHash("");

            setPreviewImage({
              source: null,
              image: null                           
          });
          }
      
    }, [auditorUpdateData]);

    const initialValues = {
        _batchNo: auditorBatchId,
        _extractionMethod: "",
        _oilClass: "",
      
      };
    const initialValuesUpdate = {
        _batchNo: auditorBatchId,
        _extractionMethod: isEmpty(auditorUpdateData)?"":auditorUpdateData.extractionMethod,
        _oilClass: isEmpty(auditorUpdateData)?"":auditorUpdateData.oilClass,
      
      };
    

      const validationSchema = Yup.object().shape({
        _batchNo: Yup.string()
          .required("Batch No is required"),
          _extractionMethod: Yup.string()
          .required("Extraction Method is required")
          .max(50, "Extraction Method should be of less than 50 characters"),
          _oilClass: Yup.string()
          .required("Oil Class is required")
          .max(255, "Oil Class should be of less than 255 characters"),
      
      });

      const updateAuditorData =  async (_formInput) => {
          try {
            setLoading(true)
            let checkAllowance=await userService.getAllowanceForBuy(user.wallet_address);
            if(checkAllowance.status==='success'){

               let extraData = {
                    documentHash: ""
                  };

              if (previewImage.source != null && previewImage.source !== "") {
                let _fileResp = await fileService.uploadFile(
                  previewImage.source
                );
                console.log("_fileResp", _fileResp);
                extraData = {
                  documentHash: _fileResp.data.hash
                };
                
                _formInput._extraData=btoa(JSON.stringify(extraData));
              } else{
                setLoading(false)
                alertService.showError("Please upload the document");
              }
              // let extraData = {
              //   documentHash: ""
              // };
              
              _formInput._extraData=btoa(JSON.stringify(extraData));
             let _response= await batchService.updateAuditorData(_formInput);
             
             if (_response.status === "failure") {
              alertService.showError(_response.message);
              setLoading(false);
              return false;
            }
            setShowAuditorModal(false)
          
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

            setRefreshBatchList(true)
        }else{
            setLoading(false)
            alertService.showError(checkAllowance.message);
        }
      }catch(error){
        // console.log(error);
        setLoading(false)

        alertService.showError(error.message);

      }
      }
      const onSelectFile = async (e) => {
        if (!e.target.files || e.target.files.length === 0) {
          return false;
        }
  
        if (!e.target.files[0].name.match(/\.(jpg|jpeg|png|gif|pdf)$/)) {
          alertService.showError(
            "Only jpg, jpeg, png, gif, pdf file formats are allowed."
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
            image: (!e.target.files[0].name.match(/\.(pdf)$/))?objectUrl:_pdfIcon,
            source: Buffer(reader.result),
          });
        };
      };

    return (
        <>

        
 

            {showAuditorModal ? (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                                    {loading && <Spinner/>}

                        <div className="relative lg:w-1/3 my-6 mx-auto max-w-full">
                            {/*content*/}
                            <div className="popup scrollbar border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div className="flex items-start justify-between p-5 rounded-t">
                                    <h1 className="text-xl text-coalblack font-semibold leading-normal">
                                        {(isEmpty(auditorUpdateData))?"Update Auditor Batch":"View Auditor Batch"}
                                    </h1>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-slate-gray float-right text-3xl leading-none font-normal outline-none focus:outline-none"
                                        onClick={() => setShowAuditorModal(false)}
                                    >
                                        <span className="relative -top-1 bg-transparent text-slate-gray opacity-6 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>

                                </div>
                                {/*body*/}
                                <div className="relative px-6 pb-6 pt-0 flex-auto">
                                <Formik
                                    initialValues={(isEmpty(auditorUpdateData))?initialValues:initialValuesUpdate}
                                    validationSchema={validationSchema}
                                    onSubmit={updateAuditorData}
                                    enableReinitialize
                                >
                                    <Form autoComplete="off">
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Batch Number<span className="text-dark-red">*</span></label>
                                            <Field type="text" name="_batchNo" id="_batchNo" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Batch Number" required="" disabled={true}/>
                                            <ErrorMessage name="_batchNo" component={TextError} />

                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Extraction Method<span className="text-dark-red">*</span></label>
                                            <Field type="text" name="_extractionMethod" id="_extractionMethod" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Extraction Method" required="" disabled={!isEmpty(auditorUpdateData)}/>
                                            <ErrorMessage name="_extractionMethod" component={TextError} />

                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Oil Class<span className="text-dark-red">*</span></label>
                                            <Field type="text" name="_oilClass" id="_oilClass" className="border text-coalblack sm:text-sm rounded-lg focus:shadow-sm block w-full p-3" placeholder="Oil Class" required="" disabled={!isEmpty(auditorUpdateData)}/>
                                            <ErrorMessage name="_oilClass" component={TextError} />

                                        </div>
  
                        {isEmpty(auditorUpdateData) ? <>
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
                          </div></> : <><a href={configService.createIpfsUrl(profileHash)} target="_blank" className="w-full mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex" rel="noreferrer">
                            <span className="text-center mx-auto text-xs font-semibold">View Document</span>
                          </a></>}
                                        {isEmpty(auditorUpdateData) && <>
                                        <label htmlFor="" className="text-sm font-medium text-coalblack block mb-2">Transaction Fee: {actionFees} ELX</label>
                                        <button type="submit" className="w-full mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
                                            <span className="text-center mx-auto text-xs font-semibold">Update Batch</span>
                                        </button>
                                        </>
                                        }
                                        {/* <button type="submit" className="w-full mb-3 px-4 py-3 bg-blue-600 rounded-md text-white outline-none shadow-lg flex" onClick={() => setShowAuditorModal(false)}>
                                            <span className="text-center mx-auto text-xs font-semibold">Submit</span>
                                        </button> */}
                                    </Form>
                                    </Formik>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </>
    );
}

// add new batch popup ends