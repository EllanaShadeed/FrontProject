        import { Helmet } from 'react-helmet-async';

        import { styled } from '@mui/material/styles';
        import { Link, Container, Typography } from '@mui/material';
      
        import useResponsive from '../hooks/useResponsive';//  you can retrieve the responsive infomation of the browser page and subscribe to it at the same time.
      
        import Logo from '../components/logo';
        
        import { LoginForm } from '../sections/auth/login';
        
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

  // In all project use mui ---Material UI is a library of React UI components that implements Google's Material Design.


        export default function LoginPage() {
          const mdUp = useResponsive('up', 'md');

          return (
            <>
              <Helmet>
                <title> Login | Quds App </title>
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
                    <Typography gutterBottom component="h1" variant="h5 " sx={{ ml: 15 }}>
                      Sign In
                    </Typography>

                    <Typography variant="body2" sx={{ ml: 11 }}>
                      Don’t have an account? {''}
                      <Link href='/SignUpp' variant="subtitle2">Sign Up </Link>
                    </Typography>
                    <br />

                    <LoginForm />
                  </StyledContent>
                </Container>
              </StyledRoot>
            </>
          );
        }
