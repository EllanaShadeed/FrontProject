
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

export default function MiniStatement() {
    
    const atmid = useLocation();// hook returns the current location object 
    console.log(atmid.pathname.split('/')[3].split(',')[1]);
    const [data, setData] = React.useState([
    ]);// useState hook allows you to add state to your functional component
  

    const getData = async () => {// function getData to get terminal info when pass the terminalNumber from the url of the current page 
        const { data } = await axios.get(`http://localhost:8080/api/findTransaction/transactions/gt/id?id=${atmid.pathname.split('/')[3].split(',')[1]}`, {
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
                <title> Mini Statement Transaction Detailes</title>
            </Helmet>
         
            <>
            
           
            <Typography variant="h6" gutterBottom>
            Mini Statement Transaction Detailes

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
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.get_ResponseCode

}</FormLabel>




                                        <FormLabel style={{ margin: "15px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Date</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{dayjs(data?.get_Date).format("MM/DD/YYYY")}</FormLabel>
                                    
                                    </>

                                    <>


         
  

                                    </>
                                </Box>
            </>
        </>

    );
}


