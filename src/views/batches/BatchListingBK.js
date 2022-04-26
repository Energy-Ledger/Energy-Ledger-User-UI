import React, { useEffect, useState } from "react";

import { useSelector , useDispatch } from "react-redux";
import batchService from "../../services/batch.service";
import Table from "../../components/common/Table"
import AuditorUpdateBatch from "./AuditorUpdateBatch"
import Spinner from "../../components/common/Spinner";
import alertService from "../../services/alert.service";
import QRCode from "react-qr-code";
import OperatorUpdateBatch from "./OperatorUpdateBatch"
import ExporterUpdateBatch from "./ExporterUpdateBatch"
import ImporterUpdateBatch from "./ImporterUpdateBatch"
import ProcessorUpdateBatch from "./ProcessorUpdateBatch"
import { BATCHES } from "../../actions/types";
import userService from "../../services/user.service";
import configService from "../../services/config.service";
import { Link,useLocation} from 'react-router-dom';
import { useHistory } from "react-router-dom";



const Batch_listing = ({isDashboard=false}) => {
  // console.log(isSearch);
  const { user } = useSelector((state) => state.auth);
  const [batchList, setBatchList] = useState([])
  const [auditorBatchId, setAuditorBatchId] = useState("")
  const [showAuditorModal, setShowAuditorModal] = React.useState(false);
  const [auditorUpdateData, setAuditorUpdateData] = useState([]);
  const [operatorBatchId, setOperatorBatchId] = useState("")
  const [showOperatorModal, setShowOperatorModal] = useState(false);
  const [operatorUpdateData, setOperatorUpdateData] = useState([]);
  const [exporterBatchId, setExporterBatchId] = useState("")
  const [showExporterModal, setShowExporterModal] = useState(false);
  const [exporterUpdateData, setExporterUpdateData] = useState([]);
  const [importerBatchId, setImporterBatchId] = useState("")
  const [showImporterModal, setShowImporterModal] = useState(false);
  const [importerUpdateData, setImporterUpdateData] = useState([]);
  const [processorBatchId, setProcessorBatchId] = useState("")
  const [showProcessorModal, setShowProcessorModal] = useState(false);
  const [processorUpdateData, setProcessorUpdateData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshBatchList, setRefreshBatchList] = useState(true);  // console.log(user.wallet_address);
  const  dispatch = useDispatch();
  useEffect(() => {
    // setTimeout(()=>{

      const getBatches = async () => {
        setLoading(true);
    
        try {
          if(refreshBatchList){
            setBatchList([]);
            let batch = await batchService.getUserBatches(user.wallet_address, user.role);
            // alert(batch.length)
            dispatch({
              type: BATCHES,
              payload: { totalBatches: batch.length },
            });
            // console.log(batch);
            setBatchList(batch)

            setRefreshBatchList(false)
            
          }
          setLoading(false);
          
        } catch (error) {
          setLoading(false);
          alertService.showError(error.message);
        }
      };

    (async () => {
      await  getBatches();

      })();
    // }, 1)
    

  }, [user.role, user.wallet_address , refreshBatchList]);

  

 

  const updateAuditor = (batchId) => {
    setAuditorUpdateData([]);
    setShowAuditorModal((prev) => !prev);
    setAuditorBatchId(batchId)
  }
  const updateOperator = (batchId) => {
    setOperatorUpdateData([]);
    setShowOperatorModal((prev) => !prev);
    setOperatorBatchId(batchId)

  }
  const updateExporter = (batchId) => {
    setExporterUpdateData([]);
    setShowExporterModal((prev) => !prev);
    setExporterBatchId(batchId)

  }
  const updateImporter = (batchId) => {
    setImporterUpdateData([]);
    setShowImporterModal((prev) => !prev);
    setImporterBatchId(batchId)

  }
  const updateProcessor = (batchId) => {
    setProcessorUpdateData([]);
    setShowProcessorModal((prev) => !prev);
    setProcessorBatchId(batchId)

  }
  const viewAuditorUpdate = async(batchId) => {
    try {
      setLoading(true);
      setAuditorUpdateData([]);
      let batch = await batchService.getAuditorData(batchId);
      if(batch){
        const obj = JSON.parse(atob(batch.extraData));

        // console.log("urls" ,obj);
        let updDate={'extractionMethod':batch.extractionMethod,"oilClass":batch.oilClass , 'documentHash':obj.documentHash};
        setAuditorUpdateData(updDate)
        setShowAuditorModal((prev) => !prev);
        setAuditorBatchId(batchId)
        setLoading(false);
      }else{
        setLoading(false);
        alertService.showError("Failed to view the batch update details");
      }
      
    } catch (error) {
      setLoading(false);
      alertService.showError(error.message);
    }


  }
  const viewOperatorUpdate = async(batchId) => {
    try {
      setLoading(true);
      setOperatorUpdateData([]);
      let data = await batchService.getOperatorData(batchId);
      if(data){
        const obj = JSON.parse(atob(data.extraData));
        let updData={'gravity':data.gravity,"hydrocarbonVariety":data.hydrocarbonVariety,'operatorAbi':data.operatorAbi , 'documentHash':obj.documentHash};
        setOperatorUpdateData(updData)
        setShowOperatorModal((prev) => !prev);
        setOperatorBatchId(batchId)
        setLoading(false);
      }else{
        setLoading(false);
        alertService.showError("Failed to view the batch update details");
      }
      
    } catch (error) {
      setLoading(false);
      alertService.showError(error.message);
    }


  }
  const viewExporterUpdate = async(batchId) => {
    try {
      setLoading(true);
      setExporterUpdateData([]);
      let data = await batchService.getExporterData(batchId);
      if(data){
        const obj = JSON.parse(atob(data.extraData));
        // console.log(data);
        let updData={'destinationAddress':data.destinationAddress,"estimateDateTime":data.estimateDateTime,'exporterId':data.exporterId , "quantity":data.quantity , "shipName":data.shipName, "shipNo":data.shipNo  , 'documentHash':obj.documentHash};
        setExporterUpdateData(updData)
        setShowExporterModal((prev) => !prev);
        setExporterBatchId(batchId)
        setLoading(false);
      }else{
        setLoading(false);
        alertService.showError("Failed to view the batch update details");
      }
      
    } catch (error) {
      setLoading(false);
      alertService.showError(error.message);
    }


  }
  const viewImporterUpdate = async(batchId) => {
    try {
      setLoading(true);
      setImporterUpdateData([]);
      let data = await batchService.getImporterData(batchId);
      if(data){
        const obj = JSON.parse(atob(data.extraData));
        let updData={'importerId':data.importerId,"quantity":data.quantity,'shipName':data.shipName , "shipNo":data.shipNo, "terminalCoordinates":data.terminalCoordinates , "terminalName":data.terminalName , "transportInfo":data.transportInfo  , 'documentHash':obj.documentHash};
        setImporterUpdateData(updData)
        setShowImporterModal((prev) => !prev);
        setImporterBatchId(batchId)
        setLoading(false);
      }else{
        setLoading(false);
        alertService.showError("Failed to view the batch update details");
      }
      
    } catch (error) {
      setLoading(false);
      alertService.showError(error.message);
    }


  }
  const viewProcessorUpdate = async(batchId) => {
    try {
      setLoading(true);
      setProcessorUpdateData([]);
      let data = await batchService.getProcessorData(batchId);
      if(data){
        const obj = JSON.parse(atob(data.extraData));
        let updData={'fuelGrade':data.fuelGrade,"internalBatchNo":data.internalBatchNo,'packagingDateTime':data.packagingDateTime , 'processorAddress':data.processorAddress , 'processorName':data.processorName , 'quantity':data.quantity, 'temperature':data.temperature  , 'documentHash':obj.documentHash};
        setProcessorUpdateData(updData)
        setShowProcessorModal((prev) => !prev);
        setProcessorBatchId(batchId)
        setLoading(false);
      }else{
        setLoading(false);
        alertService.showError("Failed to view the batch update details");
      }
      
    } catch (error) {
      setLoading(false);
      alertService.showError(error.message);
    }


  }
  const columns = [
    {
      accessor: "action", Header: "QR COde", Cell: ({ row }) => (
        // <div>   QRCode </div>)
        <div>   <QRCode value={`${configService.getBaseUrl()}batch/${row.original.batch_id}`} size={50} /> </div>)
    },
    { accessor: "batch_id", Header: "Batch ID" ,         Cell: ({ row }) => (
      <>
      <a href={`${configService.getBaseUrl()}batch/${row.original.batch_id}`} target="_blank">{row.original.batch_id.slice(0,5)+'...'+row.original.batch_id.slice(-4) || ""}</a>        
      </>
    ), },
    { accessor: "createdDate", Header: "Created Date" },
    
    {
      accessor: "blockNumber",
      id:"blockNumber",
      Header: "blockNumber",
      Cell: ({ row }) => (
        <>
        {Number(row.original.blockNumber)|| ""}
        </>
      ),
    },
    {
      accessor: "auditor", Header: "Auditor", disableSortBy:true, Cell: ({ row }) => (


        <div>

{((row.original.auditor > "0" && (user.wallet_address == row.original.wallerAddress)) && <div className="inline-flex text-dark-green">
<button type="button" onClick={() => viewAuditorUpdate(row.original.batch_id)}>
            <img className="mr-1" src="../images/tick.svg" alt=""  />Completed
            
            </button>
          </div>

          )}
          
{((row.original.auditor > "0" && (user.wallet_address != row.original.wallerAddress)) && <div className="inline-flex text-dark-green">
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
          </div>

          )}
           
          {((row.original.auditor == '0' && (user.wallet_address == row.original.wallerAddress)) && <button type="button" onClick={() => updateAuditor(row.original.batch_id)} className="text-xs font-semibold text-center px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
            Update
          </button>)}
          {((row.original.auditor == '0' && (user.wallet_address != row.original.wallerAddress)) && <div className="inline-flex text-dark-yellow">
            <img
              className="mr-1"
              src="../images/processing.svg"
              alt=""
            />
            Processing
          </div>)}
        



        </div>)
    },
    {
      accessor: "operator", Header: "Operator", disableSortBy:true, Cell: ({ row }) => (


        <div>

          {((row.original.operator > 1 && (user.wallet_address !== row.original.operatorAddress)) && <div className="inline-flex text-dark-green">
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
          </div>)}
          {((row.original.operator > 1 && (user.wallet_address === row.original.operatorAddress)) && <div className="inline-flex text-dark-green">
           <button type="button" onClick={() => viewOperatorUpdate(row.original.batch_id)}>

            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
            </button>
          </div>)}
          {((row.original.operator === '1' && (user.wallet_address === row.original.operatorAddress)) && <button type="button" onClick={() => updateOperator(row.original.batch_id)} className="text-xs font-semibold text-center px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
            Update
          </button>)}
          {((row.original.operator === '1' && (user.wallet_address !== row.original.operatorAddress)) && <div className="inline-flex text-dark-yellow">
            <img
              className="mr-1"
              src="../images/processing.svg"
              alt=""
            />
            Processing
          </div>)}
          {(row.original.operator < 1 && <div className="inline-flex text-dark-red">
            <img className="mr-1" src="../images/cross.svg" alt="" />
            Not Available
          </div>
          )}



        </div>)
    },
    {
      accessor: "exporter", Header: "Exporter", disableSortBy:true, Cell: ({ row }) => (
        <div>


          {((row.original.exporter > 2 && (user.wallet_address !== row.original.exporterAddress))&& <div className="inline-flex text-dark-green">
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
          </div>

          )}
          {((row.original.exporter > 2 && (user.wallet_address === row.original.exporterAddress))&& <div className="inline-flex text-dark-green">
          <button type="button" onClick={() => viewExporterUpdate(row.original.batch_id)}>

            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
            </button>
          </div>

          )}
          {((row.original.exporter === '2' && (user.wallet_address === row.original.exporterAddress)) && <button type="button" onClick={() => updateExporter(row.original.batch_id)} className="text-xs font-semibold text-center px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
            Update
          </button>)}
          {((row.original.exporter === '2' && (user.wallet_address !== row.original.exporterAddress)) && <div className="inline-flex text-dark-yellow">
            <img
              className="mr-1"
              src="../images/processing.svg"
              alt=""
            />
            Processing
          </div>)}
          {(row.original.exporter < 2 && <div className="inline-flex text-dark-red">
            <img className="mr-1" src="../images/cross.svg" alt="" />
            Not Available
          </div>
          )}



        </div>)
    },
    {
      accessor: "importer", Header: "Importer", disableSortBy:true, Cell: ({ row }) => (
        <div>
           {((row.original.importer > 3  && (user.wallet_address !== row.original.importerAddress)) && <div className="inline-flex text-dark-green">
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
          </div>

          )}
           {((row.original.importer > 3  && (user.wallet_address === row.original.importerAddress)) && <div className="inline-flex text-dark-green">
           <button type="button" onClick={() => viewImporterUpdate(row.original.batch_id)}>

            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
            </button>
          </div>

          )}
          {((row.original.importer === '3' && (user.wallet_address === row.original.importerAddress)) && <button type="button" onClick={() => updateImporter(row.original.batch_id)} className="text-xs font-semibold text-center px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
            Update
          </button>)}
          {((row.original.importer === '3' && (user.wallet_address !== row.original.importerAddress)) && <div className="inline-flex text-dark-yellow">
            <img
              className="mr-1"
              src="../images/processing.svg"
              alt=""
            />
            Processing
          </div>)}
          {(row.original.exporter < 3 && <div className="inline-flex text-dark-red">
            <img className="mr-1" src="../images/cross.svg" alt="" />
            Not Available
          </div>
          )}
        </div>)
    },
    {
      accessor: "processor", Header: "Processor", disableSortBy:true, Cell: ({ row }) => (
        <div>
            {((row.original.processor > "4" && (user.wallet_address !== row.original.processorAddress)) && <div className="inline-flex text-dark-green">
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
          </div>

          )}
            {((row.original.processor > "4" && (user.wallet_address === row.original.processorAddress)) && <div className="inline-flex text-dark-green">
            <button type="button" onClick={() => viewProcessorUpdate(row.original.batch_id)}>
            <img className="mr-1" src="../images/tick.svg" alt="" />
            Completed
            </button>
          </div>

          )}
           
          {((row.original.processor === '4' && (user.wallet_address === row.original.processorAddress)) && <button type="button" onClick={() => updateProcessor(row.original.batch_id)} className="text-xs font-semibold text-center px-6 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg flex">
            Update
          </button>)}
          {((row.original.processor === '4' && (user.wallet_address !== row.original.processorAddress)) && <div className="inline-flex text-dark-yellow">
            <img
              className="mr-1"
              src="../images/processing.svg"
              alt=""
            />
            Processing
          </div>)}
          {(row.original.processor < "4" && <div className="inline-flex text-dark-red">
            <img className="mr-1" src="../images/cross.svg" alt="" />
            Not Available
          </div>
          )}
        </div>)
    },



  ];

  return (
    <div className="">
      {loading && <Spinner />}

      <AuditorUpdateBatch showAuditorModal={showAuditorModal} setShowAuditorModal={setShowAuditorModal} auditorBatchId={auditorBatchId} auditorUpdateData={auditorUpdateData} setRefreshBatchList={setRefreshBatchList}/>
      <OperatorUpdateBatch showOperatorModal={showOperatorModal} setShowOperatorModal={setShowOperatorModal} operatorBatchId={operatorBatchId} operatorUpdateData={operatorUpdateData} setRefreshBatchList={setRefreshBatchList}/>
      <ExporterUpdateBatch showExporterModal={showExporterModal} setShowExporterModal={setShowExporterModal} exporterBatchId={exporterBatchId}  exporterUpdateData={exporterUpdateData} setRefreshBatchList={setRefreshBatchList} />
      <ImporterUpdateBatch showImporterModal={showImporterModal} setShowImporterModal={setShowImporterModal} ImporterBatchId={importerBatchId} importerUpdateData={importerUpdateData} setRefreshBatchList={setRefreshBatchList}/>
      <ProcessorUpdateBatch showProcessorModal={showProcessorModal} setShowProcessorModal={setShowProcessorModal} ProcessorBatchId={processorBatchId} processorUpdateData={processorUpdateData} setRefreshBatchList={setRefreshBatchList}/> 

      <div className="content text-coalblack">
        {/* table */}
        <div className="bg-white rounded-xl border shadow-sm">
          <div className="flex justify-between w-full py-3 items-center">
            <h2 className="ml-3 text-sm font-semibold relative">
             Batches Overview
            </h2>
            {(isDashboard==true)?
            <Link to={`/${user.role}/batches`}>
                  <button
                    type="button"
                    className="mb-1 px-3 py-2 bg-blue-600 rounded-md text-white outline-none shadow-lg transform transition-transform mx-2 flex items-center">View All</button>
            </Link>
            :''}
          </div>
          {batchList &&
            <Table data={batchList} columns={columns} roles={[]} isRolesEnabled={0} perPage={5} tableType={"user"} isDashboard={isDashboard}/>
          }
          
        </div>
      </div>
    </div>
  );
};
export default Batch_listing;
