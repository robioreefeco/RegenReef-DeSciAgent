# RegenReef DeSci Agent Platform

A decentralized science platform powered by Flow blockchain and the specialized RegenReef AI Agent GPT (g-68688d70f9288191bcaf63f961032e06), offering comprehensive coral reef decision support for marine conservation with enterprise-grade MPC security.

## 🌊 Features

### Core Functionality
- **AI-Powered Reef Analysis**: Advanced coral reef health assessment using LLMs
- **Restoration Planning**: Intelligent restoration strategy generation
- **Flow Blockchain Integration**: Decentralized AI agent management
- **Real-time Monitoring**: Live reef health tracking and alerts
- **Stakeholder Collaboration**: Multi-stakeholder engagement platform
- **MPC Security**: Multi-Party Computation for secure AI interactions
- **Enterprise Encryption**: End-to-end encrypted communications

### AI Agents
- **RegenReef AI Agent GPT**: Specialized AI assistant (g-68688d70f9288191bcaf63f961032e06) for coral reef conservation
- **Coral Health Analyzer**: Advanced reef health assessment using expert AI analysis
- **Restoration Planner**: Evidence-based restoration strategy development
- **Ecosystem Monitor**: Comprehensive biodiversity and ecosystem monitoring
- **Expert Consultation**: Direct access to specialized coral reef expertise
- **Secure MPC Gateway**: Privacy-preserving AI interactions

### Blockchain Features
- **Agent NFTs**: AI agents as Flow blockchain resources
- **Decentralized Governance**: Community-driven decision making
- **Transparent Operations**: All agent activities recorded on-chain
- **Stakeholder Rewards**: Token incentives for conservation efforts
- **Secure Sessions**: Cryptographically verified user sessions

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Flow CLI (for contract deployment)
- Anthropic API key (optional, for fallback)
- OpenAI API key (for RegenReef AI Agent integration)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-org/regenreef-desci-agent.git
   cd regenreef-desci-agent
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   # Edit .env with your API keys
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start all services (backend)**
   ```bash
   npm run dev:all
   ```

   Or start services individually:
   ```bash
   # Terminal 1: Frontend
   npm run dev
   
   # Terminal 2: Backend API
   npm run start:backend
   ```
### Environment Variables

Create a `.env` file with the following variables:

```env
# Backend
PRIVATE_KEY=your_flow_private_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
OPENAI_API_KEY=your_openai_api_key_here
PORT=3001

# Frontend
VITE_API_URL=http://localhost:3001/api
VITE_FLOW_ACCESS_NODE=https://rest-testnet.onflow.org
VITE_FLOW_DISCOVERY_WALLET=https://fcl-discovery.onflow.org/testnet/authn
```

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Dashboard**: Overview of global reef health
- **Reef Analyzer**: AI-powered reef health analysis
- **Restoration Planner**: Intelligent restoration planning
- **Agent Manager**: Flow blockchain agent management
- **Analytics**: Comprehensive reef data visualization
- **Stakeholder Hub**: Collaboration and resource sharing

### Backend (Node.js + Express)
- **AgentKit Integration**: Onchain agent management
- **RegenReef AI Agent**: Specialized GPT integration (g-68688d70f9288191bcaf63f961032e06)
- **LLM Services**: Multiple AI model support (Claude, GPT-4)
- **API Endpoints**: RESTful services for reef analysis
- **Event Handling**: Blockchain event processing

### Smart Contracts (Cadence)
- **AIAgentManager**: Core agent management contract
- **Agent Resources**: NFT-based AI agents
- **Collection Management**: User agent collections
- **Event Emission**: Activity tracking and logging


## 🔧 API Endpoints

### Reef Analysis
```http
POST /api/analyze-reef
Content-Type: application/json

{
  "location": "Great Barrier Reef - Heron Island",
  "temperature": 26.5,
  "coralCover": 75,
  "threats": ["Coral Bleaching", "Ocean Acidification"],
  "additionalData": "Recent cyclone activity, increased tourism",
  "aiModel": "regenreef"
}
```

