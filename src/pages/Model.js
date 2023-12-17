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

          export default function Model() {

            const BASE_URL=process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
            

              const columns=[
                  {
                      title: 'Model ID', field: 'model_id',type: 'numeric',align:'center',editable:'never', validate: rowData => (rowData.model_id  !== '' && rowData.model_id > 0 && rowData.model_id !== null && rowData.model_id!== undefined) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Model Id can not be empty' },
                  },
                  {
                      title: 'Model Type  ',align:'center', field: 'model_type',type:'boolean',render: rowData => {
                        return(
                          rowData.model_type === "0" ?<h2 style={{ color: "#E87722", fontWeight: "bold",fontSize:"15px" }}>DN</h2>  :
                          <h2 style={{ color: "#008240", fontWeight: "bold",fontSize:"15px" }}>CCDM</h2>)
                      }
                  },
                
                  {
                      title: 'Model ', field: 'model',align:'center',validate: rowData => (rowData.model !== '' && rowData.model!== undefined && rowData.model!== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Model can not be empty' },
                  },
              ];// define all columns that display in this page

              const [data, setData] = React.useState([
              ]);// useState hook allows you to add state to your functional component

              const getData = async () => {// function to get all models
                const { data } = await axios.get(`${BASE_URL}model/getmodel`,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                  
                })
            
              
                setData(data);

            };
            const postData = async (newData) => {// function to post new model
              if (newData.model_type===true) {
                newData.model_type="1"
              }
              else{
                newData.model_type="0"
              }
              const items={
                model_id:newData.model_id,
                model_type:newData.model_type,
                model: newData.model,
          
          };
          console.log(items);
                    await axios.post(`${BASE_URL}model/addmodel`, items,{ headers: {      'Content-Type': 'application/json',
                    Accept: 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}` } })
          
                  setData([items,...data]);
              };
              const updateData = async (newData) => {// function to update model
            console.log(newData);
            if (newData.model_type===true) {
              newData.model_type="1"
            }
            else{
              newData.model_type="0"
            }
                const items = {
                  model_id:newData.model_id,
                  model_type:newData.model_type,
                  model:newData.model,
              }
                await axios.put(`${BASE_URL}model/update`,items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` } })
                  

              };

              const deleteData = async (id) => {// function to delete model
                console.log(id);
                  await axios.delete(`${BASE_URL}model/delete/${id}`,{ headers: {      'Content-Type': 'application/json',
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
                  <title> Model </title>
                </Helmet>
               
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h4" gutterBottom>
                    Model
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
                                              deleteData(dataDelete[index].model_id)
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
