const jwt = require('jsonwebtoken');
const { secretKey, users } = require('../utils/constants');

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log('Received request:', username, password);
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    console.log('Invalid username or password');
    return res.status(401).json({ message: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
};

exports.getToken = (req, res) => {
  const payload = { id: 1 };
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 86400
  });

  res.status(200).send({ auth: true, token: token });
};
