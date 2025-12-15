# 📝 Todo dApp (Ethereum)

A fully decentralized Todo application built on the **Ethereum Sepolia Testnet**. This dApp allows users to add, toggle, and delete tasks directly on-chain using **MetaMask**, ensuring transparency, ownership, and security.

---

## 🚀 Live Demo

> Deployed on **Vercel** (Frontend) + **Sepolia Testnet** (Smart Contract)

*Add your deployed link here*

---

## ✨ Features

* 🔐 MetaMask wallet connection
* 🧾 Add todos stored **on-chain**
* ✅ Toggle task completion
* ❌ Delete tasks
* ⚡ Real-time UI updates after transactions
* 🎨 Modern UI with hover glow effects
* 🌐 Deployed frontend (Vercel-ready)

---

## 🧠 Tech Stack

### Frontend

* HTML5
* CSS3 (Custom UI + glow effects)
* JavaScript (ES Modules)
* **Ethers.js v6**

### Blockchain

* Solidity Smart Contract
* Ethereum **Sepolia Testnet**
* MetaMask Wallet

### Deployment

* Smart Contract: Sepolia
* Frontend Hosting: Vercel

---

## 🔗 Smart Contract

* **Network:** Ethereum Sepolia Testnet
* **Contract Address:**

```
0xa0f237c2CaAe2c97e6984Cea12eBD6d08609e102
```

The contract stores todos per user and exposes functions to:

* `addTodo(string)`
* `toggleTodo(uint256)`
* `deleteTodo(uint256)`
* `getAllTodos()`

---

## 🛠️ How It Works

1. User connects wallet via MetaMask
2. Ethers.js creates a signer-connected contract instance
3. All write actions trigger blockchain transactions
4. After confirmation, todos are reloaded from the contract
5. UI updates automatically

---

## 📦 Installation (Local)

```bash
# Clone the repo
git clone https://github.com/your-username/todo-dapp.git

# Open folder
cd todo-dapp

# Run locally (recommended)
npx serve
```

> ⚠️ MetaMask required and Sepolia network must be selected

---

## 🌍 Deployment (Vercel)

1. Push project to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import GitHub repository
4. Framework: **Other**
5. Build Command: *None*
6. Output Directory: *Default*
7. Deploy 🎉

---

## 🔐 Security Notes

* No private keys stored
* Wallet handles signing
* All data is immutable and transparent
* Frontend validates empty inputs

---

## 📈 Future Improvements

* Event-based real-time updates
* Per-user todo counters
* Gas optimization
* Wallet auto-connect
* Mainnet deployment

---

## 👨‍💻 Author

**Sanooj K**

Blockchain Developer | Web3 Enthusiast

---

## 📜 License

MIT License

---

> Built to learn and demonstrate full-stack Web3 development 🚀
