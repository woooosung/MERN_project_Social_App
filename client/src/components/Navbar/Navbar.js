import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './styles.js';
import memories from '../../images/memories.png';
import decode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { LOGOUT } from '../../constants/actionTypes.js';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const location = useLocation();

    useEffect(() => {
         const token = user?.token;
         
         if (token) {
            const decodedToken = decode(token);

            if(decodedToken.exp * 1000 < new Date().getTime()) logout();
         }
         setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]); 

    const logout = () => {
        dispatch({ type : LOGOUT});

        window.location.reload();
        setUser(0);
    };
 
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <div className={classes.brandContainer}>
                <Typography component ={Link} to="/" className={classes.heading} variant="h2" align="center">Memories</Typography>
                <img className={classes.image} src={memories} alt="memories" height="60" />
            </div>
            <Toolbar className={classes.toolbar}>
                { user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.picture}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar