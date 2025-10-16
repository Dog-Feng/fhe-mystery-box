export type Language = 'en' | 'zh';

export interface Translations {
  // Header
  title: string;
  subtitle: string;
  connectWallet: string;
  disconnect: string;
  
  // Hero Section
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  
  // Features
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  
  // Mint Box
  mysteryBox: string;
  boxDescription: string;
  boxPrice: string;
  minted: string;
  rarityProbability: string;
  legendary: string;
  epic: string;
  rare: string;
  uncommon: string;
  common: string;
  buyBox: string;
  minting: string;
  pleaseConnect: string;
  
  // My Boxes
  myBoxes: string;
  unopened: string;
  openBox: string;
  opening: string;
  noBoxes: string;
  noBoxesDesc: string;
  mintedAt: string;
  openedAt: string;
  
  // Footer
  builtWith: string;
  contractAddress: string;
  viewOnEtherscan: string;
  
  // Errors
  installMetaMask: string;
  switchNetwork: string;
  connectionFailed: string;
  insufficientBalance: string;
  transactionCancelled: string;
  mintFailed: string;
  openFailed: string;
  loadFailed: string;
  
  // Info
  ensureSepolia: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header
    title: 'Mystery Box NFT',
    subtitle: 'Based on ZAMA FHE',
    connectWallet: 'Connect Wallet',
    disconnect: 'Disconnect',
    
    // Hero Section
    heroTitle: 'Explore Mysterious NFT Mystery Boxes',
    heroSubtitle: 'Powered by ZAMA Fully Homomorphic Encryption',
    heroDescription: 'Box contents are fully encrypted before opening, ensuring absolute fairness',
    
    // Features
    feature1Title: 'Fully Encrypted',
    feature1Desc: 'Using ZAMA FHE technology, box contents are fully encrypted on-chain',
    feature2Title: 'Absolutely Fair',
    feature2Desc: 'Rarity randomly assigned, algorithm open and transparent, unpredictable',
    feature3Title: '5 Rarity Levels',
    feature3Desc: 'From common to legendary, every box has a chance to reveal rare NFTs',
    
    // Mint Box
    mysteryBox: 'Mystery Box',
    boxDescription: 'Purchase an NFT mystery box full of surprises',
    boxPrice: 'Box Price',
    minted: 'Minted',
    rarityProbability: 'Rarity Probability',
    legendary: 'Legendary',
    epic: 'Epic',
    rare: 'Rare',
    uncommon: 'Uncommon',
    common: 'Common',
    buyBox: 'Buy Mystery Box',
    minting: 'Minting...',
    pleaseConnect: 'Please connect wallet first',
    
    // My Boxes
    myBoxes: 'My Boxes',
    unopened: 'Unopened',
    openBox: 'Open Box 🎉',
    opening: 'Opening...',
    noBoxes: "You don't have any boxes yet",
    noBoxesDesc: 'Buy a mystery box to start your collection!',
    mintedAt: 'Minted',
    openedAt: 'Opened',
    
    // Footer
    builtWith: 'Built with ZAMA FHE Technology',
    contractAddress: 'Contract Address',
    viewOnEtherscan: 'View on Etherscan →',
    
    // Errors
    installMetaMask: 'Please install MetaMask!',
    switchNetwork: 'Please switch to Sepolia network',
    connectionFailed: 'Connection failed',
    insufficientBalance: 'Insufficient balance',
    transactionCancelled: 'Transaction cancelled',
    mintFailed: 'Mint failed',
    openFailed: 'Open failed',
    loadFailed: 'Load failed',
    
    // Info
    ensureSepolia: 'Make sure your wallet is connected to Sepolia testnet',
  },
  zh: {
    // Header
    title: '神秘盲盒 NFT',
    subtitle: '基于 ZAMA 全同态加密',
    connectWallet: '连接钱包',
    disconnect: '断开',
    
    // Hero Section
    heroTitle: '探索神秘的 NFT 盲盒',
    heroSubtitle: '采用 ZAMA 全同态加密技术',
    heroDescription: '盲盒内容在开启前完全加密，确保绝对公平',
    
    // Features
    feature1Title: '完全加密',
    feature1Desc: '使用 ZAMA FHE 技术，盲盒内容在链上完全加密',
    feature2Title: '绝对公平',
    feature2Desc: '稀有度随机分配，算法公开透明，无人可预测',
    feature3Title: '5 种稀有度',
    feature3Desc: '从普通到传奇，每个盲盒都有机会开出稀有 NFT',
    
    // Mint Box
    mysteryBox: '神秘盲盒',
    boxDescription: '购买一个充满惊喜的 NFT 盲盒',
    boxPrice: '盲盒价格',
    minted: '已铸造数量',
    rarityProbability: '稀有度概率',
    legendary: '传奇',
    epic: '史诗',
    rare: '稀有',
    uncommon: '罕见',
    common: '普通',
    buyBox: '购买盲盒',
    minting: '铸造中...',
    pleaseConnect: '请先连接钱包',
    
    // My Boxes
    myBoxes: '我的盲盒',
    unopened: '未开启',
    openBox: '开启盲盒 🎉',
    opening: '开启中...',
    noBoxes: '你还没有任何盲盒',
    noBoxesDesc: '购买一个神秘盲盒开始你的收藏之旅！',
    mintedAt: '铸造时间',
    openedAt: '开启时间',
    
    // Footer
    builtWith: '基于 ZAMA FHE 技术构建',
    contractAddress: '合约地址',
    viewOnEtherscan: '在 Etherscan 上查看 →',
    
    // Errors
    installMetaMask: '请安装 MetaMask！',
    switchNetwork: '请切换到 Sepolia 测试网',
    connectionFailed: '连接失败',
    insufficientBalance: '余额不足',
    transactionCancelled: '用户取消了交易',
    mintFailed: '铸造失败',
    openFailed: '开启失败',
    loadFailed: '加载失败',
    
    // Info
    ensureSepolia: '确保你的钱包连接到 Sepolia 测试网',
  },
};

export function getTranslation(lang: Language): Translations {
  return translations[lang];
}

