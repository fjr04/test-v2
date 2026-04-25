import express from 'express';
import cors from 'cors';
import k8sRouter from './routes/k8s';
import sonarRouter from './routes/sonar';
import settingsRouter from './routes/settings';
import deployRouter from './routes/deploy';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/k8s', k8sRouter);
app.use('/api/sonar', sonarRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/deploy', deployRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
