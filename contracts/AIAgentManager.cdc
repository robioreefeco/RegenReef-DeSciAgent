pub contract AIAgentManager {
    pub let admin: Address

    pub event AgentCreated(id: UInt64, endpoint: String, owner: Address)
    pub event AgentActivated(id: UInt64)
    pub event AgentDeactivated(id: UInt64)

    pub resource Agent {
        pub let id: UInt64
        pub let modelEndpoint: String
        pub var isActive: Bool
        pub let createdAt: UFix64
        pub var lastUsed: UFix64
        pub var usageCount: UInt64

        init(endpoint: String) {
            self.id = self.uuid
            self.modelEndpoint = endpoint
            self.isActive = true
            self.createdAt = getCurrentBlock().timestamp
            self.lastUsed = getCurrentBlock().timestamp
            self.usageCount = 0
        }

        pub fun activate() {
            self.isActive = true
            emit AgentActivated(id: self.id)
        }

        pub fun deactivate() {
            self.isActive = false
            emit AgentDeactivated(id: self.id)
        }

        pub fun recordUsage() {
            self.lastUsed = getCurrentBlock().timestamp
            self.usageCount = self.usageCount + 1
        }
    }

    pub resource interface AgentMinter {
        pub fun mintAgent(endpoint: String): @Agent
    }

    pub resource Admin: AgentMinter {
        pub fun mintAgent(endpoint: String): @Agent {
            let agent <- create Agent(endpoint: endpoint)
            emit AgentCreated(id: agent.id, endpoint: endpoint, owner: self.owner?.address ?? panic("No owner"))
            return <- agent
        }
    }

    pub resource interface AgentCollectionPublic {
        pub fun getAgentIDs(): [UInt64]
        pub fun borrowAgent(id: UInt64): &Agent?
    }

    pub resource AgentCollection: AgentCollectionPublic {
        pub var agents: @{UInt64: Agent}

        init() {
            self.agents <- {}
        }

        pub fun deposit(agent: @Agent) {
            let id = agent.id
            self.agents[id] <-! agent
        }

        pub fun withdraw(id: UInt64): @Agent {
            return <- self.agents.remove(key: id) ?? panic("Agent not found")
        }

        pub fun getAgentIDs(): [UInt64] {
            return self.agents.keys
        }

        pub fun borrowAgent(id: UInt64): &Agent? {
            return &self.agents[id] as &Agent?
        }

        destroy() {
            destroy self.agents
        }
    }

    pub fun createEmptyCollection(): @AgentCollection {
        return <- create AgentCollection()
    }

    init() {
        self.admin = 0x77c6235ec164995055CFC6210A6aCF5Daf195c07
        self.account.save(<- create Admin(), to: /storage/AIAgentAdmin)
        self.account.link<&Admin{AgentMinter}>(/public/AIAgentMinter, target: /storage/AIAgentAdmin)
        
        // Create collection storage paths
        self.account.save(<- self.createEmptyCollection(), to: /storage/AgentCollection)
        self.account.link<&AgentCollection{AgentCollectionPublic}>(/public/AgentCollection, target: /storage/AgentCollection)
    }
}