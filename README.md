# 📜 Document Certification Platform on Blockchain

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
  git clone https://github.com/your-username/your-project.git
  cd your-project
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
  cd contracts
  npm install
```

---

## 🚀 Run the Application (Locally)

### 1. Start Hardhat Node

```bash
  cd contracts
  npx hardhat node
```

### 2. Deploy the Smart Contract (on localhost)

```bash
  npx hardhat run scripts/deploy.ts --network localhost
```

### 3. Start the Backend

```bash
  cd backend
  ./mvnw quarkus:dev
```

### 4. Start the Frontend

```bash
  cd frontend
  npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🚢 Deployment Guide (to testnet)

### 1. Configure `.env` in `/contracts`

```
PRIVATE_KEY=...
ALCHEMY_API_URL=...
```

### 2. Deploy to Goerli (example)

```bash
  npx hardhat run scripts/deploy.ts --network goerli
```

### 3. Update `config.ts` in the frontend with the new `contractAddress`.

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

### 🔐 Document Certification

![Certify document](./screenshots/certify.png)

### ⚠️ Revocation with Reason

![Revoke document](./screenshots/revoke.png)

### 🛡️ Admin Dashboard

![Admin view](./screenshots/admin-dashboard.png)

### 📩 Blockchain Notifications

![Notifications](./screenshots/notifications.png)

---

## 📚 Authors

- Antonio Marroffino
- Luca Fantò

---

## 📄 License

MIT
