"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSettings = getSettings;
exports.saveSettings = saveSettings;
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
const DB_FILE = path_1.default.join(__dirname, '..', '.data.json');
const DEFAULT_SETTINGS = {
    sonarUrl: '',
    sonarToken: '',
    kubeconfig: ''
};
async function getSettings() {
    try {
        const data = await promises_1.default.readFile(DB_FILE, 'utf-8');
        return JSON.parse(data);
    }
    catch (err) {
        if (err.code === 'ENOENT') {
            return DEFAULT_SETTINGS;
        }
        throw err;
    }
}
async function saveSettings(settings) {
    await promises_1.default.writeFile(DB_FILE, JSON.stringify(settings, null, 2), 'utf-8');
}
