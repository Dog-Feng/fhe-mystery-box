"use client";

import { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import WalletConnect from "@/components/WalletConnect";
import MintBox from "@/components/MintBox";
import MyBoxes from "@/components/MyBoxes";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Language, getTranslation } from "@/lib/i18n";

export default function Home() {
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [address, setAddress] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [language, setLanguage] = useState<Language>('zh');

  // Load language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang && (savedLang === 'en' || savedLang === 'zh')) {
      setLanguage(savedLang);
    }
  }, []);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const handleConnect = (newProvider: BrowserProvider, newAddress: string) => {
    setProvider(newProvider);
    setAddress(newAddress);
  };

  const handleDisconnect = () => {
    setProvider(null);
    setAddress("");
  };

  const handleMintSuccess = (tokenId: number) => {
    setRefreshTrigger(prev => prev + 1);
  };

  const t = getTranslation(language);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🎁</div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{t.title}</h1>
                <p className="text-sm text-gray-500">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher 
                currentLang={language} 
                onLanguageChange={handleLanguageChange} 
              />
              <WalletConnect 
                onConnect={handleConnect} 
                onDisconnect={handleDisconnect}
                t={t}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">
            {t.heroTitle}
          </h2>
          <p className="text-xl text-gray-600 mb-2">
            {t.heroSubtitle}
          </p>
          <p className="text-gray-500">
            {t.heroDescription}
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🔒</div>
            <h3 className="font-bold text-lg mb-2">{t.feature1Title}</h3>
            <p className="text-gray-600 text-sm">
              {t.feature1Desc}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">🎲</div>
            <h3 className="font-bold text-lg mb-2">{t.feature2Title}</h3>
            <p className="text-gray-600 text-sm">
              {t.feature2Desc}
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="font-bold text-lg mb-2">{t.feature3Title}</h3>
            <p className="text-gray-600 text-sm">
              {t.feature3Desc}
            </p>
          </div>
        </div>

        {/* Mint Section */}
        <div className="flex justify-center mb-12">
          <MintBox 
            provider={provider} 
            address={address}
            onMintSuccess={handleMintSuccess}
            t={t}
          />
        </div>

        {/* My Boxes Section */}
        {address && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <MyBoxes 
              provider={provider} 
              address={address}
              refreshTrigger={refreshTrigger}
              t={t}
            />
          </div>
        )}

        {/* Info Section */}
        {!address && (
          <div className="text-center mt-12">
            <p className="text-gray-500 mb-4">{t.pleaseConnect}</p>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-6 py-3 rounded-lg">
              <span className="text-2xl">ℹ️</span>
              <span className="text-sm">
                {t.ensureSepolia}
              </span>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500 text-sm">
            <p className="mb-2">{t.builtWith}</p>
            <p>{t.contractAddress}: 0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B</p>
            <a 
              href="https://sepolia.etherscan.io/address/0xB9042cF80d7d7B8bb5D573B85c20eb650ba0632B" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline mt-2 inline-block"
            >
              {t.viewOnEtherscan}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
