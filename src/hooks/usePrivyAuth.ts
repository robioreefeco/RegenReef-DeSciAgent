import { usePrivy } from '@privy-io/react-auth';

export const usePrivyAuth = () => {
  const {
    ready,
    authenticated,
    user,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    unlinkWallet,
    createWallet,
    exportWallet,
    signMessage,
    sendTransaction,
  } = usePrivy();

  // Enhanced user data extraction
  const getUserData = () => {
    if (!user) return null;

    return {
      id: user.id,
      email: user.email?.address,
      wallet: user.wallet?.address,
      discord: user.discord?.username,
      twitter: user.twitter?.username,
      displayName: user.discord?.username || 
                   user.twitter?.username || 
                   user.email?.address || 
                   user.wallet?.address?.slice(0, 8) + '...' ||
                   'Anonymous User',
      avatar: user.discord?.profilePictureUrl || 
              user.twitter?.profilePictureUrl ||
              `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`,
      createdAt: user.createdAt,
      hasWallet: !!user.wallet,
      hasEmail: !!user.email,
      isVerified: user.email?.verified || false
    };
  };

  const primaryWallet = user?.linkedAccounts?.find(account => account.type === 'wallet');

  return {
    ready,
    authenticated,
    user,
    userData: getUserData(),
    primaryWallet,
    login,
    logout,
    linkEmail,
    linkWallet,
    unlinkEmail,
    unlinkWallet,
    createWallet,
    exportWallet,
    signMessage,
    sendTransaction,
  };
};