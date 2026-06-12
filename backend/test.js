const bcrypt = require("bcrypt");

bcrypt.hash("Test@123", 10).then(console.log);