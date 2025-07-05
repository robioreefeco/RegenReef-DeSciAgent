// Service for integrating with the RegenReef AI Agent GPT
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

export interface RegenReefQuery {
  query: string;
  context?: string;
  userId?: string;
  sessionId?: string;
}

export interface RegenReefResponse {
  success: boolean;
  response?: string;
  error?: string;
  metadata: {
    timestamp: string;
    processingTime: number;
    qualityScore?: number;
    agentId: string;
    sessionId?: string;
  };
}

export interface RegenReefSession {
  sessionId: string;
  userId: string;
  startTime: string;
  messageCount: number;
  totalPoints: number;
}

class RegenReefService {
  private sessionId: string | null = null;
  private readonly AGENT_ID = 'g-68688d70f9288191bcaf63f961032e06';
  private readonly AGENT_URL = 'https://chatgpt.com/g/g-68688d70f9288191bcaf63f961032e06-regenreef-aiagent';

  // Initialize a new session with the RegenReef AI Agent
  async initializeSession(userId: string): Promise<string> {
    this.sessionId = `regenreef_${userId}_${Date.now()}`;
    
    console.log(`🌊 Initializing RegenReef AI Agent session: ${this.sessionId}`);
    
    // Store session info locally
    const session: RegenReefSession = {
      sessionId: this.sessionId,
      userId,
      startTime: new Date().toISOString(),
      messageCount: 0,
      totalPoints: 0
    };
    
    localStorage.setItem(`regenreef_session_${userId}`, JSON.stringify(session));
    
    return this.sessionId;
  }

  // Query the RegenReef AI Agent through our backend
  async queryRegenReefAgent(request: RegenReefQuery): Promise<RegenReefResponse> {
    const startTime = Date.now();
    
    try {
      console.log('🤖 Querying RegenReef AI Agent:', request.query);
      
      // Prepare the request for our backend which interfaces with the RegenReef GPT
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: request.query,
          context: request.context,
          aiModel: 'regenreef', // This tells our backend to use the RegenReef AI Agent
          sessionId: request.sessionId || this.sessionId
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const processingTime = Date.now() - startTime;

      // Calculate quality score based on response characteristics
      const qualityScore = this.calculateResponseQuality(data.response || '');

      return {
        success: data.success,
        response: data.response,
        error: data.error,
        metadata: {
          timestamp: new Date().toISOString(),
          processingTime,
          qualityScore,
          agentId: this.AGENT_ID,
          sessionId: request.sessionId || this.sessionId
        }
      };

    } catch (error) {
      console.error('❌ Error querying RegenReef AI Agent:', error);
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        metadata: {
          timestamp: new Date().toISOString(),
          processingTime: Date.now() - startTime,
          agentId: this.AGENT_ID,
          sessionId: request.sessionId || this.sessionId
        }
      };
    }
  }

  // Direct link to the RegenReef AI Agent for users who want to chat directly
  getDirectAgentLink(): string {
    return this.AGENT_URL;
  }

  // Get agent information
  getAgentInfo() {
    return {
      id: this.AGENT_ID,
      name: 'RegenReef AI Agent',
      description: 'Specialized AI assistant for coral reef conservation and restoration',
      url: this.AGENT_URL,
      capabilities: [
        'Coral reef health assessment',
        'Marine conservation strategies',
        'Restoration planning',
        'Biodiversity analysis',
        'Climate impact evaluation',
        'Stakeholder engagement guidance'
      ]
    };
  }

  // Calculate response quality for point allocation
  private calculateResponseQuality(response: string): number {
    let score = 50; // Base score

    // Length and detail indicators
    if (response.length > 500) score += 10;
    if (response.length > 1000) score += 10;
    if (response.length > 2000) score += 10;

    // Scientific content indicators
    const scientificTerms = [
      'coral', 'reef', 'marine', 'ecosystem', 'biodiversity',
      'conservation', 'restoration', 'calcification', 'symbiosis',
      'bleaching', 'pH', 'temperature', 'nutrients', 'spawning'
    ];

    const termMatches = scientificTerms.filter(term => 
      response.toLowerCase().includes(term)
    ).length;

    score += Math.min(termMatches * 2, 20);

    // Structure and formatting indicators
    if (response.includes('**') || response.includes('##')) score += 5;
    if (response.includes('1.') || response.includes('•')) score += 5;
    if (response.includes('Phase') || response.includes('Step')) score += 5;

    // Technical specificity
    if (response.includes('°C') || response.includes('%') || response.includes('μM')) score += 5;
    if (response.includes('months') || response.includes('years')) score += 3;

    return Math.min(Math.max(score, 20), 100);
  }

  // Get current session info
  getCurrentSession(userId: string): RegenReefSession | null {
    const sessionData = localStorage.getItem(`regenreef_session_${userId}`);
    return sessionData ? JSON.parse(sessionData) : null;
  }

  // Update session with new message
  updateSession(userId: string, pointsEarned: number) {
    const session = this.getCurrentSession(userId);
    if (session) {
      session.messageCount += 1;
      session.totalPoints += pointsEarned;
      localStorage.setItem(`regenreef_session_${userId}`, JSON.stringify(session));
    }
  }

  // Check if backend is available
  async checkBackendHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return response.ok;
    } catch (error) {
      console.warn('Backend health check failed:', error);
      return false;
    }
  }

  // Fallback method when backend is not available
  getFallbackResponse(query: string): RegenReefResponse {
    return {
      success: false,
      error: 'Backend service unavailable',
      response: `I apologize, but I'm currently unable to connect to the RegenReef AI Agent backend service. 

You can still access the RegenReef AI Agent directly at:
${this.AGENT_URL}

The RegenReef AI Agent (${this.AGENT_ID}) specializes in:
• Coral reef conservation strategies
• Marine ecosystem restoration
• Biodiversity assessment
• Climate impact analysis
• Stakeholder engagement planning

Please try again later or visit the direct link above to continue your coral reef conservation research.`,
      metadata: {
        timestamp: new Date().toISOString(),
        processingTime: 0,
        agentId: this.AGENT_ID,
        qualityScore: 0
      }
    };
  }
}

export const regenReefService = new RegenReefService();
export default regenReefService;