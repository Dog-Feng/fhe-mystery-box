export const CONTRACT_ADDRESS = "0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B";

export const CONTRACT_ABI = [
  // Read functions
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function boxPrice() view returns (uint256)",
  "function maxSupply() view returns (uint256)",
  "function mintPaused() view returns (bool)",
  "function nextTokenId() view returns (uint256)",
  "function totalSupply() view returns (uint256)",
  "function ownerOf(uint256 tokenId) view returns (address)",
  "function balanceOf(address owner) view returns (uint256)",
  "function tokenURI(uint256 tokenId) view returns (string)",
  "function getBox(uint256 tokenId) view returns (tuple(bytes32 encryptedRarity, bytes32 encryptedMetadataId, uint8 decryptedRarity, uint32 decryptedMetadataId, bool isOpened, uint256 mintedAt, uint256 openedAt))",
  "function isBoxOpened(uint256 tokenId) view returns (bool)",
  
  // Write functions
  "function mintBox() payable returns (uint256)",
  "function openBox(uint256 tokenId)",
  
  // Events
  "event BoxMinted(uint256 indexed tokenId, address indexed owner, bytes32 encryptedRarity, bytes32 encryptedMetadataId)",
  "event BoxOpened(uint256 indexed tokenId, address indexed owner, uint8 rarity, uint32 metadataId)",
  "event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)"
];

export const NETWORK_CONFIG = {
  chainId: 11155111, // Sepolia
  name: "Sepolia",
  rpcUrl: "https://sepolia.infura.io/v3/0baf7b768440432a9ec455077c65384a",
  explorerUrl: "https://sepolia.etherscan.io"
};

export const RARITY_NAMES = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary"
];

export const RARITY_COLORS = [
  "text-gray-400",    // Common
  "text-green-400",   // Uncommon
  "text-blue-400",    // Rare
  "text-purple-400",  // Epic
  "text-yellow-400"   // Legendary
];

export const RARITY_BG_COLORS = [
  "bg-gray-100",      // Common
  "bg-green-100",     // Uncommon
  "bg-blue-100",      // Rare
  "bg-purple-100",    // Epic
  "bg-yellow-100"     // Legendary
];

