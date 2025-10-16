# 🌍 Multi-language Guide

## Feature Overview

The project fully supports bilingual switching between Chinese and English. Users can select their preferred language using the language switcher in the top right corner of the page.

## Supported Languages

- 🇨🇳 **Chinese** (中文)
- 🇬🇧 **English**

## Technical Implementation

### 1. Language Configuration File

**File**: `frontend/lib/i18n.ts`

Defines all translation texts for both languages:
- `translations.en` - English translations
- `translations.zh` - Chinese translations

### 2. Language Switcher Component

**File**: `frontend/components/LanguageSwitcher.tsx`

Features:
- Display Chinese/English toggle buttons
- Highlight currently selected language
- Click to switch language

### 3. Local Storage

Language preference is saved to `localStorage` and automatically restored on next visit.

## Usage

### User Side

1. Visit the website at http://localhost:3000
2. Find the language switcher in the top right corner (next to wallet connection button)
3. Click "中文" or "English" to switch languages
4. Entire page content switches immediately to selected language

### Developer Side

#### Add New Translation Text

1. Open `frontend/lib/i18n.ts`
2. Add new field to `Translations` interface
3. Add corresponding translations in `translations.en` and `translations.zh`

Example:
```typescript
export interface Translations {
  // ...existing fields
  newField: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // ...existing translations
    newField: "New Text in English",
  },
  zh: {
    // ...existing translations
    newField: "新文本（中文）",
  },
};
```

#### Use Translation in Component

1. Import `Translations` type
2. Receive `t: Translations` in component props
3. Access translation text using `t.fieldName`

Example:
```typescript
import { Translations } from "@/lib/i18n";

interface MyComponentProps {
  t: Translations;
}

export default function MyComponent({ t }: MyComponentProps) {
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
    </div>
  );
}
```

## Translation Coverage

### Header
- ✅ Title and subtitle
- ✅ Connect wallet/Disconnect button

### Hero Section
- ✅ Main title
- ✅ Subtitle
- ✅ Description text

### Features
- ✅ 3 feature titles
- ✅ 3 feature descriptions

### Mint Box
- ✅ Mystery box title
- ✅ Description text
- ✅ Price label
- ✅ Minted count label
- ✅ Rarity probability title
- ✅ 5 rarity names
- ✅ Buy button text
- ✅ Loading state text

### My Boxes
- ✅ Title
- ✅ Unopened status
- ✅ Open button
- ✅ Empty state message
- ✅ Time labels

### Footer
- ✅ Technology description
- ✅ Contract address label
- ✅ Etherscan link

### Error Messages
- ✅ Install MetaMask
- ✅ Switch network
- ✅ Connection failed
- ✅ Insufficient balance
- ✅ Transaction cancelled
- ✅ Mint failed
- ✅ Open failed
- ✅ Load failed

### Info Messages
- ✅ Ensure Sepolia connection

## Translation Reference Table

| Feature | Chinese | English |
|---------|---------|---------|
| Title | 神秘盲盒 NFT | Mystery Box NFT |
| Subtitle | 基于 ZAMA 全同态加密 | Based on ZAMA FHE |
| Connect Wallet | 连接钱包 | Connect Wallet |
| Buy Box | 购买盲盒 | Buy Mystery Box |
| Legendary | 传奇 | Legendary |
| Epic | 史诗 | Epic |
| Rare | 稀有 | Rare |
| Uncommon | 罕见 | Uncommon |
| Common | 普通 | Common |
| Open Box | 开启盲盒 🎉 | Open Box 🎉 |
| My Boxes | 我的盲盒 | My Boxes |

## Default Language

- First visit: **Chinese** (can be changed by modifying default in `page.tsx`)
- With history: Uses user's last selected language

## Browser Compatibility

Language switching feature compatible with all modern browsers:
- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Opera

## Example Code

### Complete Component Example

```typescript
"use client";

import { Translations } from "@/lib/i18n";

interface ExampleProps {
  t: Translations;
}

export default function Example({ t }: ExampleProps) {
  return (
    <div>
      <h1>{t.title}</h1>
      <button>{t.buyBox}</button>
      <p>{t.description}</p>
    </div>
  );
}
```

### Usage in Page

```typescript
import { Language, getTranslation } from "@/lib/i18n";

export default function Page() {
  const [language, setLanguage] = useState<Language>('zh');
  const t = getTranslation(language);

  return (
    <div>
      <LanguageSwitcher 
        currentLang={language} 
        onLanguageChange={setLanguage} 
      />
      <Example t={t} />
    </div>
  );
}
```

## Future Extensions

### Add New Language

1. Modify `Language` type:
```typescript
export type Language = 'en' | 'zh' | 'ja' | 'ko';
```

2. Add new language translations:
```typescript
export const translations: Record<Language, Translations> = {
  en: { /* ... */ },
  zh: { /* ... */ },
  ja: { /* Japanese translations */ },
  ko: { /* Korean translations */ },
};
```

3. Update `LanguageSwitcher` component to add new button

### Auto-detect Browser Language

Add to `page.tsx` in `useEffect`:
```typescript
useEffect(() => {
  const savedLang = localStorage.getItem('language');
  if (!savedLang) {
    const browserLang = navigator.language.startsWith('zh') ? 'zh' : 'en';
    setLanguage(browserLang as Language);
  }
}, []);
```

## Best Practices

1. **Consistency**: Remember to update translations in both languages when adding new features
2. **Testing**: Test all page functionality after switching languages
3. **Brevity**: Keep translation text concise and clear
4. **Cultural Adaptation**: Be aware of cultural differences between languages

---

**🎉 Your dApp now fully supports multi-language!**
