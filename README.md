# 🔗 KrostChain – Document Certification Platform on Blockchain

A web platform for certifying and revoking documents through smart contracts on Ethereum.  
It includes a dashboard, notification panel, wallet integration, role management, and audit trail.

---

---

## 🔍 Features

KrostChain allows users to securely manage the certification and revocation of documents on the Ethereum blockchain.

### 👤 As a registered user, you can:
- Upload and certify documents
- View your certified documents and their history
- Receive notifications for updates and expirations
- Revoke documents with a reason
- Download certification proofs

### 🛡️ As an admin or verifier, you can:
- View all documents submitted by users
- Monitor the activity of verifiers and manage permissions
- Deploy and upgrade the smart contract if needed

All documents are hashed and timestamped, ensuring authenticity, traceability, and immutability through blockchain technology.

## 📦 Tech Stack

- ⚙️ **Backend**: Java + Quarkus + REST
- 🧠 **Smart Contract**: Solidity + OpenZeppelin + Hardhat
- 🌐 **Frontend**: React + Tailwind + Ethers.js
- 🧪 **Test**: Vitest + React Testing Library + TanStack Query

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/antoniomarroffino/Blockchain-DocumentCertification.git
cd fanto-marroffino
```

### 2. Install dependencies

#### Frontend

```bash
cd frontend
npm install
```

#### Backend

```bash
cd backend
./mvnw install
```

#### Smart Contract

```bash
cd blockchain
npm install
```

---

## 🚀 Run the Application (Locally)

### 0. Start the MySQL Database (via Docker)

```bash
docker run --name blockchainDocuments-mysql \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=blockchainDocuments \
  -p 3306:3306 \
  -d mysql:latest
```

> 📝 These credentials must match your backend `application.properties`.

---

### 1. Start Hardhat Node

```bash
cd blockchain
npx hardhat node
```

---

### 2. Deploy the Smart Contract (on localhost)

```bash
npx hardhat run scripts/deploy.ts --network localhost
```

---

### 3. Start the Backend

```bash
cd backend
mvn clean package 
cd ./target/backend-api-client 
npm i 
npm link 
cd ../..
./mvnw quarkus:dev
```

---

### 4. Start the Frontend

```bash
cd frontend
npm link @dti-isin/backend-api-client
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚢 Deployment Guide

### 📍 Deploy on Localhost (for development)

1. Start a local Hardhat node
2. Deploy the smart contract to localhost
3. Copy the deployed address and update `frontend/src/config/config.ts`

---

### 🌐 Deploy on Sepolia Testnet

1. Edit `.env` inside `/contracts`:
```env
PRIVATE_KEY=<your Sepolia private key>
INFURA_API_KEY=...
ETHERSCAN_API_KEY=...
```

2. Deploy the contract:
```bash
npx hardhat run scripts/deploy.ts --network sepolia
```

3. Update the frontend config
4. (Optional) Verify on Etherscan

```bash
npx hardhat verify --network sepolia <contractAddress>
```

---

### ✨ Upgrade the Smart Contract (if needed)

```bash
npx hardhat run scripts/upgrade.ts --network sepolia
```

> 🔐 Ensure `PROXY_ADDRESS` in `.env` is correct

---

### 📝 Notes

- Frontend uses `VITE_INFURA_API_KEY` from `frontend/.env`
- You can switch networks by editing `.env` variables

---

## 🧪 Testing Instructions

### Frontend

```bash
cd frontend
npm run test
```

### Backend

```bash
cd backend
./mvnw test
```

### Smart Contracts

```bash
cd contracts
npx hardhat test
```

---

## 📸 Screenshots

### 📄 All documents page
![All documents page](./screenshots/all-documents.png)

### 🧾 Document details (certifications/revocations)
![Document details](./screenshots/document-details.png)

### 👤 Profile page
![Profile page](./screenshots/my-profile.png)

### 🛡️ Admin Dashboard
![Admin view](./screenshots/admin-dashboard.png)

### 📩 Upload document
![Upload document](./screenshots/upload-document.png)

---

## 👥 Authors

**Antonio Marroffino**
- [GitHub](https://github.com/antoniomarroffino)
- [LinkedIn](https://www.linkedin.com/in/antoniomarroffino)

**Luca Fantò**

---

## 📜 License

This project was developed for educational purposes as part of the Bachelor's degree in Computer Engineering at SUPSI.
