import fs from 'fs/promises';
import path from 'path';

export interface Settings {
  sonarUrl: string;
  sonarToken: string;
  kubeconfig: string;
}

const DB_FILE = path.join(__dirname, '..', '.data.json');

const DEFAULT_SETTINGS: Settings = {
  sonarUrl: '',
  sonarToken: '',
  kubeconfig: ''
};

export async function getSettings(): Promise<Settings> {
  try {
    const data = await fs.readFile(DB_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err: any) {
    if (err.code === 'ENOENT') {
      return DEFAULT_SETTINGS;
    }
    throw err;
  }
}

export async function saveSettings(settings: Settings): Promise<void> {
  await fs.writeFile(DB_FILE, JSON.stringify(settings, null, 2), 'utf-8');
}
