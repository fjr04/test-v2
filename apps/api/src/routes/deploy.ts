import { Router } from 'express';
import * as k8s from '@kubernetes/client-node';
import { getSettings } from '../db';

const router = Router();

async function getK8sBatchApi() {
  const settings = await getSettings();
  const kc = new k8s.KubeConfig();
  if (settings.kubeconfig) {
    kc.loadFromString(settings.kubeconfig);
  } else {
    kc.loadFromDefault();
  }
  return kc.makeApiClient(k8s.BatchV1Api);
}

router.post('/', async (req, res) => {
  try {
    const { githubUrl } = req.body;
    if (!githubUrl) {
      return res.status(400).json({ error: 'githubUrl is required' });
    }

    const batchApi = await getK8sBatchApi();
    const jobName = `alchemist-builder-${Date.now()}`;

    const jobManifest: k8s.V1Job = {
      apiVersion: 'batch/v1',
      kind: 'Job',
      metadata: {
        name: jobName,
      },
      spec: {
        backoffLimit: 0,
        template: {
          spec: {
            restartPolicy: 'Never',
            containers: [
              {
                name: 'builder',
                image: 'alpine:latest',
                command: ['/bin/sh', '-c'],
                // This is a mock builder script to demonstrate the architecture.
                // In production, this would be a Kaniko or Tekton container 
                // pulling the code, scanning with sonar, and pushing to a registry.
                args: [
                  `echo "Starting deployment for ${githubUrl}"; ` +
                  `echo "Cloning repository..."; sleep 2; ` +
                  `echo "Running SonarQube Scanner..."; sleep 2; ` +
                  `echo "Building Docker container..."; sleep 3; ` +
                  `echo "Deploying to Kubernetes..."; sleep 1; ` +
                  `echo "Deployment Successful!"`
                ],
              },
            ],
          },
        },
      },
    };

    const response = await batchApi.createNamespacedJob('default', jobManifest);
    
    res.json({ 
      success: true, 
      message: 'Deployment job created successfully', 
      jobName: response.body.metadata?.name 
    });
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to create deployment job', details: err.message });
  }
});

export default router;
