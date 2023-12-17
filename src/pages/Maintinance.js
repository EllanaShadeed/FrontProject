          import * as React from 'react';
          import { useState, useEffect } from 'react';
          import { Helmet } from 'react-helmet-async';
          import { filter } from 'lodash';
          import MaterialTable from 'material-table';
          import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
          import Button from '@mui/material/Button';
          import Dialog from '@mui/material/Dialog';
          import DialogActions from '@mui/material/DialogActions';
          import DialogContent from '@mui/material/DialogContent';
          import FormLabel from '@mui/material/FormLabel';
          import {
            Card,
            Stack,
            Container,
            Typography,
          } from '@mui/material';

          import { useForm } from "react-hook-form";
          import USERLIST from '../_mock/user';


          function descendingComparator(a, b, orderBy) {
            if (b[orderBy] < a[orderBy]) {
              return -1;
            }
            if (b[orderBy] > a[orderBy]) {
              return 1;
            }
            return 0;
          }

          function getComparator(order, orderBy) {
            return order === 'desc'
              ? (a, b) => descendingComparator(a, b, orderBy)
              : (a, b) => -descendingComparator(a, b, orderBy);
          }

          function applySortFilter(array, comparator, query) {
            const stabilizedThis = array.map((el, index) => [el, index]);
            stabilizedThis.sort((a, b) => {
              const order = comparator(a[0], b[0]);
              if (order !== 0) return order;
              return a[1] - b[1];
            });
            if (query) {
              return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
            }
            return stabilizedThis.map((el) => el[0]);
          }

            // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

          export default function Maintinance() {
            const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages

            const columns = [

              {
                title: 'ATM Name', field: `terminalInf.atmName`, width: "6%",align:'center'



              },
              {
                title: 'Maint Type Report', field: `typeInf.mainTypeName`, width: "6%",align:'center'

              },

              {
                title: 'Maintenance Type', field: 'typeFlag', width: "6%",align:'center',
                render: rowData => {
                  return (
                    rowData.typeFlag === "0" ? <h2 style={{ color: "#E87722", fontWeight: "bold", fontSize: "15px" }}>SoftWare</h2> :
                      <h2 style={{ color: "#008240", fontWeight: "bold", fontSize: "15px" }}>HardWare</h2>)
                }
              },
              {
                title: 'Maintenance Reason', field: 'maint_reason', width: "6%",align:'center',
                render: rowData => {
                  return (
                    rowData.maint_reason === "0" ? <h2 style={{ color: "#E87722", fontWeight: "bold", fontSize: "15px" }}>Emergency</h2> :
                      <h2 style={{ color: "#008240", fontWeight: "bold", fontSize: "15px" }}>Periodic</h2>)
                }
              },
              {
                title: 'Maintinace Problem', field: 'problemInf.name_problem', width: "6%",align:'center'



              },
              {
                title: 'Maintinace Employee', field: 'empInf.employeeName', width: "6%",align:'center'

              },
            ];
// define all columns that display on this page

            const [data, setData] = React.useState([
            ]);// useState hook allows you to add state to your functional component


            const getData = async () => {// function get all maintinance of all atms 
              const { data } = await axios.get(`${BASE_URL}maintenance/getMaintenance`, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }, {

              })


              setData(data);

            };

         

            useEffect(() => {
              getData();
            }, []);// useEffect hook allows you to run side effects in your functional components

            const [open, setOpen] = useState(null);
            const [openmaint, setOpenMaint] = useState(null);
            const [page, setPage] = useState(0);

            const [order, setOrder] = useState('asc');

            const [selected, setSelected] = useState([]);

            const [orderBy, setOrderBy] = useState('name');

            const [filterName, setFilterName] = useState('');

            const [rowsPerPage, setRowsPerPage] = useState(5);

            const handleOpenMenu = (event) => {
              setOpen(event.currentTarget);
            };

            const handleCloseMenu = () => {
              setOpen(null);
            };

            const handleRequestSort = (event, property) => {
              const isAsc = orderBy === property && order === 'asc';
              setOrder(isAsc ? 'desc' : 'asc');
              setOrderBy(property);
            };

            const handleSelectAllClick = (event) => {
              if (event.target.checked) {
                const newSelecteds = USERLIST.map((n) => n.name);
                setSelected(newSelecteds);
                return;
              }
              setSelected([]);
            };

            const handleClick = (event, name) => {
              const selectedIndex = selected.indexOf(name);
              let newSelected = [];
              if (selectedIndex === -1) {
                newSelected = newSelected.concat(selected, name);
              } else if (selectedIndex === 0) {
                newSelected = newSelected.concat(selected.slice(1));
              } else if (selectedIndex === selected.length - 1) {
                newSelected = newSelected.concat(selected.slice(0, -1));
              } else if (selectedIndex > 0) {
                newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
              }
              setSelected(newSelected);
            };

            const handleChangePage = (event, newPage) => {
              setPage(newPage);
            };

            const handleChangeRowsPerPage = (event) => {
              setPage(0);
              setRowsPerPage(parseInt(event.target.value, 10));
            };

            const handleFilterByName = (event) => {
              setPage(0);
              setFilterName(event.target.value);
            };

            const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

            const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

            const isNotFound = !filteredUsers.length && !!filterName;


            const handleClickOpen = () => {
              setOpen(true);
            };

            const handleClose = () => {
              setOpen(false);
            };

            const handleClickOpenMaintinance = () => {
              setOpenMaint(true);

            };

            const handleClosMaitinance = () => {
              setOpenMaint(false);

            };

            const [MFile, setFile] = useState();
            const [ATMTerminal, setATMTerminal] = React.useState([
            ]);
            const [CurrentDateMaint, setCurrentDateMaint] = React.useState([
            ]);
            const [maintType, setmaintType] = React.useState([
            ]);



            const currentdate = new Date();
            console.log(currentdate);
           
             const datetime=  `${currentdate.getFullYear()}-${currentdate.getMonth()+1}-${currentdate.getDate()} ${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()}`;
          
            const handleClickMaitinance = (rowData, id) => {
              const terminal = rowData.terId;

              const MaintType = rowData.typeFlag;
              setATMTerminal(terminal);

              setmaintType(MaintType);
              setCurrentDateMaint(datetime);
            

              handleClickOpenMaintinance(id);

            };


            const info = { nameTermainal: ATMTerminal, date: CurrentDateMaint, typeMaintenance: maintType };
            const infoJson = JSON.stringify(info);
           


            
            const onChangeFile = (event) => {
              setFile(event.target.files[0]);

            }


            const { register, handleSubmit, formState: { errors } } = useForm();
            const handleRegistration = (file) => {
              uploadWithFormData(file);



            };
