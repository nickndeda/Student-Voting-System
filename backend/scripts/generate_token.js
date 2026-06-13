require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = jwt.sign({ studentId: 21, registrationNumber: 'KNP/CS/011/25' }, process.env.JWT_SECRET, { expiresIn: '8h' });
console.log(token);
