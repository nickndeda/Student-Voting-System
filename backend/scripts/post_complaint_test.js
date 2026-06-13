const http = require('http');

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjIxLCJyZWdpc3RyYXRpb25OdW1iZXIiOiJLTlAvQ1MvMDExLzI1IiwiaWF0IjoxNzgxMzYzMDQxLCJleHAiOjE3ODEzOTE4NDF9.sYBOP8q5S4A7XWObkX0_f-Ft5yYx6_ce4lJoIpxF3zs';

const data = JSON.stringify({
  complaintType: 'Test Issue',
  subject: 'Testing complaint route',
  description: 'This is a test complaint for debugging.',
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/complaints/create',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
    'Content-Length': Buffer.byteLength(data),
  },
};

const req = http.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', () => {
    console.log('status', res.statusCode);
    console.log('body', body);
  });
});

req.on('error', (err) => {
  console.error('request error', err);
});

req.write(data);
req.end();
