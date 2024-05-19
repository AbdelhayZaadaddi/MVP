import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close'; // Import the CloseIcon
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FilterFramesIcon from '@mui/icons-material/FilterFrames';


const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className='flex bg-slate-400 justify-between'>
      <div className='mx-2'>
        {open ? (
          <CloseIcon
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClose}
            className='mt-1 mx-3'
            fontSize="large"
          />
        ) : (
          <MenuIcon
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            className='mt-1 mx-3'
            fontSize="large"
          />
        )}
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
          PaperProps={{
            sx: {
              width: '25vw', // Set the width to 25% of the viewport width
              height: '100vh', // Set the height to 100% of the viewport height
            },
          }}
          className='mt-4 '
        >
          <Link to='/profile/' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>
            <AccountBoxIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Profile</h6>
          </Link>

          <Link to='/' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeaturedVideoIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Products</h6>
          </Link>

          <Link to='/bonus' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>
            <FeaturedVideoIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Bonus</h6>
          </Link>

          <Link to='product/create/' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>  
            <AddCircleIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Create Product</h6>
          </Link>

          <Link to='/create/bonnus' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>  
            <AddIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Create Bonnus</h6>
          </Link>

          <Link to='/cart' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>  
            <ShoppingCartIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Cart</h6>
          </Link>


          <Link to='/orders' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>  
            <FilterFramesIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Orders</h6>
          </Link>


          <Link to='/logout' className='flex  justify-center md:justify-start hover:bg-slate-200 mb-2 p-2' style={{ textDecoration: 'none', color: 'inherit' }}>    
            <LogoutIcon className='mx-2'/>
            <h6 className='hidden md:flex'>Logout</h6>
          </Link>

        </Menu>
      </div>

      <Link to={'/cart'} className='mx-3 mt-1' style={{ textDecoration: 'none', color: 'inherit' }}><ShoppingCartIcon  fontSize="large"/></Link>
    </div>
  );
}

export default Navbar;
