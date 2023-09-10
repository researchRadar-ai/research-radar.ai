// pages/api-test.js

import { useEffect, useState } from 'react';

function APITest() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message));
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      <p>Message from API: {message}</p>
    </div>
  );
}

export default APITest;
