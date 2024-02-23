const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userAuthController = {
  signIn: async (req, res) => {
    try {
      const { user_email, password } = req.body;
      const { client, database } = req.app.locals.mongoClient;

      if (!client || !database) {
        throw new Error('MongoDB client or database not available');
      }

      const user = await database.collection('users').findOne({ user_email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ user_id: user.user_id }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Set the expiration time as needed
      });

      res.json({ token });
    } catch (error) {
      console.error('Error during user sign-in:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  signUp: async (req, res) => {
    try {
      const { user_email, password } = req.body;
      const { client, database } = req.app.locals.mongoClient;

      if (!client || !database) {
        throw new Error('MongoDB client or database not available');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      await database.collection('users').insertOne({
        user_email: user_email,
        password_hash: hashedPassword,
      });

      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error during user sign-up:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  changePassword: async (req, res) => {
    try {
      const { user_email, oldPassword, newPassword } = req.body;
      const { client, database } = req.app.locals.mongoClient;

      if (!client || !database) {
        throw new Error('MongoDB client or database not available');
      }

      const user = await database.collection('users').findOne({ user_email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
      }

      const passwordMatch = await bcrypt.compare(oldPassword, user.password_hash);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid old password' });
      }

      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await database.collection('users').updateOne({ user_email }, { $set: { password_hash: hashedNewPassword } });

      res.json({ message: 'Password changed successfully' });
    } catch (error) {
      console.error('Error during user password change:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};

module.exports = userAuthController;
