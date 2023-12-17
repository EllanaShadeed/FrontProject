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

          export default function Senario() {


            const BASE_URL=process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
            
            
              const columns=[
                {
                  title: 'Senario ID', field: 'senario_id',align:'center',type: 'numeric',editable:'never', validate: rowData => (rowData.senario_id !== '' && rowData.senario_id > 0 && rowData.senario_id !== null && rowData.senario_id !== undefined) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Senario Id can not be empty' },
              },
            
                  {
                      title: 'Senario ', field: 'senario',align:'center',validate: rowData => (rowData.senario!== '' && rowData.senario!== undefined && rowData.senario!== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Senario can not be empty' },
                  },
                 
              ];// define all columns to display in this page

              const [data, setData] = React.useState([
              ]);// useState hook allows you to add state to your functional component

              const getData = async () => {// function to get all senarios
                const { data } = await axios.get(`${BASE_URL}scenario/scenario`,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                  
                })
            
              
                setData(data);

            };
            const postData = async (newData) => {// function to post new senario
              const items={
                senario:newData.senario,
          
          };
                    await axios.post(`${BASE_URL}scenario/addScenario`, items,{ headers: {      'Content-Type': 'application/json',
                    Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}` } })
          
                  setData([items,...data]);
              };
              const updateData = async (newData) => {// function to update senario
            
                const items = {
                  senario_id:newData.senario_id,
                  senario:newData.senario,
              }
                await axios.put(`${BASE_URL}scenario/update`,items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` } })
                

              };
              const deleteData = async (id) => {// function to delete senario
                await axios.delete(`${BASE_URL}scenario/delete/${id}`,{ headers: {      'Content-Type': 'application/json',
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
                  <title> Senario </title>
                </Helmet>
                
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h4" gutterBottom>
                    Senario
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
                                  onRowAdd: newData =>
                                      new Promise((resolve) => {
                                          setTimeout(() => {
                                              setData([...data, newData]);
                                            postData(newData);
                                              resolve();
                                          }, 1000)
                                      }),
                                  onRowUpdate: (newData, oldData) =>

                                      new Promise((resolve) => {
                                          setTimeout(() => {
                                              const dataUpdate = [...data];
                                              const index = oldData.tableData.id;
                                              dataUpdate[index] = newData;
                                              setData([...dataUpdate]);
                                            updateData(newData);
                                              resolve();
                                          }, 1000)
                                      }),
                                      onRowDelete: oldData =>
                                      new Promise((resolve) => {
                                          setTimeout(() => {
                                              const dataDelete = [...data];
                                              const index = oldData.tableData.id;
                                              deleteData(dataDelete[index].senario_id)
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
