                import * as React from 'react';
                import { Helmet } from 'react-helmet-async';
                import { useState, useEffect } from 'react';
                import MaterialTable from 'material-table';
                import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
                import {
                    Card,
                    Stack,
                    Popover,
                    MenuItem,
                    Typography,
                } from '@mui/material';
               
                import Iconify from '../components/iconify';
               
// In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.



                export default function Branch() {
                    const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
              

                    const columns = [
                        {
                            title:'Branch ID', field:'ter_branch_id',type:'numeric',align:'center',
                              
                              
                              editable:'onAdd', validate: rowData => (rowData.ter_branch_id !== '' && rowData.ter_branch_id > 0 && rowData.ter_branch_id !== null && rowData.ter_branch_id !== undefined) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Branch Id can not be empty' },
                        },
                        {
                            title: 'Branch Name ',align:'center', field: 'ter_branch_name',validate: rowData => (rowData.ter_branch_name !== '' && rowData.ter_branch_name !== undefined && rowData.ter_branch_name !== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Branch name can not be empty' },
                        },
                        
                       
                    ];// define all columns that display in page
                    const [data, setData] = React.useState([
                    ]);// useState hook allows you to add state to your functional component

               
                    const getData = async () => {// this function to get all branches 
                        const { data } = await axios.get(`${BASE_URL}Ech/getBranches`,{ headers: {      'Content-Type': 'application/json',
                        Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                        
                        })
                    
                        setData(data);// insert data return from api in date variable

                    };
                    const postData = async (newData) => {// this function to post new branch
                const items={
                ter_branch_id: newData.ter_branch_id,
                ter_branch_name: newData.ter_branch_name,

                };
                        await axios.post(`${BASE_URL}Ech/addBranches`, items,{ headers: {      'Content-Type': 'application/json',
                        Accept: 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}` } })

                        setData([items,...data]);
                    };

                    const updateData = async (newData) => {// this function to update branch
                
                    const items = {
                        ter_branch_id: newData.ter_branch_id,
                        ter_branch_name: newData.ter_branch_name,
                    }
                    await axios.put(`${BASE_URL}Ech/update`,items,{ headers: {      'Content-Type': 'application/json',
                    Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` } })
                        

                    };

                    const deleteData = async (id) => {// this function delete branch
                        await axios.delete(`${BASE_URL}Ech/delete/${id}`,{ headers: {      'Content-Type': 'application/json',
                        Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}` } });
                      
                    };

                    useEffect(() => {
                        getData();
                    }, []);// useEffect hook allows you to run side effects in your functional components

               

                    const [open, setOpen] = useState(null);

                    const handleCloseMenu = () => {
                        setOpen(null);
                    }

                    


                    return (
                       
                        <>
                        
                            <Helmet>
                                <title> Branch </title>
                            </Helmet>
                            
                                <Stack direction="row" alignItems="center" justifyContent="space-between" >
                                    <Typography variant="h4" gutterBottom>
                                        Branch
                                    </Typography>

                                </Stack>
                                <Card >
                               
                                    
                                    <MaterialTable style={{width:'auto'}}
                                        title=""
                                     
                                        columns={columns}
                                        data={data}
                                        options={{
                                            rowStyle: {
                                               backgroundColor:'#d3d3d3 '
                                              },headerStyle: {
                                                backgroundColor:'#a9a9a9'
                                               
                                              },
                                              pageSize:10,
                                            pageSizeOptions: [10, 15, 25, 50, 100],}}
                                        editable={{
                                            onRowAdd: (newData) =>
                                                new Promise((resolve) => {

                                                    setTimeout(() => {

                                                        postData(newData);
                                                        setData([...data, newData]);


                                                        resolve();

                                                    }, 1000)
                                                }),
                                            onRowUpdate: (newData, oldData) =>
                                            
                                                new Promise((resolve) => {
                                                    setTimeout(() => {
                                                    
                                                        const dataUpdate = [...data];
                                                        const index = oldData.tableData.id;
                                                        
                                                    
                                                    
                                                        dataUpdate[index] = newData;

                                                        updateData(newData);
                                                        setData([...dataUpdate]);
                                                        resolve();
                                                    }, 1000)
                                                }),
                                            onRowDelete: oldData =>
                                                new Promise((resolve) => {
                                                    setTimeout(() => {
                                                        const dataDelete = [...data];
                                                        const index = oldData.tableData.id;
                                                        deleteData(dataDelete[index].ter_branch_id)
                                                        dataDelete.splice(index, 1);
                                                        setData([...dataDelete]);

                                                        resolve();
                                                    }, 1000);
                                                })
                                        }}
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
