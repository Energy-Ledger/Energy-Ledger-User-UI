import React, { useEffect , useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { useDispatch } from "react-redux";
import alertService from "../services/alert.service";
import blockchainService from "../services/blockchain.service.js";
import userService from "../services/user.service.js";
import { login } from "../actions/auth";
import configService from "../services/config.service";
import Spinner from "../components/common/Spinner";

  
export const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        (async () => {
          await loadBlockchainInstance();
         
          
        })();
      }, []);
     
    
      const loadBlockchainInstance = async () => {
            try {
          return new Promise(function(resolve,reject){
            Promise.all([ blockchainService.getBlockchainProvider(true),  blockchainService.getBlockchainProvider() ,  blockchainService.initContractInstance()]).then(function(data){
              resolve(data);
          });
          });
        } catch (error) {
          // setLoading(false);
          alertService.showError(error.message);
        }
      };

      const getUserDetail = async (_walletAddress) => {
        try {
          let response = await userService.getUserDetail(_walletAddress);
          if(response.type==='failed'){
           
            alertService.showError(response.message);
            
          }else{
            setLoading(true)
            let _approvedAllowanceResp = await userService.getAllowanceForBuy(_walletAddress);
            // console.log("_approvedAllowanceResp" , _approvedAllowanceResp);
          
            setLoading(false)
            return response.data;



          }

        } catch (error) {
          alertService.showError(error.message);
        }
      };
    
      const connectWallet = async () => {
        // setLoading(true);
        try {
          let _walletResp = await blockchainService.connectWallet();
          // console.log("_walletResp", _walletResp);
    
          if (_walletResp.status === "failure") {
            // setLoading(false);
            alertService.showError(_walletResp.message);
            return false;
          }
           new Promise(function(resolve,reject){
            Promise.all([blockchainService.initElxContractInstance()]).then(function(data){
              resolve(data);
          });
          });
          const out= await getUserDetail(_walletResp.data.walletAddress);
          if(out){
            let _formData = out;
            _formData["profileHashUrl"] = configService.createIpfsUrl(
              out.profileHash
            );
      
            dispatch(login(_formData))
              .then((res) => {
                if (_walletResp.status === "success") {
                  alertService.showSuccess("User login successfully");
                } else {
                  alertService.showError(_walletResp.message);
                }
                navigate(_formData.role==='users'?`${_formData.role}/buy-elx`:`${_formData.role}/dashboard`)
              })
              .catch(() => {
                alertService.showError(_walletResp.message);
                //   setLoading(false);
              });

          }

        } catch (error) {
          // setLoading(false);
          alertService.showError(error.message);
        }
      };
    
     



    // const handlechange=(e)=>{
    //     setRole(e.target.value);
    // }
    return (
       
        <div className="relative max-w-full text-center mx-auto flex items-center justify-center h-screen">
             {loading && <Spinner/>}
            <div className="login-box mx-auto justify-center items-center border-0 rounded-xl shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none lg:p-10 p-4">
                <img className="mx-auto mb-3" src="./ver-logo.svg" alt="" />
                <h3 className="text-xl text-coalblack font-semibold leading-normal mb-2">Welcome</h3>
                <p className="text-sm font-normal text-coalblack">Connect metamask for wallet connections.</p>
                {/* <select className="w-full border bg-white rounded px-3 py-2 outline-none" name="type" onChange={handlechange}>
                    <option className="py-1" value="auditor">auditor</option>
                    <option className="py-1" value="operator">Operator</option>
                    <option className="py-1" value="exporter">Exporter</option>
                    <option className="py-1" value="importer">Importer</option>
                    <option className="py-1" value="processor">Processor</option>

                </select> */}
                <button type="button" onClick={connectWallet} className="sm:w-3/4 text-center mx-auto items-center justify-center inline-flex text-sm font-semibold w-full mt-6 px-4 py-2 bg-tranperant text-indigo-500 rounded-md border border-indigo-600 outline-none shadow-lg">
                <img className="mr-2" src="./images/metamask.svg" alt="" /> 
                Login With MetaMask
            </button>      
            </div>
        </div>

    )
}
export default Login