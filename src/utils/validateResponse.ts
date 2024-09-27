import { z } from 'zod';

/**
 * Define Zod schemas corresponding to each TypeScript interface.
 * This ensures that the runtime validation aligns with the compile-time types.
 */

/* 1. FinancialProjections Schema */
const FinancialProjectionsSchema = z.object({
    costs: z.string(),
    revenues: z.string(),
    profitability: z.string(),
});

/* 2. BusinessCase Schema */
const BusinessCaseSchema = z.object({
    realWorldExamples: z.array(z.string()),
    marketTrends: z.string(),
    competitorAnalysis: z.string(),
    customerSegments: z.string(),
    financialProjections: FinancialProjectionsSchema,
});

/* 3. SWOTAnalysis Schema */
const SWOTAnalysisSchema = z.object({
    tableFormat: z.string(),
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    opportunities: z.array(z.string()),
    threats: z.array(z.string()),
});

/* 4. BusinessModelCanvas Schema */
const BusinessModelCanvasSchema = z.object({
    keyPartners: z.array(z.string()),
    keyActivities: z.array(z.string()),
    valuePropositions: z.array(z.string()),
    customerRelationships: z.array(z.string()),
    customerSegments: z.array(z.string()),
    keyResources: z.array(z.string()),
    channels: z.array(z.string()),
    costStructure: z.array(z.string()),
    revenueStreams: z.array(z.string()),
});

/* 5. BusinessAnalysis Schema */
const BusinessAnalysisSchema = z.object({
    businessCase: BusinessCaseSchema,
    swotAnalysis: SWOTAnalysisSchema,
    businessModelCanvas: BusinessModelCanvasSchema,
});

/* 6. Roadmap Schema */
const RoadmapSchema = z.object({
    milestones: z.array(z.string()),
    timelines: z.array(z.string()),
});

/* 7. LongTermStrategy Schema */
const LongTermStrategySchema = z.object({
    growthOpportunities: z.array(z.string()),
    potentialChallenges: z.array(z.string()),
    marketPositioning: z.string(),
    roadmap: RoadmapSchema,
});

/* 8. WorkshopTopic Schema */
const WorkshopTopicSchema = z.object({
    topic: z.string(),
    likelyAnswer: z.string(),
});

/* 9. DiscoveryWorkshops Schema */
const DiscoveryWorkshopsSchema = z.object({
    areasNeedingWork: z.array(z.string()),
    workshopTopics: z.array(WorkshopTopicSchema),
});

/* 10. StrategyAndPlanning Schema */
const StrategyAndPlanningSchema = z.object({
    longTermStrategy: LongTermStrategySchema,
    discoveryWorkshops: DiscoveryWorkshopsSchema,
});

/* 11. CoreFeature Schema */
const CoreFeatureSchema = z.array(z.object({
    feature: z.string(),
    priority: z.number(),
}));

/* 12. PriorityLevel Enum */
const PriorityLevelSchema = z.enum(["Low", "Medium", "High"]);

/* 13. UserStory Schema */
const UserStorySchema = z.array(z.object({
    title: z.string(),
    description: z.string(),
    acceptanceCriteria: z.array(z.string()),
    priority: PriorityLevelSchema,
    estimatedEffort: z.string(),
}));

/* 14. ProductDefinition Schema */
const ProductDefinitionSchema = z.object({
    coreFeatures: CoreFeatureSchema, // Updated to be an array of objects
    userStories: UserStorySchema, // Updated to be an array of objects
});

/* 15. Component Schema */
const ComponentSchema = z.object({
    name: z.string(),
    description: z.string(),
});

/* 16. Architecture Schema */
const ArchitectureSchema = z.object({
    diagram: z.string(),
    components: z.array(ComponentSchema),
    interactions: z.array(z.string()),
});

/* 17. TechStackRecommendation Schema */
const TechStackRecommendationSchema = z.array(z.object({
    technology: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    alternatives: z.array(z.string()),
}));

/* Core Feature Wrapper Schema */
const CoreFeatureWrapperSchema = z.object({
    coreFeatures: CoreFeatureSchema,
});

/* User Story Wrapper Schema */
const UserStoryWrapperSchema = z.object({
    userStories: UserStorySchema,
});

/* Tech Stack Recommendation Wrapper Schema */
const TechStackRecommendationWrapperSchema = z.object({
    techStackRecommendations: TechStackRecommendationSchema,
});

