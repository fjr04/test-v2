import { Router } from 'express';
import * as k8s from '@kubernetes/client-node';
import { getSettings } from '../db';

const router = Router();

async function getK8sApi() {
  const settings = await getSettings();
  const kc = new k8s.KubeConfig();
  if (settings.kubeconfig) {
    kc.loadFromString(settings.kubeconfig);
  } else {
    kc.loadFromDefault();
  }
  return {
    kc,
    k8sApi: kc.makeApiClient(k8s.CoreV1Api),
    k8sAppsApi: kc.makeApiClient(k8s.AppsV1Api),
    k8sBatchApi: kc.makeApiClient(k8s.BatchV1Api)
  };
}

router.get('/pods', async (req, res) => {
  try {
    const { k8sApi } = await getK8sApi();
    const namespace = req.query.namespace as string || 'default';
    const response = await k8sApi.listNamespacedPod(namespace);
    res.json(response.body.items);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch pods', details: err.message });
  }
});

router.get('/deployments', async (req, res) => {
  try {
    const { k8sAppsApi } = await getK8sApi();
    const namespace = req.query.namespace as string || 'default';
    const response = await k8sAppsApi.listNamespacedDeployment(namespace);
    res.json(response.body.items);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch deployments', details: err.message });
  }
});

export default router;
