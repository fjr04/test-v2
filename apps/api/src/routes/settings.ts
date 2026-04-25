import { Router } from 'express';
import { getSettings, saveSettings } from '../db';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const settings = await getSettings();
    res.json(settings);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch settings', details: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { sonarUrl, sonarToken, kubeconfig } = req.body;
    await saveSettings({
      sonarUrl: sonarUrl || '',
      sonarToken: sonarToken || '',
      kubeconfig: kubeconfig || ''
    });
    res.json({ success: true, message: 'Settings saved successfully' });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to save settings', details: err.message });
  }
});

export default router;
