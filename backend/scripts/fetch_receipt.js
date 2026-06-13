require('dotenv').config();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdHVkZW50SWQiOjIxLCJyZWdpc3RyYXRpb25OdW1iZXIiOiJLTlAvQ1MvMDExLzI1IiwiaWF0IjoxNzgxMzUxNTM0LCJleHAiOjE3ODEzODAzMzR9.TnGK-_i9kBKgkjNOEJaUqAfBLi3OQk91TfpSzT8T-ds';

(async () => {
  try {
    const res = await fetch('http://localhost:3000/api/votes/receipt', {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
