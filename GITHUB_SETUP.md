# 📦 GitHub Setup Guide

Complete guide to push this project to GitHub.

## Prerequisites

- [x] Git installed on your computer
- [ ] GitHub account created
- [ ] Project ready to push

## Step-by-Step Guide

### Step 1: Initialize Git Repository

```bash
cd d:\project\zama\fhe-mystery-box

# Initialize git repository
git init

# Verify initialization
git status
```

### Step 2: Configure Git (If First Time)

```bash
# Set your name and email
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Verify configuration
git config --list
```

### Step 3: Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click the **"+"** icon in top right
3. Select **"New repository"**
4. Fill in details:
   - **Repository name**: `fhe-mystery-box` (or your preferred name)
   - **Description**: "NFT Mystery Box dApp powered by ZAMA FHE"
   - **Visibility**: Choose Public or Private
   - **DO NOT** initialize with README, .gitignore, or license (we already have these)
5. Click **"Create repository"**

### Step 4: Add All Files to Git

```bash
# Add all files
git add .

# Check what will be committed
git status

# Verify no sensitive files are staged
git diff --cached --name-only
```

### Step 5: Create First Commit

```bash
# Create initial commit
git commit -m "Initial commit: FHE Mystery Box NFT dApp

- Smart contract with ERC721 standard
- Next.js frontend with TypeScript
- Multi-language support (EN/ZH)
- MetaMask wallet integration
- Comprehensive documentation
- Security best practices"

# Verify commit
git log
```

### Step 6: Connect to GitHub Repository

Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your actual values:

```bash
# Add remote repository
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Verify remote
git remote -v
```

**Example**:
```bash
git remote add origin https://github.com/johnsmith/fhe-mystery-box.git
```

### Step 7: Push to GitHub

```bash
# Create and push main branch
git branch -M main
git push -u origin main
```

If prompted for credentials:
- **Username**: Your GitHub username
- **Password**: Use a **Personal Access Token** (not your password)

### Step 8: Verify Upload

1. Go to your GitHub repository URL
2. Refresh the page
3. Verify all files are uploaded
4. Check README.md is displayed

## Creating GitHub Personal Access Token

If you need a token for authentication:

1. Go to GitHub Settings → Developer settings
2. Click **Personal access tokens** → **Tokens (classic)**
3. Click **Generate new token (classic)**
4. Give it a name (e.g., "FHE Mystery Box")
5. Select scopes:
   - ✅ `repo` (Full control of private repositories)
