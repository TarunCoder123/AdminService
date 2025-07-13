import express from 'express';
import userClient from '../../client/user.grpd.proto.client';

const router = express.Router();

// Get all users
router.get('/users', (req, res) => {
  userClient.GetAllUsers({}, (err,response) => {
    if (err) {
      console.error('gRPC Error:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(response.users);
  });
});

// Get user by ID
router.get('/users/:id', (req, res) => {
  const user_id = req.params.id;
  userClient.GetUser({ user_id }, (err, response) => {
    if (err) {
      console.error('gRPC Error:', err);
      return res.status(404).json({ error: err.message });
    }
    res.json(response.user);
  });
});

// Delete user (soft)
router.delete('/users/:id', (req, res) => {
  const user_id = req.params.id;
  userClient.DeleteUser({ user_id }, (err, response) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(response);
  });
});

// Update isAdminDeleted
router.patch('/users/:id/admin-delete', (req, res) => {
  const user_id = req.params.id;
  const isAdminDeleted = req.body.isAdminDeleted;
  userClient.UpdateIsAdminDeleted({ user_id, isAdminDeleted }, (err, response) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(response);
  });
});

export default router;
