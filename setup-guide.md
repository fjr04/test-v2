# Alchemist Platform: Setup Guide

Welcome to the Alchemist Platform! This guide will walk you through setting up the necessary infrastructure (K3s and SonarQube) and running the Alchemist application to provide a portable PaaS experience on your own server.

## Prerequisites

- A Virtual Machine (VM) running **Ubuntu 22.04 LTS** (or similar Linux distribution).
- At least **4GB RAM** and **2 CPU Cores** (8GB RAM highly recommended for SonarQube and building container images).
- Root or `sudo` access to the server.

---

## Step 1: Install K3s (Lightweight Kubernetes)

Alchemist uses K3s to build and run the applications deploying through the platform.

1. Install K3s using the official script:
   ```bash
   curl -sfL https://get.k3s.io | sh -
   ```
2. Verify the installation:
   ```bash
   sudo k3s kubectl get nodes
   ```
   *You should see your node listed with the status `Ready`.*
3. Retrieve your **Kubeconfig** file:
   ```bash
   sudo cat /etc/rancher/k3s/k3s.yaml
   ```
   **Important:** Copy the entire output of this file. You will need to paste it into the Alchemist dashboard settings later. If you are accessing K3s from outside the VM, change `server: https://127.0.0.1:6443` to `-- your VM's public IP --` in the copied text before pasting it.

---

## Step 2: Install SonarQube (via Docker)

Alchemist integrates with SonarQube to analyze your code for vulnerabilities and bugs before deployment. The easiest way to run SonarQube is using Docker.

1. Install Docker:
   ```bash
   sudo apt update
   sudo apt install -y docker.io
   ```
2. Run the SonarQube Server:
   ```bash
   sudo docker run -d --name sonarqube -e SONAR_ES_BOOTSTRAP_CHECKS_DISABLE=true -p 9000:9000 sonarqube:lts
   ```
3. Wait a few minutes for SonarQube to start, then open your browser to `http://<YOUR_VM_IP>:9000`.
4. Log in with the default credentials:
   - **Username:** admin
   - **Password:** admin
   *(You will be prompted to change the password).*
5. Generate an **API Token**:
   - Go to **My Account** (top-right profile icon) > **Security**.
   - Under **Generate Tokens**, type a name (e.g., `alchemist-token`), select **Global Analysis Token**, and click **Generate**.
   - **Important:** Copy this token. You will need it for the Alchemist dashboard.

---

## Step 3: Start the Alchemist Application

Now that the infrastructure is ready, we will start the Alchemist Dashboard and Backend API.

1. Ensure Node.js (v18 or v20) is installed:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```
2. Clone this repository (or copy the files to your VM).
3. Install dependencies in the root of the project:
   ```bash
   npm install
   ```
4. Build the project:
   ```bash
   npm run build
   ```
5. Start the frontend and backend:
   ```bash
   npm run start
   ```

---

## Step 4: Configure the Dashboard

1. Open the Alchemist Dashboard in your browser (`http://<YOUR_VM_IP>:3000`).
2. Navigate to the **Settings** menu.
3. Fill in the integration details:
   - **SonarQube URL:** `http://<YOUR_VM_IP>:9000`
   - **SonarQube Token:** *(Paste the token generated in Step 2)*
   - **Kubeconfig:** *(Paste the entire text from `/etc/rancher/k3s/k3s.yaml` retrieved in Step 1)*
4. Click **Save Settings**.

---

## Success! 🎉
You are now ready to use Alchemist. Navigate to the **Deploy** page, paste a GitHub link, and watch your application automatically build, get scanned for vulnerabilities by SonarQube, and deploy to your K3s cluster!
