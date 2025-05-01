# 📜 KrostChain - Document Certification Platform on Blockchain

A web platform for certifying and revoking documents through smart contracts on Ethereum. It includes a dashboard, notification panel, wallet integration, role management, and audit trail.

---

## 📦 Tech Stack

- ⚙️ **Backend**: Java + Quarkus + REST
- 🧠 **Smart Contract**: Solidity + OpenZeppelin + Hardhat
- 🌐 **Frontend**: React + Tailwind + Ethers.js
- 🧪 **Test**: Vitest + React Testing Library + TanStack Query

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://gitlab-edu.supsi.ch/dti-isin/giuliano.gremlich/opzione-blockchain-engineering/24-25/progetti-studenti/fanto-marrofino.git
cd fanto-marrofino
```

### 2. Install dependencies

#### Backend (Quarkus)

```bash
cd backend
# Clean and package before development
mvn clean package
```

#### Frontend

```bash
cd frontend
npm install
# Link backend API client package
npm link @dti-isin/backend-api-client
```

#### Smart Contract

```bash
cd blockchain/contracts
npm install
```

---

## 🚀 Build and Link Backend API Client

After building the backend, generate the NPM package for the API client and link it locally:

```bash
# From project root or /backend after mvn clean package
cd backend/target/backend-api-client
npm install
npm link
```

This makes the `@dti-isin/backend-api-client` package available for linking in the frontend.

---

## 🚀 Run the Application (Locally)

### 0. Start the MySQL Database (via Docker)

Make sure you have Docker installed, then run:

```bash
docker run --name krostchain-mysql \
  -e MYSQL_ROOT_PASSWORD=1234 \
  -e MYSQL_DATABASE=blockchainDocuments \
  -p 3306:3306 \
  -d mysql:latest
```

> 📝 These credentials must match your backend `application.properties`.

---

### 1. Start Hardhat Node (Local Blockchain)

```bash
cd blockchain/contracts
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
# Already in backend directory
git# Quarkus dev after mvn clean package is alive
mvn quarkus:dev
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

### 🌐 Deploy on Sepolia Testnet

1. **Configure environment** in `blockchain/contracts/.env`:
   ```env
   PRIVATE_KEY=<your Sepolia private key>
   INFURA_API_KEY=<your Infura key>
   ETHERSCAN_API_KEY=<your Etherscan key>
   ```
2. **Deploy**:
   ```bash
   cd blockchain/contracts
   npx hardhat run scripts/deploy.ts --network sepolia
   ```
3. **Update frontend config** (`frontend/src/config/config.ts`) with new `contractAddress`.
4. **(Optional) Verify on Etherscan**:
   ```bash
   npx hardhat verify --network sepolia <contractAddress>
   ```

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
mvn test
```

### Smart Contracts

```bash
cd blockchain/contracts
npx hardhat test
```

---

## 📚 Authors

- Antonio Marroffino
- Luca Fantò