### Restoration Planning
```http
POST /api/restoration-plan
Content-Type: application/json

{
  "reefData": {
    "location": "Maldives - North Malé Atoll",
    "currentHealth": 60,
    "threats": ["Climate Change", "Tourism"],
    "size": 150
  },
  "goals": "Increase coral coverage by 25%",
  "timeline": "18 months",
  "budget": "$500,000 USD",
  "stakeholders": ["Local Communities", "Government Agencies"],
  "aiModel": "regenreef"
}
```

### Expert Consultation
```http
POST /api/regenreef-expert
Content-Type: application/json

{
  "query": "What are the latest techniques for coral transplantation?",
  "expertiseArea": "coral restoration"
}
```

## 🌐 Flow Blockchain Integration

### Contract Deployment
```bash
flow accounts create
flow project deploy --network testnet
```

### Agent Creation
```javascript
import { FlowService } from './services/flowService';

// Create a new AI agent
const txId = await FlowService.mintAgent('https://api.anthropic.com/v1/messages');
```

### Agent Management
```javascript
// Get user's agents
const agents = await FlowService.getUserAgents(userAddress);

// Activate an agent
const txId = await FlowService.activateAgent(agentId);
```

## 🛡️ MPC Network Usage

### Initialize Secure Session
```javascript
import { mpcService } from './services/mpcService';

// Create secure session
await mpcService.initializeSecureSession(userId);
```

### Secure Query to RegenReef AI Agent
```javascript
const response = await mpcService.secureQueryRegenReef({
  query: "What are the best coral restoration techniques?",
  context: "Research project in Maldives",
  userId: "user123"
});

console.log('Security Level:', response.securityLevel);
console.log('MPC Verified:', response.verified);
console.log('Response:', response.response);
```

### Network Status
```javascript
const status = await mpcService.getNetworkStatus();
console.log('MPC Network:', status.network);
console.log('RegenReef Agent:', status.regenReefAgent);
```

## 🤝 Contributing

We welcome contributions from marine biologists, developers, and conservation enthusiasts!

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Areas for Contribution
- **Marine Science**: Reef health algorithms and indicators
- **AI/ML**: Enhanced LLM prompts and analysis
- **Blockchain**: Smart contract improvements
- **UI/UX**: User interface enhancements
- **Data**: Reef monitoring datasets
- **Security**: MPC protocol improvements
- **Cryptography**: Advanced encryption schemes

## 📊 Data Sources

- **NOAA Coral Reef Watch**: Satellite monitoring data
- **Global Coral Reef Monitoring Network**: Field observations
- **Ocean Health Index**: Ecosystem health metrics
- **IUCN Red List**: Species conservation status

## 🔒 Security

- **API Key Management**: Secure environment variable handling
- **Blockchain Security**: Audited smart contracts
- **Data Privacy**: GDPR-compliant data handling
- **Access Control**: Role-based permissions

## 📈 Roadmap

### Phase 1 (Current)
- ✅ Core platform development
- ✅ Flow blockchain integration
- ✅ Basic AI agent functionality
- ✅ Reef analysis tools

### Phase 2 (Q2 2024)
- 🔄 Advanced ML models
- 🔄 Mobile application
- 🔄 Real-time data feeds
- 🔄 Community governance

### Phase 3 (Q3 2024)
- 📋 IoT sensor integration
- 📋 Satellite data processing
- 📋 Global reef network
- 📋 Carbon credit marketplace

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Flow Blockchain**: For providing the decentralized infrastructure
- **Anthropic**: For Claude AI capabilities
- **OpenAI**: For GPT-4 and RegenReef AI Agent access
- **Marine Conservation Organizations**: For domain expertise
- **Open Source Community**: For tools and libraries

## 📞 Contact

- **Platform**: https://benevolent-meerkat-ceaef3.netlify.app
- **RegenReef AI Agent**: https://chatgpt.com/g/g-68688d70f9288191bcaf63f961032e06-regenreef-aiagent
- **GitHub**: https://github.com/regenreef/desci-agent-platform

---

**RegenReef DeSci Agent Platform** - Empowering stakeholders with specialized AI-driven coral reef decision support powered by the RegenReef AI Agent GPT (g-68688d70f9288191bcaf63f961032e06) with enterprise-grade MPC security for a sustainable ocean future.
**RegenReef DeSci Agent Platform** - Empowering stakeholders with specialized AI-driven coral reef decision support powered by the RegenReef AI Agent GPT (g-68688d70f9288191bcaf63f961032e06) for a sustainable ocean future.