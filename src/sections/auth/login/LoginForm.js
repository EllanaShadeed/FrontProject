import axios from "axios";// axios is javascrit library allows you to communicate with the api in your react peoject
import * as React from 'react';
import { useState } from 'react';// useState hook allows you to add state to your functional component
import { useNavigate } from 'react-router-dom';// useNavigate is router hook. Same as Link but it can navigate between route programatically, like onSubmit, it will redirect to anoother page
// @mui
import { Stack, IconButton, InputAdornment, TextField, Checkbox, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useForm } from "react-hook-form";

import FormControlLabel from '@mui/material/FormControlLabel';

// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------
// In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.


export default function LoginForm() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
    mode: "onChange",
    defaultValues: {

      username: "",
      password: "",



      isShop: false
    }
  });
  const handleRegistration = (d) => {// function handle login data
   
    postUser(d);

  };
  const handleError = (errors) => { };// function handle validation error 

  const [showPassword, setShowPassword] = useState(false);

  const registerOptions = {
    user_name: {

    },
    password: {

    },
  }

  const postUser = async (d) => {// function take data from form then post it in login api
    const items = {
      userName: d.user_name,
      password: d.password,
    };
    console.log(items);
    const u = await axios.post(`http://localhost:8080/api/v1/auth/authenticate`, items)
   
    if (u?.data?.access_token) {
      localStorage.setItem("token", u.data.access_token)
      navigate('dashboard/app')
    }
  };

  return (
    <>
      <Stack spacing={3}>
        <form onSubmit={handleSubmit(handleRegistration, handleError)}>
          <Grid container spacing={2}>{/* Grid for responsive layout   */}
            <Grid item xs={12} sm={6}>
              <TextField name="user_name"
                label="User Name"
                style={{ margin: "10px", width: "400px" }}
                error={errors?.user_name?.message?.length}
                {...register("user_name", {
                  required: " Please enter your userName",
                  pattern: {

                    message: "Invalid userName "
                  }
                })}

              />
              <span style={{ fontSize: 12, color: 'red', marginLeft: 12 }}>{errors.user_name?.message}</span>

              <br />   <br />


              <TextField
                name="password"
                label="Password"
                style={{ margin: "10px", width: "400px" }}
                error={errors?.password?.message?.length}
                {...register("password", {
                  required: "Please enter your password",

                })}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              /><span style={{ fontSize: 12, color: 'red', marginLeft: 12 }}>{errors.password?.message}</span>
            </Grid>   </Grid>
          <LoadingButton style={{ margin: "10px", width: "400px" }} fullWidth size="large" type="submit" variant="contained">
            Login
          </LoadingButton>
        </form>
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>

        <FormControlLabel control={<Checkbox name="remember" />} variant="body2" sx={{ mb: 5 }} label="Remember me" />

      </Stack>


    </>
  );
}
