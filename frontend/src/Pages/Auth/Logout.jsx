const handleLogout = () => {
    // Clear local storage or session data
    localStorage.removeItem('authToken');

    // Optionally, redirect to the login page or homepage
    window.location.href = '/login';
};
