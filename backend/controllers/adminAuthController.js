const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const adminAuthController = {
  login: async (req, res) => {
    try {
      const { admin_id, password } = req.body;
      console.log(admin_id,password);
      const { client, database } = req.app.locals.mongoClient;

      if (!client || !database) {
        throw new Error('MongoDB client or database not available');
      }

      const admin = await database.collection('admins').findOne({ admin_id });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ admin_id: admin.admin_id }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
      });

      res.json({ token });
    } catch (error) {
      console.error('Error during admin login:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  logout: async (req, res) => {
    try {
      res.json({ message: 'Logout successful' });
    } catch (error) {
      console.error('Error during admin logout:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { admin_id, oldPassword, newPassword } = req.body;
      const { client, database } = req.app.locals.mongoClient;

      if (!client || !database) {
        throw new Error('MongoDB client or database not available');
      }

      const admin = await database.collection('admins').findOne({ admin_id });
      if (!admin) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(oldPassword, admin.password_hash);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid old password' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await database.collection('admins').updateOne({ admin_id }, { $set: { password_hash: hashedNewPassword } });

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error during admin password change:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = adminAuthController;
