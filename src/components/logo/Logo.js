import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';
import { Block, Title } from '@mui/icons-material';
import Typography from '@mui/material/Typography';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;

  const PRIMARY_MAIN = theme.palette.primary.main;

  const PRIMARY_DARK = theme.palette.primary.dark;

  // OR using local (public folder)
  // -------------------------------------------------------
  const logo = (
    <div >
      <Box

        component="img"

        src="https://yt3.ggpht.com/a/AATXAJwE8tha8hGpN_kpoCe7B9ahB0iFTew18je-=s900-c-k-c0xffffffff-no-rj-mo"
        sx={{ width: 50, height: 50,display:'inline-block', cursor: 'pointer', ...sx }}


      />
      <Typography sx={{ px: 1 }} variant="h6" display='inline-block' component="h6" color={'black'} align='right'> Quds bank </Typography>

    </div>
    
  );



  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="#" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
