            import * as React from 'react';
            import {Link,useLocation} from 'react-router-dom';
            import { Helmet } from 'react-helmet-async';
            import { useState, useEffect } from 'react';
            import MaterialTable from 'material-table';
            import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
            import InsertLinkIcon from '@mui/icons-material/InsertLink';
            import {
                Card,
                Stack,
                Popover,
                MenuItem,
                Container,
                Typography,
            } from '@mui/material';
            import Iconify from '../components/iconify';

// In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.


            const ATMMaintinanceFiles = () => {

            const atmid = useLocation();// hook returns the current location object 
            const Terminal=atmid.pathname.split('/')[3];

            const today = new Date();
            const year = today.getFullYear();


                const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
                

                    const columns = [
                        {
                            title: 'Terminal ',type: 'numeric', field: 'nameTermainal',
                            
                        },
                        {
                            title: 'Date', field: 'date',width:"10%"
                        },
                        {
                            title: 'Maintinance Type ', field: 'typeMaintenance', width:"10%", render: rowData => {
                                return(
                                rowData.typeMaintenance=== "0" ?<h2 style={{ color: "#E87722", fontWeight: "bold",fontSize:"15px" }}>SoftWare</h2>  :
                                <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>HardWare</h2>)
                            }
                        },
                        {
                            title: 'File Name', field: 'nameFile',width:"10%",render: rowData => <Link to={`/dashboard/displaymaintinancefile/${rowData.nameFile}`} ><InsertLinkIcon/></Link>,
                        }
                    ];// define all columns that display in page
                    const [data, setData] = React.useState([
                    ]);// useState hook allows you to add state to your functional component
                    const [dataAtm, setDataAtm] = React.useState([
                    ]);
                
                    const getData = async () => {// this function take num of terminal and year and get all files of this atm
                        
                        const { data } = await axios.get(`${BASE_URL}files/pdfs/getAllPdf?nameTermainal=${Terminal}&year=${year}`,{ headers: {      'Content-Type': 'application/json',
                        Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                        
                        })
                    
                    
                        setData(data);// insert data return from api in data variable

                    };
                    const atmName=JSON.stringify(data).split('[')[0].trim().substr(2).split('":');
                
                        
                    const getTerminalData = async () => {// this function return terminal info by take terminal num
                        
                        const { data } = await axios.get(`${BASE_URL}terminal/getTerminalByID/${Terminal}`,{ headers: {      'Content-Type': 'application/json',
                        Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                        
                        })
                    
                    
                        setDataAtm(data);// insert data return from api in dataAtm
                        

                    };
                
            



        

                    useEffect(() => {
                        getData();
                        getTerminalData();
                    }, []); // useEffect hook allows you to run side effects in your functional components
                

                    const [open, setOpen] = useState(null);

                    const handleCloseMenu = () => {
                        setOpen(null);
                    }

                return (
                    <>
                        <Helmet>
                            <title> All Maintinance File </title>
                        </Helmet>
                        
                            <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                                <Typography variant="h4" gutterBottom>
                                { dataAtm.atmName? ` All Maintinance File Of ${dataAtm.atmName}ATM` : 'This ATM NOT have any Maintinance Files'}
                            
                                </Typography>

                            </Stack>
                            <Card>
                                <MaterialTable
                                    title=""
                                
                                    columns={columns}
                                    data={data[`${atmName[0]}`]}
                                    options={{
                                        rowStyle: {
                                            backgroundColor:'#d3d3d3 '
                                           },headerStyle: {
                                             backgroundColor:'#a9a9a9'
                                            
                                           },
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
                                <Iconify icon={'eva:edit-fill'} sx={{ mr: 2 }} />
                                Edit
                            </MenuItem>

                            <MenuItem sx={{ color: 'error.main' }}>
                                <Iconify icon={'eva:trash-2-outline'} sx={{ mr: 2 }} />
                                Delete
                            </MenuItem>
                        </Popover>
                    </>
                );
            }
            
            export default ATMMaintinanceFiles;