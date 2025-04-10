import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const { instructorId } = useParams(); 
  const navigate = useNavigate();
  const [instructor, setInstructor] = useState(null);
  const [formData, setFormData] = useState({
    cardholderName: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    discountCode: '',
  });

  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const taxRate = 0.2; 

  const mockInstructors = [
    {
      id: 1,
      name: 'John Doe',
      price: 80,
    },
    {
      id: 2,
      name: 'Jane Smith',
      price: 70,
    },
  ];

  useEffect(() => {
    const selectedInstructor = mockInstructors.find(
      (instructor) => instructor.id === parseInt(instructorId)
    );
    if (!selectedInstructor) {
      setError('Instructor not found.');
    } else {
      setInstructor(selectedInstructor);
    }
  }, [instructorId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleApplyDiscount = () => {
    if (formData.discountCode === 'CHIKAMSO-20-OFF') {
      setDiscount(20);
      setSuccessMessage('Discount applied successfully!');
    } else {
      setDiscount(0); 
      setSuccessMessage('');
      alert('Invalid discount code');
    }
  };

  const calculateSubtotal = () => {
    return instructor ? instructor.price : 0;
  };

  const calculateTax = (subtotal) => {
    return subtotal * taxRate;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    return subtotal + tax - discount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.cardholderName ||
      !formData.cardNumber ||
      !formData.expiry ||
      !formData.cvc
    ) {
      alert('Please fill in all the fields.');
      return;
    }
    alert('Payment successful!');
    navigate('/studentPortal');
  };

  if (error) {
    return <div>{error}</div>;
  }

  if (!instructor) {
    return <div>Loading instructor details...</div>;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#eaf6ff',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '80%',
          maxWidth: '1200px',
          backgroundColor: '#fff',
          borderRadius: '10px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <div style={{ flex: 1, padding: '40px', backgroundColor: '#f9fcff' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
            Let’s Make Payment
          </h1>
          <p style={{ fontSize: '14px', color: '#555', marginBottom: '30px' }}>
            Booking for <strong>{instructor.name}</strong> at ${instructor.price}/hr.
          </p>

          <form onSubmit={handleSubmit}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              Cardholder’s Name
            </label>
            <input
              type="text"
              name="cardholderName"
              value={formData.cardholderName}
              onChange={handleChange}
              style={{
                width: '100%',
                backgroundColor: '#f0f8ff',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            />

            <label
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              style={{
                width: '100%',
                backgroundColor: '#f0f8ff',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '20px',
                border: '1px solid #ddd',
                fontSize: '14px',
              }}
            />

            <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    display: 'block',
                  }}
                >
                  Expiry
                </label>
                <input
                  type="text"
                  name="expiry"
                  value={formData.expiry}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    backgroundColor: '#f0f8ff',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label
                  style={{
                    fontSize: '14px',
                    fontWeight: 'bold',
                    marginBottom: '5px',
                    display: 'block',
                  }}
                >
                  CVC
                </label>
                <input
                  type="text"
                  name="cvc"
                  value={formData.cvc}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    backgroundColor: '#f0f8ff',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            <label
              style={{
                fontSize: '14px',
                fontWeight: 'bold',
                marginBottom: '5px',
                display: 'block',
              }}
            >
              Discount Code
            </label>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f0f8ff',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '30px',
              }}
            >
              <input
                type="text"
                name="discountCode"
                value={formData.discountCode}
                onChange={handleChange}
                style={{
                  flex: 1,
                  backgroundColor: 'transparent',
                  border: 'none',
                  fontSize: '14px',
                  color: '#333',
                }}
              />
              <button
                type="button"
                onClick={handleApplyDiscount}
                style={{
                  backgroundColor: '#007bff',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '5px',
                  padding: '5px 10px',
                  cursor: 'pointer',
                }}
              >
                Apply
              </button>
            </div>

            {successMessage && (
              <p style={{ color: 'green', fontSize: '14px', marginBottom: '20px' }}>
                {successMessage}
              </p>
            )}

            <button
              type="submit"
              style={{
                width: '100%',
                backgroundColor: '#007bff',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                padding: '10px',
                fontSize: '16px',
                cursor: 'pointer',
              }}
            >
              Pay
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div
          style={{
            flex: 1,
            padding: '40px',
            backgroundColor: '#eaf6ff',
            position: 'relative',
          }}
        >
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px' }}>
            You're paying,
          </h2>
          <div
            style={{
              fontSize: '36px',
              fontWeight: 'bold',
              color: '#007bff',
              marginBottom: '30px',
            }}
          >
            ${calculateTotal().toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;