const hre = require("hardhat");
const { ethers } = require("hardhat");

async function main() {
  console.log("Starting MysteryBoxNFT contract deployment...\n");
  
  // Get deployer account
  const [deployer] = await ethers.getSigners();
  console.log("Deployer account:", deployer.address);
  console.log("Account balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");
  
  // Contract parameters
  const NAME = "Mystery Box NFT";
  const SYMBOL = "MBX";
  const BOX_PRICE = ethers.parseEther("0.0001"); // 0.0001 ETH
  const MAX_SUPPLY = 0; // 0 = unlimited
  
  console.log("Contract parameters:");
  console.log("- Name:", NAME);
  console.log("- Symbol:", SYMBOL);
  console.log("- Price:", ethers.formatEther(BOX_PRICE), "ETH");
  console.log("- Max supply:", MAX_SUPPLY === 0 ? "Unlimited" : MAX_SUPPLY);
  console.log();
  
  // Deploy contract
  console.log("Deploying contract...");
  const MysteryBoxNFT = await ethers.getContractFactory("MysteryBoxNFT");
  const mysteryBox = await MysteryBoxNFT.deploy(NAME, SYMBOL, BOX_PRICE, MAX_SUPPLY);
  
  await mysteryBox.waitForDeployment();
  const contractAddress = await mysteryBox.getAddress();
  
  console.log("✅ Contract deployed successfully!");
  console.log("Contract address:", contractAddress);
  console.log();
  
  // Set base URI (optional)
  const BASE_URI = "ipfs://QmYourCIDHere/";
  console.log("Setting base URI:", BASE_URI);
  const tx = await mysteryBox.setBaseURI(BASE_URI);
  await tx.wait();
  console.log("✅ Base URI set successfully\n");
  
  // Verify deployment
  console.log("Verifying deployment...");
  const name = await mysteryBox.name();
  const symbol = await mysteryBox.symbol();
  const price = await mysteryBox.boxPrice();
  const owner = await mysteryBox.owner();
  
  console.log("Contract info:");
  console.log("- Name:", name);
  console.log("- Symbol:", symbol);
  console.log("- Price:", ethers.formatEther(price), "ETH");
  console.log("- Owner:", owner);
  console.log("- Paused:", await mysteryBox.mintPaused());
  console.log();
  
  // Save deployment info
  const deploymentInfo = {
    network: hre.network.name,
    contractAddress: contractAddress,
    deployer: deployer.address,
    timestamp: new Date().toISOString(),
    parameters: {
      name: NAME,
      symbol: SYMBOL,
      boxPrice: ethers.formatEther(BOX_PRICE),
      maxSupply: MAX_SUPPLY,
      baseURI: BASE_URI
    }
  };
  
  console.log("=".repeat(60));
  console.log("Deployment completed!");
  console.log("=".repeat(60));
  console.log("\nDeployment info:");
  console.log(JSON.stringify(deploymentInfo, null, 2));
  console.log("\nSave this info for frontend configuration!");
  
  // If testnet, suggest contract verification
  if (hre.network.name === "sepolia") {
    console.log("\nTo verify contract, run:");
    console.log(`npx hardhat verify --network sepolia ${contractAddress} "${NAME}" "${SYMBOL}" "${BOX_PRICE}" ${MAX_SUPPLY}`);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
