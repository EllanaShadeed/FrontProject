        
    import * as React from 'react';
    import { Helmet } from 'react-helmet-async';
    import { useState, useEffect } from 'react';
    import MaterialTable from 'material-table';
    import Grid from '@mui/material/Grid'; // Grid version 1
    import TextField from '@mui/material/TextField';
    import SearchIcon from '@mui/icons-material/Search';
    import {
        Card,
        Stack,
        Popover,
        MenuItem,
        Typography,
    } from '@mui/material';
    import Button from '@mui/material/Button';
    import Box from '@mui/material/Box';
    import FormControl from '@mui/material/FormControl';
    import NativeSelect from '@mui/material/NativeSelect';
    import dayjs from 'dayjs';
    import { Link } from 'react-router-dom';
    import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
    import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
    import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
    import { DatePicker } from '@mui/x-date-pickers/DatePicker';
    import Select from '@mui/material/Select';
    import FormLabel from '@mui/material/FormLabel';
    import 'regenerator-runtime/runtime';
    import Dialog from '@mui/material/Dialog';
    import DialogActions from '@mui/material/DialogActions';
    import DialogContent from '@mui/material/DialogContent';
    import DialogTitle from '@mui/material/DialogTitle';
    import { AccountBalance } from '@mui/icons-material';
    import Iconify from '../components/iconify';
   
    import CashWithdrawalDialog from './CashWithdrawalDialog';

    



    // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.



    export default function Journal() {


// get token value from local storage
      const token =  `${localStorage.getItem('token')}`; 
      console.log(token);

      const columnswithouttrxtype=[
        {
            title: 'Card Num', field: 'cardNumber',
        },
        {
          title: 'Status  ', field: 'status',render: rowData => {
              return(
                rowData.status === "1" ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
                <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
            }},
            {
              title: 'QB Card  ', field: 'isqbCard',render: rowData => {
                return(
                  rowData.isqbCard === "1" ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
                  <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
              }
           },
           {
            title: 'Method ', field: 'method',type:'numeric',render: rowData => {
              return(
                rowData.method === "0" ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
                rowData.method === "1" ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
                rowData.method === "2" ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
                <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
                )
            }
        },
        {
          title: 'Terminal', field: 'terminal',
      },
      {
        title: 'Date', field: 'dateTr',render: rowData => formatDate(rowData.dateTr)
      },
      {
        title: 'Operation', field: 'trxType',render:rowData=>{
          const defaultSelectedValue = rowData.trxType[0];
         
             return (
              
               rowData.trxType.length!==1?
               <div>
               <span style={{color:'blue',fontSize:'15px'}}>Multi Transaction</span>
               <Select value={defaultSelectedValue}>
          
               {rowData.trxType.map((type,index) => (
               <MenuItem key={index} value={type}>
                
                  <Link 
                  to={`/dashboard/${type}/${rowData.trxTypeAndId[index]}`} style={{ textDecoration: 'none' }}>{type}</Link>
               </MenuItem>
               ))}
                 </Select></div>:
                   <span><Link to={`/dashboard/${defaultSelectedValue}/${rowData.trxTypeAndId}`} style={{ textDecoration: 'none' }}>{defaultSelectedValue}</Link> </span>
          
                 );
               }
             }
    ]; // define  columns that display in this page if search without  any TrxType

    
    const columnswithGeneralTrxType=[
      {
          title: 'Card Num', field:'card',
      },
      {
        title: 'Status  ', field: 'isStatus',render: rowData => {
            return(
              rowData.isStatus === 1 ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
              <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
          }},
          {
            title: 'QB Card', field:'isqbcard'
            ,render: rowData => {
              return(
                rowData.isqbCard === 1?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
                <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
            }
         },
         {
          title: 'Method ', field:'method',render: rowData => {
            return(
              rowData.method === 0 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
              rowData.method === 1 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
              rowData.method === 2 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
              <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
              )
          }
      },
      {
        title: 'Response Code', field:'responseCode',
    },
    
    {
      title: 'Date', field: 'date',render: rowData => formatDate(rowData.date)
    },
   
  ]; //  define  columns that display in this page if search with General TrxType(Balance Inquery,Mini Statment,ChequeBook Request,PIN Change)

  
  const columnswithChequeDepositTrxType=[
    {
        title: 'Card Num', field:'card',
    },
    {
      title: 'Status  ', field: 'isStatus',render: rowData => {
          return(
            rowData.isStatus === 1 ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
            <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
        }},
        {
          title: 'QB Card', field:'isQbcard'
          ,render: rowData => {
            return(
              rowData.isqbCard === 1?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
              <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
          }
       },
       {
        title: 'Method ', field:'method',render: rowData => {
          return(
            rowData.method === 0 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
            rowData.method === 1 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
            rowData.method === 2 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
            <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
            )
        }
    },
    {
      title: 'Response Code', field:'responseCode',
  },
  {
    title: 'Cheque Number', field:'numberOfCheque',
},
{
  title: 'Transaction Number', field:'transaction',
},
  
  {
    title: 'Date', field: 'date',render: rowData => formatDate(rowData.date)
  },
 
]; //  define  columns that display in this page if search with  TrxType Cheque Deposit



const columnswithFundsTransferTrxType=[
  {
      title: 'Card Num', field:'card',
  },
  {
    title: 'Status  ', field: 'isStatus',render: rowData => {
        return(
          rowData.isStatus === 1 ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
          <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
      }},
      {
        title: 'QB Card', field:'isqbcard'
        ,render: rowData => {
          return(
            rowData.isqbCard === 1?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
            <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
        }
     },
     {
      title: 'Method ', field:'method',render: rowData => {
        return(
          rowData.method === 0 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
          rowData.method === 1 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
          rowData.method === 2 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
          <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
          )
      }
  },
  {
    title: 'Amount', field:'amount',
},
  {
    title: 'Response Code', field:'responseCode',
},
{
  title: 'Auth Code', field:'authCode',
},
{
  title: 'From Account', field:'accountFrom',
},
{
  title: 'To Account', field:'accountTo',
},
{
title: 'Transaction Number', field:'transaction',
},

{
  title: 'Date', field: 'date',render: rowData => formatDate(rowData.date)
},

]; //  define  columns that display in this page if search with  TrxType Fund Transfer



const columnswithCashDepositTrxType=[
  {
      title: 'Card Num', field:'card',
  },
  {
    title: 'Status  ', field: 'isStatus',render: rowData => {
        return(
          rowData.isStatus === 1 ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
          <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
      }},
      {
        title: 'QB Card', field:'isqbcard'
        ,render: rowData => {
          return(
            rowData.isqbCard === 1?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
            <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
        }
     },
     {
      title: 'Method ', field:'method',render: rowData => {
        return(
          rowData.method === 0 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
          rowData.method === 1 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
          rowData.method === 2 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
          <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
          )
      }
  },
  {
    title: 'Amount', field:'amount',
},
  {
    title: 'Response Code', field:'responseCode',
},
{
  title: 'Auth Code', field:'authCode',
},
{
  title: 'Account', field:'account',
},
{
  title: 'Currency', field:'currency',
},
{
  title:'Input details',feild:'inpoutDetels'}
  ,

{
title: 'Transaction Number', field:'transaction',
},

{
  title: 'Date', field: 'date',render: rowData => formatDate(rowData.date)
},

]; //  define  columns that display in this page if search with  TrxType Cash Deposit

const columnswithCashWithdrawalTrxType=[
  {
      title: 'Card Num', field:'card',
  },
  {
    title: 'Status  ', field: 'isStatus',render: rowData => {
        return(
          rowData.isStatus === 1 ?<h2 style={{ color: "red", fontWeight: "bold",fontSize:"15px" }}>Fail</h2>  :
          <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>Success</h2>)
      }},
      {
        title: 'QB Card', field:'isqbcard'
        ,render: rowData => {
          return(
            rowData.isqbCard === 1?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Quds Card</h2>  :
            <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Quds Card</h2>)
        }
     },
     {
      title: 'Method ', field:'method',render: rowData => {
        return(
          rowData.method === 0 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Cardless</h2>  :
          rowData.method === 1 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contactless</h2>:
          rowData.method === 2 ?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Contact</h2>:
          <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>_</h2>
          )
      }
  },
  {
    title: 'Amount', field:'amount',
},
{
  title: 'Case1', field:'case1',
},
{
  title: 'Case2', field:'case2',
},
{
  title: 'Case3', field:'case3',
},
{
  title: 'Case4', field:'case4',
},
{
  title: 'Case5', field:'case5',
},
{
  title: 'Cash Taken', field:'cashTaken'
  
  ,render: rowData => {
    return(
      rowData.cashTaken
      === "1"?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Taken</h2>  :
      <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Taken</h2>)
  }
},
{
  title: 'Cash Presented', field:'cashPresented'
  ,render: rowData => {
    return(
      rowData.isqbcard
      === "1"?<h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Not Presented</h2>  :
      <h2 style={{ color: "black", fontWeight: "bold",fontSize:"15px" }}>Presented</h2>)
  }
},
{
  title: 'Terminal', field:'terminal',
},
  {
    title: 'Response Code', field:'responseCode',
},
{
  title: 'Auth Code', field:'authCode',
},
{
  title: 'Account', field:'account',
},
{
  title: 'Currency', field:'currency',
},

{
title: 'Transaction Number', field:'transaction',
},

{
  title: 'Date', field: 'date',render: rowData => formatDate(rowData.date)
},

]; //  define  columns that display in this page if search with  TrxType Cash Deposit

// useState hook allows you to add state to your functional component
        const [columns, setColumns] = useState([]);// define a column variable to set columns in that variable based on columns returned from any API 
        const [data, setData] = React.useState([
        ]);//  define a data variable to set data in that variable based on data returned from any API 
        const [open, setOpen] = useState(null);
        const handleCloseMenu = () => {
            setOpen(null);
        }
          const [AtmTerminal, setAtmTerminal] = useState('');
          const [TerminalError, setError] = useState('');
          const [ResponseCodeError, setResponseCodeError] = useState('');
          const [CardNum, setCardNum] = useState('');
          const [IsStatus, setIsStatus] = useState('');
          const [IsQbCard, setIsQbCard] = useState('');
          const [Method, setMethod] = useState('');
          const [EndDate,setEndDate]=useState('');
          const [StartDate,setStartDate]=useState('');
          const [ResponseCode,setResponseCode]=useState('');
          const [AuthCode,setAuthCode]=useState('');
          const [Account,setAccount]=useState('');
          const [NumberOfCheque,setNumberOfCheque]=useState('');
          const [TransactionNumber,setTransactionNumber]=useState('');
          const [FromAccount,setFromAccount]=useState('');
          const [ToAccount,setToAccount]=useState('');
          const [Amount,setAmount]=useState('');
          const [Currency,setCurrency]=useState('');
          const [InputDetailes,setInputDetailes]=useState('');
          const [IsCashTaken, setIsCashTaken] = useState('');
          const [IsCashPresented, setIsCashPresented] = useState('');
          const [Case1, setCase1] = useState('');
          const [Case2, setCase2] = useState('');
          const [Case3, setCase3] = useState('');
          const [Case4, setCase4] = useState('');
          const [Case5, setCase5] = useState('');
          const [TrxType, setTrxType] = useState('');
          const [openDialogCashWithdrawal, setOpenDialogCashWithdrawal] = useState(false);
          const [openDialogCashDeposit, setOpenDialogCashDeposit] = useState(false);
          const [openDialogBalanceInquiry, setOpenDialogBalanceInquiry] = useState(false);
          const [openDialogMiniStatement, setOpenDialogMiniStatement] = useState(false);
          const [openDialogPinChange, setOpenDialogPinChange] = useState(false);
          const [openDialogFundsTransfer, setOpenDialogFundsTransfer] = useState(false);
          const [openDialogChequeDeposit, setOpenDialogChequeDeposit] = useState(false);
          const [openDialogChequebookRequest, setOpenDialogChequebookRequest] = useState(false);
          
          const handleTrxTypeChange = (e) => {// handle  trx type dialog
            const selectedValue = e.target.value;
            setTrxType(selectedValue);
            
        
            // Open dialog based on the selected value(trx type)
            if (selectedValue === 'Cash Withdrawal') {
              setOpenDialogCashWithdrawal(true);
            } else {
              setOpenDialogCashWithdrawal(false);
            }
            if (selectedValue === 'Cash Deposit') {
              setOpenDialogCashDeposit(true);
            } else {
              setOpenDialogCashDeposit(false);
            }
            if (selectedValue === 'Balance Inquiry') {
              setOpenDialogBalanceInquiry(true);
            } else {
              setOpenDialogBalanceInquiry(false);
            }
            if (selectedValue === 'Mini Statement') {
              setOpenDialogMiniStatement(true);
            } else {
              setOpenDialogMiniStatement(false);
            }
            if (selectedValue === 'PIN Change') {
              setOpenDialogPinChange(true);
            } else {
              setOpenDialogPinChange(false);
            }
            if (selectedValue === 'Funds Transfer') {
              setOpenDialogFundsTransfer(true);
            } else {
              setOpenDialogFundsTransfer(false);
            }
            if (selectedValue === 'Cheque Deposit') {
              setOpenDialogChequeDeposit(true);
            } else {
              setOpenDialogChequeDeposit(false);
            }
            if (selectedValue === 'Chequebook Request') {
              setOpenDialogChequebookRequest(true);
            } else {
              setOpenDialogChequebookRequest(false);
            }
          };
        // Close dialog based on trx type
          const handleCloseCashWithdrawal = () => {
            setOpenDialogCashWithdrawal(false);
          };
          const handleCloseCashDeposit = () => {
            setOpenDialogCashDeposit(false);
          };
          const handleCloseBalanceInquiry = () => {
            setOpenDialogBalanceInquiry(false);
          };
          const handleCloseMiniStatement = () => {
            setOpenDialogMiniStatement(false);
          };
          const handleClosePinChange = () => {
            setOpenDialogPinChange(false);
          };
          const handleCloseFundsTransfer = () => {
            setOpenDialogFundsTransfer(false);
          };
          const handleCloseChequeDeposit = () => {
            setOpenDialogChequeDeposit(false);
          };
          const handleCloseChequebookRequest = () => {
            setOpenDialogChequebookRequest(false);
          };
         // handle ATM Terminal value
          const handleAtmTerminalChange=(event)=>{
            
              setAtmTerminal(event.target.value);
              setError(''); // Clear the error when the user starts typing

            }
            // handle response code change value
            const handleResponseCodeChange=(event)=>{
              console.log(event.target.value);
                setResponseCode(event.target.value);
                setResponseCodeError(''); // Clear the error when the user starts typing
  
              }
              // handle auth code cahnge value
              const handleAuthCodeChange=(event)=>{
                console.log(event.target.value);
                  setAuthCode(event.target.value);
                }
                // handle account change value
                const handleAccountChange=(event)=>{
                  console.log(event.target.value);
                    setAccount(event.target.value);
                
                  }
                  // handle  cheque number change value 
                  const handleNumberofChequeChange=(event)=>{
                    console.log(event.target.value);
                      setNumberOfCheque(event.target.value);
                    }
                    // handle transaction change value
                    const handleTransactionNumberChange=(event)=>{
                      console.log(event.target.value);
                        setTransactionNumber(event.target.value);
                      
          
                      }
                      const handleFromAccountChange=(event)=>{
                        console.log(event.target.value);
                          setFromAccount(event.target.value);
                        
            
                        }
                        const handleToAccountChange=(event)=>{
                          console.log(event.target.value);
                            setToAccount(event.target.value);
                          
              
                          }
                          const handleAmountChange=(event)=>{
                            console.log(event.target.value);
                              setAmount(event.target.value);
                            
                
                            }
                            const handleCurrencyChange=(event)=>{
                              const newValue = event.target.value;
                              setCurrency(newValue);
                        
                              }
                              const handleInputDetailesChange=(event)=>{
                                console.log(event.target.value);
                                  setInputDetailes(event.target.value);
                                
                    
                                }
                                const handleCase1Change=(event)=>{
                                  console.log(event.target.value);
                                    setCase1(event.target.value);
                                  
                      
                                  }
                                  const handleCase2Change=(event)=>{
                                    console.log(event.target.value);
                                      setCase2(event.target.value);
                                    
                        
                                    }
                                    const handleCase3Change=(event)=>{
                                      console.log(event.target.value);
                                        setCase3(event.target.value);
                                      
                          
                                      }
                                      const handleCase4Change=(event)=>{
                                        console.log(event.target.value);
                                          setCase4(event.target.value);
                                        
                            
                                        }
                                        const handleCase5Change=(event)=>{
                                          console.log(event.target.value);
                                            setCase5(event.target.value);
                                          
                              
                                          }
           
        const handleButtonClick = () => {
          // This Function Is Called After Click Search Button (in the Journal page)
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              if (TrxType==='Balance Inquiry'||TrxType==='Mini Statement'||TrxType==='PIN Change'||TrxType==='ChequeBook Request') {
               
                fetchGeneralTRxTypeData();
              }
              if (TrxType==='Cheque Deposit') {
                fetchChequeDepositData();
              }
              if (TrxType==='Cash Withdrawal') {
                fetchCashWithdrawalData();
              }
              if (TrxType==='Funds Transfer') {
                fetchFundsTransferData();
              }
              if (TrxType==='Cash Deposit') {
                fetchCashDepositData();
              }
              if (TrxType==='') {
                fetchData();
              }
              // if feild of terminal number is not empty call function fetchData to display all transaxtion that made in this terminal 
              
            }
              
           
          
        };
    
        const handleGeneralSearch = () => {
          // This Function Is Called After Click Search Button(in dialog for general trx type like:balance inquery,mini statement,pin change,cheque book request) 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchGeneralTRxTypeData ();// if feild of terminal number is not empty call function fetchDataTRxType 
            
            }
              
           
          
        };
        const handleChequeDepositSearch = () => {
          // This Function Is Called After Click Search Button (in cheque deposit dialog)
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
             
              fetchChequeDepositData();// if feild of terminal number is not empty call function fetchDataChequeDeposit
            
            }
              
           
          
        };

        
        const handleFundsTransferSearch= () => {
          // This Function Is Called After Click Search Button(in dialog for funds transfer trx type ) 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchFundsTransferData ();// if feild of terminal number is not empty call function fetchDataTRxType 
            
            }
              
           
          
        };
        const handleCashDepositSearch = () => {
          // This Function Is Called After Click Search Button(in dialog for Cash Deposit trx type ) 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchCashDepositData ();// if feild of terminal number is not empty call function fetchDataTRxType 
            
            }
          }
          
        const handleCashWithdrawalSearch = () => {
          // This Function Is Called After Click Search Button(in dialog for cash withdrawal trx type ) 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchCashWithdrawalData ();// if feild of terminal number is not empty call function fetchCashWithdrawalData
            
            }
              
           
          
        };
 const formatDate = timestamp => {// this function to handle date format
  const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ( (date.getMonth() + 1)); 
    const day = ( date.getDate());
    const formattedDate = `${year}-${month}-${day} `;
    return formattedDate;
  
};
 console.log(IsStatus);
 console.log(IsQbCard);
        const fetchData = async () => {// this function to get all transactions in any ATM after enter terminal number 
          setColumns(columnswithouttrxtype);
         
          const conditions = [// The conditions array is created ,that  containing key-value pairs for  each input  i want to search it 
            `tri_cardno=${encodeURIComponent(CardNum)}`,
            `tri_isstatus=${encodeURIComponent(IsStatus)}`,
            `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
            `tri_method=${encodeURIComponent(Method)}`,
            `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
            `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
           
            
          ].join('&');// The join('&') method is used to concatenate these conditions into a single string separated by the '&' character.
          
          console.log(conditions);
          const params = new URLSearchParams(conditions);// The string is then converted into a URLSearchParams object named params
          console.log(params);
          const conditionsArray = [];

          Array.from(params).forEach(([key, value]) => {// Array.from(params) method is used to convert the params object into an array of its key-value pairs.
            conditionsArray.push({ key: `&additionalConditions=${key}`, value });
          });
          
      
          
          const newArray = conditionsArray.filter(item => Object.values(item)[1]);// check new array if have any value or not by use filter method
         

    

 

    if(newArray===null || newArray.length === 0 ){// If the array is empty, then call the API and pass a ATMTerminal only. 
      
    
      const apiUrl = `http://localhost:8080/api/findTr/transactions/All/?terminal=${AtmTerminal}`;
      console.log(apiUrl);
      const response = await fetch(apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json', 
        },
       });
      
       const result = await response.json();
       console.log(result);
       setData(result);// set result return from api in data variable
       console.log(apiUrl);
    }

    else{// if newarray have any value then call api and pass ATMTerminal and queryParams
      const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('&');// Create a query string from newArray
      console.log(queryParams);

 
        const url = `http://localhost:8080/api/findTr/transactions/All/?terminal=${AtmTerminal}${queryParams}`;
        console.log(url);
 
        const response = await fetch(url, {
         headers: {
           'Authorization': `Bearer ${token}`,
           'Content-Type': 'application/json', 
         },
        });
       
        const result = await response.json();
        console.log(result);
        setData(result);
    
    
  }
      
      }  
      console.log(data);
      console.log(columns);

      const fetchGeneralTRxTypeData = async () => {
        setColumns(columnswithGeneralTrxType);
         
        const conditions = [
          `tri_cardno=${encodeURIComponent(CardNum)}`,
          `tri_isstatus=${encodeURIComponent(IsStatus)}`,
          `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
          `tri_method=${encodeURIComponent(Method)}`,
          `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
          `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
          `get_response_code=${encodeURIComponent(ResponseCode)}`,
          
          
        ].join('&');
        
        console.log(conditions);
        const params = new URLSearchParams(conditions);
        console.log(params);
        const conditionsArray = [];

        Array.from(params).forEach(([key, value]) => {
          conditionsArray.push({ key: `&additionalConditions=${key}`, value });
        });
        
    
        
        const newArray = conditionsArray.filter(item => Object.values(item)[1]);
       

  

  

 

    const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('');
    console.log(TrxType);
    const url = `http://localhost:8080/api/findTransaction/transactions/gt/MultipleSearch?typeTrx=${TrxType}&terminal=${AtmTerminal}${queryParams}`;
   console.log(url);


   const response = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json', 
    },
   });
  
   const result = await response.json();
   setData(result);
   if(TrxType==="Balance Inquiry"){
   handleCloseBalanceInquiry();
    
    }
    if(TrxType==="PIN Change"){
   handleClosePinChange();}

   if(TrxType==="Mini Statement"){
    handleCloseMiniStatement();
    
    } 
      
    if(TrxType==="Chequebook Request"){
      handleCloseChequebookRequest();
      
      } 
      
  }

  const fetchChequeDepositData = async () => {
    
     setColumns(columnswithChequeDepositTrxType);
    const conditions = [
      `tri_cardno=${encodeURIComponent(CardNum)}`,
      `tri_isstatus=${encodeURIComponent(IsStatus)}`,
      `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
      `tri_method=${encodeURIComponent(Method)}`,
      `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
      `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
      `chd_account=${encodeURIComponent(Account)}`,
      `chd_responsecode=${encodeURIComponent(ResponseCode)}`,
      `chd_authcode=${encodeURIComponent(AuthCode)}`,
      `numberofcheeuea=${encodeURIComponent(NumberOfCheque)}`,
      `chd_transaction=${encodeURIComponent(TransactionNumber)}`,
      
    ].join('&');
    
    console.log(conditions);
    const params = new URLSearchParams(conditions);
    console.log(params);
    const conditionsArray = [];

    Array.from(params).forEach(([key, value]) => {
      conditionsArray.push({ key: `&additionalConditions=${key}`, value });
    });
    

    
    const newArray = conditionsArray.filter(item => Object.values(item)[1]);
   







const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('');


const url = `http://localhost:8080/api/findTransaction/transactions/chq/MultipleSearch?terminal=${AtmTerminal}${queryParams}`;
console.log(url);


const response = await fetch(url, {
headers: {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json', 
},
});

const result = await response.json();
setData(result);
console.log(result);
handleCloseChequeDeposit();
}
 
     
    console.log(data);


    const fetchFundsTransferData = async () => {
    
      setColumns(columnswithFundsTransferTrxType);
     const conditions = [
       `tri_cardno=${encodeURIComponent(CardNum)}`,
       `tri_isstatus=${encodeURIComponent(IsStatus)}`,
       `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
       `tri_method=${encodeURIComponent(Method)}`,
       `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
       `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
       `fud_accountofrom=${encodeURIComponent(FromAccount)}`,
       `fud_accounto=${encodeURIComponent(ToAccount)}`,
       `fud_responsecode=${encodeURIComponent(ResponseCode)}`,
       `fud_amount=${encodeURIComponent(Amount)}`,
       `fud_authcode=${encodeURIComponent(AuthCode)}`,
       `fud_transaction=${encodeURIComponent(TransactionNumber)}`,
       
     ].join('&');
     
     console.log(conditions);
     const params = new URLSearchParams(conditions);
     console.log(params);
     const conditionsArray = [];
 
     Array.from(params).forEach(([key, value]) => {
       conditionsArray.push({ key: `&additionalConditions=${key}`, value });
     });
     
 
     
     const newArray = conditionsArray.filter(item => Object.values(item)[1]);
    
 
 
 
 
 
 
 
 const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('');
 
 
 const url = `http://localhost:8080/api/findTransaction/transactions/ft/MultipleSearch?terminal=${AtmTerminal}${queryParams}`;
 console.log(url);
 
 
 const response = await fetch(url, {
 headers: {
   'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json', 
 },
 });
 
 const result = await response.json();
 setData(result);
 console.log(result);
 handleCloseFundsTransfer();
 }
  
      
     console.log(data);
    
     const fetchCashDepositData = async () => {
    
      setColumns(columnswithCashDepositTrxType);
     const conditions = [
       `tri_cardno=${encodeURIComponent(CardNum)}`,
       `tri_isstatus=${encodeURIComponent(IsStatus)}`,
       `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
       `tri_method=${encodeURIComponent(Method)}`,
       `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
       `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
       `chd_account=${encodeURIComponent(Account)}`,
       `chd_responsecode=${encodeURIComponent(ResponseCode)}`,
       `chd_authcode=${encodeURIComponent(AuthCode)}`,
       `cad_amount=${encodeURIComponent(Amount)}`,
       `cad_currency=${encodeURIComponent(Currency)}`,
      
       `chd_transaction=${encodeURIComponent(TransactionNumber)}`,
       
     ].join('&');
     
     console.log(conditions);
     const params = new URLSearchParams(conditions);
     console.log(params);
     const conditionsArray = [];
 
     Array.from(params).forEach(([key, value]) => {
       conditionsArray.push({ key: `&additionalConditions=${key}`, value });
     });
     
 
     
     const newArray = conditionsArray.filter(item => Object.values(item)[1]);
    
 
 
 
 
 
 
 
 const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('');
 
 
 const url = `http://localhost:8080/api/findTransaction/transactions/cd/MultipleSearch?terminal=${AtmTerminal}${queryParams}`;
 console.log(url);
 
 
 const response = await fetch(url, {
 headers: {
   'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json', 
 },
 });
 
 const result = await response.json();
 setData(result);
 console.log(result);
 handleCloseCashDeposit();
 }
  
      
     console.log(data.inpoutDetels
      );



     const fetchCashWithdrawalData = async () => {
    
      setColumns(columnswithCashWithdrawalTrxType);
     const conditions = [
       `tri_cardno=${encodeURIComponent(CardNum)}`,
       `tri_isstatus=${encodeURIComponent(IsStatus)}`,
       `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
       `tri_method=${encodeURIComponent(Method)}`,
       `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
       `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
       `cas_account=${encodeURIComponent(Account)}`,
       `cas_responsecode=${encodeURIComponent(ResponseCode)}`,
       `cas_authcode=${encodeURIComponent(AuthCode)}`,
       `cas_case1=${encodeURIComponent(Case1)}`,
       `cas_case2=${encodeURIComponent(Case2)}`,
       `cas_case3=${encodeURIComponent(Case3)}`,
       `cas_case4=${encodeURIComponent(Case4)}`,
       `cas_case5=${encodeURIComponent(Case5)}`,
       `cas_amount=${encodeURIComponent(Amount)}`,
       `cas_currency=${encodeURIComponent(Currency)}`,
       `cas_cashtaken=${encodeURIComponent(IsCashTaken)}`,
       `cas_cashpresented=${encodeURIComponent(IsCashPresented)}`,
       `cas_transaction=${encodeURIComponent(TransactionNumber)}`,
       
     ].join('&');
     
     console.log(conditions);
     const params = new URLSearchParams(conditions);
     console.log(params);
     const conditionsArray = [];
 
     Array.from(params).forEach(([key, value]) => {
       conditionsArray.push({ key: `&additionalConditions=${key}`, value });
     });
     
 
     
     const newArray = conditionsArray.filter(item => Object.values(item)[1]);
    
 
 
 
 
 
 
 
 const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('');
 
 
 const url = `http://localhost:8080/api/findTransaction/transactions/cw/MultipleSearch?terminal=${AtmTerminal}${queryParams}`;
 console.log(url);
 
 
 const response = await fetch(url, {
 headers: {
   'Authorization': `Bearer ${token}`,
   'Content-Type': 'application/json', 
 },
 });
 
 const result = await response.json();
 setData(result);
 console.log(result);
 handleCloseCashWithdrawal();
 }
  
      
     console.log(data);
          // handle card number value change
          const handleCardNum = (event) => {
            // Assuming you want to store the card number without quotation marks
            const newValue = event.target.value;
        
            // If you want to add single quotation marks around the card number
            // const newValue = "'" + event.target.value + "'";
        
            setCardNum(newValue);
          };
          console.log(CardNum);

        return (
            <>
                <Helmet>
                    <title> Journal Information </title>
                </Helmet>
                
                    <Stack direction="row" alignItems="center" justifyContent="space-between" >
                        <Typography variant="h4" gutterBottom>
                            Journal Information
                        </Typography>

                    </Stack>
            <br/>
            <br/>
              <Grid container spacing={0}>
                <Grid xs={2}>
                <TextField sx={{ m: 2 }}
                id="terminal"
                label="ATM Terminal"
                variant="outlined"
                value={AtmTerminal}
                onChange={handleAtmTerminalChange}
                required
                />
                  {TerminalError&& <p style={{ color: 'red' }}>{TerminalError}</p>}
              </Grid>
              <Grid xs={2}>
                <div>
                  <TextField sx={{ m: 2 }}
                   type="text"
                   label="Card Number"
                   value={CardNum}
                 onChange={handleCardNum}
                />
               </div>
              </Grid>
             <Grid xs={2}>
              <Box>
               <FormControl >
                 
                <FormLabel  >Status</FormLabel>
                <NativeSelect sx={{ m: 2 }}
                  value={IsStatus}
                 onChange={(e) => setIsStatus(e.target.value)}
                 ><option style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                <option value={0}>Success</option>
                <option value={1}>Fail</option>
                </NativeSelect>
              </FormControl>
               </Box>
              </Grid>
              <Grid xs={2}>
               <Box>
                <FormControl >
                <FormLabel >QB Card</FormLabel>
                <NativeSelect sx={{ m: 2 }}
                  value={IsQbCard}
                  onChange={(e) => setIsQbCard(e.target.value)}
                >
                  <option style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                 <option value={0}>ِQB Card</option>
                 <option value={1}>Not QB Card</option>
                </NativeSelect>
                </FormControl>
                </Box>
             </Grid>
             <Grid xs={2}>
               <Box>
                   <FormControl >
                   <FormLabel  >Method</FormLabel>
                     <NativeSelect sx={{ m: 2 }}
                      value={Method}
                      onChange={(e) => setMethod(e.target.value)}
                     ><option style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                       <option value={2}>ِContact</option>
                      <option value={1}>ContactLess</option>
                      <option value={0}>CardLess</option>
                    </NativeSelect>
                   </FormControl>
               </Box>
             </Grid>
            <Grid xs={2} >
             <Box>
              <FormControl >
              <FormLabel  >TRX Type</FormLabel>
             <NativeSelect sx={{ m: 2 }}
              value={TrxType}
              onChange={handleTrxTypeChange}
            >
              <option style={{ color: "gray", fontWeight: "bold"}}>ِSelect</option>
              <option value={'Cash Withdrawal'}>Cash Withdrawal</option>
              <option value={'Cash Deposit'}>Cash Deposit</option>
              <option value={'Balance Inquiry'}>Balance Inquiry</option>
              <option value={'Mini Statement'}>Mini Statement</option>
              <option value={'PIN Change'}>PIN Change</option>
              <option value={'Funds Transfer'}>Funds Transfer</option>
              <option value={'Cheque Deposit'}>Cheque Deposit</option>
              <option value={'Chequebook Request'}>Chequebook Request</option>
            </NativeSelect>
          </FormControl>
          <Dialog   open={openDialogCashWithdrawal} onClose={handleCloseCashWithdrawal}>
                  <DialogTitle >Cash Withdrawal </DialogTitle>
                  <DialogContent>

                  <Grid container spacing={2}>
  <Grid item xs={3}>
  <TextField value={Account} onChange={handleAccountChange}sx={{ m: 2 }}
                required id="filled-basic" label=" Account" variant="filled" />
                 
  </Grid>
  
  <Grid item xs={3}>
  <TextField value={Amount} onChange={handleAmountChange}sx={{ m: 2 }}
                required id="filled-basic" label="Amount" variant="filled" />
                
  </Grid>
  <Grid item xs={3}>
  <TextField value={Currency} onChange={handleCurrencyChange}sx={{ m: 2 }}
                required id="filled-basic" label="Currency" variant="filled" />
                
  </Grid>
  <Grid item xs={3}>
  <TextField value={ResponseCode} onChange={handleResponseCodeChange}sx={{ m: 2 }}
                required id="filled-basic" label="Response Code" variant="filled" />
              
  </Grid>
 
</Grid>
<br/><br/>
<Grid container spacing={2}>
  
  <Grid item xs={3}>
  <TextField value={AuthCode} onChange={handleAuthCodeChange}sx={{ m: 2 }}
                required id="filled-basic" label="Auth Code" variant="filled" />
              
  </Grid>
  <Grid item xs={3}>
  <TextField value={TransactionNumber} onChange={handleTransactionNumberChange}sx={{ m: 2 }}
                required id="filled-basic" label="Transaction Number" variant="filled" />
                
  </Grid>

   <Grid item xs={3}>
   <Box>
                <FormControl >
                <FormLabel >Cash Presented</FormLabel>
                <NativeSelect
                  value={IsCashPresented}
                  onChange={(e) => setIsCashPresented(e.target.value)}sx={{ m: 2 }}
                >
                  <option  style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                 <option value={0}>ِCash Presented</option>
                 <option value={1}>Not Cash Presented</option>
                </NativeSelect>
                </FormControl>
                </Box>
                
  </Grid>
  <Grid item xs={3}>
  <Box>
                <FormControl >
                <FormLabel >Cash Taken</FormLabel>
                <NativeSelect
                  value={IsCashTaken}
                  onChange={(e) => setIsCashTaken(e.target.value)}sx={{ m: 2 }}
                >
                  <option style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                 <option value={0}>ِCash Taken</option>
                 <option value={1}>Not Cash Taken</option>
                </NativeSelect>
                </FormControl>
                </Box>
                
  </Grid>
 
</Grid>
<br/><br/>
<Grid container spacing={2}>
  <Grid item xs={2}>
  <TextField value={Case1} onChange={handleCase1Change}
                required id="filled-basic" label="Case1" variant="filled" />
              
  </Grid>
  <Grid item xs={2}>
  <TextField value={Case2} onChange={handleCase2Change}
                required id="filled-basic" label="Case2" variant="filled" />
              
  </Grid>
  <Grid item xs={2}>
  <TextField value={Case3} onChange={handleCase3Change}
                required id="filled-basic" label="Case3" variant="filled" />
                
  </Grid>

   <Grid item xs={2}>
  <TextField value={Case4} onChange={handleCase4Change}
                required id="filled-basic" label="Case4" variant="filled" />
                
  </Grid>
  <Grid item xs={2}>
  <TextField value={Case5} onChange={handleCase5Change}
                required id="filled-basic" label="Case5" variant="filled" />
                
  </Grid>
 
</Grid>
                  
                  
          
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseCashWithdrawal}>Cancel</Button></div>
                    <Button   onClick={handleCashWithdrawalSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogCashDeposit} onClose={handleCloseCashDeposit}>
                  <DialogTitle >Cash Deposit </DialogTitle>
                  <DialogContent>
                  <Grid container spacing={2}>
  <Grid item xs={3}>
  <TextField value={Account} onChange={handleAccountChange}
                required id="filled-basic" label=" Account" variant="filled" />
                 
  </Grid>
  
  <Grid item xs={3}>
  <TextField value={Amount} onChange={handleAmountChange}
                required id="filled-basic" label="Amount" variant="filled" />
                
  </Grid>
  <Grid item xs={3}>
  <TextField value={Currency} onChange={handleCurrencyChange}
                required id="filled-basic" label="Currency" variant="filled" />
                
  </Grid>
 
 
</Grid>
<bt/><br/>
<Grid container spacing={2}>
  <Grid item xs={3}>
  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
              
  </Grid>
  <Grid item xs={3}>
  <TextField value={AuthCode} onChange={handleAuthCodeChange}
                required id="filled-basic" label="Auth Code" variant="filled" />
              
  </Grid>
  <Grid item xs={3}>
  <TextField value={TransactionNumber} onChange={handleTransactionNumberChange}
                required id="filled-basic" label="Transaction Number" variant="filled" />
                
  </Grid>
  
 
</Grid>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseCashDeposit}>Cancel</Button></div>
                    <Button   onClick={handleCashDepositSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogBalanceInquiry} onClose={handleCloseBalanceInquiry}>
                  <DialogTitle >Balance Inquiry </DialogTitle>
                  <DialogContent>
                  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
                 {ResponseCode&& <p style={{ color: 'red' }}>{ResponseCodeError}</p>}
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseBalanceInquiry}>Cancel</Button></div>
                    <Button  onClick={handleGeneralSearch}>
            Search 
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogMiniStatement} onClose={handleCloseMiniStatement}>
                  <DialogTitle >Mini Statement </DialogTitle>
                  <DialogContent>
                  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
                 {ResponseCode&& <p style={{ color: 'red' }}>{ResponseCodeError}</p>}
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseMiniStatement}>Cancel</Button></div>
                    <Button  onClick={handleGeneralSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogPinChange} onClose={handleClosePinChange}>
                  <DialogTitle >Pin Change</DialogTitle>
                  <DialogContent>
                  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
                 {ResponseCode&& <p style={{ color: 'red' }}>{ResponseCodeError}</p>}
                
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleClosePinChange}>Cancel</Button></div>
                    <Button  onClick={handleGeneralSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogFundsTransfer} onClose={handleCloseFundsTransfer}>
                  <DialogTitle >Funds Transfer</DialogTitle>
                  <DialogContent>
                  <Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField value={FromAccount} onChange={handleFromAccountChange}
                required id="filled-basic" label="From Account" variant="filled" />
                 
  </Grid>
  <Grid item xs={4}>
  <TextField value={ToAccount} onChange={handleToAccountChange}
                required id="filled-basic" label="To Account" variant="filled" />
                
  </Grid>
  <Grid item xs={4}>
  <TextField value={Amount} onChange={handleAmountChange}
                required id="filled-basic" label="Amount" variant="filled" />
                
  </Grid>
 
