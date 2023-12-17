              import { Helmet } from 'react-helmet-async';
              import * as React from 'react';
              import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
              import {  useEffect } from 'react';
              import { Grid, Container, Typography } from '@mui/material';
              import {
              
                AppWidgetSummary,
                
              } from '../sections/@dashboard/app';

          // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

              export default function DashboardAppPage() {
                const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages in my project
                const [data, setData] = React.useState({});// useState hook allows you to add state to your functional component
                const [profileItem, setProfileItem] = React.useState({});

                const getData = async () => {// function getData to get account of many things and display it in dashpoard page 
                  const dataCount = await axios.get(`${BASE_URL}dashboard/count`, {
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  }, {

                  })

                  setData(dataCount?.data)// insert the date return from api in data variable 

                };

            

                const getUser = async () => {// function getUser to get userInfo 
                  const dataUser = await axios.get(`${BASE_URL}user/userINf`, {
                    headers: {
                      'Content-Type': 'application/json',
                      Accept: 'application/json',
                      Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                  })
                  
                  setProfileItem(dataUser?.data)// insert the date return from api in profileItem variable

                };
                useEffect(() => {// useEffect hook allows you to run side effects in your functional components
                  getUser();
                  getData();

                }, []);
              

                return (
                  /*  in return i write the code to view of user */ 
                  <>
                    <Helmet>
                      <title> Dashboard </title>
                    </Helmet>

                    <Container maxWidth="xl">
                      <Typography variant="h4" sx={{ mb: 5 }}>
                        {`Hi, Welcome back ${profileItem.firstname} ${profileItem.lastname}`}
                      </Typography>

                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Branchs " total={data.numBranch} icon={'ant-design:unordered-list'} />
                        </Grid>


                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Districts" total={data.numMaintDistrict} color="secondary" icon={'ant-design:environment'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Senarios" total={data.numsenario} color="warning" icon={'ant-design:file'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Vendors" total={data.numVendor} color="error" icon={'ant-design:team'} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Hosts" total={data.numHost} color="info" icon={'ant-design:database'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Locations" total={data.numLocation} color="secondary" icon={'ant-design:home'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Models" total={data.numModel} color="warning" icon={'ant-design:project'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Maintenance" total={data.numMaintenance} color="error" icon={'ant-design:tool'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Maintenance Type" total={data.numMaintType} color="info" icon={'ant-design:tool'}  />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Maintenance Employee" total={data.numMaintEmp
              } color="secondary" icon={'ant-design:team'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Maintenance Problem" total={data.numMaintProblem
              } color="warning" icon={'ant-design:tool'} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                          <AppWidgetSummary title="num of Maintenance Company" total={data.numMaintCompany} color="error" icon={'ant-design:home'} />
                        </Grid>
                      </Grid>
                    </Container>
                  </>
                );
              }
