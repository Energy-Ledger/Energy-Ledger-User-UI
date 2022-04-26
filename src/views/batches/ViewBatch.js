import React, { useEffect, useState } from 'react'
import QRCode from 'react-qr-code';
import {useParams} from 'react-router-dom';
import batchService from '../../services/batch.service';
import blockchainService from '../../services/blockchain.service';
import userService from '../../services/user.service';
import Spinner from "../../components/common/Spinner";
import { ethers } from 'ethers';
import configService from '../../services/config.service';
const supplyChainAbi = require("../../ABI/supplyChainAbi.json");



const ViewBatch = () => {

    const {id} = useParams();

    // console.log(id)
    let batchData = "";
    let _contractInstance = "";
    
   
   
   
    const [loading, setLoading] = useState(false);
    const [batchDetails, setBatchDetails] = useState([]);
    // const [auditorDetails,setAuditorDetails] = useState("")
 
    const [batchAuditorDetails,setBatchAuditorDetails] = useState("")
    const [batchOperatorDetails,setBatchOperatorDetails] = useState("")
    const [batchExportorDetails,setBatchExportorDetails] = useState("")
    const [batchImportorDetails,setBatchImportorDetails] = useState("")
    const [batchProcessorDetails,setBatchProcessorDetails] = useState("")
    // const [currentStage,setCurrentStage] = useState("")



  
    let noDataViewAuditor = <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
    <div className="absolute md:block hidden left-[-50px] top-0">
    
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    
    <div className="text-base font-semibold mb-6">Auditor</div>
    
    <div className="text-center">
        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    
</div>

    let noDataViewOperator = <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
    <div className="absolute md:block hidden left-[-50px] top-0">
    
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    <div className="text-base font-semibold mb-6">Operator</div>
    <div className="text-center">
        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    </div>

    let noDataViewExportor = <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium w-full">
    <div className="absolute md:block hidden left-[-50px] top-0">
    
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    <div className="text-base font-semibold mb-6">Exportor</div>
    <div className="text-center">

        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    </div>


    let noDataViewImportor = <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium w-full">
    <div className="absolute md:block hidden left-[-50px] top-0">
    
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    <div className="text-base font-semibold mb-6">Importor</div>
    <div className="text-center">

        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    </div>

    let noDataViewProcessor = <div className="bg-white rounded-2xl p-5 shadow-lg relative font-medium w-full">
    <div className="absolute md:block hidden left-[-50px] top-0">
    
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    <div className="text-base font-semibold mb-6">Processor</div>
    <div className="text-center">

        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    </div>

    let noDataView = <div className="bg-white rounded-2xl p-10 mb-8 shadow-lg relative font-medium w-full">
    <div className="absolute md:block hidden left-[-50px] top-0">
    {/* <div className="text-base font-semibold mb-6">Processor</div> */}
        <img src="../../../images/close-timeline.svg" alt="" />
    </div>
    <div className="text-center">

        <div className="mx-auto w-32 mb-4">
            <img src="../../../images/no-information-available.svg" alt="" /></div>
        <div className=" text-base text-coalblack font-semibold mb-4">No Information Available</div>
        {/* <div className="text-sm text-gray-500 max-w-xs mx-auto">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</div> */}
    </div>
    </div>

   
        
  
                
               
    

    const [auditorView,setAuditorView] = useState()
    const [operatorView,setOperatorView] = useState()
    const [exportorView,setExportorView] = useState()
    const [importorView,setImportorView] = useState()
    const [processorView,setProcessorView] = useState()
    const [defaultView,setDefaultView] = useState()


    const getBatchDetailsByBatchNo = async(id) => {
        let _frontExplorerEndpoint= configService.getFrontExplorerEndpoint();
        let publicProvider = new ethers.providers.JsonRpcProvider(_frontExplorerEndpoint);

        _contractInstance = new ethers.Contract(
            configService.supplyChainContractAddress(),
            supplyChainAbi,
            publicProvider
        );
          
        batchData =await _contractInstance.getBatchDetails(id);
        
    
        let _batchNextAction = await _contractInstance.getNextAction(id);
        setData(batchData , _batchNextAction);

         
    };

   
 

    useEffect(() => {
        (async () => {
            setLoading(true)
          await getBatchDetailsByBatchNo(id);
        })();
      }, []);

    
    const isAlreadyUser = async(_walletAddress)=>{
        let userData  = "";
        let _isAlreadyUser =  await _contractInstance.isAlreadyUser(_walletAddress);
        if (_isAlreadyUser === true) {
            userData = await _contractInstance.getUser(_walletAddress);
        }
        return userData;

    }

    const setData = async(batchData , currentStage) => { 
        setLoading(true);
        const batchProviderContractAddress = _contractInstance;

        let auditorData =  await isAlreadyUser(batchData['auditorAddress']);
        let batchAuditorDetails =  await batchProviderContractAddress.getAuditorData(id);
        // load batch uploaded document
        let auditorDocumentUrl = '';
        if(batchAuditorDetails.extraData)
        {
            let documentData = Buffer.from(batchAuditorDetails.extraData, "base64").toString();
            if(documentData)
            {
            documentData = JSON.parse(documentData);
            if(documentData.documentHash)
            {
            auditorDocumentUrl = configService.createIpfsUrl(documentData.documentHash);
            }
        }
        }


        let operatorData =  await isAlreadyUser(batchData['operatorAddress']);
        let batchOperatorDetails =  await batchProviderContractAddress.getOperatorData(id);
        // console.log('batchOperatorDetails',batchOperatorDetails);
         // load batch uploaded document

         let operatorDocumentUrl = '';
         if(batchOperatorDetails.extraData)
         {         
             let documentData = Buffer.from(batchOperatorDetails.extraData, "base64").toString();
             if(documentData)
             {
             documentData = JSON.parse(documentData);
             if(documentData.documentHash)
             {
             operatorDocumentUrl = configService.createIpfsUrl(documentData.documentHash);
             }
            }
         }


        let exportorData =  await isAlreadyUser(batchData['exporterAddress']);
        let batchExportorDetails = await batchProviderContractAddress.getExporterData(id);

        // load batch uploaded document
        let exportorDocumentUrl = '';
        if(batchExportorDetails.extraData)
        {
            let documentData = Buffer.from(batchExportorDetails.extraData, "base64").toString();
            if(documentData)
            {
            documentData = JSON.parse(documentData);
            if(documentData.documentHash)
            {
              exportorDocumentUrl = configService.createIpfsUrl(documentData.documentHash);
            }
           }
        }


        let importorData =  await isAlreadyUser(batchData['importerAddress']);
        let batchImportorDetails = await batchProviderContractAddress.getImporterData(id);
        // load batch uploaded document
        let importorDocumentUrl = '';
        if(batchImportorDetails.extraData)
        {
            let documentData = Buffer.from(batchImportorDetails.extraData, "base64").toString();
            if(documentData)
            {
            documentData = JSON.parse(documentData);
            if(documentData.documentHash)
            {
             importorDocumentUrl = configService.createIpfsUrl(documentData.documentHash);
            }
           }
        }


        let processorData  = await isAlreadyUser(batchData['processorAddress'])
        let batchProcessorDetails = await batchProviderContractAddress.getProcessorData(id);
        
         // load batch uploaded document
         let processorDocumentUrl = '';
         if(batchProcessorDetails.extraData)
         {
             let documentData = Buffer.from(batchProcessorDetails.extraData, "base64").toString();
             if(documentData)
             {
             documentData = JSON.parse(documentData);
             if(documentData.documentHash)
             {
                 processorDocumentUrl = configService.createIpfsUrl(documentData.documentHash);
             }
            }
         }
        
        setDefaultView(noDataView)
        setAuditorView(noDataViewAuditor)
        setOperatorView(noDataViewOperator)
        setExportorView(noDataViewExportor)
        setImportorView(noDataViewImportor)
        setProcessorView(noDataViewProcessor)

        let basicView = 
             <div className="bg-white rounded-2xl p-4 mb-8">
                 <div className='grid grid-cols-3'>
                     <div className="col-span-2">
                        <div className="flex items-center justify-between">
                            <div className="flex">
                                <button  className="mr-3 text-blue-medium"><svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                    </svg>
                                </button>                        
                                <div className="text-blacktext font-bold text-base sm:text-xl">Batch Progress</div>                     
                            </div>
                            {/* <div className="">
                                <button type="button" className="flex justify-center items-center py-3 px-3 whitespace-nowrap sm:px-7 text-white font-semibold text-xs bg-blue-medium rounded-md"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /> </svg> Print Batch</button>
                            </div> */}
                        </div>
                        <div className="text-base flex mt-2"><div className="inline-block">Batch No: </div> <div className="break-all text-gray-medium ml-1">{id}</div></div>
                        <div className="text-base flex mt-2"><div className="inline-block">Registration No: </div> <div className="break-all text-gray-medium ml-1">{batchData['registrationNo']}</div></div>
                        {/* <div className="text-base flex mt-2"><div className="inline-block">Date No: </div> <div className="break-all text-gray-medium ml-1">{batchDate}</div></div> */}
                        <div className="text-base flex mt-2"><div className="inline-block">Extractor Name: </div> <div className="break-all text-gray-medium ml-1">{batchData['extractorName']}</div></div>
                        <div className="text-base flex mt-2"><div className="inline-block">Extractor Address: </div> <div className="break-all text-gray-medium ml-1">{batchData['extractorAddress']}</div></div>

                </div>
                <div className="text-right flex justify-end">
                <QRCode value={`${configService.getBaseUrl()}batch/${id}`} size="100" />

                </div>
                </div>

            </div>

        setDefaultView(basicView)

        if(currentStage >=1 || currentStage=="DONE")
        {
       let auditor =
        <div>
            <div className="mr-2 relative w-[40px] text-center hidden md:block">
            <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
            </div>
            <div className="w-full">
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden left-[-50px] top-0">
                    <img src="../../../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Auditor</div>
                <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                    <div className="flex align-top">
                        <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src="../../../images/face-img.png" alt="" />
                        </div>
                        <div>
                        <div className="font-semibold text-sm mb-2">{auditorData['name']}</div>
                        <div className="sm:flex items-center">
                            <div className="flex items-center lg:mr-10">
                                <div className="mr-2">
                                    <img src="../../../images/phone-icon.svg" alt="" />
                                </div>
                                <div className="text-blue-medium text-sm">{auditorData['contactNo']}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img src="../../../images/time-icon.svg" alt="" />
                                </div>
                                {batchAuditorDetails['timeStamp'] && new Date(batchAuditorDetails['timeStamp'] * 1000).toLocaleString("en-NZ") || "NA"}
                            </div>
                        </div>
                        <div className="break-all text-gray-600 text-sm mt-4">{batchData['auditorAddress']}</div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        {/* <img src="../../../images/qrcode.png" alt="" /> */}
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Extraction Method
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchAuditorDetails['extractionMethod']}</div>
                        </div>

                        {auditorDocumentUrl!=''
                            ? <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                            <div className="text-gray-400 flex">
                                <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                                Document
                            </div>
                            <div className="text-center">:</div>
                            <div className="ml-2 sm:ml-0">
                                <a href={auditorDocumentUrl} target="_blank" className="text-blue-medium text-sm" rel="noreferrer">
                                VIew Document
                                </a>   
                            </div>
                            </div> 
                            : ''
                        }
                       
                    </div>

                    

                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Oil Class
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchAuditorDetails['oilClass']}</div>
                        </div>
                    
                    </div>
                    
                </div>
            </div>
            </div> 
            </div>
           setAuditorView(auditor)
        }

        if(currentStage >=2 || currentStage=="DONE")
        {
        let operator =<div>
            <div className="mr-2 relative w-[40px] text-center hidden md:block">
            <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
            </div>
            <div className="w-full">
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden left-[-50px] top-0">
                    <img src="../../../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Operator</div>
                <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                    <div className="flex align-top">
                        <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src="../../../images/face-img.png" alt="" />
                        </div>
                        <div>
                        <div className="font-semibold text-sm mb-2">{operatorData['name']}</div>
                        <div className="sm:flex items-center">
                            <div className="flex items-center lg:mr-10">
                                <div className="mr-2">
                                    <img src="../../../images/phone-icon.svg" alt="" />
                                </div>
                                <div className="text-blue-medium text-sm">{operatorData['contactNo']}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img src="../../../images/time-icon.svg" alt="" />
                                </div>
                                {batchOperatorDetails['timeStamp'] && new Date(batchOperatorDetails['timeStamp'] * 1000).toLocaleString("en-NZ") || "NA"}
                            </div>
                        </div>
                        <div className="break-all text-gray-600 text-sm mt-4">{batchData['operatorAddress']}</div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        <img src="./images/qrcode.png" alt="" />
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Gravity
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchOperatorDetails['gravity']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Operator Abi
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchOperatorDetails['operatorAbi']}</div>
                        </div>

                        {operatorDocumentUrl!=''
                            ? <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                            <div className="text-gray-400 flex">
                                <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                                Document
                            </div>
                            <div className="text-center">:</div>
                            <div className="ml-2 sm:ml-0">
                                <a href={operatorDocumentUrl} target="_blank" className="text-blue-medium text-sm" rel="noreferrer">
                                VIew Document
                                </a>   
                            </div>
                            </div> 
                            : ''
                        }
                    </div>
                    
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Hydrocarbon Variety
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchOperatorDetails['hydrocarbonVariety']}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
            </div>

            setOperatorView(operator)
        }
        if(currentStage >= 3 || currentStage=="DONE")
        {
       let exportor =
        <div>
            <div className="mr-2 relative w-[40px] text-center hidden md:block">
            <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
            </div>
            <div className="w-full">
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden left-[-50px] top-0">
                    <img src="../../../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Exportor</div>
                <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                    <div className="flex align-top">
                        <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src="../../../images/face-img.png" alt="" />
                        </div>
                        <div>
                        <div className="font-semibold text-sm mb-2">{exportorData['name']}</div>
                        <div className="sm:flex items-center">
                            <div className="flex items-center lg:mr-10">
                                <div className="mr-2">
                                    <img src="../../../images/phone-icon.svg" alt="" />
                                </div>
                                <div className="text-blue-medium text-sm">{exportorData['contactNo']}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img src="../../../images/time-icon.svg" alt="" />
                                </div>
                                {batchExportorDetails['timeStamp'] && new Date(batchExportorDetails['timeStamp'] * 1000).toLocaleString("en-NZ") || "NA"}
                            </div>
                        </div>
                        <div className="break-all text-gray-600 text-sm mt-4">{batchData['exportorAddress']}</div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        {/* <img src="../../../images/qrcode.png" alt="" /> */}
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Exporter Id
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchExportorDetails['exporterId']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Destination Address
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchExportorDetails['destinationAddress']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Quantity
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchExportorDetails['quantity']}</div>
                        </div>

                        {exportorDocumentUrl
                            ? <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                            <div className="text-gray-400 flex">
                                <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                                Document
                            </div>
                            <div className="text-center">:</div>
                            <div className="ml-2 sm:ml-0">
                                <a href={exportorDocumentUrl} target="_blank" className="text-blue-medium text-sm" rel="noreferrer">
                                VIew Document
                                </a>   
                            </div>
                            </div> 
                            : ''
                        }
                    </div>
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Ship Name
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchExportorDetails['shipName']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Ship No
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchExportorDetails['shipNo']}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
            </div>
            setExportorView(exportor)
        }

        if(currentStage >= 4 || currentStage=="DONE")
        {

        let importor =
            <div>
            <div className="mr-2 relative w-[40px] text-center hidden md:block">
            <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
            </div>
            <div className="w-full">
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden left-[-50px] top-0">
                    <img src="../../../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Importor</div>
                <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                    <div className="flex align-top">
                        <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src="../../../images/face-img.png" alt="" />
                        </div>
                        <div>
                        <div className="font-semibold text-sm mb-2">{importorData['name']}</div>
                        <div className="sm:flex items-center">
                            <div className="flex items-center lg:mr-10">
                                <div className="mr-2">
                                    <img src="../../../images/phone-icon.svg" alt="" />
                                </div>
                                <div className="text-blue-medium text-sm">{importorData['contactNo']}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img src="../../../images/time-icon.svg" alt="" />
                                </div>
                                {batchImportorDetails['timeStamp'] && new Date(batchImportorDetails['timeStamp'] * 1000).toLocaleString("en-NZ") || "NA"}
                            </div>
                        </div>
                        <div className="break-all text-gray-600 text-sm mt-4">{batchData['importorAddress']}</div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        {/* <img src="../../../images/qrcode.png" alt="" /> */}
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Importer Id
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['importerId']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Quantity
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['quantity']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Ship Name
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['shipName']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Terminal Name
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['terminalName']}</div>
                        </div>

                        {importorDocumentUrl
                            ? <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                            <div className="text-gray-400 flex">
                                <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                                Document
                            </div>
                            <div className="text-center">:</div>
                            <div className="ml-2 sm:ml-0">
                                <a href={importorDocumentUrl} target="_blank" className="text-blue-medium text-sm" rel="noreferrer">
                                VIew Document
                                </a>   
                            </div>
                            </div> 
                            : ''
                        }

                    </div>
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Ship No
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['shipNo']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Terminal Coordinates
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['terminalCoordinates']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Transport Info
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchImportorDetails['transportInfo']}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
            </div>
        setImportorView(importor)   
    }

       

        if(currentStage >=5 || currentStage=="DONE")
        {
        let processor =
        <div>
            <div className="mr-2 relative w-[1/12] text-center hidden md:block">
            <div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div>
            </div>
            <div className="w-full">
            <div className="bg-white rounded-2xl p-5 mb-8 shadow-lg relative font-medium">
                <div className="absolute md:block hidden left-[-50px] top-0">
                    <img src="../../../images/checked-timeline.svg" alt="" />
                </div>
                <div className="text-base font-semibold mb-6">Processor</div>
                <div className="lg:flex justify-between border-b border-indigo-100 pb-6 mb-6">
                    <div className="flex align-top">
                        <div className="w-8 h-8 max-w-full rounded-full overflow-hidden mr-3">
                        <img className="w-full h-full object-cover" src="../../../images/face-img.png" alt="" />
                        </div>
                        <div>
                        <div className="font-semibold text-sm mb-2">{processorData['name']}</div>
                        <div className="sm:flex items-center">
                            <div className="flex items-center lg:mr-10">
                                <div className="mr-2">
                                    <img src="../../../images/phone-icon.svg" alt="" />
                                </div>
                                <div className="text-blue-medium text-sm">{processorData['contactNo']}</div>
                            </div>
                            <div className="flex items-center">
                                <div className="mr-2">
                                    <img src="../../../images/time-icon.svg" alt="" />
                                </div>
                                {batchProcessorDetails['timeStamp'] && new Date(batchProcessorDetails['timeStamp'] * 1000).toLocaleString("en-NZ") || "NA"}
                            </div>
                        </div>
                        <div className="break-all text-gray-600 text-sm mt-4">{batchData['processorAddress']}</div>
                        </div>
                    </div>
                    <div className="mt-6 lg:mt-0">
                        {/* <img src="../../../images/qrcode.png" alt="" /> */}
                    </div>
                </div>
                <div className="lg:grid lg:grid-cols-2 gap-12 text-xs sm:text-sm">
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="./images/checkbox-completed.svg" alt="" /></div>
                            Fuel Grade
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchProcessorDetails['fuelGrade']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Internal BatchNo
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchProcessorDetails['internalBatchNo']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Packaging Date,Time
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchProcessorDetails['packagingDateTime']}</div>
                        </div>

                        {processorDocumentUrl
                            ? <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                            <div className="text-gray-400 flex">
                                <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                                Document
                            </div>
                            <div className="text-center">:</div>
                            <div className="ml-2 sm:ml-0">
                                <a href={processorDocumentUrl} target="_blank" className="text-blue-medium text-sm" rel="noreferrer">
                                VIew Document
                                </a>   
                            </div>
                            </div> 
                            : ''
                        }
                    </div>
                    <div className="">
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Quantity
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchProcessorDetails['quantity']}</div>
                        </div>
                        <div className="flex sm:grid sm:grid-cols-3 sm:gap-4 mb-5">
                        <div className="text-gray-400 flex">
                            <div className="mr-4"> <img src="../../../images/checkbox-completed.svg" alt="" /></div>
                            Temperature
                        </div>
                        <div className="text-center">:</div>
                        <div className="ml-2 sm:ml-0">{batchProcessorDetails['temperature']}</div>
                        </div>
                    </div>
                </div>
            </div>
            </div> 
            </div>

            setProcessorView(processor)
        }

        setLoading(false);

        
    
    
    }

  

    

    

    return (
       
        <div className="bg-blight h-screen">
             {loading === true ? <Spinner /> : ""}
        <div className="bg-white rounded-2xl p-4 mb-8">
            {defaultView}
            <div className="md:flex">
            <div className="mr-2 relative w-[40px] text-center hidden md:block"><div className="w-0.5 border-dashed border border-gray-300 h-full absolute left-0 right-0 mx-auto"></div></div>                
            <div className="absolute md:block hidden left-[-50px] top-0">
                </div>
            <div className="">
                    {auditorView}
                    {operatorView}
                    {exportorView}
                    {importorView}
                    {processorView}
            </div>
            </div>
            </div>
        </div>
)
}
export default ViewBatch
