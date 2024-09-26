import { validateResponse, ProductAnalysisSchema } from '../../src/utils/validateResponse';

describe('validateResponse', () => {
    it('should validate a correct response', () => {
        const validResponse = JSON.stringify({
            productIdea: "Innovative Product",
            businessAnalysis: {
                businessCase: {
                    realWorldExamples: ["Example1", "Example2"],
                    marketTrends: "Rising trend in AI",
                    competitorAnalysis: "Competitor A, Competitor B",
                    customerSegments: "Tech enthusiasts",
                    financialProjections: {
                        costs: "10000",
                        revenues: "20000",
                        profitability: "10000",
                    },
                },
                swotAnalysis: {
                    tableFormat: "Markdown",
                    strengths: ["Strong team"],
                    weaknesses: ["Limited resources"],
                    opportunities: ["Growing market"],
                    threats: ["High competition"],
                },
                businessModelCanvas: {
                    keyPartners: ["Partner1"],
                    keyActivities: ["Development"],
                    valuePropositions: ["Unique feature"],
                    customerRelationships: ["Personalized support"],
                    customerSegments: ["Early adopters"],
                    keyResources: ["Tech stack"],
                    channels: ["Online"],
                    costStructure: ["Development costs"],
                    revenueStreams: ["Subscription"],
                },
            },
            strategyAndPlanning: {
                longTermStrategy: {
                    growthOpportunities: ["Expansion"],
                    potentialChallenges: ["Scaling"],
                    marketPositioning: "Premium",
                    roadmap: {
                        milestones: ["MVP", "Launch"],
                        timelines: ["Q1", "Q2"],
                    },
                },
                discoveryWorkshops: {
                    areasNeedingWork: ["UI/UX"],
                    workshopTopics: [
                        { topic: "User onboarding", likelyAnswer: "Simplify process" },
                    ],
                },
            },
            productDefinition: {
                coreFeatures: [
                    { feature: "Feature1", priority: 1 },
                ],
                userStories: [
                    {
                        title: "User can sign up",
                        description: "Allow users to create an account",
                        acceptanceCriteria: ["Form validation", "Email confirmation"],
                        priority: "High",
                        estimatedEffort: "5 days",
                    },
                ],
            },
            technicalArchitecture: {
                architecture: {
                    diagram: "diagram_url",
                    components: [
                        { name: "Frontend", description: "User interface" },
                    ],
                    interactions: ["User clicks button triggers API call"],
                },
                techStackRecommendations: [
                    {
                        technology: "React",
                        pros: ["Reusable components"],
                        cons: ["Steep learning curve"],
                        alternatives: ["Vue.js"],
                    },
                ],
            },
            complianceAndRisk: {
                regulatoryCompliance: {
                    requirements: ["GDPR"],
                    complianceSteps: ["Data encryption"],
                },
                riskAssessment: {
                    risks: [
                        {
                            description: "Data breach",
                            impact: 5,
                            likelihood: 3,
                            mitigationStrategy: "Implement security protocols",
                        },
                    ],
                },
            },
            systemDesign: {
                integrationAndInteroperability: {
                    integrationPoints: ["Payment Gateway"],
                    dataConsistencyMeasures: ["Transactional DB"],
                },
                scalabilityAndPerformance: {
                    requirements: ["Handle 1000 users"],
                    scalingSolutions: ["Load balancer"],
                },
                securityConsiderations: {
                    potentialThreats: ["SQL Injection"],
                    securityMeasures: ["Input validation"],
                },
            },
            refinedConcept: {
                improvements: ["Improve UI"],
                justification: "Enhanced user experience leads to higher retention",
            },
        });

        const result = validateResponse(validResponse, ProductAnalysisSchema);
        expect(result.valid).toBe(true);
        expect(result.errors).toBeUndefined();
    });

    it('should detect missing fields', () => {
        const invalidResponse = JSON.stringify({
            // Missing productIdea
            businessAnalysis: {},
            // Other fields would be missing or incomplete
        });

        const result = validateResponse(invalidResponse, ProductAnalysisSchema);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Error at "productIdea": Required');
        expect(result.errors).toContain('Error at "businessAnalysis.businessCase": Required');
        expect(result.errors).toContain('Error at "businessAnalysis.swotAnalysis": Required');
        expect(result.errors).toContain('Error at "businessAnalysis.businessModelCanvas": Required');
        // Add more expectations based on missing fields
    });

    it('should detect invalid JSON', () => {
        const invalidJSON = "{ invalid json }";

        const result = validateResponse(invalidJSON, ProductAnalysisSchema);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain("Invalid JSON format");
    });

    it('should detect invalid field types', () => {
        const invalidFieldResponse = JSON.stringify({
            productIdea: 123, // Should be string
            businessAnalysis: {
                businessCase: {
                    realWorldExamples: "Not an array", // Should be array
                    marketTrends: "Rising trend",
                    competitorAnalysis: "Competitor A",
                    customerSegments: "Tech enthusiasts",
                    financialProjections: {
                        costs: "10000",
                        revenues: "20000",
                        profitability: "10000",
                    },
                },
                swotAnalysis: {
                    tableFormat: "Markdown",
                    strengths: ["Strong team"],
                    weaknesses: ["Limited resources"],
                    opportunities: ["Growing market"],
                    threats: ["High competition"],
                },
                businessModelCanvas: {
                    keyPartners: ["Partner1"],
                    keyActivities: ["Development"],
                    valuePropositions: ["Unique feature"],
                    customerRelationships: ["Personalized support"],
                    customerSegments: ["Early adopters"],
                    keyResources: ["Tech stack"],
                    channels: ["Online"],
                    costStructure: ["Development costs"],
                    revenueStreams: ["Subscription"],
                },
            },
            strategyAndPlanning: {
                longTermStrategy: {
                    growthOpportunities: ["Expansion"],
                    potentialChallenges: ["Scaling"],
                    marketPositioning: "Premium",
                    roadmap: {
                        milestones: ["MVP", "Launch"],
                        timelines: ["Q1", "Q2"],
                    },
                },
                discoveryWorkshops: {
                    areasNeedingWork: ["UI/UX"],
                    workshopTopics: [
                        { topic: "User onboarding", likelyAnswer: "Simplify process" },
                    ],
                },
            },
            productDefinition: {
                coreFeatures: [
                    { feature: "Feature1", priority: "High" }, // priority should be number
                ],
                userStories: [
                    {
                        title: "User can sign up",
                        description: "Allow users to create an account",
                        acceptanceCriteria: ["Form validation", "Email confirmation"],
                        priority: "High",
                        estimatedEffort: "5 days",
                    },
                ],
            },
            technicalArchitecture: {
                architecture: {
                    diagram: "diagram_url",
                    components: [
                        { name: "Frontend", description: "User interface" },
                    ],
                    interactions: ["User clicks button triggers API call"],
                },
                techStackRecommendations: [
                    {
                        technology: "React",
                        pros: ["Reusable components"],
                        cons: ["Steep learning curve"],
                        alternatives: ["Vue.js"],
                    },
                ],
            },
            complianceAndRisk: {
                regulatoryCompliance: {
                    requirements: ["GDPR"],
                    complianceSteps: ["Data encryption"],
                },
                riskAssessment: {
                    risks: [
                        {
                            description: "Data breach",
                            impact: "High", // Should be number
                            likelihood: 3,
                            mitigationStrategy: "Implement security protocols",
                        },
                    ],
                },
            },
            systemDesign: {
                integrationAndInteroperability: {
                    integrationPoints: ["Payment Gateway"],
                    dataConsistencyMeasures: ["Transactional DB"],
                },
                scalabilityAndPerformance: {
                    requirements: ["Handle 1000 users"],
                    scalingSolutions: ["Load balancer"],
                },
                securityConsiderations: {
                    potentialThreats: ["SQL Injection"],
                    securityMeasures: ["Input validation"],
                },
            },
            refinedConcept: {
                improvements: ["Improve UI"],
                justification: "Enhanced user experience leads to higher retention",
            },
        });

        const result = validateResponse(invalidFieldResponse, ProductAnalysisSchema);
        expect(result.valid).toBe(false);
        expect(result.errors).toContain('Error at "productIdea": Expected string, received number');
        expect(result.errors).toContain('Error at "businessAnalysis.businessCase.realWorldExamples": Expected array, received string');
        expect(result.errors).toContain('Error at "productDefinition.coreFeatures.0.priority": Expected number, received string');
        expect(result.errors).toContain('Error at "complianceAndRisk.riskAssessment.risks.0.impact": Expected number, received string');
    });
});