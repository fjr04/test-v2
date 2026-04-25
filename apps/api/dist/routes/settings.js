"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const db_1 = require("../db");
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const settings = await (0, db_1.getSettings)();
        res.json(settings);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch settings', details: err.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const { sonarUrl, sonarToken, kubeconfig } = req.body;
        await (0, db_1.saveSettings)({
            sonarUrl: sonarUrl || '',
            sonarToken: sonarToken || '',
            kubeconfig: kubeconfig || ''
        });
        res.json({ success: true, message: 'Settings saved successfully' });
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to save settings', details: err.message });
    }
});
exports.default = router;
