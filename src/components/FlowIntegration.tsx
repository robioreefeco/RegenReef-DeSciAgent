import React, { useState, useEffect } from 'react';
import { 
  Wallet, 
  LogOut, 
  Plus, 
  Bot, 
  Activity,
  CheckCircle,
  AlertCircle,
  Loader,
  Link as LinkIcon,
  Copy,
  ExternalLink,
  Zap,
  Shield,
  Info,
  Globe,
  Server,
  Key,
  FileSignature,
  Waves,
  AlertTriangle
} from 'lucide-react';
import { FlowService, FlowUser, Agent, FlowSignature } from '../services/flowService';
import { usePrivyAuth } from '../hooks/usePrivyAuth';

export const FlowIntegration: React.FC = () => {
  const { authenticated: privyAuthenticated, userData: privyUser, login: privyLogin } = usePrivyAuth();
  const [flowUser, setFlowUser] = useState<FlowUser | null>(null);
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [showCreateAgent, setShowCreateAgent] = useState(false);
  const [newAgentEndpoint, setNewAgentEndpoint] = useState('');
  const [transactionStatus, setTransactionStatus] = useState<string>('');
  const [balance, setBalance] = useState<string>('0');
  const [connectionError, setConnectionError] = useState<string>('');
  const [networkInfo, setNetworkInfo] = useState<any>(null);
  const [signatureTest, setSignatureTest] = useState<FlowSignature | null>(null);
  const [flowNetworkStatus, setFlowNetworkStatus] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = FlowService.subscribeToUser((user) => {
      console.log('🌊 Flow user state changed:', user);
      setFlowUser(user);
      setConnectionError('');
      
      if (user?.addr) {
        loadUserData(user.addr);
      }
    });

    // Check if Flow user is already authenticated
    FlowService.getCurrentUser().then(user => {
      if (user?.loggedIn) {
        setFlowUser(user);
        if (user.addr) {
          loadUserData(user.addr);
        }
      }
    });

    // Load network info
    FlowService.getNetworkInfo().then(info => {
      setNetworkInfo(info);
    });

    // Check Flow network status
    FlowService.getFlowNetworkStatus().then(status => {
      setFlowNetworkStatus(status);
    });

    return unsubscribe;
  }, []);

  const loadUserData = async (address: string) => {
    setLoading(true);
    try {
      const [userAgents, accountBalance] = await Promise.all([
        FlowService.getUserAgents(address),
        FlowService.getAccountBalance(address)
      ]);
      
      setAgents(userAgents);
      setBalance(accountBalance);
    } catch (error) {
      console.error('❌ Error loading Flow user data:', error);
      setConnectionError('Failed to load user data from Flow blockchain');
    } finally {
      setLoading(false);
    }
  };

  const handleFlowLogin = async () => {
    setLoading(true);
    setConnectionError('');
    
    try {
      console.log('🌊 Starting PURE Flow wallet authentication...');
      await FlowService.authenticate();
      setTransactionStatus('🎉 Successfully connected to Flow wallet on testnet!');
      setTimeout(() => setTransactionStatus(''), 3000);
    } catch (error) {
      console.error('❌ Flow login error:', error);
      setConnectionError(error instanceof Error ? error.message : 'Failed to connect to Flow wallet');
    } finally {
      setLoading(false);
    }
  };

  const handleFlowLogout = async () => {
    try {
      await FlowService.unauthenticate();
      setAgents([]);
      setBalance('0');
      setSignatureTest(null);
      setTransactionStatus('👋 Disconnected from Flow wallet');
      setTimeout(() => setTransactionStatus(''), 3000);
    } catch (error) {
      console.error('❌ Flow logout error:', error);
      setConnectionError('Failed to disconnect from Flow wallet');
    }
  };

  const handleTestSignature = async () => {
    if (!flowUser?.addr) return;
    
    setLoading(true);
    try {
      const testMessage = `RegenReef Flow signature test - ${new Date().toISOString()}`;
      const signature = await FlowService.signMessage(testMessage);
      setSignatureTest(signature);
      setTransactionStatus('✅ Flow signature test successful!');
      setTimeout(() => setTransactionStatus(''), 3000);
    } catch (error) {
      console.error('❌ Flow signature test error:', error);
      setConnectionError(error instanceof Error ? error.message : 'Flow signature test failed');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAgent = async () => {
    if (!newAgentEndpoint.trim() || !flowUser?.addr) return;

    setLoading(true);
    setTransactionStatus('🤖 Creating agent on Flow blockchain with signature...');
    
    try {
      const txId = await FlowService.mintAgent(newAgentEndpoint);
      setTransactionStatus(`🎉 Agent created with Flow signature! Transaction: ${txId}`);
      
      // Reload agents after creation
      setTimeout(async () => {
        if (flowUser?.addr) {
          await loadUserData(flowUser.addr);
        }
        setShowCreateAgent(false);
        setNewAgentEndpoint('');
        setTransactionStatus('');
      }, 3000);
    } catch (error) {
      console.error('❌ Error creating agent:', error);
      setTransactionStatus('❌ Error creating agent on Flow blockchain');
      setConnectionError(error instanceof Error ? error.message : 'Agent creation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleActivateAgent = async (agentId: string) => {
    setLoading(true);
    try {
      const txId = await FlowService.activateAgent(agentId);
      setTransactionStatus(`⚡ Agent activation signed and submitted: ${txId}`);
      
      setTimeout(async () => {
        if (flowUser?.addr) {
          await loadUserData(flowUser.addr);
        }
        setTransactionStatus('');
      }, 3000);
    } catch (error) {
      console.error('❌ Error activating agent:', error);
      setTransactionStatus('❌ Error activating agent');
      setConnectionError(error instanceof Error ? error.message : 'Agent activation failed');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setTransactionStatus('📋 Copied to clipboard!');
    setTimeout(() => setTransactionStatus(''), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Flow Network Status */}
      {networkInfo && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Waves className="h-5 w-5 text-blue-600" />
              <span className="text-blue-800 font-medium">Flow Blockchain Network</span>
              {networkInfo.isTestnet && (
                <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full font-medium">
                  TESTNET
                </span>
              )}
            </div>
            {flowNetworkStatus && (
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  flowNetworkStatus.status === 'online' ? 'bg-green-500' : 
                  flowNetworkStatus.status === 'degraded' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-blue-700 capitalize">{flowNetworkStatus.status}</span>
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center space-x-2">
              <Server className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">Network: {networkInfo.network}</span>
            </div>
            <div className="flex items-center space-x-2">
              <LinkIcon className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">Chain: {networkInfo.chainId}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-blue-600" />
              <span className="text-blue-700">
                {flowNetworkStatus ? `Latency: ${flowNetworkStatus.latency}ms` : 'Access Node: Active'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Connection Error */}
      {connectionError && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5 text-red-600" />
            <span className="text-red-800 font-medium">Flow Connection Error</span>
          </div>
          <p className="text-red-700 text-sm mt-1">{connectionError}</p>
        </div>
      )}

      {/* Transaction Status */}
      {transactionStatus && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-center space-x-2">
            <Waves className="h-5 w-5 text-blue-600" />
            <span className="text-blue-800 font-medium">Flow Blockchain</span>
          </div>
          <p className="text-blue-700 text-sm mt-1">{transactionStatus}</p>
        </div>
      )}

      {/* Privy Authentication Status */}
      {privyAuthenticated && privyUser && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">✅ Platform Account Connected</h3>
                <p className="text-gray-600">{privyUser.displayName}</p>
                {privyUser.email && (
                  <p className="text-sm text-blue-600">{privyUser.email}</p>
                )}
                {privyUser.wallet && (
                  <p className="text-sm text-blue-600 font-mono">{privyUser.wallet}</p>
                )}
                <p className="text-xs text-green-600 mt-1">
                  ✅ Authenticated via Privy • Ready for Flow features
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Platform Access</div>
              <div className="text-green-600 font-medium">Connected</div>
            </div>
          </div>
        </div>
      )}

      {/* 🌊 Pure Flow Wallet Connection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Waves className="h-8 w-8 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">🌊 Pure Flow Wallet Connection</h3>
          <p className="text-gray-600 mb-6">
            Connect your Flow wallet (0x3fdbb8520812d88e) to Flow testnet - completely separate from other authentication
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="p-4 bg-blue-50 rounded-xl">
              <Bot className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">AI Agents</h4>
              <p className="text-sm text-gray-600">Create blockchain-based AI agents</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <FileSignature className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Flow Signatures</h4>
              <p className="text-sm text-gray-600">Cryptographic signing with Flow</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-xl">
              <Zap className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-gray-900 mb-1">Testnet</h4>
              <p className="text-sm text-gray-600">Safe testing environment</p>
            </div>
          </div>
          
          {/* Authentication Requirements */}
          {!privyAuthenticated && (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-xl mb-6">
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="font-semibold text-yellow-900">Platform Authentication Required</span>
              </div>
              <p className="text-sm text-yellow-700 mb-3">
                Please connect to the platform first using email, MetaMask, or WalletConnect
              </p>
              <button
                onClick={privyLogin}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors"
              >
                Connect to Platform First
              </button>
            </div>
          )}
          
          <button
            onClick={handleFlowLogin}
            disabled={loading || !privyAuthenticated}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {loading ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Wallet className="h-5 w-5" />
            )}
            <span>{loading ? 'Connecting...' : 'Connect Flow Wallet'}</span>
          </button>
          <div className="mt-2 text-xs text-blue-600">
            Supports: Blocto, Lilico, Flow Wallet, Dapper, Ledger
          </div>

          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-900">Flow Testnet Resources</p>
                <p className="text-xs text-blue-700">
                  Get free testnet FLOW tokens from the{' '}
                  <a 
                    href="https://testnet-faucet.onflow.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    Flow Faucet
                  </a>
                  {' '}• Use{' '}
                  <a 
                    href="https://flow-wallet.blocto.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    Blocto Wallet
                  </a>
                  {' '}• View on{' '}
                  <a 
                    href="https://testnet.flowscan.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="underline hover:text-blue-800"
                  >
                    Flow Explorer
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flow User Info - Only show when connected */}
      {flowUser?.loggedIn && (
        <>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Flow Wallet Connected</h3>
                  <div className="flex items-center space-x-2">
                    <p className="text-gray-600 font-mono text-sm">{flowUser.addr}</p>
                    <button
                      onClick={() => copyToClipboard(flowUser.addr || '')}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <a
                      href={`https://testnet.flowscan.org/account/${flowUser.addr}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Connected to Flow Testnet • Signatures Enabled
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-gray-500">Balance</div>
                  <div className="text-purple-600 font-bold">{balance} FLOW</div>
                </div>
                <button
                  onClick={handleFlowLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Disconnect</span>
                </button>
              </div>
            </div>
          </div>

          {/* Signature Testing */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">🔐 Flow Signature Testing</h3>
              <button
                onClick={handleTestSignature}
                disabled={loading}
                className="flex items-center space-x-2 bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader className="h-4 w-4 animate-spin" />
                ) : (
                  <FileSignature className="h-4 w-4" />
                )}
                <span>Test Pure Flow Signature</span>
              </button>
            </div>
            
            {signatureTest && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-green-800 font-medium">✅ Pure Flow Signature Successful</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Flow Address: </span>
                    <span className="font-mono text-gray-800">{signatureTest.addr}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Key ID: </span>
                    <span className="font-mono text-gray-800">{signatureTest.keyId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Message: </span>
                    <span className="font-mono text-gray-800 text-xs break-all">{signatureTest.message}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Signature: </span>
                    <span className="font-mono text-gray-800 text-xs break-all">{signatureTest.signature}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* AI Agents Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">🤖 Flow AI Agents</h3>
              <button
                onClick={() => setShowCreateAgent(true)}
                className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Create Agent</span>
              </button>
            </div>

            {/* Create Agent Modal */}
            {showCreateAgent && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
                  <h4 className="text-xl font-bold text-gray-900 mb-6">Create New AI Agent</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Model Endpoint
                      </label>
                      <input
                        type="url"
                        value={newAgentEndpoint}
                        onChange={(e) => setNewAgentEndpoint(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="https://api.anthropic.com/v1/messages"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Enter the API endpoint for your AI model
                      </p>
                    </div>
                    
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Key className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium text-blue-900">Pure Flow Signature Required</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        This action will require a pure Flow signature to verify your identity and create the agent on-chain.
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-4 mt-8">
                    <button
                      onClick={() => setShowCreateAgent(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleCreateAgent}
                      disabled={loading || !newAgentEndpoint.trim()}
                      className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
                    >
                      {loading ? (
                        <Loader className="h-4 w-4 animate-spin" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                      <span>{loading ? 'Creating...' : 'Create & Sign'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Agents List */}
            {loading && agents.length === 0 ? (
              <div className="text-center py-8">
                <Loader className="h-8 w-8 animate-spin text-purple-600 mx-auto mb-4" />
                <p className="text-gray-600">Loading agents from Flow blockchain...</p>
              </div>
            ) : agents.length === 0 ? (
              <div className="text-center py-8">
                <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">No Flow agents created yet</p>
                <p className="text-sm text-gray-500">Create your first AI agent on the Flow blockchain with pure Flow signature verification</p>
              </div>
            ) : (
              <div className="space-y-4">
                {agents.map((agent) => (
                  <div key={agent.id} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          agent.isActive ? 'bg-green-100' : 'bg-gray-100'
                        }`}>
                          {agent.isActive ? (
                            <Activity className="h-5 w-5 text-green-600" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">Flow Agent #{agent.id}</h4>
                          <p className="text-sm text-gray-600 font-mono">{agent.modelEndpoint}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                            <span>Used {agent.usageCount} times</span>
                            <span>Created {new Date(agent.createdAt).toLocaleDateString()}</span>
                            <span className="flex items-center space-x-1">
                              <Waves className="h-3 w-3" />
                              <span>Flow Signed</span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.isActive 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-gray-100 text-gray-700'
                        }`}>
                          {agent.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {!agent.isActive && (
                          <button
                            onClick={() => handleActivateAgent(agent.id)}
                            disabled={loading}
                            className="text-purple-600 hover:text-purple-700 text-sm font-medium disabled:opacity-50"
                          >
                            Activate
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};