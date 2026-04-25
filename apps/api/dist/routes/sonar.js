"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const axios_1 = __importDefault(require("axios"));
const db_1 = require("../db");
const router = (0, express_1.Router)();
async function getSonarClient() {
    const settings = await (0, db_1.getSettings)();
    const sonarUrl = settings.sonarUrl || 'http://localhost:9000';
    const sonarToken = settings.sonarToken;
    return axios_1.default.create({
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
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch SonarQube metrics', details: err.message });
    }
});
exports.default = router;
