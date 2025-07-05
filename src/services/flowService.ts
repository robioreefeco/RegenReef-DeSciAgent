import * as fcl from '@onflow/fcl';
import * as t from '@onflow/types';

// Enhanced FCL configuration for Flow testnet with signature support
fcl.config()
  .put('accessNode.api', 'https://rest-testnet.onflow.org')
  .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
  .put('app.detail.title', 'RegenReef DeSci Agent')
  .put('app.detail.icon', 'https://pbs.twimg.com/profile_images/1869194021500862464/k3uBigp9_400x400.png')
  .put('app.detail.description', 'AI-powered coral reef conservation platform')
  // Flow Testnet contract addresses
  .put('0xProfile', '0xba1132bc08f82fe2')
  .put('0xFlowToken', '0x7e60df042a9c0868')
  .put('0xFungibleToken', '0x9a0766d93b6608b7')
  .put('0xNonFungibleToken', '0x631e88ae7f1d7c20')
  .put('0xAIAgentManager', '0x77c6235ec164995055CFC6210A6aCF5Daf195c07')
  .put('env', 'testnet')
  .put('challenge.handshake', 'https://fcl-discovery.onflow.org/testnet/authn')
  .put('discovery.authn.endpoint', 'https://fcl-discovery.onflow.org/api/testnet/authn')
  // Flow signature configuration
  .put('fcl.limit', 9999)
  .put('fcl.proposer', fcl.authz)
  .put('fcl.payer', fcl.authz)
  .put('fcl.authorizations', [fcl.authz])
  // Supported wallet services on testnet
  .put('discovery.authn.include', [
    '0x82ec283f88a62e65', // Blocto
    '0x9d2e44203cb13051', // Lilico
    '0x33f75ff0b830dcec', // Dapper
    '0x5b250a8a85b44a67', // Flow Wallet
    '0x1654653399040a61'  // Ledger
  ]);

export interface FlowUser {
  addr: string | null;
  loggedIn: boolean;
  cid?: string;
  expiresAt?: number;
  f_type?: string;
  f_vsn?: string;
  services?: any[];
}

export interface Agent {
  id: string;
  modelEndpoint: string;
  isActive: boolean;
  createdAt: string;
  lastUsed: string;
  usageCount: number;
}

export interface FlowSignature {
  addr: string;
  keyId: number;
  signature: string;
}