/* 18. TechnicalArchitecture Schema */
const TechnicalArchitectureSchema = z.object({
    architecture: ArchitectureSchema,
    techStackRecommendations: TechStackRecommendationSchema, // Updated to be an array of objects
});

/* 19. RegulatoryCompliance Schema */
const RegulatoryComplianceSchema = z.object({
    requirements: z.array(z.string()),
    complianceSteps: z.array(z.string()),
});

/* 20. Risk Schema */
const RiskSchema = z.object({
    description: z.string(),
    impact: z.number(),
    likelihood: z.number(),
    mitigationStrategy: z.string(),
});

/* 21. RiskAssessment Schema */
const RiskAssessmentSchema = z.object({
    risks: z.array(RiskSchema),
});

/* 22. ComplianceAndRisk Schema */
const ComplianceAndRiskSchema = z.object({
    regulatoryCompliance: RegulatoryComplianceSchema,
    riskAssessment: RiskAssessmentSchema,
});

/* 23. IntegrationAndInteroperability Schema */
const IntegrationAndInteroperabilitySchema = z.object({
    integrationPoints: z.array(z.string()),
    dataConsistencyMeasures: z.array(z.string()),
});

/* 24. ScalabilityAndPerformance Schema */
const ScalabilityAndPerformanceSchema = z.object({
    requirements: z.array(z.string()),
    scalingSolutions: z.array(z.string()),
});

/* 25. SecurityConsiderations Schema */
const SecurityConsiderationsSchema = z.object({
    potentialThreats: z.array(z.string()),
    securityMeasures: z.array(z.string()),
});

/* 26. SystemDesign Schema */
const SystemDesignSchema = z.object({
    integrationAndInteroperability: IntegrationAndInteroperabilitySchema,
    scalabilityAndPerformance: ScalabilityAndPerformanceSchema,
    securityConsiderations: SecurityConsiderationsSchema,
});

/* 27. RefinedConcept Schema */
const RefinedConceptSchema = z.object({
    improvements: z.array(z.string()),
    justification: z.string(),
});

/* 28. ProductAnalysis Schema */
const ProductAnalysisSchema = z.object({
    productIdea: z.string(),
    businessAnalysis: BusinessAnalysisSchema,
    strategyAndPlanning: StrategyAndPlanningSchema,
    productDefinition: z.object({
        coreFeatures: CoreFeatureSchema, // Ensure this is an array
        userStories: UserStorySchema, // Ensure this is an array
    }),
    technicalArchitecture: z.object({
        architecture: ArchitectureSchema,
        techStackRecommendations: TechStackRecommendationSchema, // Ensure this is an array
    }),
    complianceAndRisk: ComplianceAndRiskSchema,
    systemDesign: SystemDesignSchema,
    refinedConcept: RefinedConceptSchema,
});

/* 30. ValidationResult Interface */
interface ValidationResult {
    valid: boolean;
    errors?: string[];
}

/**
 * Infer TypeScript types from Zod schemas.
 * This ensures that TypeScript types are derived directly from the schemas,
 * maintaining consistency between runtime validation and compile-time types.
 */
