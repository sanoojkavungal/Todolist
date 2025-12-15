import { ethers } from "https://cdn.jsdelivr.net/npm/ethers@6.10.0/dist/ethers.min.js";

const CONTRACT_ADDRESS = "0xa0f237c2CaAe2c97e6984Cea12eBD6d08609e102";

// Global state
let provider;
let signer;
let contract;
let userAddress;

// ABI
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "string", "name": "_task", "type": "string" }],
    "name": "addTodo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "toggleTodo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "uint256", "name": "_index", "type": "uint256" }],
    "name": "deleteTodo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllTodos",
    "outputs": [
      {
        "components": [
          { "internalType": "string", "name": "task", "type": "string" },
          { "internalType": "bool", "name": "completed", "type": "bool" }
        ],
        "internalType": "struct Todo.TodoTask[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// -------------------- WALLET --------------------

async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }

  try {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });

    userAddress = accounts[0];

    provider = new ethers.BrowserProvider(window.ethereum);
    signer = await provider.getSigner();

    contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    document.getElementById("wallet").innerText =
      `Connected: ${userAddress.slice(0, 6)}...${userAddress.slice(-4)}`;

    await loadTodos();

    console.log("Wallet connected:", userAddress);
  } catch (err) {
    console.error("Wallet connection failed:", err);
  }
}

// -------------------- READ --------------------

async function loadTodos() {
  if (!contract) return;

  try {
    const todos = await contract.getAllTodos();
    renderTodos(todos);
  } catch (err) {
    console.error("Failed to load todos:", err);
  }
}

// -------------------- RENDER --------------------

function renderTodos(todos) {
  const todoList = document.getElementById("todoList");
  todoList.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="todo-text ${todo.completed ? "completed" : ""}">
        <span>${todo.task}</span>
      </div>
      <div class="todo-actions">
        <button class="toggle" data-index="${index}">✔</button>
        <button class="delete" data-index="${index}">✖</button>
      </div>
    `;

    todoList.appendChild(li);
  });

  bindTodoActions();
}

// -------------------- UI ACTIONS --------------------

function bindTodoActions() {
  document.querySelectorAll(".toggle").forEach(btn => {
    btn.onclick = async () => {
      const index = btn.dataset.index;
      await toggleTodo(index);
    };
  });

  document.querySelectorAll(".delete").forEach(btn => {
    btn.onclick = async () => {
      const index = btn.dataset.index;
      await deleteTodo(index);
    };
  });
}

// -------------------- WRITE --------------------

async function addTodo() {
  const input = document.getElementById("taskInput");
  const task = input.value.trim();

  if (!task) {
    alert("Task cannot be empty");
    return;
  }

  if (!contract) {
    alert("Connect wallet first");
    return;
  }

  try {
    const tx = await contract.addTodo(task);
    await tx.wait();
    input.value = "";
    await loadTodos();
  } catch (err) {
    console.error("Add todo failed:", err);
  }
}

async function toggleTodo(index) {
  try {
    const tx = await contract.toggleTodo(index);
    await tx.wait();
    await loadTodos();
  } catch (err) {
    console.error("Toggle failed:", err);
  }
}

async function deleteTodo(index) {
  try {
    const tx = await contract.deleteTodo(index);
    await tx.wait();
    await loadTodos();
  } catch (err) {
    console.error("Delete failed:", err);
  }
}

// -------------------- EVENTS --------------------

ethereum.on("accountsChanged", () => location.reload());
ethereum.on("chainChanged", () => location.reload());

// -------------------- BUTTON BINDINGS --------------------

document
  .getElementById("connectBtn")
  .addEventListener("click", connectWallet);

document
  .getElementById("addBtn")
  .addEventListener("click", addTodo);