6. Click **Generate token**
7. **COPY THE TOKEN** (you won't see it again!)
8. Use this token as password when pushing

## Alternative: SSH Setup

For easier authentication without tokens:

### Generate SSH Key

```bash
# Generate SSH key
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent
eval "$(ssh-agent -s)"

# Add SSH key
ssh-add ~/.ssh/id_ed25519

# Copy public key
cat ~/.ssh/id_ed25519.pub
```

### Add SSH Key to GitHub

1. Go to GitHub Settings → SSH and GPG keys
2. Click **New SSH key**
3. Paste your public key
4. Click **Add SSH key**

### Use SSH Remote

```bash
# Remove HTTPS remote
git remote remove origin

# Add SSH remote
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO_NAME.git

# Push
git push -u origin main
```

## Quick Commands Reference

```bash
# Check status
git status

# Add files
git add .
git add filename.txt

# Commit changes
git commit -m "Your message"

# Push changes
git push

# Pull latest changes
git pull

# View commit history
git log --oneline

# Check remote
git remote -v
```

## What Gets Pushed

The following will be **included**:

```
✅ Smart contracts
✅ Frontend code
✅ Documentation (README, guides)
✅ Configuration files
✅ Package files
✅ .gitignore
```

The following will be **excluded** (by .gitignore):

```
❌ node_modules/
❌ .env files
❌ .next/ build output
❌ cache/ and artifacts/
❌ Any private keys or secrets
```

## After Pushing

### Update Repository Settings

1. **About Section**:
   - Add description
   - Add website URL (if deployed)
   - Add topics: `nft`, `fhe`, `zama`, `ethereum`, `blockchain`, `typescript`, `nextjs`

2. **README Badges** (Optional):
   Add to top of README.md:
   ```markdown
   ![Solidity](https://img.shields.io/badge/Solidity-0.8.24-blue)
   ![Next.js](https://img.shields.io/badge/Next.js-15-black)
   ![License](https://img.shields.io/badge/License-MIT-green)
   ```

3. **GitHub Pages** (Optional):
   - Settings → Pages
   - Deploy frontend using Vercel or Netlify
   - Add deployment URL to repository

## Making Updates

After initial push, to update:

```bash
# 1. Make changes to files

# 2. Check what changed
git status
git diff

# 3. Add changes
git add .

# 4. Commit with descriptive message
git commit -m "Add feature X" or "Fix bug Y"

# 5. Push to GitHub
git push
```

## Common Issues

### Issue 1: "Authentication failed"

**Solution**: Use Personal Access Token instead of password

### Issue 2: "Permission denied (publickey)"

**Solution**: Set up SSH keys (see SSH Setup above)

### Issue 3: ".env file committed"

**Solution**:
```bash
# Remove from git
git rm --cached .env

# Add to .gitignore
echo ".env" >> .gitignore

# Commit removal
git commit -m "Remove .env from tracking"
git push
```

### Issue 4: "Large files error"

**Solution**: 
- Check file sizes
- Remove `node_modules` (should be in .gitignore)
- Use Git LFS for large files if needed

## Best Practices

1. **Commit Often**: Make small, focused commits
2. **Descriptive Messages**: Write clear commit messages
3. **Check Before Push**: Always review with `git status` and `git diff`
4. **Never Commit Secrets**: Double-check no private keys or API keys
5. **Keep .gitignore Updated**: Add new patterns as needed

## Sample .gitignore (Already Included)

Your project already has a comprehensive .gitignore that prevents:
- Node modules
- Environment variables
- Build outputs
- IDE files
- Private keys
- Temporary files

## Repository Structure on GitHub

```
fhe-mystery-box/
├── 📁 contracts/        # Smart contracts
├── 📁 scripts/          # Deployment scripts
├── 📁 frontend/         # Next.js frontend
├── 📄 README.md         # Main documentation
├── 📄 hardhat.config.js # Hardhat configuration
├── 📄 package.json      # Dependencies
├── 📄 .gitignore        # Git ignore rules
└── 📁 docs/             # Additional documentation
```

## Next Steps After GitHub Push

1. **Share Your Repository**: 
   - Share link with team or community
   - Add to portfolio

2. **Set Up CI/CD** (Optional):
   - GitHub Actions for testing
   - Automated deployment

3. **Enable Issues**:
   - Track bugs and features
   - Community contributions

4. **Add License**:
   - Choose appropriate license (MIT recommended)

5. **Deploy Frontend**:
   - Vercel deployment
   - Update README with live link

## Complete Command Sequence

Here's the complete sequence to run:

```bash
# 1. Navigate to project
cd d:\project\zama\fhe-mystery-box

# 2. Initialize git
git init

# 3. Add all files
git add .

# 4. Create first commit
git commit -m "Initial commit: FHE Mystery Box NFT dApp"

# 5. Add remote (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/fhe-mystery-box.git

# 6. Push to GitHub
git branch -M main
git push -u origin main
```

## Verification Checklist

After pushing, verify:

- [ ] All files visible on GitHub
- [ ] README displays correctly
- [ ] No sensitive files committed (.env, private keys)
- [ ] .gitignore working (node_modules not uploaded)
- [ ] Repository description added
- [ ] Topics/tags added
- [ ] License file present

---

## Ready to Push?

Follow the steps in order:

1. ✅ Initialize Git
2. ✅ Create GitHub repository
3. ✅ Add files
4. ✅ Commit
5. ✅ Connect remote
6. ✅ Push
7. ✅ Verify

**Good luck with your GitHub upload! 🚀**