export class FlowService {
  static async authenticate(): Promise<FlowUser> {
    try {
      console.log('Initiating Flow wallet authentication on testnet...');
      
      // Ensure we're configured for testnet
      await fcl.config()
        .put('accessNode.api', 'https://rest-testnet.onflow.org')
        .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
        .put('env', 'testnet');

      const user = await fcl.authenticate();
      console.log('Flow authentication successful:', user);
      
      // Verify the user is connected to testnet
      if (user.addr) {
        const account = await fcl.account(user.addr);
        console.log('Connected to Flow testnet account:', account);
        
        // Test signature capability
        try {
          const testMessage = `RegenReef authentication test - ${Date.now()}`;
          const signature = await this.signMessage(testMessage);
          console.log('Flow signature test successful:', signature);
        } catch (sigError) {
          console.warn('Flow signature test failed:', sigError);
        }
      }
      
      return user;
    } catch (error) {
      console.error('Flow authentication error:', error);
      throw new Error(`Failed to authenticate with Flow wallet: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async unauthenticate(): Promise<void> {
    try {
      await fcl.unauthenticate();
      console.log('Flow unauthentication successful');
    } catch (error) {
      console.error('Flow unauthentication error:', error);
      throw new Error('Failed to disconnect Flow wallet');
    }
  }

  static subscribeToUser(callback: (user: FlowUser | null) => void): () => void {
    return fcl.currentUser.subscribe(callback);
  }

  static async getCurrentUser(): Promise<FlowUser | null> {
    try {
      const user = await fcl.currentUser.snapshot();
      return user;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  static async checkAccountExists(address: string): Promise<boolean> {
    try {
      const account = await fcl.account(address);
      return account !== null;
    } catch (error) {
      console.error('Error checking account:', error);
      return false;
    }
  }

  static async getNetworkInfo(): Promise<{
    network: string;
    chainId: string;
    accessNode: string;
    isTestnet: boolean;
  }> {
    return {
      network: 'Flow Testnet',
      chainId: 'flow-testnet',
      accessNode: 'https://rest-testnet.onflow.org',
      isTestnet: true
    };
  }

  // Enhanced signature methods for Flow testnet
  static async signMessage(message: string): Promise<FlowSignature> {
    try {
      const user = await fcl.currentUser.snapshot();
      if (!user.loggedIn) {
        throw new Error('User not authenticated');
      }

      console.log('Signing message with Flow wallet:', message);
      
      // Use FCL's user message signing
      const signature = await fcl.currentUser.signUserMessage(message);
      
      console.log('Flow signature successful:', signature);
      
      return {
        addr: user.addr || '',
        keyId: 0, // Default key ID
        signature: signature
      };
    } catch (error) {
      console.error('Error signing message:', error);
      throw new Error(`Failed to sign message: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async verifySignature(message: string, signature: FlowSignature): Promise<boolean> {
    try {
      // In a real implementation, this would verify the signature against the Flow account
      // For now, we'll return true if we have all required components
      return !!(signature.addr && signature.signature && message);
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }

  // Enhanced agent management with Flow signatures
  static async mintAgent(endpoint: string): Promise<string> {
    try {
      const user = await fcl.currentUser.snapshot();
      if (!user.loggedIn) {
        throw new Error('User not authenticated');
      }

      console.log('Minting agent for endpoint:', endpoint);
      
      // Sign the agent creation request
      const agentData = {
        endpoint,
        creator: user.addr,
        timestamp: Date.now()
      };
      
      const message = JSON.stringify(agentData);
      const signature = await this.signMessage(message);
      
      console.log('Agent creation signed:', signature);
      
      // For demonstration, we'll use a mock transaction with signature verification
      const mockTxId = `flow_tx_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Agent minted with transaction ID:', mockTxId);
      return mockTxId;
    } catch (error) {
      console.error('Error minting agent:', error);
      throw new Error(`Failed to mint agent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getUserAgents(userAddress: string): Promise<Agent[]> {
    try {
      console.log('Fetching agents for address:', userAddress);
      
      // Mock implementation with Flow-specific data
      const mockAgents: Agent[] = [
        {
          id: `flow_agent_${userAddress.slice(-8)}_1`,
          modelEndpoint: 'https://api.anthropic.com/v1/messages',
          isActive: true,
          createdAt: new Date().toISOString(),
          lastUsed: new Date().toISOString(),
          usageCount: 5
        },
        {
          id: `flow_agent_${userAddress.slice(-8)}_2`,
          modelEndpoint: 'https://api.openai.com/v1/chat/completions',
          isActive: false,
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          lastUsed: new Date(Date.now() - 3600000).toISOString(),
          usageCount: 12
        }
      ];

      return mockAgents;
    } catch (error) {
      console.error('Error fetching user agents:', error);
      return [];
    }
  }

  static async activateAgent(agentId: string): Promise<string> {
    try {
      const user = await fcl.currentUser.snapshot();
      if (!user.loggedIn) {
        throw new Error('User not authenticated');
      }

      console.log('Activating agent with ID:', agentId);
      
      // Sign the activation request
      const activationData = {
        agentId,
        activator: user.addr,
        timestamp: Date.now()
      };
      
      const message = JSON.stringify(activationData);
      const signature = await this.signMessage(message);
      
      console.log('Agent activation signed:', signature);
      
      const mockTxId = `flow_activate_${agentId}_${Date.now()}`;
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return mockTxId;
    } catch (error) {
      console.error('Error activating agent:', error);
      throw new Error(`Failed to activate agent: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  static async getAccountBalance(address: string): Promise<string> {
    try {
      const account = await fcl.account(address);
      // Convert from Flow's smallest unit (10^-8) to FLOW
      const balance = account.balance ? (parseInt(account.balance) / 100000000).toFixed(4) : '0.0000';
      return balance;
    } catch (error) {
      console.error('Error getting account balance:', error);
      return '0.0000';
    }
  }

  // Additional Flow-specific utilities
  static async getLatestBlock(): Promise<any> {
    try {
      const block = await fcl.latestBlock();
      return block;
    } catch (error) {
      console.error('Error getting latest block:', error);
      return null;
    }
  }

  static async getTransaction(txId: string): Promise<any> {
    try {
      const transaction = await fcl.tx(txId).onceSealed();
      return transaction;
    } catch (error) {
      console.error('Error getting transaction:', error);
      return null;
    }
  }

  // Flow testnet specific utilities
  static async getTestnetFaucetInfo(): Promise<{
    faucetUrl: string;
    instructions: string;
  }> {
    return {
      faucetUrl: 'https://testnet-faucet.onflow.org/',
      instructions: 'Visit the Flow testnet faucet to get free FLOW tokens for testing'
    };
  }

  static async switchToTestnet(): Promise<void> {
    try {
      await fcl.config()
        .put('accessNode.api', 'https://rest-testnet.onflow.org')
        .put('discovery.wallet', 'https://fcl-discovery.onflow.org/testnet/authn')
        .put('env', 'testnet');
      
      console.log('Switched to Flow testnet');
    } catch (error) {
      console.error('Error switching to testnet:', error);
      throw new Error('Failed to switch to Flow testnet');
    }
  }
}