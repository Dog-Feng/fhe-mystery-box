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

- **Node.js** 20+ ([Download](https://nodejs.org/))
- **pnpm** or **npm** (Node package manager)
- **MetaMask** browser extension ([Install](https://metamask.io/))
- **Git** for version control

### Installation

```bash
# Clone repository
git clone https://github.com/Dog-Feng/fhe-mystery-box.git
cd fhe-mystery-box

# Install contract dependencies
npm install
# or
pnpm install

# Install frontend dependencies
cd frontend
npm install
```

---

## 📦 Deployment Guide

### Option 1: Local Development

#### 1. Compile Smart Contracts

```bash
# In project root
npx hardhat compile
```

#### 2. Deploy to Sepolia Testnet

**⚠️ Security Note**: Use MetaMask for deployment. Never store private keys in code.

```bash
# Deploy using Hardhat (MetaMask will prompt for transaction)
npx hardhat run scripts/deploy.js --network sepolia
```

**Configuration**:
- RPC URL is configured with a public fallback
- No private keys needed - MetaMask handles signing
- See `hardhat.config.js` for network settings

#### 3. Update Frontend Configuration

After deployment, update `frontend/lib/contract.ts`:

```typescript
export const CONTRACT_ADDRESS = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
```

#### 4. Start Frontend (Development)

```bash
cd frontend
npm run dev
```

Visit http://localhost:3000

---

### Option 2: Production Deployment (Linux Server)

Complete guide for deploying to a Linux VPS or server.

#### Step 1: Prepare Server

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 20.x
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install PM2 globally
sudo npm install -g pm2

# Install Git
sudo apt install -y git
```

#### Step 2: Clone and Setup Project

```bash
# Clone repository
git clone https://github.com/Dog-Feng/fhe-mystery-box.git
cd fhe-mystery-box

# Install contract dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

#### Step 3: Build Frontend for Production

```bash
# In frontend directory
npm run build
```

**Expected output**:
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (5/5)
✓ Build completed successfully
```

#### Step 4: Start with PM2

```bash
# Start production server
pm2 start npm --name "mystery-box" -- start

# Save PM2 configuration
pm2 save

# Enable PM2 startup on boot
pm2 startup
# Follow the command output instructions
```

#### Step 5: Configure Firewall

```bash
# Allow HTTP traffic on port 3000
sudo ufw allow 3000/tcp
sudo ufw reload
```

#### Step 6: (Optional) Setup Nginx Reverse Proxy

```bash
# Install Nginx
sudo apt install nginx -y

# Create Nginx configuration
sudo nano /etc/nginx/sites-available/mystery-box
```

**Nginx config**:
```nginx
server {
    listen 80;
    server_name your-domain.com;  # Replace with your domain

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/mystery-box /etc/nginx/sites-enabled/

# Test configuration
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx

# Allow Nginx through firewall
sudo ufw allow 'Nginx Full'
```

#### Step 7: (Optional) Add SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com

# Certificate will auto-renew
```

---

### Option 3: Deploy to Vercel (Easiest)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Dog-Feng/fhe-mystery-box)

1. Visit [Vercel](https://vercel.com)
2. Import your GitHub repository
3. Configure:
   - **Root Directory**: `frontend`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
4. Click **Deploy**
5. Done! Your dApp is live with automatic HTTPS and CDN

---

## 🔄 Update Deployment

### For PM2 Deployments

```bash
# Navigate to project
cd ~/fhe-mystery-box

# Pull latest changes
git pull origin main

# Rebuild frontend
cd frontend
npm install
npm run build

# Restart PM2
pm2 restart mystery-box

# View logs
pm2 logs mystery-box
```

### Quick Update Script

```bash
#!/bin/bash
cd ~/fhe-mystery-box && \
git pull origin main && \
cd frontend && \
npm install && \
npm run build && \
pm2 restart mystery-box && \
echo "✅ Deployment updated successfully!"
```

---

## 🛠️ PM2 Management Commands

```bash
# View application status
pm2 status

# View real-time logs
pm2 logs mystery-box

# View last 100 log lines
pm2 logs mystery-box --lines 100

# Restart application
pm2 restart mystery-box

# Stop application
pm2 stop mystery-box

# Delete application
pm2 delete mystery-box

# Monitor performance
pm2 monit

# View detailed info
pm2 show mystery-box
```

---

## 🌐 Access Your dApp

### Local Development
- **URL**: http://localhost:3000

### Production (Direct)
- **URL**: http://YOUR_SERVER_IP:3000
- Example: http://202.61.192.99:3000

### Production (with Nginx)
- **URL**: http://your-domain.com
- **SSL**: https://your-domain.com (with Let's Encrypt)

### Vercel
- **URL**: https://your-project.vercel.app
- Automatic HTTPS and custom domain support

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

### Frontend Issues

#### Cannot connect wallet
1. Ensure MetaMask is installed and unlocked
2. Check network is set to **Sepolia Testnet**
3. Clear browser cache and refresh page
4. Check browser console for errors

#### Price shows "..." or "0.1 ETH" instead of "0.0001 ETH"
1. Check contract address in `frontend/lib/contract.ts` matches deployed contract
2. Verify you're connected to Sepolia network
3. Clear browser cache and hard refresh (Ctrl+Shift+R)
4. Check browser console for errors

#### "BAD_DATA" or "could not decode result data" error
1. **Contract ABI mismatch** - Ensure `frontend/lib/contract.ts` has complete ABI
2. Verify contract address is correct
3. Check you're connected to the right network (Sepolia)
4. Rebuild frontend: `npm run build`

#### Page keeps refreshing/flickering
1. Check for infinite loops in React components
2. Verify `useEffect` dependencies are correct
3. Check browser console for errors
4. Try disabling browser extensions

### Smart Contract Issues

#### Transaction failed
1. Verify sufficient ETH balance (need > 0.0001 ETH + gas)
2. Check contract is not paused: `contract.mintPaused()`
3. Increase gas limit in MetaMask
4. Check Sepolia network is not congested

#### Box not opening
1. Verify you own the box: `contract.ownerOf(tokenId)`
2. Check box hasn't been opened already
3. Ensure sufficient gas for transaction
4. Check transaction status on Etherscan

#### Boxes not displaying
1. Wait for transaction confirmation (check Etherscan)
2. Refresh page after ~30 seconds
3. Check wallet is connected to correct account
4. Verify contract address and network

### Deployment Issues

#### Build fails with TypeScript errors
1. Run `npm install` to ensure all dependencies are installed
2. Check Node.js version: `node --version` (should be 20+)
3. Clear build cache: `rm -rf .next && npm run build`
4. Check for missing type definitions

#### PM2 process not found
```bash
# Start new process
pm2 start npm --name "mystery-box" -- start
pm2 save
```

#### Port 3000 already in use
```bash
# Find process using port 3000
lsof -i :3000
# or
netstat -tulpn | grep 3000

# Kill the process
kill -9 <PID>

# Or use a different port
PORT=3001 pm2 start npm --name "mystery-box" -- start
```

#### "Could not find a production build" error
```bash
# Build the frontend first
cd frontend
npm run build

# Then start
pm2 restart mystery-box
```

### Network Issues

#### Cannot access from external IP
1. Check firewall allows port 3000:
   ```bash
   sudo ufw allow 3000/tcp
   sudo ufw status
   ```
2. Verify app is listening on 0.0.0.0 (not just localhost)
3. Check cloud provider security groups (AWS, Azure, etc.)

#### SSL/HTTPS not working
1. Verify domain DNS points to server IP
2. Check Certbot renewal: `sudo certbot renew --dry-run`
3. Verify Nginx configuration: `sudo nginx -t`
4. Check firewall allows ports 80 and 443

### Still Having Issues?

1. **Check logs**:
   ```bash
   # PM2 logs
   pm2 logs mystery-box
   
   # Nginx logs
   sudo tail -f /var/log/nginx/error.log
   ```

2. **Check contract on Etherscan**:
   - Visit: https://sepolia.etherscan.io/address/0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B
   - Verify contract is verified and deployed correctly

3. **Browser console**:
   - Open DevTools (F12)
   - Check Console tab for JavaScript errors
   - Check Network tab for failed requests

4. **Test contract directly**:
   ```bash
   npx hardhat console --network sepolia
   > const contract = await ethers.getContractAt("MysteryBoxNFT", "0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B")
   > await contract.boxPrice()
   > await contract.totalSupply()
   ```

## 📞 Support

For issues or questions:
- Check documentation in `MULTILINGUAL_GUIDE.md`
- Review contract code in `contracts/MysteryBoxNFT.sol`
- Inspect transactions on Etherscan

## 📚 Additional Documentation

- [Multilingual Guide](./MULTILINGUAL_GUIDE.md) - Language switching implementation
- [Deployment Security](./DEPLOYMENT_SECURITY.md) - Security best practices
- [Security Checklist](./SECURITY_CHECKLIST.md) - Pre-deployment security checks
- [Linux Deployment](./LINUX_DEPLOYMENT.md) - **Complete Linux server deployment guide**
- [GitHub Setup](./GITHUB_SETUP.md) - Version control setup

---

**Built with ❤️ using ZAMA FHE Technology**
