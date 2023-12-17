          import * as React from 'react';
          import { Helmet } from 'react-helmet-async';
          import { useState,useEffect } from 'react';
          import MaterialTable from 'material-table';
          import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
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

          export default function Service() {

            const BASE_URL=process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
              const columns=[
                {
                  title: 'Service Id', field: 'service_id',type: 'numeric',align:'center',editable:'onAdd', validate: rowData => (rowData.service_id!== '' && rowData.service_id> 0 && rowData.service_id !== null && rowData.service_id !== undefined) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Service Id can not be empty' },
              },
                  {
                      title: 'Service Name ', field: 'service_name',align:'center',validate: rowData => (rowData.service_name !== '' && rowData.service_name !== undefined && rowData.service_name !== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Service name can not be empty' },
                  },
                  
              ];// define all columns that display in this page

              const [data, setData] = React.useState([
              ]);// useState hook allows you to add state to your functional component

              const getData = async () => {// function to get all services
                const { data } = await axios.get(`${BASE_URL}Service/getService`,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                  
                })
                setData(data);

            };
              const postData = async (newData) => {// function to post new service
                const items={
                  service_id:newData.service_id,
                  service_name: newData.service_name,
                  
                
                };
                
                await axios.post(`${BASE_URL}Service/addService`, items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } })

              setData([items,...data]);

              };
              const updateData = async (newData) => {// function to update senario
            
                const items = {
                  service_id:newData.service_id,
                  service_name: newData.service_name,
              }
                await axios.put(`${BASE_URL}Service/update`,items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` } })
                  

              };
              const deleteData = async (id) => {// function to delete service
                await axios.delete(`${BASE_URL}Service/delete/${id}`,{ headers: {      'Content-Type': 'application/json',
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
                  <title> Services </title>
                </Helmet>
               
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h4" gutterBottom>
                  Services
                    </Typography>
                    
                  </Stack>

                  <Card>
                  <MaterialTable
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
                                                  deleteData(dataDelete[index].service_id)
                                                  dataDelete.splice(index, 1);
                                                  setData([...dataDelete]);

                                                  resolve();
                                              }, 1000);
                                          })
                              }}
                          />
                  </Card>
              

                <Popover
                  open={Boolean(open)}
                  anchorEl={open}
                  onClose={handleCloseMenu}
                  anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                  transformOrigin={{ vertical: 'top', horizontal: 'right' }}
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
