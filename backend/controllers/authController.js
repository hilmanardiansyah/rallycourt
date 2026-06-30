const db = require('../config/db');

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await db.query('SELECT id, name, email, role FROM users WHERE email = ? AND password = ?', [email, password]);

    if (rows.length === 0) {
      return res.status(401).json({ message: 'Email or password is incorrect' });
    }

    res.json({ message: 'Login success', user: rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, password, 'user']
    );
    res.status(201).json({ message: 'Register success', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Register failed', error: error.message });
  }
};
