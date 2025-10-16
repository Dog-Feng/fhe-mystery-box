"use client";

import { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI, RARITY_COLORS } from "@/lib/contract";
import { Translations } from "@/lib/i18n";

interface Box {
  tokenId: number;
  isOpened: boolean;
  rarity?: number;
  metadataId?: number;
  mintedAt: number;
  openedAt?: number;
}

interface MyBoxesProps {
  provider: BrowserProvider | null;
  address: string;
  refreshTrigger: number;
  t: Translations;
}

const RARITY_EMOJIS = ["🎯", "✨", "⭐", "💎", "👑"];

export default function MyBoxes({ provider, address, refreshTrigger, t }: MyBoxesProps) {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [loading, setLoading] = useState(false);
  const [opening, setOpening] = useState<number | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (provider && address) {
      loadMyBoxes();
    }
  }, [provider, address, refreshTrigger]);

  const loadMyBoxes = async () => {
    if (!provider || !address) return;

    setLoading(true);
    setError("");

    try {
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      
      const balance = await contract.balanceOf(address);
      const balanceNum = Number(balance);

      if (balanceNum === 0) {
        setBoxes([]);
        setLoading(false);
        return;
      }

      const totalSupply = await contract.totalSupply();
      const totalSupplyNum = Number(totalSupply);

      const userBoxes: Box[] = [];
      for (let tokenId = 1; tokenId <= totalSupplyNum; tokenId++) {
        try {
          const owner = await contract.ownerOf(tokenId);
          if (owner.toLowerCase() === address.toLowerCase()) {
            const boxData = await contract.getBox(tokenId);
            
            userBoxes.push({
              tokenId,
              isOpened: boxData.isOpened,
              rarity: boxData.isOpened ? Number(boxData.decryptedRarity) : undefined,
              metadataId: boxData.isOpened ? Number(boxData.decryptedMetadataId) : undefined,
              mintedAt: Number(boxData.mintedAt),
              openedAt: boxData.isOpened ? Number(boxData.openedAt) : undefined,
            });
          }
        } catch (err) {
          continue;
        }
      }

      setBoxes(userBoxes);
    } catch (err) {
      console.error("Load boxes failed:", err);
      setError(t.loadFailed);
    } finally {
      setLoading(false);
    }
  };

  const openBox = async (tokenId: number) => {
    if (!provider) return;

    setOpening(tokenId);
    setError("");

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      console.log("Opening box #" + tokenId);
      const tx = await contract.openBox(tokenId);
      
      console.log("Transaction sent:", tx.hash);
      await tx.wait();
      
      console.log("Box opened!");
      
      await loadMyBoxes();
    } catch (err: any) {
      console.error("Open failed:", err);
      
      if (err.code === "ACTION_REJECTED") {
        setError(t.transactionCancelled);
      } else {
        setError(err.message || t.openFailed);
      }
    } finally {
      setOpening(null);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString();
  };

  const getRarityName = (rarity: number) => {
    const names = [t.common, t.uncommon, t.rare, t.epic, t.legendary];
    return names[rarity] || '';
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (boxes.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <p className="text-gray-500 text-lg">{t.noBoxes}</p>
        <p className="text-gray-400 text-sm mt-2">{t.noBoxesDesc}</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        {t.myBoxes} ({boxes.length})
      </h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {boxes.map((box) => (
          <div
            key={box.tokenId}
            className={`bg-white rounded-xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
              !box.isOpened ? "border-4 border-purple-300" : ""
            }`}
          >
            <div className={`p-6 ${box.isOpened ? "bg-gradient-to-br from-gray-50 to-gray-100" : "bg-gradient-to-br from-purple-100 to-pink-100"}`}>
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-semibold text-gray-600">
                  #{box.tokenId}
                </div>
                {box.isOpened ? (
                  <div className={`px-3 py-1 rounded-full text-sm font-bold ${RARITY_COLORS[box.rarity!]}`}>
                    {getRarityName(box.rarity!)}
                  </div>
                ) : (
                  <div className="px-3 py-1 bg-purple-500 text-white rounded-full text-sm font-bold">
                    {t.unopened}
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center h-40 mb-4">
                {box.isOpened ? (
                  <div className="text-center">
                    <div className="text-6xl mb-2">
                      {RARITY_EMOJIS[box.rarity!]}
                    </div>
                    <div className="text-3xl font-bold text-gray-700">
                      #{box.metadataId}
                    </div>
                  </div>
                ) : (
                  <div className="text-8xl animate-pulse">
                    🎁
                  </div>
                )}
              </div>

              <div className="text-xs text-gray-500 mb-4">
                <div>{t.mintedAt}: {formatDate(box.mintedAt)}</div>
                {box.openedAt && (
                  <div>{t.openedAt}: {formatDate(box.openedAt)}</div>
                )}
              </div>

              {!box.isOpened && (
                <button
                  onClick={() => openBox(box.tokenId)}
                  disabled={opening === box.tokenId}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all disabled:opacity-50"
                >
                  {opening === box.tokenId ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>{t.opening}</span>
                    </span>
                  ) : (
                    t.openBox
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