</Grid>
<bt/><br/>
<Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
              
  </Grid>
  <Grid item xs={4}>
  <TextField value={AuthCode} onChange={handleAuthCodeChange}
                required id="filled-basic" label="Auth Code" variant="filled" />
              
  </Grid>
  <Grid item xs={4}>
  <TextField value={TransactionNumber} onChange={handleTransactionNumberChange}
                required id="filled-basic" label="Transaction Number" variant="filled" />
                
  </Grid>
  
 
</Grid>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseFundsTransfer}>Cancel</Button></div>
                    <Button  onClick={handleFundsTransferSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogChequeDeposit} onClose={handleCloseChequeDeposit}>
                  <DialogTitle >Cheque Deposit</DialogTitle>
                  <DialogContent>
                 
                 <Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField value={Account} onChange={handleAccountChange}
                required id="filled-basic" label="Account Number" variant="filled" />
                 
  </Grid>
  <Grid item xs={4}>
  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
                
  </Grid>
  <Grid item xs={4}>
  <TextField value={AuthCode} onChange={handleAuthCodeChange}
                required id="filled-basic" label="Auth Code" variant="filled" />
                
  </Grid>
 
</Grid>
<bt/><br/>
<Grid container spacing={2}>
  <Grid item xs={4}>
  <TextField value={NumberOfCheque} onChange={handleNumberofChequeChange}
                required id="filled-basic" label="Cheque Number" variant="filled" />
              
  </Grid>
  <Grid item xs={4}>
  <TextField value={TransactionNumber} onChange={handleTransactionNumberChange}
                required id="filled-basic" label="Transaction Number" variant="filled" />
                
  </Grid>
  
 
