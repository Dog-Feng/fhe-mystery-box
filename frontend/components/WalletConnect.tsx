"use client";

import { useState, useEffect, useCallback } from "react";
import { BrowserProvider } from "ethers";
import { NETWORK_CONFIG } from "@/lib/contract";
import { Translations } from "@/lib/i18n";

interface WalletConnectProps {
  onConnect: (provider: BrowserProvider, address: string) => void;
  onDisconnect: () => void;
  t: Translations;
}

export default function WalletConnect({ onConnect, onDisconnect, t }: WalletConnectProps) {
  const [address, setAddress] = useState<string>("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string>("");

  const checkConnection = useCallback(async () => {
    if (typeof window === "undefined" || !window.ethereum) return;

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      
      if (accounts.length > 0) {
        const address = accounts[0].address;
        setAddress(address);
        onConnect(provider, address);
      }
    } catch (err) {
      console.error("检查连接失败:", err);
    }
  }, [onConnect]);

  const handleAccountsChanged = useCallback((...args: unknown[]) => {
    const accounts = args[0] as string[];
    if (accounts.length === 0) {
      setAddress("");
      onDisconnect();
    } else {
      setAddress(accounts[0]);
      if (window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        onConnect(provider, accounts[0]);
      }
    }
  }, [onConnect, onDisconnect]);

  useEffect(() => {
    // 检查是否已连接
    checkConnection();
    
    // 监听账户变化
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
      window.ethereum.on("chainChanged", () => window.location.reload());
    }

    return () => {
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
      }
    };
  }, [checkConnection, handleAccountsChanged]);

  const connectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      setError(t.installMetaMask);
      return;
    }

    setIsConnecting(true);
    setError("");

    try {
      const provider = new BrowserProvider(window.ethereum);
      
      // 请求连接钱包
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      // 检查网络
      const network = await provider.getNetwork();
      if (Number(network.chainId) !== NETWORK_CONFIG.chainId) {
        try {
          // 切换到 Sepolia
          await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: `0x${NETWORK_CONFIG.chainId.toString(16)}` }],
          });
        } catch (switchError) {
          const error = switchError as { code?: number };
          if (error.code === 4902) {
            setError(t.switchNetwork);
          } else {
            setError(t.switchNetwork);
          }
          setIsConnecting(false);
          return;
        }
      }

      const address = accounts[0];
      setAddress(address);
      onConnect(provider, address);
    } catch (err) {
      console.error("Connection failed:", err);
      const error = err as { message?: string };
      setError(error.message || t.connectionFailed);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAddress("");
    onDisconnect();
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <div className="flex items-center gap-4">
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      
      {!address ? (
        <button
          onClick={connectWallet}
          disabled={isConnecting}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? `${t.connectWallet}...` : t.connectWallet}
        </button>
      ) : (
        <div className="flex items-center gap-3">
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg font-mono text-sm">
            {formatAddress(address)}
          </div>
          <button
            onClick={disconnectWallet}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors"
          >
            {t.disconnect}
          </button>
        </div>
      )}
    </div>
  );
}

// 声明 window.ethereum 类型
interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<string[]>;
  on: (event: string, handler: (...args: unknown[]) => void) => void;
  removeListener: (event: string, handler: (...args: unknown[]) => void) => void;
}

declare global {
  interface Window {
    ethereum?: EthereumProvider;
  }
}

