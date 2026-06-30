const db = require('../config/db');

exports.getBookings = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT bookings.*, courts.name AS court_name, courts.type AS court_type, courts.location AS court_location
      FROM bookings
      JOIN courts ON bookings.court_id = courts.id
      ORDER BY bookings.id DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get bookings', error: error.message });
  }
};

exports.createBooking = async (req, res) => {
  try {
    const { court_id, customer_name, customer_email, booking_date, start_time, end_time, total_price } = req.body;

    const [courtRows] = await db.query('SELECT * FROM courts WHERE id = ?', [court_id]);
    if (courtRows.length === 0) return res.status(404).json({ message: 'Court not found' });
    if (courtRows[0].status !== 'available') return res.status(400).json({ message: 'Court is not available' });

    const [conflicts] = await db.query(
      `SELECT id FROM bookings
       WHERE court_id = ? AND booking_date = ? AND status != 'cancelled'
       AND (start_time < ? AND end_time > ?)`,
      [court_id, booking_date, end_time, start_time]
    );

    if (conflicts.length > 0) {
      return res.status(409).json({ message: 'This court is already booked for the selected time' });
    }

    const [result] = await db.query(
      `INSERT INTO bookings (court_id, customer_name, customer_email, booking_date, start_time, end_time, total_price)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [court_id, customer_name, customer_email, booking_date, start_time, end_time, total_price]
    );

    res.status(201).json({ message: 'Booking submitted', id: result.insertId });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const [result] = await db.query('UPDATE bookings SET status = ? WHERE id = ?', [status, req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking status updated' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update booking status', error: error.message });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM bookings WHERE id = ?', [req.params.id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Booking not found' });
    res.json({ message: 'Booking deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete booking', error: error.message });
  }
};
