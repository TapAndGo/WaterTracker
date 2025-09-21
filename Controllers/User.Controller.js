// controllers/user.controller.js
import jwt from 'jsonwebtoken';
import {
  createUser,
  findUserByUsername,
  validatePassword,
} from '../Repositories/User.repository.js';

const SECRET = 'supersecret'; // use process.env.SECRET in production

/**
 * Register Controller
 */
export const registerController = () => {
  return async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const user = await createUser({ username, email, password });

      res.status(201).json({
        message: 'User registered successfully',
        user: { id: user.id, username: user.username, email: user.email },
      });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
};

/**
 * Login Controller
 */
export const loginController = () => {
  return async (req, res) => {
    try {
      const { username, password } = req.body;

      const user = await findUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const isValid = await validatePassword(user, password);
      if (!isValid) {
        return res.status(401).json({ error: 'Invalid password' });
      }

      const token = jwt.sign(
        { id: user.id, username: user.username },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({
        message: 'Login successful',
        token,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
};
