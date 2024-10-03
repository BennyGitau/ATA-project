import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { userAuth } from '../../Context/Auth';

const Login = () => {
    const [formData, setFormData] = useState({ 
        email: "", 
        password: "" 
    });
    const { handleLogin } = userAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your email"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            placeholder="Enter your password"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        Login
                    </button>
                </form>
                <div className="mt-4 mb-4 text-left">
                    <a href="/reset_password" className="text-green-500 hover:text-green-700">
                        Forgot your password?
                    </a>
                </div>
            <Link to="/register" className="text-red-500 hover:text-red-700">
                Don't have an account? Register
            </Link>
            </div>
        </div>
    );
};

export default Login;
