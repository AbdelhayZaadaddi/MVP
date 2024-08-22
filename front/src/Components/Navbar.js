import React from 'react';
import { Link } from 'react-router-dom';
import { List, ListItem, ListItemIcon } from '@mui/material';
import AppsIcon from '@mui/icons-material/Apps';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import RoleBasedComponent2 from '../utils/RoleBasedComponent2'; // Adjusted path
import { useAuth } from '../utils/AuthContext'; // Adjusted path

const Navbar = () => {
    const navigate = useNavigate();
    const { role } = useAuth();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        navigate('/login');
    };

    return (
        <div className='sidebar'>
            <List>
                <ListItem className='logo'>
                    <h1 className='logo-text'></h1>
                </ListItem>

                <RoleBasedComponent2 roles={['admin', 'trader', 'company', 'employee']}>
                    <Link to='/' className='menu-item'>
                        <ListItem button>
                            <ListItemIcon>
                                <AppsIcon style={{ fontSize: 20 }} />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </RoleBasedComponent2>

                <RoleBasedComponent2 roles={['admin', 'trader', 'company', 'employee']}>
                    <Link to='/orders' className='menu-item'>
                        <ListItem button>
                            <ListItemIcon>
                                <FilterFramesIcon style={{ fontSize: 20 }} />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </RoleBasedComponent2>

                <RoleBasedComponent2 roles={['admin', 'trader', 'company', 'employee']}>
                    <Link to='/cart' className='menu-item'>
                        <ListItem button>
                            <ListItemIcon>
                                <ShoppingCartIcon style={{ fontSize: 20 }} />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </RoleBasedComponent2>

                <RoleBasedComponent2 roles={['admin', 'company', 'trader']}>
                    <Link to='/setting' className='menu-item'>
                        <ListItem button>
                            <ListItemIcon>
                                <SettingsIcon style={{ fontSize: 20 }} />
                            </ListItemIcon>
                        </ListItem>
                    </Link>
                </RoleBasedComponent2>
				<div className='gab'></div>
                <div className='menu-item' onClick={handleLogout}>
                    <ListItem button>
                        <ListItemIcon>
                            <LogoutIcon style={{ fontSize: 20 }} />
                        </ListItemIcon>
                    </ListItem>
                </div>
            </List>
        </div>
    );
};

export default Navbar;
