import { Navigate, useRoutes } from 'react-router-dom';// The useRoutes hook is the functional equivalent of <Routes>, but it uses JavaScript objects instead of <Route> elements to define your routes

import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard';


import ATMInfo from './pages/ATMInfo';
import Page404 from './pages/Page404';

import DashboardAppPage from './pages/DashboardAppPage';
import Branch from './pages/Branch';
import Districts from './pages/destricts';
import Service from './pages/Service';
import ATMDetailes from './pages/ATMDetailes';
import Senario from './pages/Senario';
import Vendor from './pages/Vendor';
import Host from './pages/Host';
import Location from './pages/Location';
import Model from './pages/Model';
import Lo from "./pages/Lo";
import MaintType from './pages/MaintType';
import MaintEmployee from './pages/MaintEmployee';
import MaintProblem from './pages/MaintProblem';
import Maintinance from './pages/Maintinance';
import MaintCompany from './pages/MaintCompany'
import SignUpp from './pages/SignUpp';

import ATMMaintinanceFiles from './pages/ATMMaintinanceFiles';
import DisplayMaintinanceFile from './pages/DisplayMaintinanceFile';
import Journal from './pages/Journal';
import CashDepositTransactionDetailes from './pages/CashDepositTransactionDetailes';
import CashWithdrawalDetailes from './pages/CashWithdrawalDetailes';
import BalanceInquiry from './pages/BalanceInquiry';
import MiniStatement from './pages/MiniStatement';
import PinChange from './pages/PinChange';
import ChequebookRequest from './pages/ChequebookRequest';
import FundTransfer from './pages/FundTransfer';
import ChequeDeposit from './pages/ChequeDeposit';

// Routing it enables the navigation among views of various components in a React Application

export default function Router() {


  const routes = useRoutes([
    {
      path: '/LoginPage',
      element: <LoginPage />,
    },

    {
      path: '/SignUpp',
      element: <SignUpp />
    },
   
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'districts', element: <Districts /> },
        { path: 'branch', element: <Branch /> },
       
        { path: 'maintinancefile/:terminalname', element: <ATMMaintinanceFiles /> },
        { path: 'host', element: <Host /> },
        { path: 'vendor', element: <Vendor /> },
        { path: 'model', element: <Model /> },
        { path: 'location', element: <Location /> },
        { path: 'service', element: <Service /> },
        { path: 'atminfo', element: <ATMInfo /> },
        { path: 'atmdetailes/:terminalname', element: <ATMDetailes /> },
        { path: 'senario', element: <Senario /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'displaymaintinancefile/:file', element: <DisplayMaintinanceFile /> },
        { path: 'journal', element: <Journal /> },
        { path: 'Lo', element: <Lo /> },
        { path: 'maintinace', element: <Maintinance/> },
        { path: 'maint_type', element:<MaintType /> },
        { path: 'maint_emp', element:<MaintEmployee /> },
        { path: 'maint_problem', element:<MaintProblem /> },
        { path: 'maint_company', element:<MaintCompany /> },
        { path: 'Cash Deposit/:cashDepositId', element:<CashDepositTransactionDetailes /> },
{path:'Cash Withdrawal/:cashWithdrawalId',element:<CashWithdrawalDetailes/>},
{path:'Balance Inquiry/:balanceInquiryId',element:<BalanceInquiry/>},
{path:'Mini Statement/:ministatmentId',element:<MiniStatement/>},
{path:'PIN Change/:pin changeId',element:<PinChange/>},
{path:'Cheque Book Request/:chequebookrequestId',element:<ChequebookRequest/>},
{path:'Fund Transfer/:fundtransferId',element:<FundTransfer/>},
{path:'Cheque Deposit/:chequedepositId',element:<ChequeDeposit/>}
      ],
    },


    {
      // element: <SimpleLayout />,
      element: <LoginPage />,
      children: [

        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
  
