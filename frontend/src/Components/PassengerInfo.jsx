import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PassengerInfo = () => {
  const [savedDocuments, setSavedDocuments] = useState([]);

  useEffect(() => {
    // Fetch saved documents from the database (replace with actual API call)
    const fetchSavedDocuments = async () => {
      try {
        const response = await axios.get('/api/saved-documents');
        setSavedDocuments(response.data.documents);
      } catch (error) {
        console.error('Error fetching saved documents:', error);
      }
    };

    fetchSavedDocuments();
  }, []);

  const createEmptyPassenger = () => ({
    firstName: '',
    lastName: '',
    gender: '',
    email: '',
    documentType: '',
    birthPlace: '',
    issuanceLocation: '',
    issuanceDate: '',
    docNumber: '',
    expiryDate: '',
    issuanceCountry: '',
    validityCountry: '',
    nationality: '',
    deviceType: '',
    countryCallingCode: '',
    phoneNumber: '',
    selectedDocument: '',
  });
const [passengers, setPassengers] = useState([createEmptyPassenger()]);


  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPassengers = passengers.map((passenger, idx) => 
      idx === index ? { ...passenger, [name]: value } : passenger
    );
    setPassengers(updatedPassengers);
  };

  const addPassenger = () => {
    setPassengers([...passengers, createEmptyPassenger()]);
  };

  const removePassenger = (index) => {
    setPassengers(passengers.filter((_, idx) => idx !== index));
  };

  return (
    <div className="w-full max-w-4xl mx-auto ">
      <h2 className="text-2xl font-semibold text-center mb-2">Passenger Information</h2>
      {passengers && passengers.map((passenger, index) => (
        <div key={index} className="px-4 mb-4 space-y-4">
          <h3 className="text-lg font-semibold">Passenger {index + 1}</h3>
          
          {/* Select saved document or fill new details */}
          <div className="flex flex-col space-y-2">
            <label htmlFor={`savedDocument-${index}`} className="font-semibold">Select Saved Document or</label>
            <select
              id={`savedDocument-${index}`}
              name="selectedDocument"
              className="border border-gray-300 rounded-md p-2"
              value={passenger.selectedDocument}
              onChange={(e) => handleInputChange(index, e)}
            >
              <option value="">-- Select Saved Document --</option>
              {savedDocuments && savedDocuments.map((doc, docIdx) => (
                <option key={docIdx} value={doc.id}>
                  {doc.documentType} - {doc.docNumber} ({doc.firstName} {doc.lastName})
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Personal Info */}
            <div className="flex flex-col">
              <input
                type="text"
                id={`firstName-${index}`}
                placeholder='First Name'
                name="firstName"
                value={passenger.firstName}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`lastName-${index}`}
                name="lastName"
                placeholder='Last Name(Surname)'
                value={passenger.lastName}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id={`gender-${index}`}
                name="gender"
                placeholder='Gender'
                value={passenger.gender}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="email"
                id={`email-${index}`}
                name="email"
                placeholder='Email Address'
                value={passenger.email}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id={`nationality-${index}`}
                name="nationality"
                placeholder='Nationality'
                value={passenger.nationality}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`documentType-${index}`}
                name="documentType"
                placeholder='Document Type'
                value={passenger.documentType}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`docNumber-${index}`}
                name="docNumber"
                placeholder='Document Number'
                value={passenger.docNumber}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <input
                type="text"
                id={`validityCountry-${index}`}
                name="validityCountry"
                placeholder='Validity Country'
                value={passenger.validityCountry}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`issuanceDate-${index}`}>Issuance Date</label>
              <input
                type="date"
                id={`issuanceDate-${index}`}
                name="issuanceDate"
                placeholder='Issuance Date'
                value={passenger.issuanceDate}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor={`expiryDate-${index}`}>Expiry Date</label>
              <input
                type="date"
                id={`expiryDate-${index}`}
                name="expiryDate"
                placeholder='Expiry Date'
                value={passenger.expiryDate}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`birthPlace-${index}`}
                name="birthPlace"
                placeholder='Birth Place'
                value={passenger.birthPlace}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`issuanceLocation-${index}`}
                name="issuanceLocation"
                placeholder='Issuance Location'
                value={passenger.issuanceLocation}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`issuanceCountry-${index}`}
                name="issuanceCountry"
                placeholder='Issuance Country'
                value={passenger.issuanceCountry}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>



   

            <div className="flex flex-col">
              <input
                type="text"
                id={`deviceType-${index}`}
                name="deviceType"
                placeholder='Device Type'
                value={passenger.deviceType}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`countryCallingCode-${index}`}
                name="countryCallingCode"
                placeholder='Country Calling Code'
                value={passenger.countryCallingCode}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex flex-col">
              <input
                type="text"
                id={`phoneNumber-${index}`}
                name="phoneNumber"
                placeholder='Phone Number'
                value={passenger.phoneNumber}
                onChange={(e) => handleInputChange(index, e)}
                className="border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => removePassenger(index)}
            className="text-red-500 text-sm mt-4"
          >
            Remove Passenger
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addPassenger}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-4"
      >
        Add Another Passenger
      </button>
    </div>
  );
};

export default PassengerInfo;
