"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkshopTopicSchema = exports.UserStorySchema = exports.TechStackRecommendationSchema = exports.TechnicalArchitectureSchema = exports.SystemDesignSchema = exports.SWOTAnalysisSchema = exports.StrategyAndPlanningSchema = exports.SecurityConsiderationsSchema = exports.ScalabilityAndPerformanceSchema = exports.RoadmapSchema = exports.RiskSchema = exports.RiskAssessmentSchema = exports.RegulatoryComplianceSchema = exports.RefinedConceptSchema = exports.ProductDefinitionSchema = exports.ProductAnalysisSchema = exports.PriorityLevelSchema = exports.LongTermStrategySchema = exports.IntegrationAndInteroperabilitySchema = exports.FinancialProjectionsSchema = exports.DiscoveryWorkshopsSchema = exports.CoreFeatureSchema = exports.ComponentSchema = exports.ComplianceAndRiskSchema = exports.BusinessModelCanvasSchema = exports.BusinessCaseSchema = exports.BusinessAnalysisSchema = exports.ArchitectureSchema = exports.validateResponse = void 0;
const zod_1 = require("zod");
/**
 * Define Zod schemas corresponding to each TypeScript interface.
 * This ensures that the runtime validation aligns with the compile-time types.
 */
/* 1. FinancialProjections Schema */
const FinancialProjectionsSchema = zod_1.z.object({
    costs: zod_1.z.string(),
    revenues: zod_1.z.string(),
    profitability: zod_1.z.string(),
});
exports.FinancialProjectionsSchema = FinancialProjectionsSchema;
/* 2. BusinessCase Schema */
const BusinessCaseSchema = zod_1.z.object({
    realWorldExamples: zod_1.z.array(zod_1.z.string()),
    marketTrends: zod_1.z.string(),
    competitorAnalysis: zod_1.z.string(),
    customerSegments: zod_1.z.string(),
    financialProjections: FinancialProjectionsSchema,
});
exports.BusinessCaseSchema = BusinessCaseSchema;
/* 3. SWOTAnalysis Schema */
const SWOTAnalysisSchema = zod_1.z.object({
    tableFormat: zod_1.z.string(),
    strengths: zod_1.z.array(zod_1.z.string()),
    weaknesses: zod_1.z.array(zod_1.z.string()),
    opportunities: zod_1.z.array(zod_1.z.string()),
    threats: zod_1.z.array(zod_1.z.string()),
});
exports.SWOTAnalysisSchema = SWOTAnalysisSchema;
/* 4. BusinessModelCanvas Schema */
const BusinessModelCanvasSchema = zod_1.z.object({
    keyPartners: zod_1.z.array(zod_1.z.string()),
    keyActivities: zod_1.z.array(zod_1.z.string()),
    valuePropositions: zod_1.z.array(zod_1.z.string()),
    customerRelationships: zod_1.z.array(zod_1.z.string()),
    customerSegments: zod_1.z.array(zod_1.z.string()),
    keyResources: zod_1.z.array(zod_1.z.string()),
    channels: zod_1.z.array(zod_1.z.string()),
    costStructure: zod_1.z.array(zod_1.z.string()),
    revenueStreams: zod_1.z.array(zod_1.z.string()),
});
exports.BusinessModelCanvasSchema = BusinessModelCanvasSchema;
/* 5. BusinessAnalysis Schema */
const BusinessAnalysisSchema = zod_1.z.object({
    businessCase: BusinessCaseSchema,
    swotAnalysis: SWOTAnalysisSchema,
    businessModelCanvas: BusinessModelCanvasSchema,
});
exports.BusinessAnalysisSchema = BusinessAnalysisSchema;
/* 6. Roadmap Schema */
const RoadmapSchema = zod_1.z.object({
    milestones: zod_1.z.array(zod_1.z.string()),
    timelines: zod_1.z.array(zod_1.z.string()),
});
exports.RoadmapSchema = RoadmapSchema;
/* 7. LongTermStrategy Schema */
const LongTermStrategySchema = zod_1.z.object({
    growthOpportunities: zod_1.z.array(zod_1.z.string()),
    potentialChallenges: zod_1.z.array(zod_1.z.string()),
    marketPositioning: zod_1.z.string(),
    roadmap: RoadmapSchema,
});
exports.LongTermStrategySchema = LongTermStrategySchema;
/* 8. WorkshopTopic Schema */
const WorkshopTopicSchema = zod_1.z.object({
    topic: zod_1.z.string(),
    likelyAnswer: zod_1.z.string(),
});
exports.WorkshopTopicSchema = WorkshopTopicSchema;
/* 9. DiscoveryWorkshops Schema */
const DiscoveryWorkshopsSchema = zod_1.z.object({
    areasNeedingWork: zod_1.z.array(zod_1.z.string()),
    workshopTopics: zod_1.z.array(WorkshopTopicSchema),
});
exports.DiscoveryWorkshopsSchema = DiscoveryWorkshopsSchema;
/* 10. StrategyAndPlanning Schema */
const StrategyAndPlanningSchema = zod_1.z.object({
    longTermStrategy: LongTermStrategySchema,
    discoveryWorkshops: DiscoveryWorkshopsSchema,
});
exports.StrategyAndPlanningSchema = StrategyAndPlanningSchema;
/* 11. CoreFeature Schema */
const CoreFeatureSchema = zod_1.z.array(zod_1.z.object({
    feature: zod_1.z.string(),
    priority: zod_1.z.number(),
}));
exports.CoreFeatureSchema = CoreFeatureSchema;
/* 12. PriorityLevel Enum */
const PriorityLevelSchema = zod_1.z.enum(["Low", "Medium", "High"]);
exports.PriorityLevelSchema = PriorityLevelSchema;
/* 13. UserStory Schema */
const UserStorySchema = zod_1.z.array(zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    acceptanceCriteria: zod_1.z.array(zod_1.z.string()),
    priority: PriorityLevelSchema,
    estimatedEffort: zod_1.z.string(),
}));
exports.UserStorySchema = UserStorySchema;
/* 14. ProductDefinition Schema */
const ProductDefinitionSchema = zod_1.z.object({
    coreFeatures: CoreFeatureSchema, // Updated to be an array of objects
    userStories: UserStorySchema, // Updated to be an array of objects
});
exports.ProductDefinitionSchema = ProductDefinitionSchema;
/* 15. Component Schema */
const ComponentSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string(),
});
exports.ComponentSchema = ComponentSchema;
/* 16. Architecture Schema */
const ArchitectureSchema = zod_1.z.object({
    diagram: zod_1.z.string(),
    components: zod_1.z.array(ComponentSchema),
    interactions: zod_1.z.array(zod_1.z.string()),
});
exports.ArchitectureSchema = ArchitectureSchema;
/* 17. TechStackRecommendation Schema */
const TechStackRecommendationSchema = zod_1.z.array(zod_1.z.object({
    technology: zod_1.z.string(),
    pros: zod_1.z.array(zod_1.z.string()),
    cons: zod_1.z.array(zod_1.z.string()),
    alternatives: zod_1.z.array(zod_1.z.string()),
}));
exports.TechStackRecommendationSchema = TechStackRecommendationSchema;
/* 18. TechnicalArchitecture Schema */
const TechnicalArchitectureSchema = zod_1.z.object({
    architecture: ArchitectureSchema,
    techStackRecommendations: TechStackRecommendationSchema, // Updated to be an array of objects
});
exports.TechnicalArchitectureSchema = TechnicalArchitectureSchema;
/* 19. RegulatoryCompliance Schema */
const RegulatoryComplianceSchema = zod_1.z.object({
    requirements: zod_1.z.array(zod_1.z.string()),
    complianceSteps: zod_1.z.array(zod_1.z.string()),
});
exports.RegulatoryComplianceSchema = RegulatoryComplianceSchema;
/* 20. Risk Schema */
const RiskSchema = zod_1.z.object({
    description: zod_1.z.string(),
    impact: zod_1.z.number(),
    likelihood: zod_1.z.number(),
    mitigationStrategy: zod_1.z.string(),
});
exports.RiskSchema = RiskSchema;
/* 21. RiskAssessment Schema */
const RiskAssessmentSchema = zod_1.z.object({
    risks: zod_1.z.array(RiskSchema),
});
exports.RiskAssessmentSchema = RiskAssessmentSchema;
/* 22. ComplianceAndRisk Schema */
const ComplianceAndRiskSchema = zod_1.z.object({
    regulatoryCompliance: RegulatoryComplianceSchema,
    riskAssessment: RiskAssessmentSchema,
});
exports.ComplianceAndRiskSchema = ComplianceAndRiskSchema;
/* 23. IntegrationAndInteroperability Schema */
const IntegrationAndInteroperabilitySchema = zod_1.z.object({
    integrationPoints: zod_1.z.array(zod_1.z.string()),
    dataConsistencyMeasures: zod_1.z.array(zod_1.z.string()),
});
exports.IntegrationAndInteroperabilitySchema = IntegrationAndInteroperabilitySchema;
/* 24. ScalabilityAndPerformance Schema */
const ScalabilityAndPerformanceSchema = zod_1.z.object({
    requirements: zod_1.z.array(zod_1.z.string()),
    scalingSolutions: zod_1.z.array(zod_1.z.string()),
});
exports.ScalabilityAndPerformanceSchema = ScalabilityAndPerformanceSchema;
/* 25. SecurityConsiderations Schema */
const SecurityConsiderationsSchema = zod_1.z.object({
    potentialThreats: zod_1.z.array(zod_1.z.string()),
    securityMeasures: zod_1.z.array(zod_1.z.string()),
});
exports.SecurityConsiderationsSchema = SecurityConsiderationsSchema;
/* 26. SystemDesign Schema */
const SystemDesignSchema = zod_1.z.object({
    integrationAndInteroperability: IntegrationAndInteroperabilitySchema,
    scalabilityAndPerformance: ScalabilityAndPerformanceSchema,
    securityConsiderations: SecurityConsiderationsSchema,
});
exports.SystemDesignSchema = SystemDesignSchema;
/* 27. RefinedConcept Schema */
const RefinedConceptSchema = zod_1.z.object({
    improvements: zod_1.z.array(zod_1.z.string()),
    justification: zod_1.z.string(),
});
exports.RefinedConceptSchema = RefinedConceptSchema;
/* 28. ProductAnalysis Schema */
const ProductAnalysisSchema = zod_1.z.object({
    productIdea: zod_1.z.string(),
    businessAnalysis: BusinessAnalysisSchema,
    strategyAndPlanning: StrategyAndPlanningSchema,
    productDefinition: zod_1.z.object({
        coreFeatures: CoreFeatureSchema, // Ensure this is an array
        userStories: UserStorySchema, // Ensure this is an array
    }),
    technicalArchitecture: zod_1.z.object({
        architecture: ArchitectureSchema,
        techStackRecommendations: TechStackRecommendationSchema, // Ensure this is an array
    }),
    complianceAndRisk: ComplianceAndRiskSchema,
    systemDesign: SystemDesignSchema,
    refinedConcept: RefinedConceptSchema,
});
exports.ProductAnalysisSchema = ProductAnalysisSchema;
/**
 * Validates the structure of the response against a provided Zod schema.
 * @param response - The JSON string response to validate.
 * @param schema - The Zod schema to validate against.
 * @returns A ValidationResult indicating whether the response is valid and any associated errors.
 */
const validateResponse = (response, schema // Updated to use the union type
) => {
    try {
        const parsedResponse = JSON.parse(response);
        console.log(parsedResponse);
        // Perform schema validation
        const validation = schema.safeParse(parsedResponse);
        if (!validation.success) {
            // Extract error messages from Zod
            const errors = validation.error.errors.map((err) => {
                const path = err.path.join('.');
                return path ? `Error at "${path}": ${err.message}` : err.message;
            });
            return { valid: false, errors };
        }
        return { valid: true };
    }
    catch (e) {
        return { valid: false, errors: ["Invalid JSON format"] };
    }
};
exports.validateResponse = validateResponse;
