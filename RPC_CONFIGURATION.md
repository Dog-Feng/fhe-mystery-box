# 🌐 RPC Configuration Guide

This guide explains how to configure the Sepolia RPC endpoint for the frontend application.

---

## 🎯 Why Configure RPC?

Public RPC endpoints can be:
- Rate-limited
- Unreliable
- Slow during peak times

Using your own API key ensures:
- ✅ Higher request limits
- ✅ Better performance
- ✅ More reliability

---

## 🚀 Quick Setup

### Option 1: Using Ankr (No API Key Required - Default)

The application uses Ankr public RPC by default. No configuration needed!

**RPC URL**: `https://rpc.ankr.com/eth_sepolia`

**Pros**: 
- No registration required
- Free to use
- Generally reliable

**Cons**: 
- Shared endpoint (may be slow during peak times)
- Rate limits apply

---

### Option 2: Using Alchemy (Recommended for Production)

1. **Sign up**: Visit [https://www.alchemy.com/](https://www.alchemy.com/)
2. **Create an app**: 
   - Choose "Ethereum"
   - Select "Sepolia" network
3. **Get your API key**: Copy the HTTPS URL

#### On Linux Server:

```bash
# Navigate to frontend directory
cd ~/fhe-mystery-box/frontend

# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY
EOF

# Replace YOUR_API_KEY with your actual key
nano .env.local

# Rebuild application
npm run build

# Restart PM2
pm2 restart mystery-box
```

**Free Tier**: 300M compute units/month (very generous!)

---

### Option 3: Using Infura

1. **Sign up**: Visit [https://infura.io/](https://infura.io/)
2. **Create a project**:
   - Select "Web3 API"
   - Choose Ethereum
3. **Get your Project ID**: Copy it

#### On Linux Server:

```bash
cd ~/fhe-mystery-box/frontend

# Create .env.local file
cat > .env.local << 'EOF'
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID
EOF

# Replace YOUR_PROJECT_ID
nano .env.local

# Rebuild and restart
npm run build
pm2 restart mystery-box
```

**Free Tier**: 100k requests/day

---

### Option 4: Other Public RPCs

You can also use these public endpoints (no API key required):

#### BlockPI
```bash
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://ethereum-sepolia.blockpi.network/v1/rpc/public
```

#### PublicNode
```bash
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://ethereum-sepolia-rpc.publicnode.com
```

---

## 🔧 Complete Configuration Steps for Linux

### 1. Create Configuration File

```bash
cd ~/fhe-mystery-box/frontend

# Create .env.local if it doesn't exist
touch .env.local

# Edit the file
nano .env.local
```

### 2. Add Your RPC URL

Add this line (choose your preferred RPC):

```env
# Using Alchemy (recommended)
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/YOUR_API_KEY

# OR using Infura
# NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# OR using Ankr (default - already configured)
# NEXT_PUBLIC_SEPOLIA_RPC_URL=https://rpc.ankr.com/eth_sepolia
```

Save the file: `Ctrl+X`, then `Y`, then `Enter`

### 3. Rebuild Application

```bash
# Clear old build
rm -rf .next

# Rebuild with new configuration
npm run build
```

### 4. Restart Application

```bash
pm2 restart mystery-box
pm2 logs mystery-box
```

---

## ✅ Verify Configuration

### Test RPC Connection

```bash
cd ~/fhe-mystery-box

# Update test script to use your RPC
nano test-contract.js

# Change the RPC_URL line to:
# const RPC_URL = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.ankr.com/eth_sepolia";

# Run test
node test-contract.js
```

Expected output:
```
✅ Connected to Sepolia RPC
✅ Contract instance created
✅ Box Price: 0.0001 ETH
✅ Total Supply: X
```

---

## 🔍 Troubleshooting

### Error: "project ID exceeded quota"
**Solution**: Your API key has reached its limit. Either:
- Wait for the quota to reset
- Upgrade your plan
- Use a different RPC provider

### Error: "server response 522"
**Solution**: The RPC endpoint is down or unreachable. Try:
- A different RPC provider
- Check your network connection
- Wait a few minutes and retry

### Error: "Network connection timeout"
**Solution**: 
- Check your firewall settings
- Verify DNS is working: `ping rpc.ankr.com`
- Try a different RPC URL

### Frontend still shows old price or errors
**Solution**: 
1. Clear browser cache (Ctrl+Shift+R)
2. Ensure `.env.local` is in the `frontend` directory
3. Rebuild: `npm run build`
4. Restart PM2: `pm2 restart mystery-box`
5. Check logs: `pm2 logs mystery-box`

---

## 📊 RPC Provider Comparison

| Provider | Free Tier | API Key Required | Reliability | Speed |
|----------|-----------|------------------|-------------|-------|
| **Alchemy** | 300M compute units/month | ✅ Yes | ⭐⭐⭐⭐⭐ | ⚡⚡⚡⚡⚡ |
| **Infura** | 100k req/day | ✅ Yes | ⭐⭐⭐⭐ | ⚡⚡⚡⚡ |
| **Ankr** | Shared public | ❌ No | ⭐⭐⭐ | ⚡⚡⚡ |
| **BlockPI** | Shared public | ❌ No | ⭐⭐⭐ | ⚡⚡⚡ |

---

## 🎯 Recommended Setup

### For Development
- Use Ankr public RPC (default)
- No configuration needed

### For Production
- Use Alchemy (best performance and generous free tier)
- Configure `.env.local` with your API key
- Monitor usage in Alchemy dashboard

---

## 📝 Quick Commands Reference

```bash
# Create config file
cd ~/fhe-mystery-box/frontend
nano .env.local

# Add your RPC URL
NEXT_PUBLIC_SEPOLIA_RPC_URL=YOUR_RPC_URL_HERE

# Rebuild
npm run build

# Restart
pm2 restart mystery-box

# Check logs
pm2 logs mystery-box

# Test connection
cd ~/fhe-mystery-box
node test-contract.js
```

---

## 🆘 Need Help?

If you continue to have issues:

1. Check the [README.md](./README.md) troubleshooting section
2. Verify your API key is correct
3. Test the RPC URL directly in your browser
4. Check PM2 logs: `pm2 logs mystery-box --lines 50`
5. Ensure `.env.local` is in the correct directory

---

**Built with ❤️ using ZAMA FHE Technology**

