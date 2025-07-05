const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.com/api' 
  : 'http://localhost:3001/api';

export interface ReefAnalysisRequest {
  location: string;
  temperature: number;
  coralCover: number;
  threats?: string[];
  additionalData?: string;
  aiModel?: 'regenreef' | 'claude' | 'gpt4';
}

export interface ReefAnalysisResponse {
  success: boolean;
  analysis: string;
  metadata: {
    location: string;
    temperature: number;
    coralCover: number;
    threats?: string[];
    aiModel: string;
    timestamp: string;
  };
}

export interface RestorationPlanRequest {
  reefData: {
    location: string;
    currentHealth: number;
    threats: string[];
    size: number;
  };
  goals: string;
  timeline: string;
  budget?: string;
  stakeholders?: string[];
  aiModel?: 'regenreef' | 'claude' | 'gpt4';
}

export interface RestorationPlanResponse {
  success: boolean;
  plan: string;
  metadata: {
    reefData: any;
    goals: string;
    timeline: string;
    aiModel: string;
    timestamp: string;
  };
}

export interface ChatRequest {
  message: string;
  context?: string;
  aiModel?: 'regenreef' | 'claude' | 'gpt4';
}

export interface ChatResponse {
  success: boolean;
  response: string;
  metadata: {
    aiModel: string;
    timestamp: string;
  };
}

export class ApiService {
  static async analyzeReef(data: ReefAnalysisRequest): Promise<ReefAnalysisResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze-reef`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error analyzing reef:', error);
      throw error;
    }
  }

  static async createRestorationPlan(data: RestorationPlanRequest): Promise<RestorationPlanResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/restoration-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating restoration plan:', error);
      throw error;
    }
  }

  static async chat(data: ChatRequest): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error in chat:', error);
      // Return a fallback response if the API is not available
      return {
        success: false,
        response: "I apologize, but I'm currently unable to connect to the RegenReef AI Agent. This could be due to network issues or the backend service being temporarily unavailable. Please try again in a moment, or check that the backend server is running on http://localhost:3001",
        metadata: {
          aiModel: 'RegenReef AI Agent (Offline)',
          timestamp: new Date().toISOString()
        }
      };
    }
  }

  static async checkHealth(): Promise<{ 
    status: string; 
    timestamp: string; 
    aiModels: string[];
    features: string[];
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/health`);
      return await response.json();
    } catch (error) {
      console.error('Error checking API health:', error);
      throw error;
    }
  }

  static async consultRegenReefExpert(query: string, expertiseArea?: string): Promise<{
    success: boolean;
    response: string;
    expertiseArea: string;
    timestamp: string;
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/regenreef-expert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, expertiseArea }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error consulting RegenReef expert:', error);
      throw error;
    }
  }
}