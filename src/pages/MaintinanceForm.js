          import * as React from "react";
          import {  useForm } from "react-hook-form";
          import TextField from '@mui/material/TextField';
          import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
          import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
          import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
          import { DatePicker } from '@mui/x-date-pickers/DatePicker';
          import Radio from '@mui/material/Radio';
          import RadioGroup from '@mui/material/RadioGroup';
          import FormControlLabel from '@mui/material/FormControlLabel';

          import { TimePicker } from '@mui/x-date-pickers/TimePicker';
          import Grid from '@mui/material/Grid';
          import MenuItem from '@mui/material/MenuItem';
          import Select from '@mui/material/Select';
          import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
          import dayjs from 'dayjs';
          import {  useEffect } from 'react';
          import { createBrowserHistory } from 'history';
          import FormLabel from '@mui/material/FormLabel';
          import FormControl from '@mui/material/FormControl';
          
          export const history = createBrowserHistory();


            // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.


          const MaintinanceForm = () => {

          const terminal=localStorage.getItem("terminal");
            const BASE_URL = process.env.REACT_APP_BASE_URL;// I declare the base url in .env file and use it in all pages
            const [mtype, setMType] = React.useState([
            ]);
            const handleChangeMaintType = (event) => {
              setMType(event.target.value);
            };// function handle change MaintType value
            const [employee, setEmployee] = React.useState([
            ]);
            const handleChangeEmployee = (event) => {

              setEmployee(event.target.value);

            };// function handle change Employee value
           
            const [mProblem, setMProblem] = React.useState([
            ]);
            
            const handleChangeProblem = (event) => {
            setMProblem(event.target.value);
              
            }// function handle change Maintproblem value
        
            const [data, setData] = React.useState([
            ]);// useState hook allows you to add state to your functional component
            const [maintProblem, setMaintProblem] = React.useState([
            ]);
            const [maintType, setMaintType] = React.useState([
            ]);
            const [maintEmployee, setMaintEmployee] = React.useState([
            ]);
            const getData = async () => {// function to get all MaintType
              const { data } = await axios.get(`${BASE_URL}MaintType/getMaintType`,{ headers: {      'Content-Type': 'application/json',
              Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
                
              })

             
              setMaintType(data);

          };

          const getMaintEmployee = async () => {// function to get all MaintEmployee
            const { data } = await axios.get(`${BASE_URL}maintEmp/getmaintEmp`,{ headers: {      'Content-Type': 'application/json',
            Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
              
            })

            
            setMaintEmployee(data);

          };

          const getMaintProblem = async () => {// function to get all MaintProblem
            const { data } = await axios.get(`${BASE_URL}maintProblem/maintProblem`,{ headers: {      'Content-Type': 'application/json',
            Accept: 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}` } },{
              
            })

           
          setMaintProblem(data);

          };
            useEffect(() => {
              getData();
              getMaintProblem();
              getMaintEmployee();
            }, []);// useEffect hook allows you to run side effects in your functional components
          
            const { register, handleSubmit, formState: { errors } } = useForm();// useForm is the custom hook to manage form ease
            const handleRegistration = (d) => {
              
          
              postMaintinace(d);
            
              console.log(errors);
            };

            const handleError = (errors) => { };
            const today = dayjs();
            const currentDate=today.format('YYYY-MM-DD');
            const [startTime, setStartTime] = React.useState();
            const st=dayjs(startTime).format('hh:mm:ss');
            const [EndTime, setEndTime] = React.useState();
            const et=dayjs(EndTime).format('hh:mm:ss');
          const [EndDate,setEndDate]=React.useState();
          const ENDDate=dayjs(EndDate).format('YYYY-MM-DD');
          const [StartDate,setStartDate]=React.useState();
          const STARTDate=dayjs(StartDate).format('YYYY-MM-DD');
            const registerOptions = {// this object to make validation data entered by form
              maint_id: {
                required: "Maintinace Id  is required",
              
                pattern: {
                  value: /[0-9]/,
                  message: "Maintinace must be number"
                }
              },
              
              
              description: {
                required: "Description is required",
            
              },
              startTime:{
                value:startTime,
                required: "StartTime is required",
                
              },
            endTime:{
                required: "EndTime is required",
                value:EndTime
              },
              currentDate: {

                required: "Current Date is required",
                value: currentDate


              },
              endDate:{
                required: "End Date is required",
                value:ENDDate,
              },
              startDate:{
                required: "Start Date is required",
                value:STARTDate,
              },
              maintTypeId:{
                required: "Maintinace Type Id  is required",
              },
              employeeId:{
                required: "Employee Id  is required",
              },
              problemId:{
                required: "Problem Id  is required",
              },
              
              MT:{

              },
              status:{

              },
              MaintReason:{

              },
            

            };
          

            
            
          
            
            const postMaintinace =async (d) => {// this function to take data from form and insert it into items object and then post this maintinance
             
          d.startTime=st;
          d.endTime=et;
          const DateTimeStartMaint=`${d.startDate}-${d.startTime}`;
          const DateTimeEndMaint=`${d.endDate}-${d.endTime}`;
          const items = {
          id:d.maint_id,
          curentDate:d.currentDate,
          typeFlag:d.MT,
          description:d.description,
          status:d.status,
          startTime:DateTimeStartMaint,
          endTime:DateTimeEndMaint,
          terId:terminal,
          typeId:d.maintTypeId,
          empId:d.employeeId,
          problemId:d.problemId,
          maintreason:d.MaintReason,
          };
          axios.defaults.headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }

          await axios.post(`${BASE_URL}maintenance/addTerminal`, { ...items })
            .then(response => {
              console.log('Response', response.data)

            })
            .catch(e => {
              console.log('Error: ', e.response.data)
            })




            }
          
            return (
              <form onSubmit={handleSubmit(handleRegistration, handleError)} >
                < TextField style={{ margin: "10px", width: "500px" }} id="maint_id" label="Maintinance Id" type="text" name="maint_id"  {...register('maint_id', registerOptions.maint_id)} />
                <div>
                  <small className="text-danger">
                    {errors?.main_id && errors.main_id.message}
                  </small>
                </div>
                < TextField style={{ margin: "10px", width: "500px" }} id="description" label="Description" type="text" name="description"  {...register('description', registerOptions.description)} />
                <div>
                  <small className="text-danger">
                    {errors?.description&& errors.description.message}
                  </small>
                </div>
                <br />
                <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">Maintinance Type</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="MT"
                  defaultValue={0}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Hardware" {...register('MT', registerOptions.MT)}/>
                  <FormControlLabel value="0" control={<Radio />} label="Software" {...register('MT', registerOptions.MT)}/>
                </RadioGroup>
              </FormControl>

              <FormControl style={{marginLeft:"25px"}}>
                <FormLabel id="demo-row-radio-buttons-group-label">Status</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="status"
                  defaultValue={0}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Active"{...register('status', registerOptions.status)} />
                  <FormControlLabel value="0" control={<Radio />} label="NotActive" {...register('status', registerOptions.status)}/>
                
                  
                </RadioGroup>
              </FormControl>
              <br/>
              <br/>
              <FormControl >
                <FormLabel id="demo-row-radio-buttons-group-label">Maintnance Reason</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="MaintReason"
                  defaultValue={0}
                >
                  <FormControlLabel value="1" control={<Radio />} label="Periodic"{...register('MaintReason', registerOptions.MaintReason)} />
                  <FormControlLabel value="0" control={<Radio />} label="Emergency" {...register('MaintReason', registerOptions.MaintReason)}/>
                
                  
                </RadioGroup>
              </FormControl>
                <br />
                <br/>
                <Grid container spacing={2}>
                  <Grid item xs={6} marginBottom={3}>


                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker value={today}  label="Maintinance Current Date"
                          slotProps={{
                            textField: {

                              name:'currentDate'

                            },
                            ...register('currentDate', registerOptions.currentDate)
                          }}

                        />
                      </DemoContainer>
                    </LocalizationProvider>
                    <div>
                      <small className="text-danger">
                        {errors?.currentDate && errors.currentDate.message}
                      </small>
                    
                    
                    </div>
          <br/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker  label="Maintinance End Date"value={EndDate} onChange={(EndDate) => setEndDate(EndDate)}
                          slotProps={{
                            textField: {

                              name:'endDate'

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

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['TimePicker']}>
                  <TimePicker label="End Time" value={EndTime} onChange={(newendTime) =>setEndTime(newendTime)}
                  slotProps={{
                    textField: {

                      name: 'endTime'
                    },
                    ...register('endTime', registerOptions.endTime)
                  }}
                  
                  />
                </DemoContainer>

              </LocalizationProvider>
              <div>
                      <small className="text-danger">
                        {errors?.endTime && errors.endTime.message}
                      </small>
                    
                    
                    </div>
                  </Grid>
                  <Grid item xs={6} >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker  label="Maintinance Start Date"value={StartDate} onChange={(StartDate) => setStartDate(StartDate)}
                          slotProps={{
                            textField: {

                              name:'startDate'

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
                <DemoContainer components={['TimePicker']}>
                  <TimePicker label="Start Time" value={startTime} onChange={(newstartTime) => setStartTime(newstartTime)}
                  slotProps={{
                    textField: {

                      name: 'startTime'
                    },
                    ...register('startTime', registerOptions.startTime)
                  }}
                  
                  
                  />
                </DemoContainer>

              </LocalizationProvider>
              <div>
                      <small className="text-danger">
                        {errors?.startTime && errors.startTime.message}
                      </small>
                    
                    
                    </div>

                    
                
                  </Grid>
                </Grid>
                <br/>
                <Grid container spacing={2}>
                  <Grid item xs={6} marginBottom={3}>
                    <FormLabel style={{ marginTop: "10px" }} id="select-type">Maintinance Type</FormLabel>
                    <Select style={{ marginTop: "5px", width: "240px" }}
                      labelId="select-type"
                      id="select-type"
                      value={maintType.mainTypeName}
                      name="typeId"

                      {...register('maintTypeId', registerOptions.maintTypeId)}
                      onChange={handleChangeMaintType}
                    >

                      {

          maintType.map(type => {
                          return <MenuItem value={type.mainTypeID}>{type.mainTypeName}</MenuItem>
                        })
                      }


                    </Select>
                    <div>
                      <small className="text-danger">
                        {errors?.maintTypeId && errors.maintTypeId.message}
                      </small>
                    </div>
                    <FormLabel style={{ marginTop: "10px" }} id="select-employee">Maintinance Employee</FormLabel>
                    <Select style={{ marginTop: "5px", width: "240px" }}
                      labelId="select-employee"
                      id="select-employee"
                      value={maintEmployee.employeeName}

                      name="employeeId"
                      {...register('employeeId', registerOptions.employeeId)}


                      onChange={handleChangeEmployee}
                    >
                      {

                        maintEmployee.map(employee => {
                          return <MenuItem value={employee.empId}>{employee.employeeName}</MenuItem>
                        })
                      }
                    </Select>
                    <div>
                      <small className="text-danger">
                        {errors?.employeeId && errors.employeeId.message}
                      </small>
                    </div>
                  

                  
                    
                    
                  
                  </Grid>

                  <Grid item xs={6} marginBottom={3}>
                    <FormLabel style={{ marginTop: "10px" }} id="select-problem">Maintinance Problem</FormLabel>
                    <Select style={{ marginTop: "5px", width: "240px" }}
                      labelId="select-problem"
                      id="select-problem"
                      type="text"
                      value={maintProblem.name_problem}
                      name="problemId"
                      {...register('problemId', registerOptions.problemId)}
                      onChange={handleChangeProblem}
                    >{
                      maintProblem.map(problem => {
                          return <MenuItem value={problem.problem_id}>{problem.name_problem}</MenuItem>
                        })}</Select>
                    <div>
                      <small className="text-danger">
                        {errors?.problemId && errors.problemId.message}
                      </small>
                    </div>
                    
                  
                    
                  </Grid>


                </Grid>
                <div className="   ">
                  <button className="btn btn-primary ">Submit</button></div>

              </form>
            );
          };
          export default MaintinanceForm;