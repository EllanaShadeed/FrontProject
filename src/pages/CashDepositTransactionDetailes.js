
import * as React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';
import {
    Stack,
    Typography,
} from '@mui/material';

  // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

export default function CashDepositTransactinDetailes() {
    
    const atmid = useLocation();// hook returns the current location object 
    console.log(atmid.pathname.split('/')[3].split(',')[1]);
    const [data, setData] = React.useState([
    ]);// useState hook allows you to add state to your functional component
  

    const getData = async () => {// function getData to get terminal info when pass the terminalNumber from the url of the current page 
        const { data } = await axios.get(`http://localhost:8080/api/findTransaction/transactions/cd/id?id=${atmid.pathname.split('/')[3].split(',')[1]}`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }

        }, {

        })
        setData(data);// insert data from this api in data variable 

    };
    


   

   


    useEffect(() => {
        getData();
        
    }, []);// useEffect hook allows you to run side effects in your functional components


console.log(data);
 

    return (

        <>
            <Helmet>
                <title> Cash Deposit Transaction Detailes</title>
            </Helmet>
         
            <>
            
           
            <Typography variant="h6" gutterBottom>
            Cash Deposit Transaction Detailes

                                    <hr
                                        style={{
                                            background: 'black',
                                            color: 'black',
                                            borderColor: 'black',
                                            height: '3px',
                                            width: '1500px'
                                        }}
                                    />
                                </Typography>
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)' }}>
                                    <>


                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Response Code</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_RESPONSECODE

}</FormLabel>




                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Auth Code</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_AUTHCODE

}</FormLabel>
                                    
                                    </>

                                    <>


                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Currency</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "400px", marginTop: "10px" }} id="id">{data?.cad_CURRENCY


}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Card</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_CARD


}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Input Detailes</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_INPOUTETELS


} </FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Date</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{dayjs(data?.cad_DATE).format("MM/DD/YYYY")}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Amount</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_AMOUNT


}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Transaction</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_TRANSACTION


}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Account</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cad_ACCOUNT

} </FormLabel>

                                    </>
                                </Box>
            </>
        </>

    );
}


