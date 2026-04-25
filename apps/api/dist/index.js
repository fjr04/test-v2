"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const k8s_1 = __importDefault(require("./routes/k8s"));
const sonar_1 = __importDefault(require("./routes/sonar"));
const settings_1 = __importDefault(require("./routes/settings"));
const deploy_1 = __importDefault(require("./routes/deploy"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use('/api/k8s', k8s_1.default);
app.use('/api/sonar', sonar_1.default);
app.use('/api/settings', settings_1.default);
app.use('/api/deploy', deploy_1.default);
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
