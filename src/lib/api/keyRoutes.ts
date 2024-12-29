import express from 'express';
import cors from 'cors';
import { verifyKey } from '../keyUtils';

const router = express.Router();

router.post('/verify-key', cors(), async (req, res) => {
  try {
    const { key, robloxHwid } = req.body;
    
    if (!key || !robloxHwid) {
      return res.status(400).json({ success: false, message: 'Missing key or HWID' });
    }

    const isValid = await verifyKey(key);
    
    return res.json({ success: isValid });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});