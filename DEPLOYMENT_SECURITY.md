# 🔒 Deployment Security Guide

## Important Security Practices

### ⚠️ Never Store Private Keys in Code

**DO NOT:**
- ❌ Store private keys in `.env` files
- ❌ Commit private keys to version control
- ❌ Hard-code private keys in configuration files
- ❌ Share private keys in documentation

**DO:**
- ✅ Use MetaMask for all wallet operations
- ✅ Use hardware wallets for production deployments
- ✅ Keep private keys in secure, encrypted storage
- ✅ Use environment variables only for non-sensitive data

## Deployment Methods

### Method 1: MetaMask (Recommended for Development)

All contract deployments and transactions should use MetaMask:

```bash
# Start Hardhat console
npx hardhat console --network sepolia

# In console, MetaMask will prompt for transactions
```

### Method 2: Hardhat Ignition (Coming Soon)

Hardhat Ignition provides a secure deployment workflow without exposing private keys.

### Method 3: Hardware Wallet (Production)

For production deployments, use Ledger or Trezor hardware wallets with Hardhat.

## Frontend Wallet Connection

The frontend **only** supports MetaMask:

- Users connect their own wallets
- No private keys stored in application
- All transactions signed through MetaMask
- Complete user control over funds

## Environment Variables

The project uses minimal environment variables:

### Optional Variables

```bash
# RPC endpoint (has fallback to public RPC)
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_PROJECT_ID

# For contract verification on Etherscan
ETHERSCAN_API_KEY=YOUR_API_KEY

# Enable gas reporting
REPORT_GAS=true
```

### What's NOT Needed

- ❌ `PRIVATE_KEY` - Use MetaMask instead
- ❌ `MNEMONIC` - Use MetaMask instead
- ❌ Any wallet credentials

## Safe Deployment Workflow

### 1. Local Testing

```bash
# Start local node
npx hardhat node

# Deploy to local network (uses test accounts)
npx hardhat run scripts/deploy.js --network localhost
```

### 2. Testnet Deployment

**Using MetaMask:**

1. Ensure MetaMask is installed and unlocked
2. Switch to Sepolia network
3. Have sufficient test ETH
4. Run deployment through Hardhat console:

```bash
npx hardhat console --network sepolia

# MetaMask will prompt for each transaction
```

**Alternative - Using Hardhat Tasks:**

Create a custom task that prompts for MetaMask signature.

### 3. Production Deployment

For mainnet deployment:

1. **Use Hardware Wallet**: Connect Ledger/Trezor
2. **Multi-sig Wallet**: Use Gnosis Safe for additional security
3. **Test First**: Deploy to testnet and verify functionality
4. **Audit**: Have contracts audited before mainnet deployment

## Security Checklist

Before deploying to production:

- [ ] Contracts audited by professional security firm
- [ ] All tests passing
- [ ] No private keys in code or configuration
- [ ] Using hardware wallet or multi-sig
- [ ] Emergency pause functionality tested
- [ ] Ownership transfer mechanism verified
- [ ] Gas limits tested
- [ ] Event logging complete

## Common Security Mistakes

### ❌ Mistake 1: Storing Private Keys in .env

```bash
# WRONG - Never do this
PRIVATE_KEY=0x1234567890abcdef...
```

### ❌ Mistake 2: Committing .env to Git

```bash
# WRONG - .env should be in .gitignore
git add .env
git commit -m "Add environment variables"
```

### ❌ Mistake 3: Using Same Key for Dev and Prod

Never use the same wallet for testing and production.

## Best Practices

### ✅ Use Separate Wallets

- **Development**: MetaMask with test accounts
- **Testing**: Dedicated testnet wallet
- **Production**: Hardware wallet or multi-sig

### ✅ Use .gitignore

Ensure `.env` is in `.gitignore`:

```
.env
.env.local
.env.*.local
*.key
*.pem
```

### ✅ Environment Variable Management

Use platform-specific secret management:

- **Vercel**: Use Vercel Secrets
- **GitHub Actions**: Use GitHub Secrets
- **AWS**: Use AWS Secrets Manager
- **Local**: Use OS keychain

### ✅ Regular Security Updates

```bash
# Update dependencies regularly
npm audit
npm audit fix

# Check for vulnerabilities
npm audit --production
```

## Emergency Response

If private keys are compromised:

1. **Immediately**: Transfer all funds to new wallet
2. **Revoke**: Revoke all contract permissions
3. **Notify**: Inform users if necessary
4. **Investigate**: Determine how keys were exposed
5. **Update**: Change all related credentials

## Additional Resources

- [MetaMask Best Practices](https://metamask.io/faqs/)
- [Hardware Wallet Guide](https://ethereum.org/en/wallets/)
- [Smart Contract Security](https://consensys.github.io/smart-contract-best-practices/)
- [OpenZeppelin Security](https://docs.openzeppelin.com/contracts/security)

---

## Summary

**Key Principles:**
1. Never store private keys in code
2. Use MetaMask for all wallet operations
3. Hardware wallets for production
4. Regular security audits
5. Follow industry best practices

**Remember**: Security is not optional. One mistake can compromise all funds.

---

**🔒 Stay Safe! Your security is your responsibility.**

