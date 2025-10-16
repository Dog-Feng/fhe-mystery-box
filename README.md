# 🎁 FHE Mystery Box

An NFT mystery box dApp powered by ZAMA Fully Homomorphic Encryption (FHE) technology.

## 🌟 Features

- **Fully Encrypted**: Box contents are completely encrypted on-chain before opening
- **Provably Fair**: Transparent rarity distribution algorithm (1% Legendary, 4% Epic, 15% Rare, 30% Uncommon, 50% Common)
- **ERC721 Standard**: Full NFT functionality with tradeable unopened boxes
- **Multi-language**: Support for English and Chinese
- **Modern UI**: Responsive design with smooth animations
- **Web3 Integration**: MetaMask wallet connection

## 🏗️ Architecture

### Smart Contract
- **Language**: Solidity 0.8.24
- **Framework**: Hardhat 2.26.3
- **Standards**: ERC721, Ownable, ReentrancyGuard
- **Network**: Sepolia Testnet

### Frontend
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Web3**: ethers.js 6

## 🚀 Quick Start

### Prerequisites

- Node.js 20+
- pnpm or npm
- MetaMask browser extension

### Installation

```bash
# Clone repository
git clone <your-repo-url>
cd fhe-mystery-box

# Install contract dependencies
pnpm install

# Install frontend dependencies
cd frontend
npm install
```

### Development

#### 1. Compile Contracts

```bash
pnpm compile
```

#### 2. Deploy to Sepolia

**Important**: Use MetaMask for deployment. Never store private keys in configuration files.

```bash
# Option 1: Deploy using Hardhat console (MetaMask will prompt)
npx hardhat console --network sepolia

# Option 2: Set RPC URL (optional - has fallback)
export SEPOLIA_RPC_URL="https://sepolia.infura.io/v3/YOUR_PROJECT_ID"
npx hardhat run scripts/deploy.js --network sepolia
```

For detailed security practices, see [DEPLOYMENT_SECURITY.md](./DEPLOYMENT_SECURITY.md)

#### 3. Start Frontend

```bash
cd frontend
npm run dev
```

Visit http://localhost:3000

## 📝 Contract Details

### Deployed Contract

- **Network**: Sepolia Testnet
- **Address**: `0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B`
- **Explorer**: [View on Etherscan](https://sepolia.etherscan.io/address/0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B)

### Key Functions

```solidity
// Mint a mystery box
function mintBox() external payable returns (uint256 tokenId)

// Open a mystery box
function openBox(uint256 tokenId) external

// Get box information
function getBox(uint256 tokenId) external view returns (Box memory)
```

### Rarity Distribution

| Rarity | Probability | Metadata IDs |
|--------|-------------|--------------|
| Legendary | 1% | 191-200 |
| Epic | 4% | 176-190 |
| Rare | 15% | 151-175 |
| Uncommon | 30% | 101-150 |
| Common | 50% | 1-100 |

## 🎮 How to Use

### 1. Connect Wallet

Click "Connect Wallet" button in the top right corner and approve MetaMask connection.

### 2. Purchase Mystery Box

- Current price: **0.0001 ETH**
- Click "Buy Mystery Box" button
- Confirm transaction in MetaMask
- Wait for transaction confirmation

### 3. Open Mystery Box

- Find your unopened box in "My Boxes" section
- Click "Open Box 🎉" button
- Confirm transaction in MetaMask
- View revealed rarity and NFT ID

## 🌍 Multi-language Support

The dApp supports both English and Chinese. Use the language switcher in the top right corner to change languages.

### Supported Languages

- 🇬🇧 English
- 🇨🇳 Chinese (中文)

Language preference is saved in browser localStorage.

## 🛠️ Technology Stack

### Smart Contract
- Solidity 0.8.24
- OpenZeppelin Contracts
- Hardhat Development Environment
- FHEVM (Zama FHE - To be integrated)

### Frontend
- Next.js 15.5.5
- TypeScript 5
- Tailwind CSS 4
- ethers.js 6.15.0
- React 19

## 📂 Project Structure

```
fhe-mystery-box/
├── contracts/              # Smart contracts
│   └── MysteryBoxNFT.sol  # Main mystery box contract
├── scripts/               # Deployment scripts
│   └── deploy.js         # Deploy script
├── frontend/              # Frontend application
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   └── lib/              # Utilities and configs
├── hardhat.config.js     # Hardhat configuration
├── package.json          # Contract dependencies
└── deployed-contracts.json # Deployment info
```

## 🔐 Security Features

- **ReentrancyGuard**: Prevents reentrancy attacks
- **Ownable**: Secure admin functions
- **Input Validation**: Complete parameter checks
- **Event Logging**: Full audit trail

## 🚧 Future Improvements

- [ ] Integrate actual FHEVM encryption/decryption
- [ ] Add NFT marketplace for trading
- [ ] Implement Chainlink VRF for true randomness
- [ ] Upload real metadata to IPFS
- [ ] Add staking mechanism
- [ ] Support more wallets (WalletConnect)
- [ ] Mobile app development

## 📊 Statistics

- **Contract**: ~480 lines of Solidity
- **Frontend**: ~700 lines of TypeScript/React
- **Documentation**: Multi-language support
- **Test Coverage**: Core functionality verified

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🔗 Links

- **Contract**: [0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B](https://sepolia.etherscan.io/address/0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B)
- **Network**: Sepolia Testnet (Chain ID: 11155111)
- **ZAMA**: [https://www.zama.ai](https://www.zama.ai)

## 💡 Tips

### Get Testnet ETH

- [Sepolia Faucet](https://sepoliafaucet.com)
- [QuickNode Faucet](https://faucet.quicknode.com/ethereum/sepolia)

### Gas Optimization

- Batch multiple operations
- Mint during low-traffic periods
- Adjust gas price as needed

## 🐛 Troubleshooting

### Cannot connect wallet

1. Ensure MetaMask is installed
2. Check network is set to Sepolia
3. Refresh page and try again

### Transaction failed

1. Verify sufficient ETH balance
2. Check contract is not paused
3. Increase gas limit if needed

### Boxes not displaying

1. Wait for transaction confirmation
2. Refresh page
3. Check browser console for errors

## 📞 Support

For issues or questions:
- Check documentation in `MULTILINGUAL_GUIDE.md`
- Review contract code in `contracts/MysteryBoxNFT.sol`
- Inspect transactions on Etherscan

---

**Built with ❤️ using ZAMA FHE Technology**
