        
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
    import Iconify from '../components/iconify';
    import CashWithdrawalDialog from './CashWithdrawalDialog';
    



    // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.



    export default function Journal() {

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
   
  ]; //  define  columns that display in this page if search with  TrxType

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
          const [TrxType, setTrxType] = useState('');
          const [openDialogCashWithdrawal, setOpenDialogCashWithdrawal] = useState(false);
          const [openDialogCashDeposit, setOpenDialogCashDeposit] = useState(false);
          const [openDialogBalanceInquiry, setOpenDialogBalanceInquiry] = useState(false);
          const [openDialogMiniStatement, setOpenDialogMiniStatement] = useState(false);
          const [openDialogPinChange, setOpenDialogPinChange] = useState(false);
          const [openDialogFundsTransfer, setOpenDialogFundsTransfer] = useState(false);
          const [openDialogChequeDeposit, setOpenDialogChequeDeposit] = useState(false);
          const [openDialogChequebookRequest, setOpenDialogChequebookRequest] = useState(false);
          
          const handleTrxTypeChange = (e) => {
            const selectedValue = e.target.value;
            setTrxType(selectedValue);
            
        
            // Open dialog based on the selected value
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
         
          const handleAtmTerminalChange=(event)=>{
            console.log(event.target.value);
              setAtmTerminal(event.target.value);
              setError(''); // Clear the error when the user starts typing

            }
            console.log(TrxType);
            const handleResponseCodeChange=(event)=>{
              console.log(event.target.value);
                setResponseCode(event.target.value);
                setResponseCodeError(''); // Clear the error when the user starts typing
  
              }
            const token =  `${localStorage.getItem('token')}`; 
            console.log(token);
        const handleButtonClick = () => {
          // This Function Is Called After Click Search Button 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchData();// if feild of terminal number is not empty call function fetchData to display all transaxtion that made in this terminal 
            
            }
              
           
          
        };
    
        const handleGeneralSearch = () => {
          // This Function Is Called After Click Search Button 
          
            
            
            if (!AtmTerminal.trim()) {
              setError('Please Enter A Terminal Number'); // Set an error if the field of terminal number is empty
              
            }
         
            else{
              fetchDataTRxType();// if feild of terminal number is not empty call function fetchData to display all transaxtion that made in this terminal 
            
            }
              
           
          
        };
  
     
 const formatDate = timestamp => {
  const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ( (date.getMonth() + 1)); 
    const day = ( date.getDate());
    const formattedDate = `${year}-${month}-${day} `;
    return formattedDate;
  
};
 
        const fetchData = async () => {
          setColumns(columnswithouttrxtype);
         
          const conditions = [
            `tri_cardno=${encodeURIComponent(CardNum)}`,
            `tri_isstatus=${encodeURIComponent(IsStatus)}`,
            `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
            `tri_method=${encodeURIComponent(Method)}`,
            `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
            `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
            `get_ResponseCode=${encodeURIComponent(ResponseCode)}`,
            
          ].join('&');// create array that have key and value of each input that i want to search it 
          
          console.log(conditions);
          const params = new URLSearchParams(conditions);// Convert URLSearchParams to an array of key-value pairs
          console.log(params);
          const conditionsArray = [];

          Array.from(params).forEach(([key, value]) => {
            conditionsArray.push({ key: `&additionalConditions=${key}`, value });
          });
          
      
          
          const newArray = conditionsArray.filter(item => Object.values(item)[1]);
         

    

    // Convert URLSearchParams to an object

    if(newArray===null || newArray.length === 0 ){
       console.log("null");
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
       setData(result);
       console.log(apiUrl);
    }
    else{
      const queryParams = newArray.map(item => `${item.key}=${item.value}`).join('&');
      

 
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

      const fetchDataTRxType = async () => {
        setColumns(columnswithGeneralTrxType);
         
        const conditions = [
          `tri_cardno=${encodeURIComponent(CardNum)}`,
          `tri_isstatus=${encodeURIComponent(IsStatus)}`,
          `tri_isqbcard=${encodeURIComponent(IsQbCard)}`,
          `tri_method=${encodeURIComponent(Method)}`,
          `dateTRI_DATE=${encodeURIComponent(StartDate)}`,
          `dateTRI_DATE=${encodeURIComponent(EndDate)}`,
          `get_response_code=${encodeURIComponent(ResponseCode)}`,
          
        ].join('&');// create array that have key and value of each input that i want to search it 
        
        console.log(conditions);
        const params = new URLSearchParams(conditions);// Convert URLSearchParams to an array of key-value pairs
        console.log(params);
        const conditionsArray = [];

        Array.from(params).forEach(([key, value]) => {
          conditionsArray.push({ key: `&additionalConditions=${key}`, value });
        });
        
    
        
        const newArray = conditionsArray.filter(item => Object.values(item)[1]);
       

  

  // Convert URLSearchParams to an object

 

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
   handleCloseBalanceInquiry();}

   if(TrxType==="Mini Statement"){
    handleCloseMiniStatement();
    
    } 
      
    if(TrxType==="Chequebook Request"){
      handleCloseChequebookRequest();
      
      } 
  }
     
    console.log(data);
    console.log(columns);
          ;
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
                <TextField
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
                  <TextField
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
                <NativeSelect 
                  value={IsStatus}
                 onChange={(e) => setIsStatus(e.target.value)}
                 ><option style={{ color: "gray", fontWeight: "bold"}}>Select</option>
                <option value={0}>ِSuccsess</option>
                <option value={1}>Fail</option>
                </NativeSelect>
              </FormControl>
               </Box>
              </Grid>
              <Grid xs={2}>
               <Box>
                <FormControl >
                <FormLabel >QB Card</FormLabel>
                <NativeSelect
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
                     <NativeSelect
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
             <NativeSelect
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
                  <CashWithdrawalDialog/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseCashWithdrawal}>Cancel</Button></div>
                    <Button   onClick={handleButtonClick}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogCashDeposit} onClose={handleCloseCashDeposit}>
                  <DialogTitle >Cash Deposit </DialogTitle>
                  <DialogContent>
                  <CashWithdrawalDialog/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseCashDeposit}>Cancel</Button></div>
                    <Button   onClick={handleButtonClick}>
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
            Search  <SearchIcon />
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
                  <CashWithdrawalDialog/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseFundsTransfer}>Cancel</Button></div>
                    <Button  onClick={handleButtonClick}>
            Search  
          </Button>
                  </DialogActions>
                </Dialog>
                <Dialog   open={openDialogChequeDeposit} onClose={handleCloseChequeDeposit}>
                  <DialogTitle >Cheque Deposit</DialogTitle>
                  <DialogContent>
                  <CashWithdrawalDialog/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleCloseChequeDeposit}>Cancel</Button></div>
                    <Button  onClick={handleButtonClick}>
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
         <LocalizationProvider dateAdapter={AdapterDayjs}>
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

