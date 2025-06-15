// QRCodeComponent.js
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
  const [qrData, setQrData] = useState('');

  useEffect(() => {
    const socket = io('http://localhost:4001'); // Replace with your server address

    socket.on('connect', () => {
      console.log('connected to WebSocket');
    });

    socket.on('qrCode', (data) => {
      setQrData(data);
    });

    socket.on('disconnect', () => {
      console.log('disconnected from WebSocket');
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <div>
      {qrData ? (
        <QRCode value={qrData} />
      ) : (
        <p>No QR code data received</p>
      )}
    </div>
  );
};

export default QRCodeComponent;
