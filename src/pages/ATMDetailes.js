
        import * as React from 'react';
        import { Link, useLocation } from 'react-router-dom';
        import {  useEffect } from 'react';
        import { Helmet } from 'react-helmet-async';
        import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
        import Button from '@mui/material/Button';
        import FormLabel from '@mui/material/FormLabel';
        import Box from '@mui/material/Box';
        import {
            Stack,
            Typography,
        } from '@mui/material';
        
          // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

        export default function ATMDetailes() {
            const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages in my project
            const atmid = useLocation();// hook returns the current location object 
            const [data, setData] = React.useState([
            ]);// useState hook allows you to add state to your functional component
            const [CountMaint,setCountMaint]=React.useState([]);
            const [Services,setServices]=React.useState([]);
            const [date,setDate]=React.useState([]);

            const getData = async () => {// function getData to get terminal info when pass the terminalNumber from the url of the current page 
                const { data } = await axios.get(`${BASE_URL}terminal/getTerminalByID/${atmid.pathname.split('/')[3]}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }, {

                })
                setData(data);// insert data from this api in data variable 

            };
            const  getCountMaint= async () => {// function  getCountMaint to get maintinace count of this atm  
                const { data } = await axios.get(`${BASE_URL}maintenance/CT?id=${atmid.pathname.split('/')[3]}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }, {

                })
                setCountMaint(data);// insert count return from api in CountMaint variable

            };


            const  getlastDateMaint= async () => {// function getlastDateMaint  to get the end date of last maintinance of this atm  
                const { data } = await axios.get(`${BASE_URL}maintenance/LastMaintDate/${atmid.pathname.split('/')[3]}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }, {

                })
               
                setDate(data);// insert date return from api in date variable 
                
                console.log(date);

            };

            const  getATMServices= async () => {// function getATMServices  to get all services belongs to this atm
                const { data } = await axios.get(`${BASE_URL}TerminalService/terminalserviceforoneatm?id=${atmid.pathname.split('/')[3]}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }, {

                })
                setServices(data);// insert services return from api in Services variable

            };
        
        
            useEffect(() => {
                getData();
                getCountMaint();
                getATMServices();
                getlastDateMaint();
            }, []);// useEffect hook allows you to run side effects in your functional components



           const DATE = new Date(date);// DATE object to get current date in react
           let year = DATE.getFullYear();// get current year from current date
           let month = DATE.getMonth()+4;// get current month from current date and increament by 3 month for periodic maintinance(Note: i increament month by 4 not 3 beacuse getMonth() start from 0)
           const day = DATE.getDate();// get current day from current date
           const hours = DATE.getHours();// get current hour from current date
           const minutes = DATE.getMinutes();// get current minutes from current date
           const seconds = DATE.getSeconds();// get current seconds from current date
           // for the new year we substract 12 from the current month and add one to the current year
            if(month>12){
             month-= 12;
             year+=1;
             }

              const dateString = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
                  // formate the date and stor it in dateString variable

            return (

                <>
                    <Helmet>
                        <title> ATM Information </title>
                    </Helmet>
                    <Link to={`/dashboard/maintinancefile/${atmid.pathname.split('/')[3]}`}>
                        <Button variant="outlined" style={{ marginLeft: "70%" }} >
                            All Maintinace File
                        </Button>
                    </Link>
                    <>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography variant="h6" gutterBottom>
                                ATM Details

                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM Maintinance

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


                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Num Of Maintinance</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{CountMaint}</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "300px", marginTop: "10px", color: 'green' }} id="id">The Next Date Of The Next Maintinance</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{dateString!=='NaN-NaN-NaN NaN:NaN:NaN'?dateString:"not have any maintinance yet"}</FormLabel>


                                    
                                    </>

                                
                                </Box>

                                    
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM General Information

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


                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">ATM Terminal</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.id}</FormLabel>




                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">PC Name</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.pcName}</FormLabel>
                                    
                                    </>

                                    <>


                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Services </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "400px", marginTop: "10px" }} id="id">{Services.map(s =><li style={{color:'#585858',fontSize:"18px"}}>{s.serviceInf.service_name}</li>)} </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Serial </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.serial} </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Remarks </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="id">{data?.remarks} </FormLabel>

                                    </>
                                </Box>
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM Location Information

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

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> GPS Location </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="GPS">{data?.longitude} , {data?.latitude} </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">Address-Ar</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="addressAr">{data?.addressAr}</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> Address-En</FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="Address-En">{data?.addressEn}</FormLabel>
                                    
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> Branch </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="ter_branch_name">{data?.branchId}</FormLabel>
                                    
                                    </>


                                </Box>

                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM Date Information

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
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> Installation Date </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="Installation Date">{data?.installationDate}</FormLabel>


                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">  Start Date </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="Start Date">{data?.startDate}</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">  End Date </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="End Date">{data?.endDate}</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> Install Braille Date </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="Install Braille Date">{data?.dateInstallBraille}</FormLabel>
                                    </>
                                </Box>
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM Network Information

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

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">  ATM IP </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="ATM IP">{data?.ip}</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> ATM Host </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="ATM Host">{data?.hostId}</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id"> ATM PORT </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="ATM PORT">{data?.hostInf?.port}</FormLabel>
                                    </>

                                </Box>
                                <br />
                                <br />
                                <br />
                                <Typography variant="h6" gutterBottom>
                                    ATM Company Information

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
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">  ATM Vendor </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="ATM Vendor">{data?.vendorInf?.responsibleVendor
        }</FormLabel>

                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px", color: 'green' }} id="id">  Model </FormLabel>
                                        <FormLabel style={{ margin: "10px", width: "200px", marginTop: "10px" }} id="Model">{data?.modelInf?.model}
        </FormLabel>

                                    
                                    </>
                                </Box>
                                <br />
                                <br />
                                <br />
                            </Typography>
                        </Stack>
                    </>
                </>

            );
        }


