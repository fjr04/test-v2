"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const k8s = __importStar(require("@kubernetes/client-node"));
const db_1 = require("../db");
const router = (0, express_1.Router)();
async function getK8sBatchApi() {
    const settings = await (0, db_1.getSettings)();
    const kc = new k8s.KubeConfig();
    if (settings.kubeconfig) {
        kc.loadFromString(settings.kubeconfig);
    }
    else {
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
        const jobManifest = {
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to create deployment job', details: err.message });
    }
});
exports.default = router;
