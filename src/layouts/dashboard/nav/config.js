// component
import AcUnitIcon from '@mui/icons-material/AcUnit';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AtmIcon from '@mui/icons-material/Atm';
import ListIcon from '@mui/icons-material/List';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import PeopleIcon from '@mui/icons-material/People';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';
import TextureIcon from '@mui/icons-material/Texture';
import ErrorIcon from '@mui/icons-material/Error';
import ApartmentIcon from '@mui/icons-material/Apartment';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

import SvgColor from '../../../components/svg-color';
// ----------------------------------------------------------------------



const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: <DashboardIcon />

  },
  {
    title: 'ATM Info',
    path: '/dashboard/atminfo',
    icon: <AtmIcon />,
    children: [{
      title: 'Branch',
      path: '/dashboard/branch',
      icon: <ListIcon />,
    },
    {
      title: 'Districts',
      path: '/dashboard/districts',
      icon: <LocationCityIcon />,
    },
    {
      title: 'Senario',
      path: '/dashboard/senario',
      icon: <AutoAwesomeMotionIcon />,


    },

    {
      title: 'Vendor',
      path: '/dashboard/vendor',
      icon: <PeopleIcon />,


    },
    {
      title: 'Host',
      path: '/dashboard/host',
      icon: <ConfirmationNumberIcon />,
    },
    {
      title: 'Location',
      path: '/dashboard/location',
      icon: <LocationOnIcon />,
    },
    {
      title: 'Model',
      path: '/dashboard/model',
      icon: <ViewKanbanIcon />,
    },
    {
      title: 'Service',
      path: '/dashboard/service',
      icon: <MiscellaneousServicesIcon />,
    },
    {
      title: 'Journal',
      path: '/dashboard/journal',
      icon: <InsertDriveFileIcon />,


    },
    ]
  },

  {
    title: 'ATM Maintinace',
    path: '/dashboard/maintinace',
    icon: <BuildCircleIcon/>,
    children:[{
        title: 'Maintinace Type',
        path: '/dashboard/maint_type',
        icon: <TextureIcon/>,
    },
    {
      title: 'Maintinace Employee',
      path: '/dashboard/maint_emp',
      icon: <PeopleIcon />,
    },
    {
      title: 'Maintinace Problem',
      path: '/dashboard/maint_problem',
      icon: <ErrorIcon />,


    },
    {
      title: 'Maintinace Comany',
      path: '/dashboard/maint_company',
      icon: <ApartmentIcon />,


    },


    ]
  },

];

export default navConfig;
