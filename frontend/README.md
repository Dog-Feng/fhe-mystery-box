# Mystery Box NFT - Frontend

Frontend application for the ZAMA FHE-powered mystery box NFT dApp.

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit http://localhost:3000
```

### Production

```bash
# Build production version
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
frontend/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── WalletConnect.tsx   # Wallet connection component
│   ├── MintBox.tsx         # Mint mystery box component
│   ├── MyBoxes.tsx         # My boxes list component
│   └── LanguageSwitcher.tsx # Language switcher
├── lib/
│   ├── contract.ts         # Contract config and ABI
│   └── i18n.ts            # Multi-language configuration
└── package.json
```

## 🔧 Configuration

### Contract Address

Configure in `lib/contract.ts`:

```typescript
export const CONTRACT_ADDRESS = "0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B";
```

### Network Configuration

```typescript
export const NETWORK_CONFIG = {
  chainId: 11155111, // Sepolia
  name: "Sepolia",
  rpcUrl: "https://sepolia.infura.io/v3/YOUR_KEY",
  explorerUrl: "https://sepolia.etherscan.io"
};
```

## 🎨 Features

### 1. Wallet Connection (`WalletConnect.tsx`)
- MetaMask support
- Automatic network detection
- Auto-switch to Sepolia
- Account change listener

### 2. Mint Mystery Box (`MintBox.tsx`)
- Display box price and supply
- Real-time transaction status
- Error handling
- Auto-refresh on success

### 3. My Boxes (`MyBoxes.tsx`)
- Display all owned boxes
- Unopened boxes can be opened
- Opened boxes show rarity and ID
- Real-time updates

### 4. Multi-language (`i18n.ts`)
- English and Chinese support
- Language switcher component
- LocalStorage persistence

### 5. Main Page (`page.tsx`)
- Integrates all components
- Responsive design
- Beautiful UI

## 🎯 Usage Flow

1. **Connect Wallet**
   - Click "Connect Wallet" button
   - Approve MetaMask connection
   - Auto-switch to Sepolia testnet

2. **Purchase Mystery Box**
   - Ensure wallet has sufficient ETH (0.0001 ETH + Gas)
   - Click "Buy Mystery Box" button
   - Confirm MetaMask transaction
   - Wait for confirmation

3. **Open Mystery Box**
   - Find unopened box in "My Boxes" section
   - Click "Open Box" button
   - Confirm MetaMask transaction
   - View revealed rarity and NFT ID

## 🔒 Technology Stack

- **Next.js 15**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling framework
- **ethers.js 6**: Ethereum interaction
- **ZAMA FHE**: Fully Homomorphic Encryption (to be integrated)

## 📊 Rarity System

| Rarity | Probability | Color | Emoji |
|--------|-------------|-------|-------|
| Legendary | 1% | Yellow | 👑 |
| Epic | 4% | Purple | 💎 |
| Rare | 15% | Blue | ⭐ |
| Uncommon | 30% | Green | ✨ |
| Common | 50% | Gray | 🎯 |

## 🐛 Common Issues

### 1. MetaMask Not Installed
**Issue**: "Please install MetaMask!" error

**Solution**: Visit https://metamask.io to install MetaMask browser extension

### 2. Network Error
**Issue**: Cannot connect to contract

**Solution**:
- Ensure wallet connected to Sepolia testnet
- Check RPC URL is correct
- Try refreshing page

### 3. Insufficient Balance
**Issue**: Transaction fails with "Insufficient balance"

**Solution**:
- Get test ETH from Sepolia faucet
- Recommended: https://sepoliafaucet.com

### 4. Gas Estimation Failed
**Issue**: Cannot send transaction

**Solution**:
- Check contract is not paused
- Verify wallet has sufficient Gas
- Try increasing Gas Limit

## 🚀 Deployment

### Vercel Deployment

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Login and deploy:
```bash
vercel login
vercel
```

### Other Platforms

- **Netlify**: Connect GitHub repo for auto-deploy
- **AWS Amplify**: Use AWS deployment
- **Self-hosted**: Use `npm run build && npm start`

## 🌍 Multi-language

### Add New Translation

1. Edit `lib/i18n.ts`:
```typescript
export interface Translations {
  // Add new field
  newField: string;
}

export const translations = {
  en: {
    newField: "English text",
  },
  zh: {
    newField: "中文文本",
  },
};
```

2. Use in component:
```typescript
<p>{t.newField}</p>
```

### Supported Languages

- English (en)
- Chinese (zh)

## 📝 Development Notes

1. **Environment Variables**: Don't expose private keys in production
2. **RPC Limits**: Use your own Infura API Key
3. **Gas Optimization**: Be mindful of Gas costs for batch operations
4. **Error Handling**: Provide clear error messages for better UX

## 🔜 Future Improvements

- [ ] Integrate real FHEVM decryption
- [ ] Add mystery box marketplace
- [ ] Support more wallets (WalletConnect)
- [ ] Add animations
- [ ] Multi-language support expansion
- [ ] PWA support

## 📞 Technical Support

- **Contract Address**: `0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B`
- **Etherscan**: https://sepolia.etherscan.io/address/0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B
- **Network**: Sepolia Testnet (Chain ID: 11155111)

---

**🎉 Start exploring mysterious NFT mystery boxes!**
