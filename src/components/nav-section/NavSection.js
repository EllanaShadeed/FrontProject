import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// @mui
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};

export default function NavSection({ data = [], ...other }) {
  return (
    <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item}  />
        ))}
      </List>
    </Box>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.object,
};

function NavItem({ item }) {
  const { title, path, icon, info ,children} = item;


if(children?.length){
  return children.map((it,index) => (
    <>
   

    {index===0?<StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: '#637381',
          bgcolor: 'action.selected',
          fontWeight: '',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>:null}
    <StyledNavItem
      component={RouterLink}
      style={{paddingLeft:24}}
      to={it.path}
      sx={{
        '&.active': {
          color: '#637381',
          bgcolor: 'action.selected',
          fontWeight: '',
        },
      }}
    >
      <StyledNavItemIcon>{it.icon && it.icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={it.title} />

      {info && info}
    </StyledNavItem>
    </>
  ))
}


  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>

      <ListItemText disableTypography primary={title} />

      {info && info}
    </StyledNavItem>
  );
}