</Grid>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseChequeDeposit}>Cancel</Button></div>
                    <Button  onClick={handleChequeDepositSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogChequebookRequest} onClose={handleCloseChequebookRequest}>
                  <DialogTitle >Chequebook Request</DialogTitle>
                  <DialogContent>
                  <TextField value={ResponseCode} onChange={handleResponseCodeChange}
                required id="filled-basic" label="Response Code" variant="filled" />
                 {ResponseCode&& <p style={{ color: 'red' }}>{ResponseCodeError}</p>}
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseChequebookRequest}>Cancel</Button></div>
                    <Button  onClick={handleGeneralSearch}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
           </Box>
           </Grid>
          </Grid>
          <br/>
          <Grid container spacing={0}>
         <Grid xs={4} paddingRight={20}>
         <LocalizationProvider dateAdapter={AdapterDayjs} >
          <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker label="StartDate" value={StartDate} onChange={(StartDate) => setStartDate(dayjs(StartDate).format("'MM/DD/YYYY'"))}/>
            <DatePicker
              label="EndDate"  value={EndDate}onChange={(EndDate) => setEndDate(dayjs(EndDate).format("'MM/DD/YYYY'"))}
            />
          </DemoContainer>
        </LocalizationProvider>
       
      </Grid>
      <Grid xs={2} >
      <Button variant="contained" sx={{ m: 1 }} size="large" onClick={handleButtonClick}>
            Search  <SearchIcon />
          </Button></Grid>
      </Grid>



    <br/>
    <br/>
                    <Card >
                    

                        <MaterialTable style={{width:'auto'}}
                            title=""
                            columns={columns}
                            data={data}
                            options={{
                              search: true, // Show search bar
                                rowStyle: {
                                  backgroundColor:'#d3d3d3 '
                                  },headerStyle: {
                                    backgroundColor:'#a9a9a9'
                                  
                                  },
                                  pageSize:10,
                                pageSizeOptions: [10, 15, 25, 50, 100],}}
                          
                        />
                        
                    </Card>
              

                <Popover
                    PaperProps={{
                        sx: {
                            p: 1,
                            width: 140,
                            '& .MuiMenuItem-root': {
                                px: 1,
                                typography: 'body2',
                                borderRadius: 0.75,
                            },
                        },
                    }}
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleCloseMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}



                >
                    <MenuItem>
                        <Iconify icon={'eva:edit-fill'}  />
                        Edit
                    </MenuItem>

                    <MenuItem sx={{ color: 'error.main' }}>
                        <Iconify icon={'eva:trash-2-outline'}  />
                        Delete
                    </MenuItem>
                </Popover>
            </>
          
        );

    }

