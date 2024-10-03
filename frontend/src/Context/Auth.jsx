import React, { createContext, useState, useContext, useEffect, usememo } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Cookies from "js-cookie";

const UserContext = createContext();
export const userAuth = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [registerMessage, setRegisterMessage] = useState('');
    const [passwordResetMessage, setPasswordResetMessage] = useState('');

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

    const handleLogin = async (data) => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/login/', data);
            console.log(response)
            if(response.status === 200) {
                setUser(response.data.user);
                setLoading(false);
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('refreshToken', response.data.refresh);
                toast.success('Login successful!', {theme: "colored", autoClose: 3000});
                console.log(response.data);
            } else {
                toast.error(response.data.error, {theme: "colored", autoClose: 3000});
                setLoading(false);
            }
        } catch (error) {
            console.error('Error logging in:',error);
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
            const response = await axios.post('http://127.0.0.1:8000/logout/');
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const deleteAccount = async () => {
        try {
            const response = await axios.delete('http://127.0.0.1:8000/delete_account/');
            setUser(null);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    const updateProfile = async (data) => {
        try {
            const response = await axios.put('http://127.0.0.1:8000/update_profile/', data);
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }
    
    const getProfile = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/get-user/');
            setUser(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfile();
    }, [user]);
    return (
        <UserContext.Provider value={{ 
            user, 
            loading,
            registerMessage,
            passwordResetMessage,
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
