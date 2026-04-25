import { Router } from 'express';
import axios from 'axios';
import { getSettings } from '../db';

const router = Router();

async function getSonarClient() {
  const settings = await getSettings();
  const sonarUrl = settings.sonarUrl || 'http://localhost:9000';
  const sonarToken = settings.sonarToken;
  
  return axios.create({
    baseURL: sonarUrl,
    headers: sonarToken ? {
      'Authorization': `Bearer ${sonarToken}`
    } : undefined
  });
}

router.get('/metrics', async (req, res) => {
  try {
    const { projectKey } = req.query;
    if (!projectKey) {
      return res.status(400).json({ error: 'projectKey query parameter is required' });
    }
    
    const sonarClient = await getSonarClient();
    
    // Example fetching basic metrics
    const response = await sonarClient.get('/api/measures/component', {
      params: {
        component: projectKey,
        metricKeys: 'bugs,vulnerabilities,code_smells,coverage,duplicated_lines_density'
      }
    });
    
    res.json(response.data);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch SonarQube metrics', details: err.message });
  }
});

export default router;
