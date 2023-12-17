  import { Helmet } from 'react-helmet-async';
  // @mui
  import { styled } from '@mui/material/styles';
  import { Link, Container, Typography, Divider, Stack, Button } from '@mui/material';
  // hooks
  import useResponsive from '../hooks/useResponsive';
  // components
  import Logo from '../components/logo';
  
  import SignupForm from '../sections/auth/login/SignupForm';

  // ----------------------------------------------------------------------


  // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.

  
  const StyledRoot = styled('div')(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  }));

  const StyledSection = styled('div')(({ theme }) => ({
    width: '100%',
    maxWidth: 480,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    boxShadow: theme.customShadows.card,
    backgroundColor: theme.palette.background.default,
  }));

  const StyledContent = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: theme.spacing(12, 0),
  }));

  // ----------------------------------------------------------------------

  export default function SignUpp() {
    const mdUp = useResponsive('up', 'md');

    return (
      <>
        <Helmet>
          <title> Login | E-Channels </title>
        </Helmet>

        <StyledRoot>
          <Logo
            sx={{
              position: 'fixed',
              top: { xs: 16, sm: 24, md: 40 },
              left: { xs: 16, sm: 24, md: 40 },
            }}
          />

          {mdUp && (
            <StyledSection>
            
              <img src="/assets/ech.png" alt="login" width={2000} height={500} />
            </StyledSection>
          )}

          <Container maxWidth="sm">
            <StyledContent>
              <Typography  gutterBottom component="h1" variant="h5 " sx={{ ml: 15 }}>
                Sign Up
              </Typography>

              <Typography variant="body2" sx={{ ml: 11 }}>
              Already have an account? 
              <Link href="/LoginPages" variant="body2">
              Sign in 
                  </Link>
              </Typography>
              <br/>
            

              

              <SignupForm />
            </StyledContent>
          </Container>
        </StyledRoot>
      </>
    );
  }
