import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
import * as React from 'react';
import { useState } from 'react';// useState hook allows you to add state to your functional component
import { useNavigate } from 'react-router-dom';// useNavigate is router hook. Same as Link but it can navigate between route programatically, like onSubmit, it will redirect to anoother page
// @mui
import { TextField, Grid } from '@mui/material';

import { useForm } from "react-hook-form";// useForm is the custom hook to manage form ease


import Button from '@mui/material/Button';
import {  createTheme,ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';



// component


// In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

export default function SignupForm() {
    const navigate = useNavigate();
    const defaultTheme = createTheme();
  
    const { register, handleSubmit, watch,formState: { errors , dirtyFields} } = useForm({
      mode: "onChange",
      defaultValues: {
        firstname: "",
        lastname: "",
        username: "",
        password: "",
        confirmPassword: "",
      
        
        isShop: false
      }
    });
    // function to handle data entered form 
    const handleRegistration = (d) => {
     
      
      postUser(d);
  
    };
    const handleError = (errors) => {};// function handle validation error when entered data in the form
   
  
    const [showPassword, setShowPassword] = useState(false);
  
    const registerOptions = {
        firstName: { 
    
        },
        lastName: {
    
        },
        username:{
    
        },
        password:{
          
        },
        
        confirmPassword:{

        },
    
      }
  
      const postUser = async (d) => {// function take data from form then register this user by use register api
        const items = {
          firstname: d.firstName,
          lastname : d.lastName,
          userName : d.username,
          password : d.password,
          confirmPassword: d.password,
     };
    
     const u=  await axios.post(`http://localhost:8080/api/v1/auth/register`, items)
     console.log(u.data.access_token);
     if(u?.data?.access_token){
     localStorage.setItem("token",u.data.access_token)
        navigate('dashboard/app')
     }
       };
       
    return (
      <>
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box  
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
        
          <Box component="form" noValidate onSubmit={handleSubmit(handleRegistration, handleError)} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                 
                  error={errors?.firstName?.message?.length}
                  autoFocus
                  {...register("firstName", {
                    required: "Please enter your first Name",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Invalid first Name "
                    }
                  })}
      
                />
                <span style={{fontSize:12,color:'red',marginLeft:4}}>{errors.firstName?.message}</span>

              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={errors?.lastName?.message?.length}
                  autoFocus
                  {...register("lastName", {
                    required: "Please enter your last Name",
                    pattern: {
                      value: /^[a-zA-Z]+$/,
                      message: "Invalid last Name "
                    }
                  })}

                 
                />
                  <span style={{fontSize:12,color:'red',marginLeft:4}}>{errors.lastName?.message}</span>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="user-name"
                  error={errors?.username?.message?.length}
                  autoFocus
                  {...register("username", {
                    required: "Please enter your userName",
                    pattern: {
                     
                      message: "Invalid userName "
                    }
                  })}
                /> 
                <span style={{fontSize:12,color:'red',marginLeft:4}}>{errors.username?.message}</span>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
      
                  id="password"
                  error={errors?.password?.message?.length}
                  autoComplete="new-password"
                  {...register("password", { 
                    required: "Please enter your password",
                
                  })}
                  
                /><span style={{fontSize:12,color:'red',marginLeft:4}}>{errors.password?.message}</span>
              </Grid>

            
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="confirm Password"
                  type="confirm Password"
                  id="confirmPassword"
                  error={errors?.confirmPassword?.message?.length}

                  autoComplete="confirm-Password"
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: (value) => value === watch("password") || "Password do not match"
                  })}
                />
                <span style={{fontSize:12,color:'red',marginLeft:4}}>{errors.confirmPassword?.message}</span>

              </Grid>
             
            
            </Grid>
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  
      </>
    );
  }
  