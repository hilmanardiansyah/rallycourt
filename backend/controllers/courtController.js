const db = require('../config/db');

exports.getCourts = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courts ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get courts', error: error.message });
  }
};

exports.getCourtById = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM courts WHERE id = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ message: 'Court not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get court', error: error.message });
  }
};

exports.createCourt = async (req, res) => {
  try {
    const { name, type, location, price_per_hour, description, image_url, status } = req.body;
    const [result] = await db.query(
      'INSERT INTO courts (name, type, location, price_per_hour, description, image_url, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, type, location, price_per_hour, description, image_url, status || 'available']
    );
    res.status(201).json({ message: 'Court created', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create court', error: error.message });
  }
};

exports.updateCourt = async (req, res) => {
  try {
    const { name, type, location, price_per_hour, description, image_url, status } = req.body;
    const [result] = await db.query(
      'UPDATE courts SET name=?, type=?, location=?, price_per_hour=?, description=?, image_url=?, status=? WHERE id=?',
      [name, type, location, price_per_hour, description, image_url, status, req.params.id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update court', error: error.message });
  }
};

exports.deleteCourt = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM courts WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Court not found' });
    res.json({ message: 'Court deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete court', error: error.message });
  }
};
