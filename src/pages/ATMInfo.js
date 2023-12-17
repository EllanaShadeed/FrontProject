          import * as React from 'react';
          import { useState, useEffect } from 'react';
          import { Helmet } from 'react-helmet-async';
          import { filter } from 'lodash';
          import MaterialTable from 'material-table';
          import { Link } from 'react-router-dom';
          import axios from "axios";
          import Button from '@mui/material/Button';
          import Dialog from '@mui/material/Dialog';
          import DialogActions from '@mui/material/DialogActions';
          import DialogContent from '@mui/material/DialogContent';
          import DialogTitle from '@mui/material/DialogTitle';
          import AddIcon from '@mui/icons-material/Add';
         
          
          import {
            Card,
            Stack,
            
            Typography,
          } from '@mui/material';
          import MaintinanceForm from './MaintinanceForm';
          import USERLIST from '../_mock/user';
          import ATMForm from './ATMForm';


          // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

          function descendingComparator(a, b, orderBy) {// function to r
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

          export default function ATMInfo() {
            const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
           

            const columns = [

              {
                title: 'Terminal', field: 'id',align:'center',
                render: rowData => <Link to={`/dashboard/atmdetailes/${rowData.id}`} >{rowData.id}</Link>
              },
              {
                title: 'Status', field: 'status',align:'center'

              },
              {
                title: 'Maintenance', field: 'maintenance',align:'center'

              },

            

            ];// define all columns i want to display in this page


            const [data, setData] = React.useState([
            ]);

            const getData = async () => {// this function return all atm 
              const { data } = await axios.get(`${BASE_URL}terminal/getTerminal`, {
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('token')}`
                }
              }, {

              })

             
              setData(data);// insert data return from api 

            };



            useEffect(() => {
              getData();

            }, []);// useEffect hook allows you to run side effects in your functional components

            const [open, setOpen] = useState(null);// useState hook allows you to add state to your functional component
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
              setRowsPerPage(parseInt(event.target.value, 20));
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
          
            const handleClickMaitinance = (terminal) => {// this funtion to open dialog(form of add new atm)
              
              localStorage.setItem("terminal", terminal)
            handleClickOpenMaintinance();
            };
           
            return (
              <>
                <Helmet>
                  <title> ATM Information </title>
                </Helmet>

                <>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h4" gutterBotto >
                      ATM Information
                    </Typography>

                  </Stack>

                  <Card>
                 
                <Button  variant="outlined" style={{margin:"15px"}} onClick={handleClickOpen}>
                  Add ATM <AddIcon sx={{fontSize:20}}/>
                </Button>
                <Dialog  open={open} onClose={handleClose}>
                  <DialogTitle >New ATM</DialogTitle>
                  <DialogContent>
                    <ATMForm/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleClose}>Cancel</Button></div>
                    
                  </DialogActions>
                </Dialog>
                <Dialog  open={openmaint} onClose={handleClosMaitinance}>
                  <DialogContent>
              <MaintinanceForm/>
                  </DialogContent>
                  <DialogActions>
                  <div className="  ">
                    <Button className='' onClick={handleClosMaitinance}>Cancel</Button></div>
                  </DialogActions>
                </Dialog>
              
             
                    <MaterialTable
                              title=""
                              columns={columns}
                              data={data}
                              options={{
                                pageSize: 10,
                                rowStyle: {
                                  backgroundColor:'#d3d3d3 '
                                 },headerStyle: {
                                   backgroundColor:'#a9a9a9'
                                  
                                 },
                               
                                pageSizeOptions: [10, 15, 25, 50, 100],}}
                              actions={[
                                {
                                  icon: 'add',
                                  tooltip: 'ATM Maitinance',
                                  onClick: (event, rowData) => {
                                  handleClickMaitinance(rowData.id);
                                  }
                                }
                              ]}
                                />
                    
                 
                  </Card>
                </>

                
              </>
            );
          }