export type FinancialProjections = z.infer<typeof FinancialProjectionsSchema>;
export type BusinessCase = z.infer<typeof BusinessCaseSchema>;
export type SWOTAnalysis = z.infer<typeof SWOTAnalysisSchema>;
export type BusinessModelCanvas = z.infer<typeof BusinessModelCanvasSchema>;
export type BusinessAnalysis = z.infer<typeof BusinessAnalysisSchema>;
export type Roadmap = z.infer<typeof RoadmapSchema>;
export type LongTermStrategy = z.infer<typeof LongTermStrategySchema>;
export type WorkshopTopic = z.infer<typeof WorkshopTopicSchema>;
export type DiscoveryWorkshops = z.infer<typeof DiscoveryWorkshopsSchema>;
export type StrategyAndPlanning = z.infer<typeof StrategyAndPlanningSchema>;
export type CoreFeature = z.infer<typeof CoreFeatureSchema>;
export type PriorityLevel = z.infer<typeof PriorityLevelSchema>;
export type UserStory = z.infer<typeof UserStorySchema>;
export type ProductDefinition = z.infer<typeof ProductDefinitionSchema>;
export type Component = z.infer<typeof ComponentSchema>;
export type Architecture = z.infer<typeof ArchitectureSchema>;
export type TechStackRecommendation = z.infer<typeof TechStackRecommendationSchema>;
export type TechnicalArchitecture = z.infer<typeof TechnicalArchitectureSchema>;
export type RegulatoryCompliance = z.infer<typeof RegulatoryComplianceSchema>;
export type Risk = z.infer<typeof RiskSchema>;
export type RiskAssessment = z.infer<typeof RiskAssessmentSchema>;
export type ComplianceAndRisk = z.infer<typeof ComplianceAndRiskSchema>;
export type IntegrationAndInteroperability = z.infer<typeof IntegrationAndInteroperabilitySchema>;
export type ScalabilityAndPerformance = z.infer<typeof ScalabilityAndPerformanceSchema>;
export type SecurityConsiderations = z.infer<typeof SecurityConsiderationsSchema>;
export type SystemDesign = z.infer<typeof SystemDesignSchema>;
export type RefinedConcept = z.infer<typeof RefinedConceptSchema>;
export type ProductAnalysis = z.infer<typeof ProductAnalysisSchema>;
export type CoreFeatureWrapper = z.infer<typeof CoreFeatureWrapperSchema>;
export type UserStoryWrapper = z.infer<typeof UserStoryWrapperSchema>;
export type TechStackRecommendationWrapper = z.infer<typeof TechStackRecommendationWrapperSchema>;

/**
 * Define a union type of all allowed Zod schemas for validation.
 */
export type DefinedSchemas =
    | typeof FinancialProjectionsSchema
    | typeof BusinessCaseSchema
    | typeof SWOTAnalysisSchema
    | typeof BusinessModelCanvasSchema
    | typeof BusinessAnalysisSchema
    | typeof RoadmapSchema
    | typeof LongTermStrategySchema
    | typeof WorkshopTopicSchema
    | typeof DiscoveryWorkshopsSchema
    | typeof StrategyAndPlanningSchema
    | typeof CoreFeatureSchema
    | typeof PriorityLevelSchema
    | typeof UserStorySchema
    | typeof ProductDefinitionSchema
    | typeof ComponentSchema
    | typeof ArchitectureSchema
    | typeof TechStackRecommendationSchema
    | typeof TechnicalArchitectureSchema
    | typeof RegulatoryComplianceSchema
    | typeof RiskSchema
    | typeof RiskAssessmentSchema
    | typeof ComplianceAndRiskSchema
    | typeof IntegrationAndInteroperabilitySchema
    | typeof ScalabilityAndPerformanceSchema
    | typeof SecurityConsiderationsSchema
    | typeof SystemDesignSchema
    | typeof RefinedConceptSchema
    | typeof ProductAnalysisSchema
    | typeof CoreFeatureWrapperSchema
    | typeof UserStoryWrapperSchema
    | typeof TechStackRecommendationWrapperSchema;

/**
 * Validates the structure of the response against a provided Zod schema.
 * @param response - The JSON string response to validate.
 * @param schema - The Zod schema to validate against.
 * @returns A ValidationResult indicating whether the response is valid and any associated errors.
 */
export const validateResponse = (
    response: string,
    schema: DefinedSchemas // Updated to use the union type
): ValidationResult => {
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
    } catch (e) {
        return { valid: false, errors: ["Invalid JSON format"] };
    }
};

export {
    ArchitectureSchema, BusinessAnalysisSchema, BusinessCaseSchema, BusinessModelCanvasSchema, ComplianceAndRiskSchema, ComponentSchema, CoreFeatureSchema, CoreFeatureWrapperSchema, DiscoveryWorkshopsSchema, FinancialProjectionsSchema, IntegrationAndInteroperabilitySchema, LongTermStrategySchema, PriorityLevelSchema, ProductAnalysisSchema, ProductDefinitionSchema, RefinedConceptSchema, RegulatoryComplianceSchema, RiskAssessmentSchema, RiskSchema, RoadmapSchema, ScalabilityAndPerformanceSchema,
    SecurityConsiderationsSchema, StrategyAndPlanningSchema, SWOTAnalysisSchema, SystemDesignSchema, TechnicalArchitectureSchema, TechStackRecommendationSchema, TechStackRecommendationWrapperSchema, UserStorySchema, UserStoryWrapperSchema, WorkshopTopicSchema
};
