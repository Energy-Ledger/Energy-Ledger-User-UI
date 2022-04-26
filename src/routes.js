import { Navigate,Outlet } from 'react-router-dom';


// import Home from './views/Home';
import BatchListing from './views/batches/BatchListing';
// import Users from './views/Users';
// import Modal from './views/Modal';
import BuyBnb from './views/BuyBnb';
import BuyElx from './views/elx/BuyElx';
// import RewardConfig from './views/RewardConfig';
import Settings from './views/settings';
import ElxStalking from './views/staking/ElxStalking';
import Login from './views/Login';
import UserDashboard from "./views/UserDashboard";
import TransactionHistory from "./views/transaction/TransactionHistory";
import RewardHistory from "./views/transaction/RewardHistory";
import RewardPercentageHistory from "./views/transaction/RewardPercentageHistory";
import BatchDetails from"./views/BatchDetails";
import ViewBatch from"./views/batches/ViewBatch";
import StakeHistory from './views/transaction/StakeHistory';
import Exchange from './views/Exchange';

const routes = (isLoggedIn ,user , isMetaConnect) => 
[
  {
    path: '/auditor',
    element:  isLoggedIn && user.role==='auditor' ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <UserDashboard isMetaConnect={false}/>  },
      { path: 'batches', element: <BatchListing /> },
      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'buy-bnb', element: <BuyBnb /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'settings', element: <Settings /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'view-batch', element: <BatchDetails /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },
    ],
  },
  {
    path: '/operator',
    element:  isLoggedIn && user.role==='operator' ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <UserDashboard />  },
      { path: 'batches', element: <BatchListing /> },
      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'buy-bnb', element: <BuyBnb /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'settings', element: <Settings /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'view-batch', element: <BatchDetails /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },
    ],
  },
  {
    path: '/exporter',
    element:  isLoggedIn && user.role==='exporter' ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <UserDashboard />  },
      { path: 'batches', element: <BatchListing /> },
      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'buy-bnb', element: <BuyBnb /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'settings', element: <Settings /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'view-batch', element: <BatchDetails /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },
    ],
  },
  {
    path: '/importer',
    element:  isLoggedIn && user.role==='importer' ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <UserDashboard />  },
      { path: 'batches', element: <BatchListing /> },
      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'buy-bnb', element: <BuyBnb /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'settings', element: <Settings /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'view-batch', element: <BatchDetails /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },
    ],
  },
  {
    path: '/processor',
    element:  isLoggedIn && user.role==='processor' ? <Outlet /> : <Navigate to="/login" />,
    children: [
      { path: 'dashboard', element: <UserDashboard />  },
      { path: 'batches', element: <BatchListing /> },
      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'buy-bnb', element: <BuyBnb /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'settings', element: <Settings /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'view-batch', element: <BatchDetails /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },
    ],
  },
  {
    path: '/users',
    element:  isLoggedIn && user.role==='users' ? <Outlet /> : <Navigate to="/login" />,
    children: [

      { path: 'elx-staking', element: <ElxStalking /> },
      { path: 'buy-elx', element: <BuyElx /> },
      { path: 'reward-history', element: <RewardHistory /> },
      { path: 'reward-percentage-history', element: <RewardPercentageHistory /> },
      { path: 'transactions', element: <TransactionHistory /> },
      { path: 'stake-history', element: <StakeHistory /> },
      { path: 'exchange', element: <Exchange /> },

    ],
  },
  {
    path: '/',
    element: !isLoggedIn ? <Login /> : <Navigate to={user.role==='users'?`/${user.role}/buy-elx`:`/${user.role}/dashboard`} />,
    children: [
      { path: 'login', element: <Login /> },
    ],
  },
  {
     path: 'batch/:id', element: <ViewBatch/> 
  },
  {
     path: '*', element: <Login/> 
  }
];

export default routes;