console.log(info);
            function uploadWithFormData(file) {
              const formData = new FormData();
              formData.append('file', file.MaintFile[0]);
              formData.append('info', JSON.stringify(info));

              postFile(formData);
             

            }
            const reagisterOpetion = {
              file: {}
            }

            const postFile = async (formData) => {
              await axios.post(`http://localhost:8080/api/files/upload`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data',
                  Accept: 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              });
              handleClosMaitinance();
            }

            const handleError = (errors) => { };
            const registerOptions = {
              MaintFile: {
                required: "File is required",

              }
            }


            const [selectedFile, setSelectedFile] = useState(null);


            const handleFileChange = (event) => {
              setSelectedFile(event.target.files[0]);
            };

            
            return (
              <>
                <Helmet>
                  <title> ATM Maintinance Detailes </title>
                </Helmet>

                
                  <Stack direction="row" alignItems="center" justifyContent="space-between" >
                    <Typography variant="h4" gutterBotto >
                      ATM  Maintinance Detailes
                    </Typography>

                  </Stack>

                  <Card>
                    <div>


                      <Dialog open={openmaint} onClose={handleClosMaitinance}>
                        <DialogContent>
                          <FormLabel style={{ marginTop: "20px" }} id="demo-row-radio-buttons-group-label">Maintinace file</FormLabel>
                          <br />
                          <br />

                          <input type="file" id="name" name="MaintFile" onChange={onChangeFile} {...register('MaintFile', reagisterOpetion.file)} />
                          <div>
                            <small className="text-danger">
                              {errors?.MaintFile && errors.MaintFile.message}
                            </small>
                          </div>
                        </DialogContent>
                        <DialogActions>
                          <div className="  ">
                            <form onSubmit={handleSubmit(handleRegistration, handleError)} encType="multipart/form-data"  >
                              <Button className='' onClick={handleClosMaitinance}>Cancel</Button>
                              <button className="btn btn-primary ">Submit</button>
                            </form>
                          </div>

                        </DialogActions>
                      </Dialog>

                    </div>
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
                        pageSizeOptions: [10, 15, 25, 50, 100],
                      }}
                      actions={[
                        {
                          icon: 'add',
                          tooltip: 'Maintinace Report',
                          onClick: (event, rowData) => {
                            handleClickMaitinance(rowData, rowData.id);
                          }
                        }
                      ]}
                    />


                  </Card>
                


              </>
            );
          }