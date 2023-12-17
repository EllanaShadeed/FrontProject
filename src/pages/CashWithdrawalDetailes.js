
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

export default function CashWithdrawalDetailes() {

    const atmid = useLocation();// hook returns the current location object 
    console.log(atmid.pathname.split('/')[3].split(',')[1]);
    const [data, setData] = React.useState([
    ]);// useState hook allows you to add state to your functional component
  

    const getData = async () => {// function getData to get terminal info when pass the terminalNumber from the url of the current page 
        const { data } = await axios.get(`http://localhost:8080/api/findTransaction/transactions/cw/id?id=${atmid.pathname.split('/')[3].split(',')[1]}`, {
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
                <title> Cash Withdrawal Transaction Detailes</title>
            </Helmet>
         
            <>
            
           
            <Typography variant="h6" gutterBottom>
            Cash Withdrawal Transaction Detailes

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


                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Cash Presented</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">
                                        {data?.cas_CASHPRESENTED === '0' ? <h6>True</h6> :<h6>False</h6>}
                                        
                                        </FormLabel>

                                  


                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Date</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{dayjs(data?.cas_DATE).format("MM/DD/YYYY")}</FormLabel>
                                    
                                    </>

                                    <>


                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Currency</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "400px", marginTop: "10px" }} id="id">{data?.cas_CURRENCY}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Cash Taken</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASHTAKEN === '0' ? <h6>Taken</h6> :  <h6>NotTaken</h6> }</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Card</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CARD}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Transaction Num</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_TRANSACTION}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Response Code</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_RESPONSECODE}</FormLabel>
                                       
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Account</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_ACCOUNT}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Auth Code</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_AUTHCODE}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Amount</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_AMOUNT}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Case1</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASE1}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Case2</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASE2}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Case3</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASE3}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Case4</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASE4}</FormLabel>
                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Case5</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.cas_CASE5}</FormLabel>
                                    </>
                                </Box>
            </>
        </>

    );
}


