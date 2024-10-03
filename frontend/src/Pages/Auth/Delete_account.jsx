const deleteAccount = async () => {
    const token = localStorage.getItem('authToken'); // Retrieve token (or session) if needed for authentication

    try {
        const response = await fetch('http://your-backend-url/api/delete_account/', {
            method: 'DELETE',
            headers: {
                'Authorization': `Token ${token}`, // Pass token if required for authentication
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 204) {
            // Successfully deleted, clear local storage and redirect
            localStorage.removeItem('authToken');
            window.location.href = '/goodbye'; // Redirect to some "goodbye" or homepage
        } else {
            // Handle error (e.g., show error message)
            const data = await response.json();
            console.error(data.error);
        }
    } catch (error) {
        console.error('Error deleting account:', error);
    }
};
