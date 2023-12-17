        import * as React from "react";
        import {  useForm } from "react-hook-form";
        import TextField from '@mui/material/TextField';
        import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
        import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
        import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
        import { DatePicker } from '@mui/x-date-pickers/DatePicker';
        import { Select } from "@mui/material";
        import Grid from '@mui/material/Grid';
        import InputLabel from '@mui/material/InputLabel';
        import MenuItem from '@mui/material/MenuItem';
        import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
        import dayjs from 'dayjs';
        import {  useEffect } from 'react';
        import { createBrowserHistory } from 'history';
        import FormLabel from '@mui/material/FormLabel';
        import FormControl from '@mui/material/FormControl';
        import OutlinedInput from '@mui/material/OutlinedInput';
        import ListItemText from '@mui/material/ListItemText';
        import Checkbox from '@mui/material/Checkbox';

        export const history = createBrowserHistory();


        // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

        const ATMForm = () => {


          const [serviceName, setServiceName] = React.useState([]);

          const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages in my project
          
          const [branch, setBranch] = React.useState([
          ]);// useState hook allows you to add state to your functional component
          const [district, setDistrict] = React.useState([
          ]);
          const [host, setHost] = React.useState([
          ]);


          const handleChangeBranch = (event) => {
            setBranch(event.target.value);
          };// this function handle the value of branch after select from form and insert it in branch variable 
          



          const handleChangeHost = (event) => {

            setHost(event.target.value);

          };// this function handle the value of host after select from form and insert it in host variable 
        

          const [L, setLocation] = React.useState([
          ]);
          const handleChangeLocation = (event) => {

            setLocation(event.target.value);

          };// this function handle the value of location after select from form and insert it in L variable 
          

          const [model, setModel] = React.useState([
          ]);
          const handleChangeModel = (event) => {

            setModel(event.target.value);



          };// this function handle the value of model after select from form and insert it in model variable 

        
          const handleChangeDistrict = (event) => {

            setDistrict(event.target.value);



          };// this function handle the value of district after select from form and insert it in district variable 
        
          const [senario, setSenario] = React.useState([
          ]);
          const handleChangeSenario = (event) => {

            setSenario(event.target.value);



          };// this function handle the value of senario after select from form and insert it in senario variable 
          
          const handleChangeCityEn = (event) => {

            setCityEn(event.target.value);

          };// this function handle the value of cityEn after select from form and insert it in cityEn variable 


          const handleChangeCityAr = (event) => {

            setCityAr(event.target.value);

          };// this function handle the value of cityAr after select from form and insert it in cityAr variable 


          const [vendor, setVendor] = React.useState([
          ]);
          const [cityEn, setCityEn] = React.useState([
          ]);

          const [cityAr, setCityAr] = React.useState([
          ]);
        
          const handleChangeVendor = (event) => {

            setVendor(event.target.value);



          };// this function handle the value of vendor after select from form and insert it in vendor variable 
        
          const [data, setData] = React.useState([
          ]);
          const [districts, setDistricts] = React.useState([
          ]);
          const [hosts, setHosts] = React.useState([
          ]);
          const [locations, setlocations] = React.useState([
          ]);
          const [vendors, setVendors] = React.useState([
          ]);

          const [senarios, setSenarios] = React.useState([
          ]);
          const [ceties, setCityies] = React.useState([
          ]);
          const [models, setModels] = React.useState([
          ]);
          const [newATM, setNewATM] = React.useState([
          ]);
          const [Services, setServices] = React.useState([
          ]);
          const getData = async () => {// function getData to get all branchs 
            const { data } = await axios.get(`${BASE_URL}Ech/getBranches`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setData(data);// insert data from this api in data variable 

          };


          const getDistricts = async () => {// function geDistrictst to get all districts
            const { data } = await axios.get(`${BASE_URL}District/getDistrict`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

            
            setDistricts(data);// insert data from this api in districts variable

          };

          const getHosts = async () => {// function geDistrictst to get all hosts
            const { data } = await axios.get(`${BASE_URL}Host/getHost`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setHosts(data);// insert data return from api in hosts variable

          };
          const getLocations = async () => {// function getLocations to get all locations
            const { data } = await axios.get(`${BASE_URL}location/getLocation`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setlocations(data);// insert data return from api in locations variable 

          };
          
          const getVendor = async () => {// function getLocations to get all vendors
            const { data } = await axios.get(`${BASE_URL}Vendor/getVendor`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setVendors(data);// insert data return from api in vendors variable

          };
          const getSenrio = async () => {// function getSenario to get all senarios
            const { data } = await axios.get(`${BASE_URL}scenario/scenario`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setSenarios(data);// insert data return from api in senarios variable

          };
          const getModel = async () => {// function getModel to get all models
            const { data } = await axios.get(`${BASE_URL}model/getmodel`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

            
            setModels(data);// insert data return from api in models variable

          };
          const getCity = async () => {// function getCity to get all cities
            const { data } = await axios.get(`${BASE_URL}City/getCity`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {

            })

          
            setCityies(data);// insert data return from api in ceties variable

          };
          useEffect(() => {
            getData();
            getDistricts();
            getHosts();
            getLocations();
            getVendor();
            getSenrio();
            getModel();
            getATM();
            getCity();
            getServices();
           
          }, []);// useEffect hook allows you to run side effects in your functional components
          
          const { register, handleSubmit, formState: { errors } } = useForm();// useForm is the custom hook to manage form ease
          const handleRegistration = (d) => {
            
            postATM(d);
            


            history.push('/dashboard/app');
          
          };

          const handleError = (errors) => { };
          const [value, setValue] = React.useState();
        
          const startDate = dayjs(value).format('YYYY-MM-DD');// Day.js APIs to parse, validate, manipulate, and display dates and times
        

          const [EndDate, setEndDate] = React.useState();
        
          const endDate = dayjs(EndDate).format('YYYY-MM-DD');
          

          const [InstallationDate, setInstallationDate] = React.useState(null);
          
          const installationDate = InstallationDate ? dayjs(InstallationDate).format('YYYY-MM-DD') : null;
          

          const [InstallBrailleDate, setInstallBrailleDate] = React.useState(null);
          
          const installBrailleDate = InstallBrailleDate ? dayjs(InstallBrailleDate).format('YYYY-MM-DD') : null;
          


          const getATM = async () => {
            const { data } = await axios.get(`${BASE_URL}terminal/getTerminal`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {})

          
            setNewATM(data);

          };
          const getServices = async () => {// function getServices  to get all services 
            const { data } = await axios.get(`${BASE_URL}Service/getService`, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }, {})

            setServices(data);// insert data return from this api in Services variable

          };
          const postATM =async (d) => {// this function to take data from form and insert it into items object and then post this atm 

            const items = {
              addressAr: d.addressAr,
              addressEn: d.addressEn,
              branchId: d.branchId,
              districtsId: d.districtsId,
              endDate: d.endDate,
              hostId: d.hostId,
              dateInstallBraille: d.dateInstallBraille,
              installationDate: d.installationDate,
              ip: d.ip,
              lastDateMainten: "2023-07-27",
              locationId: d.locationId,
              modelId: d.modelId,
              pcName: d.pcName,
              remarks: d.remarks,
              senarioId: d.senarioId,
              serial: d.serial,
              startDate: d.startDate,
              id: d.id,
              cityId: d.cityEnId,
              longitude: d.longitude,
              latitude: d.latitude,
              vendorId: d.vendorId,
            };

          

            axios.defaults.headers = {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }

          await axios.post(`${BASE_URL}terminal/addTerminal`, { ...items })
              .then(response => {
                console.log('Response', response.data)

              })
              .catch(e => {
                console.log('Error: ', e.response.data)
              })
              postdd(serviceName, items.id);// this function to insert all services that i selected for this atm
          };




          const today = dayjs();
          const tomorrow = dayjs().add(1, 'day');
          const registerOptions = {// this object to make validation of the data is performed after entering it into the form 
            id: {
              required: "terminal is required",
              minLength: {
                value: 8,
                message: "terminal must have 8 numbers"
              },
              pattern: {
                value: /[0-9]/,
                message: "terminal must be number"
              }
            },
            serial: {
              required: "serial is required",
              minLength: {
                value: 10,
                message: "serial must have 10 numbers"
              },
              pattern: {
                value: /[0-9]/,
                message: "serial must be number"
              }

            },
            pcName: {
              required: "pc is required",
              minLength: {
                value: 12,
                message: "pc must have 12 characters"
              },


            },

            ip: {
              required: "ip is required",
              maxLength: {
                value: 14,
                message: "ip must have at more 14 "
              },
              minLength: {
                value: 12,
                message: "ip must have at least 12 "
              },
            },

            addressAr: {
              required: "address_ar is required",

            },
            addressEn: {
              required: "address_en is required",

            },
            remarks: {
              required: "remarks is required",

            },

            startDate: {

              required: "start_date is required",
              value: startDate


            },
            endDate: {
              required: "end_date is required",
              value: endDate
            },
            installationDate: {

              value: installationDate,
              required: "installation_date is required",
            },
            dateInstallBraille: {

              value: installBrailleDate,
              required: "install_Braille_date is required",
            },
            branchId: {
              required: "branch is required",
            },
            districtsId: {
              required: "district is required",
            },
            hostId: {
              required: "host is required",
            },
            locationId: {
              required: "location is required",
            },
            senarioId: {
              required: "senario is required",
            },
            modelId: {
              required: "model is required",
            },
            vendorId: {
              required: "vendor is required",
            },
            cityEnId: {
              required: "cityEn is required",
            },
            cityArId: {
              required: "cityAr is required",
            },
            longitude: {
              required: " longitude is required",
            },
            latitude: {
              required: " latitude is required",
            }

          };
          console.log(errors)

          const ITEM_HEIGHT = 48;
          const ITEM_PADDING_TOP = 8;
          const MenuProps = {
            PaperProps: {
              style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
              },
            },
          };

          const [dataST, setST] = React.useState([
          ]);
       
        
          const handleChangeService = (event) => {// this function to handle services after selected from form 
            const {
              target: { value },
            } = event;
          


            setServiceName(// to insert all services i selected for one atm in one variable (serviceName)
              typeof value === 'string' ? value.split(',') : value,
            );
          };


          const postDataServiceTerminal = async (s, id) => {// this function to post services with num of terminal in serviceTerminal table 
            const items = {
              service_id: s,
              terminal: Number(id),
            
              
            };
            

            await axios.post(`${BASE_URL}TerminalService/addservicesTerminal`,items, {
              headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            })
          
            setST([items, ...dataST]);

          };

          const postdd = (serviceName, id) => {// this function take all services selected and num of terminal 
            const i = 0;
          
            serviceName.forEach(s => {
              postDataServiceTerminal(s, id);// function take each service with same num of atm and post this  in serviceTerminal table 
            });




          }

          return (
            <form onSubmit={handleSubmit(handleRegistration, handleError)} >
              < TextField style={{ margin: "10px", width: "500px" }} id="outlined-terminal" label="Terminal" type="text" name="id"  {...register('id', registerOptions.id)} />
              <div>
                <small className="text-danger">
                  {errors?.id && errors.id.message}
                </small>
              </div>
              < TextField style={{ margin: "10px", width: "500px" }} id="outlined-serial" label="Serial" type="text" name="serial"  {...register('serial', registerOptions.serial)} />
              <div>
                <small className="text-danger">
                  {errors?.serial && errors.serial.message}
                </small>
              </div>

              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-pc-name" name="pcName" label="PC Name" type="text" variant="outlined"  {...register('pcName', registerOptions.pcName)} />
              <div>
                <small className="text-danger">
                  {errors?.pcName && errors.pcName.message}
                </small>
              </div>
              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-ip" label="IP" variant="outlined" name="ip" type="text" {...register('ip', registerOptions.ip)} />
              <div>
                <small className="text-danger">
                  {errors?.ip && errors.ip.message}
                </small>
              </div>
              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-address-ar" label="Address_AR" type="text" variant="outlined" name="addressAr" {...register('addressAr', registerOptions.addressAr)} />
              <div>
                <small className="text-danger">
                  {errors?.addressAr && errors.addressAr.message}
                </small>
              </div>
              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-address-en" label="Address_EN" type="text" variant="outlined" name="addressEn" {...register('addressEn', registerOptions.addressEn)} />
              <div>
                <small className="text-danger">
                  {errors?.addressEn && errors.addressEn.message}
                </small>
              </div>

              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-remarks" label="Remarks" variant="outlined" type="text" name="remarks" {...register('remarks', registerOptions.remarks)} />
              <div>
                <small className="text-danger">
                  {errors?.remarks && errors.remarks.message}
                </small>
              </div>
              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-remarks" label="longitude" variant="outlined" type="text" name="longitude" {...register('longitude', registerOptions.longitude)} />
              <div>
                <small className="text-danger">
                  {errors?.longitude && errors.longitude.message}
                </small>
              </div>
              <TextField style={{ margin: "10px", width: "500px" }} id="outlined-remarks" label="latitude" variant="outlined" type="text" name="latitude" {...register('latitude', registerOptions.latitude)} />
              <div>
                <small className="text-danger">
                  {errors?.latitude && errors.latitude.message}
                </small>
              </div>
              <br />
              <div>
                <FormControl sx={{ m: 1, width: 500 }}>

                  <InputLabel id="demo-multiple-checkbox-label">Services</InputLabel>
                  <Select required
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={serviceName}
                    onChange={handleChangeService}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                  >
                    {Services.map((service) => (
                      <MenuItem key={service.service_id} naem={service.service_name} value={service.service_id}>
                        <Checkbox checked={serviceName.indexOf(service.service_id) > -1} />
                        <ListItemText primary={service.service_name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <br />
              <Grid container spacing={2}>
                <Grid item xs={6} marginBottom={3}>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>

                      <DatePicker defaultValue={today} value={value} onChange={(value) => setValue(value)} label="Start date"
                        slotProps={{
                          textField: {

                            name: 'startDate'

                          },
                          ...register('startDate', registerOptions.startDate)
                        }}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <div>
                    <small className="text-danger">
                      {errors?.startDate && errors.startDate.message}
                    </small>
                  </div>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker defaultValue={tomorrow} value={EndDate} onChange={(EndDate) => setEndDate(EndDate)} label="End date"
                        slotProps={{
                          textField: {

                            name: 'endDate'
                          },
                          ...register('endDate', registerOptions.endDate)
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <div>
                    <small className="text-danger">
                      {errors?.endDate && errors.endDate.message}
                    </small>
                  </div>
                </Grid>
                <Grid item xs={6} >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker label="Installation Date" value={InstallationDate} onChange={(InstallationDate) => setInstallationDate(InstallationDate)}

                        slotProps={{
                          textField: {
                            name: 'installationDate'
                          },
                          ...register('installationDate', registerOptions.installationDate)
                        }}
                      />

                    </DemoContainer>
                  </LocalizationProvider>
                  <div>
                    <small className="text-danger">
                      {errors?.installationDate && errors.installationDate.message}
                    </small>
                  </div>


                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker']}>
                      <DatePicker value={InstallBrailleDate} onChange={(InstallBrailleDate) => setInstallBrailleDate(InstallBrailleDate)} label="Install Braille Date"
                        slotProps={{
                          textField: {
                            name: 'installBrailleDate'
                          },
                          ...register('dateInstallBraille', registerOptions.dateInstallBraille)
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  <div>
                    <small className="text-danger">
                      {errors?.dateInstallBraille && errors.dateInstallBraille.message}
                    </small>
                  </div>
                </Grid>
              </Grid>
              <Grid container spacing={2}>
                <Grid item xs={6} marginBottom={3}>
                  <FormLabel style={{ marginTop: "10px" }} id="select-branch">Branch</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-branch"
                    id="select-branch"
                    value={data.ter_branch_name}
                    name="branchId"

                    {...register('branchId', registerOptions.branchId)}
                    onChange={handleChangeBranch}
                  >

                    {

                      data.map(branch => {
                        return <MenuItem value={branch.ter_branch_id}>{branch.ter_branch_name}</MenuItem>
                      })
                    }


                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.branchId && errors.branchId.message}
                    </small>
                  </div>
                  <FormLabel style={{ marginTop: "10px" }} id="select-host">Host</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-host"
                    id="select-host"
                    value={hosts.terHostName}

                    name="hostId"
                    {...register('hostId', registerOptions.hostId)}


                    onChange={handleChangeHost}
                  >
                    {

                      hosts.map(host => {
                        return <MenuItem value={host.hostId}>{host.terHostName}</MenuItem>
                      })
                    }
                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.hostId && errors.hostId.message}
                    </small>
                  </div>
                  <FormLabel style={{ marginTop: "10px" }} id="select-vendor">Vendor</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-vendor"
                    id="select-vendor"
                    value={vendors.responsibleVendor}
                    name="vendorId"
                    {...register('vendorId', registerOptions.vendorId)}
                    onChange={handleChangeVendor}
                  >
                    {

                      vendors.map(vendor => {
                        return <MenuItem value={vendor.vendorId}>{vendor.responsibleVendor}</MenuItem>
                      })
                    }
                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.vendorId && errors.vendorId.message}
                    </small>
                  </div>

                  <FormLabel style={{ marginTop: "10px" }} id="select-city-en">City En</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-city-en"
                    id="select-city-en"
                    value={ceties.location_en}
                    name="cityEnId"

                    {...register('cityEnId', registerOptions.cityEnId)}
                    onChange={handleChangeCityEn}
                  >

                    {

                      ceties.map(c => {
                        return <MenuItem value={c.location_id}>{c.location_en}</MenuItem>
                      })
                    }


                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.cityEnId && errors.cityEnId.message}
                    </small>
                  </div>

                  <FormLabel style={{ marginTop: "10px" }} id="select-city-en">City Ar</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-city-ar"
                    id="select-city-ar"
                    value={ceties.location_ar}
                    name="cityArId"

                    {...register('cityArId', registerOptions.cityArId)}
                    onChange={handleChangeCityAr}
                  >

                    {

                      ceties.map(c => {
                        return <MenuItem value={c.location_id}>{c.location_ar}</MenuItem>
                      })
                    }


                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.cityArId && errors.cityArId.message}
                    </small>
                  </div>
                </Grid>

                <Grid item xs={6} marginBottom={3}>
                  <FormLabel style={{ marginTop: "10px" }} id="select-district">District</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-district"
                    id="select-district"
                    type="text"
                    value={districts.districts}
                    name="districstId"
                    {...register('districtsId', registerOptions.districtsId)}
                    onChange={handleChangeDistrict}
                  >{
                      districts.map(district => {
                        return <MenuItem value={district.districts_id}>{district.districts}</MenuItem>
                      })}</Select>
                  <div>
                    <small className="text-danger">
                      {errors?.districtsId && errors.districtsId.message}
                    </small>
                  </div>
                  <FormLabel style={{ marginTop: "10px" }} id="select-location">Location</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-location"
                    id="select-location"
                    value={locations.location}
                    name="locationId"
                    {...register('locationId', registerOptions.locationId)}
                    onChange={handleChangeLocation}
                  >
                    {
                      locations.map(l => {
                        return <MenuItem value={l.locationId}>{l.location}</MenuItem>
                      })}</Select>
                  <div>
                    <small className="text-danger">
                      {errors?.locationId && errors.locationId.message}
                    </small>
                  </div>
                  <FormLabel style={{ marginTop: "10px" }} id="select-model">Senario</FormLabel>
                  <Select style={{ marginTop: "5px", width: "240px" }}
                    labelId="select-senario"
                    id="select-senario"
                    value={senarios.senario}
                    name="senarioId"
                    {...register('senarioId', registerOptions.senarioId)}
                    onChange={handleChangeSenario}
                  >
                    {
                      senarios.map(s => {
                        return <MenuItem value={s.senario_id}>{s.senario}</MenuItem>
                      })}
                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.senario && errors.senario.message}
                    </small>
                  </div>

                  <FormLabel style={{ marginTop: "10px" }} id="select-model">Model</FormLabel>
                  <Select style={{ width: "240px" }}
                    labelId="select-model"
                    id="select-model"

                    value={models.model}
                    name="modelId"
                    {...register('modelId', registerOptions.modelId)}
                    onChange={handleChangeModel}
                  >
                    {
                      models.map(m => {
                        return <MenuItem value={m.model_id}>{m.model}</MenuItem>
                      })}
                  </Select>
                  <div>
                    <small className="text-danger">
                      {errors?.modelId && errors.modelId.message}
                    </small>
                  </div>
                </Grid>


              </Grid>
              <div className="   ">
                <button className="btn btn-primary ">Submit</button></div>

            </form>
          );
        };
        export default ATMForm;