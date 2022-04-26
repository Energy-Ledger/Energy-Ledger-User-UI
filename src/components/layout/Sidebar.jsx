import React from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
// import {useHistory} from 'react-router';
import {Navigation} from 'react-minimal-side-navigation';
import 'react-minimal-side-navigation/lib/ReactMinimalSideNavigation.css';

const Sidebar = (props) => {
  const userRole = props.user.role;
  var { pathname } = useLocation();
  var urls = pathname.split("/");
  const navigate = useNavigate();
  const location = useLocation();

return(

  <>
    
  <div className="hidden fixed lg:flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 text-coalblack bg-white h-full  transition-all duration-300 z-10 sidebar border-r">
    <div className="overflow-y-auto overflow-x-hidden flex flex-col flex-grow">
      <Link to={userRole!=='users'?`/${userRole}/dashboard`:`/${userRole}/buy-elx`}  className="text-2xl font-bold p-4">
        <img src="../../logo.svg" alt="" />
      </Link>
    {userRole!=='users'? <Navigation
      activeItemId={location.pathname}
      onSelect={({ itemId }) => {
        if(itemId!='submenu_logs' && itemId!='submenu_config')
        {
        navigate(itemId);
        }
      }}
      
      items={[
        {
          
          title: 'Dashboard',
          itemId:'/'+ userRole +'/dashboard',
          
          
          elemBefore: () => <img
            src="../../images/home.svg"
            alt=""
            className={urls[2] === "dashboard" ? "white-image " : ""}
          />,
        },


        {
          title: 'Bridge',
          itemId: '/'+ userRole +'/exchange',
          
          elemBefore: () => <img
          src="../../images/basket.svg"
          alt=""
          className={urls[2] === "exchange" ? "white-image" : ""}
        />,
        },

        {
          title: 'Batches',
          itemId:'/'+ userRole +'/batches',
          
          elemBefore: () => <img
            src="../images/batches.svg"
            alt=""
            className={urls[2] === "batches" ? "white-image" : ""}
          />,
        },

        {
          title: 'Staking',
          itemId: '/'+ userRole +'/elx-staking',
          
          elemBefore: () => <img
            src="../images/staking.svg"
            alt=""
            className={urls[2] === "elx-staking" ? "white-image" : ""}
          />,
        },

        {
          title: 'Buy ELX',
          itemId: '/'+ userRole +'/buy-elx',
          
          elemBefore: () => <img
            src="../images/basket.svg"
            alt=""
            className={urls[2] === "buy-elx" ? "white-image" : ""}
          />,
        },

        // {
        //   title: 'Buy BNB',
        //   itemId: '/'+ userRole +'/buy-bnb',
          
        //   elemBefore: () => <img
        //     src="../images/basket.svg"
        //     alt=""
        //     className={urls[2] === "buy-bnb" ? "white-image" : ""}
        //   />,
        // },

        {
          title: 'Logs',
          itemId: 'submenu_logs',
          elemBefore: () => <img
          src="../../images/log.svg"
          alt=""
         
        />,
          subNav: [
            {
              title: 'Reward History',
              itemId: '/'+ userRole +'/reward-history',
              
              elemBefore: () => <img
              src="../../images/award.svg"
              alt=""
              className={urls[2] === "reward-history" ? "white-image" : ""}
            />,
            },

            {
              title: 'Percentage History',
              itemId: '/'+ userRole +'/reward-percentage-history',
              
              elemBefore: () => <img
              src="../../images/award.svg"
              alt=""
              className={urls[2] === "reward-percentage-history" ? "white-image" : ""}
            />,
            },

            {
              title: 'Transaction History',
              itemId: '/'+ userRole +'/transactions',
              
              elemBefore: () => <img
              src="../../images/trans-history.svg"
              alt=""
              className={urls[2] === "transactions" ? "white-image" : ""}
            />,
            },

            {
              title: 'Stake History',
              itemId: '/'+ userRole +'/stake-history',
              
              elemBefore: () => <img
              src="../../images/trans-history.svg"
              alt=""
              className={urls[2] === "stake-history" ? "white-image" : ""}
            />,
            },
          ],
        },
        {
          title: 'Account Settings',
          itemId: '/'+ userRole +'/settings',
          
          elemBefore: () => <img
          src="../../images/settings.svg"
          alt=""
          className={urls[2] === "settings" ? "white-image" : ""}
        />,
        },


      ]}
    
      />:
      <Navigation
      activeItemId={location.pathname}
      onSelect={({ itemId }) => {
        if(itemId!='submenu_logs' && itemId!='submenu_config')
        {
        navigate(itemId);
        }
      }}
      
      
      items={[
     

       

        {
          title: 'Buy ELX',
          itemId: '/'+ userRole +'/buy-elx',
          
          elemBefore: () => <img
            src="../images/basket.svg"
            alt=""
            className={urls[2] === "buy-elx" ? "white-image" : ""}
          />,
        },
        {
          title: 'Bridge',
          itemId: '/'+ userRole +'/exchange',
          
          elemBefore: () => <img
          src="../../images/basket.svg"
          alt=""
          className={urls[2] === "exchange" ? "white-image" : ""}
        />,
        },

        {
          title: 'Staking',
          itemId: '/'+ userRole +'/elx-staking',
          
          elemBefore: () => <img
            src="../images/staking.svg"
            alt=""
            className={urls[2] === "elx-staking" ? "white-image" : ""}
          />,
        },
        {
          title: 'Logs',
          itemId: 'submenu_logs',
          elemBefore: () => <img
          src="../../images/log.svg"
          alt=""
         
        />,
          subNav: [
            {
              title: 'Reward History',
              itemId: '/'+ userRole +'/reward-history',
              
              elemBefore: () => <img
              src="../../images/award.svg"
              alt=""
              className={urls[2] === "reward-history" ? "white-image" : ""}
            />,
            },

            {
              title: 'Percentage History',
              itemId: '/'+ userRole +'/reward-percentage-history',
              
              elemBefore: () => <img
              src="../../images/award.svg"
              alt=""
              className={urls[2] === "reward-percentage-history" ? "white-image" : ""}
            />,
            },

            {
              title: 'Transaction History',
              itemId: '/'+ userRole +'/transactions',
              
              elemBefore: () => <img
              src="../../images/trans-history.svg"
              alt=""
              className={urls[2] === "transactions" ? "white-image" : ""}
            />,
            },

            {
              title: 'Stake History',
              itemId: '/'+ userRole +'/stake-history',
              
              elemBefore: () => <img
              src="../../images/trans-history.svg"
              alt=""
              className={urls[2] === "stake-history" ? "white-image" : ""}
            />,
            },
          ],
        },

       
        
      

      ]}
    
      />
      } 
      </div>
      </div>
      </>

)
  
  
//     return (
    
//       <div className="hidden fixed lg:flex flex-col top-0 left-0 w-14 hover:w-64 md:w-64 text-coalblack bg-white h-full  transition-all duration-300 z-10 sidebar border-r">
//       <div className="overflow-y-auto overflow-x-hidden flex flex-col flex-grow">
        
//           <Link className="text-2xl font-bold p-4" to={`${userRole}/dashboard`}>
//                  <img src="../logo.svg" alt="" />
//               </Link>
//         <ul className="flex flex-col gap-y-2">
         
//           <li >
//             {/* <Link to={`/${userRole}/dashboard`} className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-100 dark:hover:bg-gray-600 text-white-600 hover:text-white-800 border-l-4 border-transparent hover:border-blue-500 dark:hover:border-gray-800 pr-6 active:bg-blue-500 active:text-white"> */}
//             <Link to={`${userRole}/dashboard`} className= {urls[2]==='dashboard' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/home.svg" alt="home icon" className={urls[2]==='dashboard' ? "white-image": ""} />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Dashboard</span>
//             </Link>
//           </li>

//           {/* <li>
//             <Link to="/users" className="relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6">
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/users.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Users</span>
//             </Link>
//           </li> */}

//           <li>
//             <Link to={`${userRole}/batches`} className= {urls[2]==='batches' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/batches.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Batches</span>
//             </Link>
//           </li>

//           <li >
//             <Link to={`${userRole}/elx-staking`} className= {urls[2]==='elx-staking' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"} >
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/staking.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Staking</span>
//             </Link>
//           </li>

//           <li>
//             <Link to={`${userRole}/buy-elx`} className= {urls[2]==='buy-elx' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/basket.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Buy ELX</span>
//             </Link>
//           </li>

//           <li>
//             <Link to={`${userRole}/buy-bnb`} className= {urls[2]==='buy-bnb' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/basket.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Buy BNB</span>
//             </Link>
//           </li>
//           <li >
//             <Link to={`${userRole}/reward-history`} className= {urls[2]==='reward-history' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/award.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Reward History</span>
//             </Link>
//           </li>
//           <li >
//             <Link to={`${userRole}/reward-percentage-history`} className= {urls[2]==='reward-percentage-history' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/award.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Percentage History</span>
//             </Link>
//           </li>

//           <li>
//             <Link to={`${userRole}/transactions`} className= {urls[2]==='transactions' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/trans-history.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Transaction History</span>
//             </Link>
//           </li>
          
          
//           <li>
//             <Link to={`${userRole}/settings`} className= {urls[2]==='settings' ? " relative flex flex-row items-center h-11 focus:outline-none  pr-6 bg-blue-500 text-white " : "relative flex flex-row items-center h-11 focus:outline-none hover:text-white-800 pr-6"}>
//               <span className="inline-flex justify-center items-center ml-4">
//                 <img src="../images/settings.svg" alt="" />
//               </span>
//               <span className="ml-2 text-sm font-semibold tracking-wide truncate">Account Settings</span>
//             </Link>
//           </li>

        
        
//         </ul>
        
//         {/* <p className="mb-14 px-5 py-3 hidden md:block text-center text-xs">Copyright @2021</p> */}
//       </div>
//     </div>
// )
}
export default Sidebar