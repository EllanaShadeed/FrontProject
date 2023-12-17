          import * as React from 'react';
          import { Helmet } from 'react-helmet-async';
          import { useState,useEffect } from 'react';
          import MaterialTable from 'material-table';
          import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
          import Select from '@mui/material/Select';
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

          export default function MaintEmployee() {
            const BASE_URL=process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
            const [company, setCompany] = React.useState([
          ]);// useState hook allows you to add state to your functional component
          const [companies, setCompanies] = React.useState([
          ]);
          const getCompany = async () => {// this function to get all companies
              const {data} = await axios.get(`${BASE_URL}maintCompany/maintCompany`,{ headers: {      'Content-Type': 'application/json',
              Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                
              })

            
              setCompanies(data);

          };
          const handleChangeCompany = (event) => {

              setCompany(event.target.value);
              
              
              
              };// function to handle value of company
             
              const columns=[
                {
                  title: 'Maint Emp Id', field: 'empId',type: 'numeric',editable:'onAdd',align:'center', validate: rowData => (rowData.empId!== '' && rowData.empId> 0 && rowData.empId !== null && rowData.empId!== undefined) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Maint Emp Id can not be empty' },
              },
                  {
                      title: 'Maint Emp Name ', field: 'employeeName',align:'center',validate: rowData => (rowData.employeeName!== '' && rowData.employeeName!== undefined && rowData.employeeName!== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Maint Emp Name can not be empty' },
                  },
                  {
                      title: 'Maint Emp Email ', field: 'empEmail',align:'center',type:'email',validate: rowData => (rowData.empEmail!== '' && rowData.empEmail!== undefined && rowData.empEmail!== null) ? { isValid: true, helperText: '' } : { isValid: false, helperText: 'Maint Emp Email can not be empty' },
                  },
                  {
                      title: 'Maint Emp Phone ',length:'10',align:'center', field: 'empPhone',type:'phone',validate: rowData => (rowData.empPhone!== '' && rowData.empPhone> 0 && rowData.empPhone !== null && rowData.empPhone!== undefined ) ? { isValid: true, helperText: '',} : { isValid: false, helperText: 'Maint Emp Phone can not be empty' },
                  },
                  {
                      title: 'Maint Emp Company Id ', field: 'companyInf.company_name',width:"200",align:'center',
                      editComponent: props => <Select
                      style={{marginTop:"5px",width:"200px"}} 
                      labelId="select-branch"
                      id="select-company"
                      value={companies.company_name}
                      name="companyId"
                    
                      
                      onChange={handleChangeCompany}
                      >
            {companies.map(c =>{
                      return <MenuItem  value={c.company_id}>{c.company_name}</MenuItem>
                      })}
                      </Select>
                  
                    
                    
                    
                        
                  },
              ];// define all columns that desplay in page

              const [data, setData] = React.useState([
              ]);

              const getData = async () => {// function to get all MaintEmployees
                const { data } = await axios.get(`${BASE_URL}maintEmp/getmaintEmp`,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                  
                })
            
              
                setData(data);

            };
              const postData = async (newData) => {// function to post new Employee
                  
                  
                const items={
                
                  empId:newData.empId,
                  employeeName:newData.employeeName,
                  empEmail:newData.empEmail,
                  empPhone:newData.empPhone,
                  companyId:company,
                
                };
                 
                await axios.post(`${BASE_URL}maintEmp/addmaintEmp`, items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } })

              setData([items,...data]);

              };
              const updateData = async (newData) => {// function to update info of employee
            
                const items = {
                  empId:newData.empId,
                  employeeName:newData.employeeName,
                  empEmail:newData.empEmail,
                  empPhone:newData.empPhone,
                  companyId:newData.companyId,
              }
             
                await axios.put(`${BASE_URL}maintEmp/update`,items,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}` } })
                  

              };
              const deleteData = async (id) => {// function to delete employee
             
                await axios.delete(`${BASE_URL}maintEmp/delete/${id}`,{ headers: {      'Content-Type': 'application/json',
                Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } });
                
            };
              useEffect(() => {
                  getData();
                  getCompany();
              }, []);

            const [open, setOpen] = useState(null);

            const handleCloseMenu = () => {
              setOpen(null);
            }

            return (
              <>
                <Helmet>
                  <title> Maint Employee </title>
                </Helmet>
                <>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h4" gutterBottom>
                    Maint Employee
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
                                                  deleteData(dataDelete[index].empId)
                                                  dataDelete.splice(index, 1);
                                                  setData([...dataDelete]);

                                                  resolve();
                                              }, 1000);
                                          })
                              }}
                          />
                  </Card>
                </>

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
