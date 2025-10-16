const { ethers } = require("ethers");

const CONTRACT_ADDRESS = "0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B";
// 使用 Infura RPC
const RPC_URL = process.env.SEPOLIA_RPC_URL || "https://sepolia.infura.io/v3/0baf7b768440432a9ec455077c65384a";

// 简化的 ABI - 只测试 boxPrice
const CONTRACT_ABI = [
  "function boxPrice() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function name() view returns (string)",
  "function symbol() view returns (string)"
];

async function testContract() {
  console.log("🔍 Testing contract connection...\n");
  
  try {
    // 连接到 Sepolia
    const provider = new ethers.JsonRpcProvider(RPC_URL);
    console.log("✅ Connected to Sepolia RPC");
    
    // 创建合约实例
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
    console.log("✅ Contract instance created");
    console.log("📍 Contract Address:", CONTRACT_ADDRESS);
    console.log("");
    
    // 检查合约代码是否存在
    const code = await provider.getCode(CONTRACT_ADDRESS);
    if (code === "0x") {
      console.log("❌ ERROR: No contract code found at this address!");
      console.log("   This means the contract is not deployed to this address on Sepolia.");
      return;
    }
    console.log("✅ Contract code exists at this address");
    console.log("");
    
    // 测试读取函数
    console.log("📊 Reading contract data...\n");
    
    try {
      const name = await contract.name();
      console.log("✅ Name:", name);
    } catch (err) {
      console.log("❌ Failed to read name:", err.message);
    }
    
    try {
      const symbol = await contract.symbol();
      console.log("✅ Symbol:", symbol);
    } catch (err) {
      console.log("❌ Failed to read symbol:", err.message);
    }
    
    try {
      const boxPrice = await contract.boxPrice();
      console.log("✅ Box Price:", ethers.formatEther(boxPrice), "ETH");
    } catch (err) {
      console.log("❌ Failed to read boxPrice:", err.message);
      console.log("   Error code:", err.code);
      console.log("   Full error:", err);
    }
    
    try {
      const totalSupply = await contract.totalSupply();
      console.log("✅ Total Supply:", totalSupply.toString());
    } catch (err) {
      console.log("❌ Failed to read totalSupply:", err.message);
    }
    
    console.log("\n✅ Test completed!");
    
  } catch (error) {
    console.error("❌ Error:", error.message);
    console.error("Full error:", error);
  }
}

testContract();

