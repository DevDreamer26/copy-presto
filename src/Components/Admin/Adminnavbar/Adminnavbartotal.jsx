import * as React from 'react';
import { useState } from 'react';
import { useCookies } from "react-cookie";
import './Adminnavbar.css'
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Axios from "axios";




function Adminnavbartotal() {

  const Navigate = useNavigate()


  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const [cookies, removeCookie] = useCookies([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const logout = async() => {
    try {
      await Axios.post("http://localhost:8000/api/auth/logout", {}, { withCredentials: true });
      // setIsAdminAuthenticated(false);
      setEmail('');
      setPassword('');
      alert('Logged Out')
      window.location.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }

  }


  return (
    <div className='navbar'>
    <AppBar position="static" sx={{ backgroundColor: 'white' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'green', // Change PRESTOCLEAN color to green
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{ textDecoration: "none"}}>PRESTOCLEAN</Link>
          </Typography>


          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="green"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Box display="flex" flexDirection="column" alignItems="center">
                <Link to="/Admin_Dashboardtotal" style={{ textDecoration: 'none' }}>
                  <Button sx={{ color: 'green' }} >Dashboard</Button>
                  </Link>
                  <Link to ="/PendingOrdertotal" style={{ textDecoration: 'none' }}><Button sx={{ color: 'green' }}>Pending</Button></Link>
                  <Link to ="/PickupOrdertotal" style={{ textDecoration: 'none' }}><Button sx={{ color: 'green' }}>Pickup</Button></Link>
                  <Link to ="/ReceiveOrdertotal" style={{ textDecoration: 'none' }}><Button sx={{ color: 'green' }}>Received</Button></Link>
                  <Link to ="/DeliverOrdertotal" style={{ textDecoration: 'none' }}><Button sx={{ color: 'green' }}>Delivered</Button></Link>
                  <Link to ="/TotalOrdertotal" style={{ textDecoration: 'none' }}><Button sx={{ color: 'green' }}>Total</Button></Link>
                </Box>
              </MenuItem>


            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'black', // Change text color to black
              textDecoration: 'none',
            }}
          >
            <Link to="/" style={{ textDecoration: 'none', color:"black" }}>PRESTOCLEAN</Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link to="/Admin_Dashboardtotal" style={{ textDecoration: 'none', color:"black" }}>Dashboard</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link to ="/PendingOrdertotal" style={{ textDecoration: 'none', color:"black" }}>Pending</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link to ="/PickupOrdertotal" style={{ textDecoration: 'none', color:"black" }}>Pickup</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link to ="/ReceiveOrdertotal" style={{ textDecoration: 'none', color:"black" }}>Received</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                <Link to ="/DeliverOrdertotal" style={{ textDecoration: 'none', color:"black" }}>Delivered</Link>
              </Button>
              <Button
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'black', display: 'block' }}
              >
                  <Link to ="/TotalOrdertotal" style={{ textDecoration: 'none', color:"black" }}>Total</Link>
              </Button>
          </Box>
          
          <Button
            variant="outlined"
            onClick={logout}
            sx={{
              color: 'green', // Apply green color to the button text
              borderColor: 'green', // Apply green color to the button border
            }}
          >
            Logout
          </Button>
          
        </Toolbar>
      </Container>
    </AppBar>
    </div>
  );
}
export default Adminnavbartotal;
