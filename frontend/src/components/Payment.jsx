import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import '../style/Cart.css';

function Payment() {
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Extract data from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const paymentDataFromParams = {
      id: queryParams.get('id'),
      status: queryParams.get('status'),
      order_number: queryParams.get('order_number'),
      amount: queryParams.get('amount'),
      currency: queryParams.get('currency'),
      created: queryParams.get('created'),
      payment: queryParams.get('payment')
    };
    setPaymentData(paymentDataFromParams);
  }, [location]);

  return (
    <div className="container my-5">
      <div className="cart">
        <h3 className="text-center my-3">Payment Status</h3>
        {paymentData ? (
          <div className="cart-items text-center">
            <div className="item-info mx-1">
              <div className="mb-3">
                {paymentData.status === "CAPTURED" ? (
                  <FontAwesomeIcon icon={faCheckCircle} className="text-success" size="3x" />
                ) : (
                  <FontAwesomeIcon icon={faTimesCircle} className="text-danger" size="3x" />
                )}
              </div>
              <p><strong>Status:</strong> {paymentData.status}</p>
              <p><strong>Order Number:</strong> {paymentData.order_number}</p>
              <p><strong>Amount:</strong> {paymentData.amount} {paymentData.currency}</p>
              <p><strong>Created:</strong> {new Date(parseInt(paymentData.created)).toLocaleString()}</p>
              <p><strong>ID:</strong> {paymentData.id}</p>
              <p><strong>Payment:</strong> {paymentData.payment}</p>
            </div>
          </div>
        ) : (
          <p>Loading payment data...</p>
        )}
      </div>
    </div>
  );
}

export default Payment;
