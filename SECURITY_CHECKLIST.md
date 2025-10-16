# 🔒 Security Checklist

Quick security verification before deployment and development.

## Before Every Deployment

### Pre-Deployment Checks

- [ ] **No Private Keys in Code**
  - Check `hardhat.config.js` - no private keys
  - Check `.env` files - not committed to git
  - Search codebase for `0x[0-9a-fA-F]{64}` patterns

- [ ] **MetaMask Ready**
  - MetaMask installed and unlocked
  - Correct network selected (Sepolia for testnet)
  - Sufficient ETH for gas fees

- [ ] **Git Status Clean**
  ```bash
  git status
  # Ensure no sensitive files are staged
  ```

- [ ] **Environment Variables**
  - Only non-sensitive data in `.env`
  - `.env` is in `.gitignore`
  - No `PRIVATE_KEY` variable

### Code Review

- [ ] **Smart Contract**
  - All functions have access control
  - ReentrancyGuard on payable functions
  - Events emitted for important state changes
  - No hardcoded addresses

- [ ] **Frontend**
  - Only MetaMask for wallet connection
  - No private keys in frontend code
  - Proper error handling
  - Input validation

### Testing

- [ ] **Local Tests Pass**
  ```bash
  pnpm compile
  # Verify compilation successful
  ```

- [ ] **Gas Estimation**
  - Reasonable gas limits
  - Not hitting block gas limit

## Deployment Process

### Step-by-Step Secure Deployment

1. **Verify Network**
   ```bash
   # Check you're on the right network
   npx hardhat console --network sepolia
   > network.name
   ```

2. **Check Balance**
   - Ensure deployer has sufficient ETH
   - Factor in gas costs

3. **Deploy**
   ```bash
   # MetaMask will prompt for signature
   npx hardhat run scripts/deploy.js --network sepolia
   ```

4. **Verify Deployment**
   - Check contract on Etherscan
   - Verify ownership is correct
   - Test basic functions

5. **Save Contract Address**
   - Update `deployed-contracts.json`
   - Update frontend configuration
   - Document deployment details

## Post-Deployment

### Immediate Actions

- [ ] **Verify Contract on Etherscan**
  ```bash
  npx hardhat verify --network sepolia <ADDRESS> "Mystery Box NFT" "MBX" "100000000000000" 0
  ```

- [ ] **Test Contract Functions**
  - Try minting a box
  - Try opening a box
  - Verify events are emitted

- [ ] **Update Documentation**
  - Contract address in README
  - Deployment notes
  - Any configuration changes

### Security Monitoring

- [ ] **Set Up Monitoring**
  - Monitor contract on Etherscan
  - Set up alerts for large transactions
  - Watch for unusual activity

- [ ] **Access Control**
  - Verify owner address
  - Test admin functions
  - Ensure pause mechanism works

## Development Security

### Daily Development Practices

- [ ] **Never Commit Secrets**
  ```bash
  # Before committing
  git diff
  # Review all changes
  ```

- [ ] **Use Test Accounts**
  - Separate wallets for development
  - Never use production wallets for testing

- [ ] **Regular Updates**
  ```bash
  npm audit
  npm audit fix
  ```

### Code Quality

- [ ] **Linting**
  ```bash
  npm run lint
  ```

- [ ] **Type Checking**
  ```bash
  npx tsc --noEmit
  ```

- [ ] **Security Analysis**
  - Review dependencies
  - Check for known vulnerabilities
  - Update packages regularly

## Emergency Procedures

### If Private Key Compromised

1. **Immediate Actions**
   - [ ] Transfer all funds to new wallet
   - [ ] Revoke all approvals
   - [ ] Pause contract if possible

2. **Investigation**
   - [ ] Determine how key was exposed
   - [ ] Check transaction history
   - [ ] Identify affected users

3. **Recovery**
   - [ ] Deploy new contract if needed
   - [ ] Migrate user data
   - [ ] Communicate with users

### If Contract Bug Found

1. **Assessment**
   - [ ] Severity of bug
   - [ ] Potential impact
   - [ ] Funds at risk

2. **Mitigation**
   - [ ] Pause contract
   - [ ] Notify users
   - [ ] Plan fix

3. **Resolution**
   - [ ] Deploy fixed version
   - [ ] Verify fix
   - [ ] Resume operations

## Quick Security Commands

```bash
# Check for sensitive data
grep -r "PRIVATE_KEY" .
grep -r "0x[0-9a-fA-F]\{64\}" .

# Verify .gitignore working
git check-ignore .env

# Check git history for leaked secrets
git log -p | grep -i "private"

# Audit dependencies
npm audit --production

# List environment variables
printenv | grep -i key
```

## Common Security Issues

### ❌ Issue: Private key in .env
**Solution**: Remove from .env, use MetaMask

### ❌ Issue: .env committed to git
**Solution**: 
```bash
git rm --cached .env
echo ".env" >> .gitignore
git commit -m "Remove .env from tracking"
```

### ❌ Issue: Same wallet for dev and prod
**Solution**: Use separate wallets for each environment

### ❌ Issue: Insufficient gas
**Solution**: Check gas estimation before deployment

## Resources

- [OpenZeppelin Security](https://docs.openzeppelin.com/contracts/security)
- [Consensys Smart Contract Best Practices](https://consensys.github.io/smart-contract-best-practices/)
- [Ethereum Security](https://ethereum.org/en/security/)
- [MetaMask Best Practices](https://metamask.io/faqs/)

## Verification Commands

```bash
# Verify no secrets in code
rg "PRIVATE_KEY|private.*key|mnemonic" --type-not json

# Check .gitignore is working
git status --ignored

# Verify contract deployment
npx hardhat verify --help
```

---

## Remember

> **Security is not a feature, it's a requirement.**

- Never rush deployments
- Always use test networks first
- Keep private keys secure
- Use MetaMask for all wallet operations
- Regular security audits

**When in doubt, don't deploy. Ask for help.**

---

**🔒 Stay secure!**

