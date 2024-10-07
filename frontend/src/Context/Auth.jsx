import React, { createContext, useState, useContext, useEffect, usememo } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

const UserContext = createContext();
export const userAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registerMessage, setRegisterMessage] = useState('');
    const [passwordResetMessage, setPasswordResetMessage] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);    
    const [flights, setFlights] = useState([]);


    const handleRegister = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/register/', data)
            if (response.status === 201) {
                setRegisterMessage('Registration successful! Please check your email for verification.');
                setLoading(false);
            } else {
                setRegisterMessage('Registration failed.' + response.data.error);
                setLoading(false);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.error, {theme: "colored", autoClose: 3000});
            setLoading(false);
        }
    }

    const navigate = useNavigate();
    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', data);
            console.log(response)
            if(response.status === 200) {
                setUser(response.data.user);
                setLoading(false);
                setIsLoggedIn(true);
                navigate('/');
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('refreshToken', response.data.refresh);
                toast.success('Login successful!', {theme: "colored", autoClose: 3000});
                console.log(response.data);

            } else {
                setLoading(false);
                console.log(response.data.error);
            }
        } catch (error) {
            console.error('Error logging in:',error);
            setLoginMessage(error.response.data.error);
            console.log(loginMessage);
            setLoading(false);
        }
    }

    const passwordReset = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/password_reset/', data);
            setPasswordResetMessage(response.data.message);
            setLoading(false);
        } catch (error) {
            setPasswordResetMessage(error.response.data.error);
            console.error(error);
            setLoading(false);
        }
    }
    
    const handleLogout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/logout/', {refresh: localStorage.getItem('token')});
            localStorage.removeItem('authToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
            setLoading(false);
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const deleteAccount = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/api/delete_account/');
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const updateProfile = async (data) => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/api/profile/', data);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    
    const getProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/profile/');
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    const [passwordChangeMsg, setPasswordChangeMsg] = useState('');
    const updatePassword = async (data) => {
        try {
            const response = await axios.patch('http://127.0.0.1:8000/api/profile/', data);
            setPasswordChangeMsg(response.data.message);
            setLoading(false);
        } catch (error) {
            setPasswordChangeMsg(error.response.data.error);
            console.error(error);
            setLoading(false);
        }
    }

    //flight search
    async function searchFlights(formData) {
        try {
            const response = await axios.post('http://localhost:8000/flights/', formData);
            setFlights(response.data.flights);
            console.log(response.data.flights);
        } catch (error) {
            console.error('Error: ' + error.message);
        } 
    }

    useEffect(() => {
        getProfile();
    }, []);
    return (
        <UserContext.Provider value={{ 
            user, 
            loading,
            registerMessage,
            passwordResetMessage,
            loginMessage,
            passwordChangeMsg,
            isLoggedIn,
            flights,
            searchFlights,
            updatePassword,
            passwordReset,
            handleRegister,
            handleLogin,
            handleLogout,
            deleteAccount,
            updateProfile,
            getProfile
            }}>
            {children}
        </UserContext.Provider>
    );
}
