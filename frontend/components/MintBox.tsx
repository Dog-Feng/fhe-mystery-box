"use client";

import { useState, useEffect, useCallback } from "react";
import { BrowserProvider, Contract, formatEther } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/lib/contract";
import { Translations } from "@/lib/i18n";

interface MintBoxProps {
  provider: BrowserProvider | null;
  address: string;
  onMintSuccess: (tokenId: number) => void;
  t: Translations;
}

export default function MintBox({ provider, address, onMintSuccess, t }: MintBoxProps) {
  const [isMinting, setIsMinting] = useState(false);
  const [error, setError] = useState("");
  const [boxPrice, setBoxPrice] = useState("...");
  const [totalSupply, setTotalSupply] = useState(0);

  const loadContractInfo = useCallback(async () => {
    if (!provider) return;

    try {
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
      const price = await contract.boxPrice();
      const supply = await contract.totalSupply();
      
      setBoxPrice(formatEther(price));
      setTotalSupply(Number(supply));
    } catch (err) {
      console.error("Load contract info failed:", err);
    }
  }, [provider]);

  useEffect(() => {
    if (provider) {
      loadContractInfo();
    }
  }, [provider, loadContractInfo]);

  const mintBox = async () => {
    if (!provider || !address) {
      setError(t.pleaseConnect);
      return;
    }

    setIsMinting(true);
    setError("");

    try {
      const signer = await provider.getSigner();
      const contract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const price = await contract.boxPrice();

      console.log("Minting mystery box...");
      const tx = await contract.mintBox({ value: price });
      
      console.log("Transaction sent:", tx.hash);
      
      const receipt = await tx.wait();
      console.log("Transaction confirmed:", receipt);

      interface ParsedLog {
        name: string;
        args: unknown[];
      }

      interface LogDescription {
        topics?: string[];
        data?: string;
      }

      const event = receipt.logs
        .map((log: LogDescription) => {
          try {
            return contract.interface.parseLog(log) as ParsedLog | null;
          } catch {
            return null;
          }
        })
        .find((e): e is ParsedLog => e !== null && e.name === "BoxMinted");

      if (event) {
        const tokenId = Number(event.args[0]);
        console.log("Mint success! Token ID:", tokenId);
        onMintSuccess(tokenId);
        
        await loadContractInfo();
      }
    } catch (err) {
      console.error("Mint failed:", err);
      
      const error = err as { code?: string; message?: string };
      if (error.code === "ACTION_REJECTED") {
        setError(t.transactionCancelled);
      } else if (error.message?.includes("insufficient funds")) {
        setError(t.insufficientBalance);
      } else {
        setError(error.message || t.mintFailed);
      }
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">🎁</div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{t.mysteryBox}</h2>
        <p className="text-gray-600">{t.boxDescription}</p>
      </div>

      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">{t.boxPrice}</span>
          <span className="text-2xl font-bold text-purple-600">{boxPrice} ETH</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">{t.minted}</span>
          <span className="text-gray-800 font-semibold">{totalSupply}</span>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">{t.rarityProbability}</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
              <span>{t.legendary}</span>
            </span>
            <span className="text-gray-600">1%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-400"></span>
              <span>{t.epic}</span>
            </span>
            <span className="text-gray-600">4%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-400"></span>
              <span>{t.rare}</span>
            </span>
            <span className="text-gray-600">15%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-400"></span>
              <span>{t.uncommon}</span>
            </span>
            <span className="text-gray-600">30%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-gray-400"></span>
              <span>{t.common}</span>
            </span>
            <span className="text-gray-600">50%</span>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <button
        onClick={mintBox}
        disabled={isMinting || !provider || !address}
        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-6 rounded-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isMinting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>{t.minting}</span>
          </span>
        ) : !provider || !address ? (
          t.pleaseConnect
        ) : (
          `${t.buyBox} (${boxPrice} ETH)`
        )}
      </button>
    </div>
  );
}
