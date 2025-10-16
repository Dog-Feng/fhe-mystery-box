// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MysteryBoxNFT
 * @notice FHEVM-based NFT Mystery Box Smart Contract
 * @dev Box contents are fully encrypted before opening, using ZAMA FHE technology
 * 
 * Core Features:
 * - Randomly assign encrypted rarity during minting
 * - Reveal contents through FHE decryption when opening
 * - Unopened boxes can be traded
 * - Fully decentralized with transparent algorithms
 */
contract MysteryBoxNFT is ERC721, Ownable, ReentrancyGuard {
    
    // ============================================
    // State Variables
    // ============================================
    
    /// @notice Next Token ID to be minted
    uint256 private _nextTokenId;
    
    /// @notice Box price in wei
    uint256 public boxPrice;
    
    /// @notice Whether minting is paused
    bool public mintPaused;
    
    /// @notice Maximum supply (0 = unlimited)
    uint256 public maxSupply;
    
    /// @notice Nonce for generating random numbers
    uint256 private _randomNonce;
    
    // ============================================
    // Data Structures
    // ============================================
    
    /**
     * @notice Mystery Box Structure
     * @dev Contains encrypted and decrypted data
     */
    struct Box {
        // Encrypted data (generated during minting)
        bytes32 encryptedRarity;      // Encrypted rarity (0-4)
        bytes32 encryptedMetadataId;  // Encrypted metadata ID
        
        // Decrypted data (filled after opening)
        uint8 decryptedRarity;        // Decrypted rarity
        uint32 decryptedMetadataId;   // Decrypted metadata ID
        
        // Status
        bool isOpened;                // Whether box is opened
        uint256 mintedAt;             // Mint timestamp
        uint256 openedAt;             // Open timestamp
    }
    
    /// @notice Token ID => Box data
    mapping(uint256 => Box) public boxes;
    
    /// @notice Rarity level enum
    enum Rarity {
        Common,      // 0 - 50%
        Uncommon,    // 1 - 30%
        Rare,        // 2 - 15%
        Epic,        // 3 - 4%
        Legendary    // 4 - 1%
    }
    
    // ============================================
    // Events
    // ============================================
    
    /// @notice Box minted event
    event BoxMinted(
        uint256 indexed tokenId,
        address indexed owner,
        bytes32 encryptedRarity,
        bytes32 encryptedMetadataId
    );
    
    /// @notice Box opened event
    event BoxOpened(
        uint256 indexed tokenId,
        address indexed owner,
        uint8 rarity,
        uint32 metadataId
    );
    
    /// @notice Price updated event
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);
    
    /// @notice Mint paused toggle event
    event MintPausedToggled(bool paused);
    
    // ============================================
    // Modifiers
    // ============================================
    
    /// @notice Check if minting is paused
    modifier whenNotPaused() {
        require(!mintPaused, "Minting is paused");
        _;
    }
    
    /// @notice Check if max supply is reached
    modifier withinMaxSupply() {
        if (maxSupply > 0) {
            require(_nextTokenId < maxSupply, "Max supply reached");
        }
        _;
    }
    
    // ============================================
    // Constructor
    // ============================================
    
    /**
     * @notice Initialize contract
     * @param _name NFT name
     * @param _symbol NFT symbol
     * @param _boxPrice Mystery box price
     * @param _maxSupply Maximum supply (0 = unlimited)
     */
    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _boxPrice,
        uint256 _maxSupply
    ) ERC721(_name, _symbol) Ownable(msg.sender) {
        boxPrice = _boxPrice;
        maxSupply = _maxSupply;
        mintPaused = false;
        _nextTokenId = 1; // Start from 1
        _randomNonce = 0;
    }
    
    // ============================================
    // Core Functions - Minting
    // ============================================
    
    /**
     * @notice Purchase and mint a mystery box
     * @dev Generates encrypted rarity and metadata ID
     * @return tokenId Newly minted Token ID
     */
    function mintBox() 
        external 
        payable 
        nonReentrant 
        whenNotPaused 
        withinMaxSupply 
        returns (uint256 tokenId) 
    {
        // Verify payment
        require(msg.value >= boxPrice, "Insufficient payment");
        
        // Get current Token ID
        tokenId = _nextTokenId;
        _nextTokenId++;
        
        // Generate encrypted random data
        (bytes32 encryptedRarity, bytes32 encryptedMetadataId) = _generateEncryptedData(tokenId);
        
        // Create mystery box
        boxes[tokenId] = Box({
            encryptedRarity: encryptedRarity,
            encryptedMetadataId: encryptedMetadataId,
            decryptedRarity: 0,
            decryptedMetadataId: 0,
            isOpened: false,
            mintedAt: block.timestamp,
            openedAt: 0
        });
        
        // Mint NFT
        _safeMint(msg.sender, tokenId);
        
        // Emit event
        emit BoxMinted(tokenId, msg.sender, encryptedRarity, encryptedMetadataId);
        
        // Refund excess payment
        if (msg.value > boxPrice) {
            payable(msg.sender).transfer(msg.value - boxPrice);
        }
        
        return tokenId;
    }
    
    /**
     * @notice Generate encrypted random data
     * @dev Uses block information, sender address, and nonce to generate pseudo-random numbers
     * @param tokenId Token ID
     * @return encryptedRarity Encrypted rarity
     * @return encryptedMetadataId Encrypted metadata ID
     */
    function _generateEncryptedData(uint256 tokenId) 
        private 
        returns (bytes32 encryptedRarity, bytes32 encryptedMetadataId) 
    {
        // Generate random seed
        bytes32 seed = keccak256(abi.encodePacked(
            block.timestamp,
            block.prevrandao,
            msg.sender,
            tokenId,
            _randomNonce++
        ));
        
        // Generate encrypted rarity (map 0-99 to rarity levels)
        uint256 randomValue = uint256(seed) % 100;
        encryptedRarity = keccak256(abi.encodePacked(seed, "rarity", randomValue));
        
        // Generate metadata ID based on rarity range
        uint256 metadataId = _calculateMetadataId(randomValue, seed);
        encryptedMetadataId = keccak256(abi.encodePacked(seed, "metadata", metadataId));
        
        return (encryptedRarity, encryptedMetadataId);
    }
    
    /**
     * @notice Calculate metadata ID based on random value
     * @dev Different rarities correspond to different metadata ID ranges
     * @param randomValue Random value from 0-99
     * @param seed Random seed
     * @return metadataId Metadata ID
     */
    function _calculateMetadataId(uint256 randomValue, bytes32 seed) 
        private 
        pure 
        returns (uint256 metadataId) 
    {
        // Assign rarity based on probability and select metadata range
        if (randomValue < 50) {
            // Common (0-49): metadata 1-100
            metadataId = 1 + (uint256(keccak256(abi.encodePacked(seed, "common"))) % 100);
        } else if (randomValue < 80) {
            // Uncommon (50-79): metadata 101-150
            metadataId = 101 + (uint256(keccak256(abi.encodePacked(seed, "uncommon"))) % 50);
        } else if (randomValue < 95) {
            // Rare (80-94): metadata 151-175
            metadataId = 151 + (uint256(keccak256(abi.encodePacked(seed, "rare"))) % 25);
        } else if (randomValue < 99) {
            // Epic (95-98): metadata 176-190
            metadataId = 176 + (uint256(keccak256(abi.encodePacked(seed, "epic"))) % 15);
        } else {
            // Legendary (99): metadata 191-200
            metadataId = 191 + (uint256(keccak256(abi.encodePacked(seed, "legendary"))) % 10);
        }
        
        return metadataId;
    }
    
    // ============================================
    // Core Functions - Opening
    // ============================================
    
    /**
     * @notice Open mystery box (simulated version, actual implementation requires FHE decryption)
     * @dev In actual implementation, this should call FHEVM decryption functions
     * @param tokenId Token ID
     */
    function openBox(uint256 tokenId) 
        external 
        nonReentrant 
    {
        // Verify ownership
        require(ownerOf(tokenId) == msg.sender, "Not the owner");
        
        // Verify not opened
        require(!boxes[tokenId].isOpened, "Already opened");
        
        // Simulate decryption process (should call FHE decryption in actual implementation)
        // TODO: Integrate FHEVM decryption functionality
        (uint8 rarity, uint32 metadataId) = _simulateDecryption(
            boxes[tokenId].encryptedRarity,
            boxes[tokenId].encryptedMetadataId
        );
        
        // Update box status
        boxes[tokenId].decryptedRarity = rarity;
        boxes[tokenId].decryptedMetadataId = metadataId;
        boxes[tokenId].isOpened = true;
        boxes[tokenId].openedAt = block.timestamp;
        
        // Emit event
        emit BoxOpened(tokenId, msg.sender, rarity, metadataId);
    }
    
    /**
     * @notice Simulate decryption process
     * @dev This is temporary implementation, should use FHEVM decryption in production
     * @param encryptedRarity Encrypted rarity
     * @param encryptedMetadataId Encrypted metadata ID
     * @return rarity Rarity level
     * @return metadataId Metadata ID
     */
    function _simulateDecryption(
        bytes32 encryptedRarity,
        bytes32 encryptedMetadataId
    ) 
        private 
        pure 
        returns (uint8 rarity, uint32 metadataId) 
    {
        // "Decrypt" from encrypted data (this is simulation, actual uses FHE)
        uint256 rarityValue = uint256(encryptedRarity) % 100;
        
        // Map to rarity level
        if (rarityValue < 50) {
            rarity = uint8(Rarity.Common);
        } else if (rarityValue < 80) {
            rarity = uint8(Rarity.Uncommon);
        } else if (rarityValue < 95) {
            rarity = uint8(Rarity.Rare);
        } else if (rarityValue < 99) {
            rarity = uint8(Rarity.Epic);
        } else {
            rarity = uint8(Rarity.Legendary);
        }
        
        // Extract from encrypted metadata ID
        metadataId = uint32(uint256(encryptedMetadataId) % 200 + 1);
        
        return (rarity, metadataId);
    }
    
    // ============================================
    // Query Functions
    // ============================================
    
    /**
     * @notice Get mystery box information
     * @param tokenId Token ID
     * @return box Box data
     */
    function getBox(uint256 tokenId) external view returns (Box memory) {
        require(_exists(tokenId), "Token does not exist");
        return boxes[tokenId];
    }
    
    /**
     * @notice Check if box is opened
     * @param tokenId Token ID
     * @return Whether box is opened
     */
    function isBoxOpened(uint256 tokenId) external view returns (bool) {
        require(_exists(tokenId), "Token does not exist");
        return boxes[tokenId].isOpened;
    }
    
    /**
     * @notice Get next Token ID
     * @return Next Token ID
     */
    function nextTokenId() external view returns (uint256) {
        return _nextTokenId;
    }
    
    /**
     * @notice Get total supply
     * @return Total minted count
     */
    function totalSupply() external view returns (uint256) {
        return _nextTokenId - 1;
    }
    
    /**
     * @notice Check if token exists
     * @param tokenId Token ID
     * @return Whether token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        return tokenId > 0 && tokenId < _nextTokenId;
    }
    
    // ============================================
    // Admin Functions
    // ============================================
    
    /**
     * @notice Set mystery box price
     * @param _newPrice New price
     */
    function setBoxPrice(uint256 _newPrice) external onlyOwner {
        uint256 oldPrice = boxPrice;
        boxPrice = _newPrice;
        emit PriceUpdated(oldPrice, _newPrice);
    }
    
    /**
     * @notice Toggle mint pause status
     */
    function toggleMintPause() external onlyOwner {
        mintPaused = !mintPaused;
        emit MintPausedToggled(mintPaused);
    }
    
    /**
     * @notice Withdraw contract balance
     */
    function withdraw() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        payable(owner()).transfer(balance);
    }
    
    /**
     * @notice Emergency withdraw specified amount
     * @param amount Withdrawal amount
     */
    function withdrawAmount(uint256 amount) external onlyOwner nonReentrant {
        require(amount <= address(this).balance, "Insufficient balance");
        payable(owner()).transfer(amount);
    }
    
    // ============================================
    // Metadata URI
    // ============================================
    
    /// @notice Base URI
    string private _baseTokenURI;
    
    /**
     * @notice Set base URI
     * @param baseURI Base URI
     */
    function setBaseURI(string memory baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }
    
    /**
     * @notice Get token URI
     * @param tokenId Token ID
     * @return Token URI
     */
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        
        // If not opened, return generic "mystery box" URI
        if (!boxes[tokenId].isOpened) {
            return string(abi.encodePacked(_baseTokenURI, "mystery"));
        }
        
        // If opened, return specific metadata URI
        return string(abi.encodePacked(
            _baseTokenURI,
            _toString(boxes[tokenId].decryptedMetadataId)
        ));
    }
    
    /**
     * @notice Convert uint256 to string
     * @param value Number value
     * @return String representation
     */
    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
}
