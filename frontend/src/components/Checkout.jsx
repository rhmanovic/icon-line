import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { BASE_URL, YOUR_MERCHANT_ID } from '../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import translations from '../utils/translations'; // Adjust the import path as necessary
import '../style/Checkout.css'; // Ensure you have this CSS file

function Checkout({ language, cart, customer, clearCart }) {
  const [name, setName] = useState(customer ? customer.name : '');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();

  console.log("cart: ", cart);

  useEffect(() => {
    // Ensure translations update correctly when the language prop changes
  }, [language]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      customerName: name || '', // Make name optional
      merchant: YOUR_MERCHANT_ID, // Use the merchant ID from config
      items: cart,
      address: address,
      phone: phone,
      deliveryFee: 0,
      total: parseFloat(cart.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2),
    };

    console.log('Order submitted:', orderData);

    try {
      const response = await axios.post(`${BASE_URL}/api/submit-order`, orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Redirect to Google for debugging
      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error submitting order. Please try again.');
    }
  };

  const handlePhoneChange = (e) => {
    const { value } = e.target;
    const validPhone = value.replace(/\D/g, ''); // Remove non-numeric characters
    setPhone(validPhone);
  };

  const t = language === 'EN' ? translations.en : translations.ar;

  return (
    <div className="checkout-container" dir={language === 'EN' ? 'ltr' : 'rtl'}>
      <h3 className="checkout-title">{t.confirmOrder}</h3>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label className="form-label">{t.name}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t.enterName}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.phone}</label>
          <div className="input-group">
            <input
              type="tel"
              className="form-control"
              placeholder={t.enterPhone}
              value={phone}
              onChange={handlePhoneChange}
              required
            />
            <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">{t.address}</label>
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder={t.enterAddress}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span className="input-group-text"><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          {t.submitOrder} - {parseFloat(cart.reduce((total, item) => total + (item.price * item.quantity), 0)).toFixed(2)}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
