// Privy Onboarding
import React from 'react';
import { PrivyProvider as BasePrivyProvider } from '@privy-io/react-auth';

interface PrivyProviderProps {
  children: React.ReactNode;
}

export const PrivyProvider: React.FC<PrivyProviderProps> = ({ children }) => {
  return (
    <BasePrivyProvider
      appId="cmcpo4jlx000xju0mo5zorvur"
      config={{
        // Appearance customization
        appearance: {
          theme: 'light',
          accentColor: '#2563eb',
          logo: 'https://pbs.twimg.com/profile_images/1869194021500862464/k3uBigp9_400x400.png',
          walletChainType: 'ethereum',
          showWalletLoginFirst: false,
        },
        // Only email, WalletConnect, and MetaMask - completely separate from Flow
        loginMethods: [
          'email',
          'wallet'
        ],
        // Embedded wallet configuration
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
          requireUserPasswordOnCreate: false,
          noPromptOnSignature: true,
        },
        // Legal configuration
        legal: {
          termsAndConditionsUrl: 'https://regenreef.org/terms',
          privacyPolicyUrl: 'https://regenreef.org/privacy',
        },
        // MFA configuration
        mfa: {
          noPromptOnMfaRequired: true,
        },
        // Supported chains - Ethereum focused for Privy (separate from Flow)
        supportedChains: [
          // Ethereum Mainnet
          {
            id: 1,
            name: 'Ethereum',
            network: 'ethereum',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://mainnet.infura.io/v3/'],
              },
            },
            blockExplorers: {
              default: { name: 'Etherscan', url: 'https://etherscan.io' },
            },
          },
          // Polygon for additional compatibility
          {
            id: 137,
            name: 'Polygon',
            network: 'polygon',
            nativeCurrency: {
              name: 'MATIC',
              symbol: 'MATIC',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://polygon-rpc.com/'],
              },
            },
            blockExplorers: {
              default: { name: 'PolygonScan', url: 'https://polygonscan.com' },
            },
          },
          // Base for modern dApps
          {
            id: 8453,
            name: 'Base',
            network: 'base',
            nativeCurrency: {
              name: 'Ether',
              symbol: 'ETH',
              decimals: 18,
            },
            rpcUrls: {
              default: {
                http: ['https://mainnet.base.org'],
              },
            },
            blockExplorers: {
              default: { name: 'BaseScan', url: 'https://basescan.org' },
            },
          },
        ],
        // External wallet configuration - only MetaMask and WalletConnect
        externalWallets: {
          metamask: {
            connectionOptions: 'all',
          },
          walletConnect: {
            connectionOptions: 'all',
          },
        },
        // Default to Ethereum
        defaultChain: {
          id: 1,
          name: 'Ethereum',
        },
      }}
    >
      {children}
    </BasePrivyProvider>
  );
};
