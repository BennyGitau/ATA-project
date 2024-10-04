import { useState } from 'react';
import { userAuth } from '../../Context/Auth';
import { Link } from 'react-router-dom';

function Register() {
  const [formData, setFormData] = useState({
    role: 'individual', // default to individual
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirm: '',
    company_name: '',
  });

  const [error, setError] = useState('');
  const { handleRegister, registerMessage, user } = userAuth();

  // Handle change for all input fields
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate based on role
    if (formData.role === 'individual') {
      if (!formData.firstname || !formData.lastname || !formData.email || !formData.password || !formData.password_confirm) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
      if (formData.password !== formData.password_confirm) {
        setError('Passwords do not match.');
        return;
      }
    } else {
      if (!formData.company_name || !formData.email || !formData.password) {
        setError('Please fill in all fields.');
        return;
      }
      if (formData.password.length < 8) {
        setError('Password must be at least 8 characters long.');
        return;
      }
    }

    // Call the registration function
    await handleRegister(formData);
    
    // Clear form fields after submission
    setFormData({
      role: 'individual',
      firstname: '',
      lastname: '',
      email: '',
      password: '',
      password_confirm: '',
      company_name: '',
    });
  };

  return (
    <div className="max-w-md mx-auto h-screen my-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {registerMessage && <p className="mt-4 text-green-500">{registerMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium">Select Level</label>
          <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
            <option value="individual">Individual</option>
            <option value="org_consumer">Organization</option>
            <option value="org_provider">Service Provider</option>
          </select>
        </div>

        {formData.role === 'individual' ? (
          <>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">First Name</label>
              <input
                type="text"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Last Name</label>
              <input
                type="text"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Personal Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Company Name</label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                placeholder="Company Name"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Organization Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Organization Email"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium">Confirm Password</label>
              <input
                type="password"
                name="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                placeholder="Confirm Password"
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          </>
        )}

        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Register
        </button>
      </form>
      <Link to="/login">
      <h2 className='text-green-500 text-sm mt-4 hover:text-green-600'>Already have an Account? Login</h2>
      </Link>
    </div>
  );
}

export default Register;

