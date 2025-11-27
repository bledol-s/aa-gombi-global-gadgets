
import React from 'react';

const WhatsAppButton = () => {
  const whatsappNumber = '+2348137342695'; // Replace with your WhatsApp number
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const styles = {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: 1000,
  };

  return (
    <a href={whatsappLink} style={styles} className="btn btn-success btn-lg" target="_blank" rel="noopener noreferrer">
      <i className="bi bi-whatsapp"></i>
    </a>
  );
};

export default WhatsAppButton;
