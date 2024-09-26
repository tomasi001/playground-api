"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpenAIResponse = void 0;
const axios_1 = __importDefault(require("axios"));
const colors_1 = __importDefault(require("colors"));
const validateResponse_1 = require("../utils/validateResponse");
/**
 * Helper function to fetch a specific section from OpenAI with retry logic and exponential backoff.
 */
const fetchSection = (sectionPrompt_1, sectionName_1, schema_1, ...args_1) => __awaiter(void 0, [sectionPrompt_1, sectionName_1, schema_1, ...args_1], void 0, function* (sectionPrompt, sectionName, schema, // Add schema parameter
retries = 3, backoffDelay = 1000 // Initial backoff delay in milliseconds
) {
    var _a;
    let errorMessage = "";
    // const responseFormat = zodResponseFormat(schema, sectionName);
    while (retries > 0) {
        try {
            const response = yield axios_1.default.post("https://api.openai.com/v1/chat/completions", {
                model: "gpt-3.5-turbo", // Ensure this model name is correct
                messages: [
                    {
                        role: "user",
                        content: `${sectionPrompt}${errorMessage} Return only the JSON object for the ${sectionName}, starting with open curly brace and closing with closing curly brace. Do not include the key "${sectionName}" in the response. just the object`,
                    },
                ],
                max_tokens: 1000, // Adjust as needed
                // responseFormat: responseFormat,
            }, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure the API key is set in the environment variables
                },
            });
            const responseContent = response.data.choices[0].message.content;
            console.log(colors_1.default.blue(`Response content for ${sectionName}: ${responseContent}`)); // Log the response content
            const validation = (0, validateResponse_1.validateResponse)(responseContent !== null && responseContent !== void 0 ? responseContent : "", schema); // Pass schema
            if (validation.valid) {
                console.log(colors_1.default.green(`${sectionName} validated successfully.`));
                return JSON.parse(responseContent);
            }
            else {
                console.warn(colors_1.default.yellow(`Validation failed for ${sectionName}: ${(_a = validation.errors) === null || _a === void 0 ? void 0 : _a.join("; ")}`));
                errorMessage =
                    " The previous response was invalid. Please ensure the response adheres to the specified structure.";
                retries--;
                console.log(colors_1.default.yellow(`Retries left for ${sectionName}: ${retries}`));
            }
        }
        catch (error) {
            if (error.response && error.response.status === 429) {
                console.error(colors_1.default.red(`Rate limit exceeded while fetching ${sectionName}: ${error.message}`));
                if (retries > 1) {
                    console.log(colors_1.default.yellow(`Waiting for ${backoffDelay}ms before retrying...`));
                    yield new Promise(res => setTimeout(res, backoffDelay));
                    backoffDelay *= 2; // Exponential backoff
                }
                retries--;
            }
            else {
                console.error(colors_1.default.red(`Error fetching ${sectionName} from OpenAI API: ${error.message}`));
                throw new Error("Error communicating with OpenAI API");
            }
        }
    }
    console.warn(colors_1.default.red(`Failed to fetch ${sectionName} after multiple attempts. Returning empty object.`));
    return {}; // Return empty object if all retries fail
});
/**
 * Handles incoming requests to fetch a detailed product analysis from OpenAI.
 * It sends the user's prompt to the OpenAI API, validates the response structure,
 * and returns the validated data to the client.
 */
const getOpenAIResponse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { prompt } = req.body;
    console.log(colors_1.default.magenta(`Input prompt: ${prompt}`));
    const typePrompt = `You are an assistant that provides detailed product analysis. Please respond in strict accordance with the following TypeScript interface:

\`\`\`typescript
interface ProductAnalysis {
  productIdea: string;
  businessAnalysis: {
    businessCase: {
      realWorldExamples: string[];
      marketTrends: string;
      competitorAnalysis: string;
      customerSegments: string;
      financialProjections: {
        costs: string;
        revenues: string;
        profitability: string;
      };
    };
    swotAnalysis: {
      tableFormat: string;
      strengths: string[];
      weaknesses: string[];
      opportunities: string[];
      threats: string[];
    };
    businessModelCanvas: {
      keyPartners: string[];
      keyActivities: string[];
      valuePropositions: string[];
      customerRelationships: string[];
      customerSegments: string[];
      keyResources: string[];
      channels: string[];
      costStructure: string[];
      revenueStreams: string[];
    };
  };
  strategyAndPlanning: {
    longTermStrategy: {
      growthOpportunities: string[];
      potentialChallenges: string[];
      marketPositioning: string;
      roadmap: {
        milestones: string[];
        timelines: string[];
      };
    };
    discoveryWorkshops: {
      areasNeedingWork: string[];
      workshopTopics: {
        topic: string;
        likelyAnswer: string;
      }[];
    };
  };
  productDefinition: {
    coreFeatures: {
      feature: string;
      priority: number;
    }[];
    userStories: {
      title: string;
      description: string;
      acceptanceCriteria: string[];
      priority: "Low" | "Medium" | "High";
      estimatedEffort: string;
    }[];
  };
  technicalArchitecture: {
    architecture: {
      diagram: string;
      components: {
        name: string;
        description: string;
      }[];
      interactions: string[];
    };
    techStackRecommendations: {
      technology: string;
      pros: string[];
      cons: string[];
      alternatives: string[];
    }[];
  };
  complianceAndRisk: {
    regulatoryCompliance: {
      requirements: string[];
      complianceSteps: string[];
    };
    riskAssessment: {
      risks: {
        description: string;
        impact: number;
        likelihood: number;
        mitigationStrategy: string;
      }[];
    };
  };
  systemDesign: {
    integrationAndInteroperability: {
      integrationPoints: string[];
      dataConsistencyMeasures: string[];
    };
    scalabilityAndPerformance: {
      requirements: string[];
      scalingSolutions: string[];
    };
    securityConsiderations: {
      potentialThreats: string[];
      securityMeasures: string[];
    };
  };
  refinedConcept: {
    improvements: string[];
    justification: string;
  };
}
\`\`\`

Ensure that every field is populated appropriately. **Return only the JSON object, starting with '{' and ending with '}'. Do not include any additional text, variable declarations, or type declarations. Do not return the word json and do not return a string. Return only the JSON object, starting with '{' and ending with '}' **:
**Important Updates:**
- Ensure that "coreFeatures", "userStories", and "techStackRecommendations" are returned as **arrays of objects**.
- **Do not** return these fields as single objects.
- Unless you are returning "coreFeatures", "userStories", and "techStackRecommendations" as **arrays of objects**. Return only the JSON object, starting with '{' and ending with '}' without any additional text.

Here are your instructions:`;
    const basePrompt = `${typePrompt} Scope a product:Given the following paragraph describing a product idea, perform a comprehensive analysis and documentation to cover the entirety of the discovery and design phase of the product lifecycle. The analysis should include the following areas and produce detailed documentation that can be used to move to the engineering phase of a product:
    
- Harden the business case: Research and provide real world examples and data that support the viability of the idea. Include market trends, competitor analysis, and potential customer segments. Provide financial projections including costs, revenues, and profitability over time.
- SWOT analysis: Conduct a SWOT analysis (strengths, weaknesses, opportunities, threats) of the concept. Present the findings in a table format.
- Business model canvas: Create a business model canvas for the product, covering key partners, key activities, value propositions, customer relationships, customer segments, key resources, channels, cost structure, and revenue streams.
- Long term strategy: Outline the long term strategy for the product including growth opportunities, potential challenges, and the market positioning. Include a roadmap with milestones and timelines.
- Discovery workshops: Set the team up for discovery workshops with the customer, highlighting areas that need more work. Attempt to answer the discovery workshop topics with the most likely answers to the best of your knowledge.
- Core features documentation: Document the core features of the concept. Prioritize features based on customer needs and market demands.
- User stories: Document the user stories of the said features. Include acceptance criteria for each user story.
- Architecture definition: Define the architecture of the application using AWS. Include diagrams and explanations of key components and interactions.
- Tech stack recommendations: Make tech stack recommendations with AWS, Node.js, and React as anchors in the tech stack decision. Justify each choice with pros, cons, and alternatives.
- Regulatory and compliance considerations: Identify any regulatory and compliance requirements relevant to the product. Outline steps to ensure compliance.
- Risk assessment and mitigation: Conduct a risk assessment and propose mitigation strategies. Include a risk matrix with impact and likelihood ratings.
- Integration and interoperability: Identify integration points with existing systems. Ensure interoperability and data consistency.
- Scalability and performance: Assess the scalability and performance requirements. Propose solutions to ensure the product can scale effectively.
- Security considerations: Identify potential security threats. Propose security measures to protect user data and maintain integrity.
    
Once the analysis is complete, recheck all produced work for accuracy and completeness. Refine the concept based on identified weaknesses before producing the final output.
Ensure response is correctly formatted as a JSON string, with all keys and string values enclosed in double quotes.

Here is the Product idea: `;
    try {
        // Define prompts for each section
        const businessCasePrompt = `${basePrompt}${prompt}`;
        const swotAnalysisPrompt = `${basePrompt}${prompt}`;
        const businessModelCanvasPrompt = `${basePrompt}${prompt}`;
        const longTermStrategyPrompt = `${basePrompt}${prompt}`;
        const discoveryWorkshopsPrompt = `${basePrompt}${prompt}`;
        const coreFeaturesPrompt = `${basePrompt}${prompt}`;
        const userStoriesPrompt = `${basePrompt}${prompt}`;
        const architecturePrompt = `${basePrompt}${prompt}`;
        const techStackRecommendationsPrompt = `${basePrompt}${prompt}`;
        const regulatoryCompliancePrompt = `${basePrompt}${prompt}`;
        const riskAssessmentPrompt = `${basePrompt}${prompt}`;
        const integrationAndInteroperabilityPrompt = `${basePrompt}${prompt}`;
        const scalabilityAndPerformancePrompt = `${basePrompt}${prompt}`;
        const securityConsiderationsPrompt = `${basePrompt}${prompt}`;
        const refinedConceptPrompt = `${basePrompt}${prompt}`;
        // Fetch sections sequentially with their respective schemas
        const businessCase = yield fetchSection(businessCasePrompt, "businessCase", validateResponse_1.BusinessCaseSchema);
        const swotAnalysis = yield fetchSection(swotAnalysisPrompt, "swotAnalysis", validateResponse_1.SWOTAnalysisSchema);
        const businessModelCanvas = yield fetchSection(businessModelCanvasPrompt, "businessModelCanvas", validateResponse_1.BusinessModelCanvasSchema);
        const longTermStrategy = yield fetchSection(longTermStrategyPrompt, "longTermStrategy", validateResponse_1.LongTermStrategySchema);
        const discoveryWorkshops = yield fetchSection(discoveryWorkshopsPrompt, "discoveryWorkshops", validateResponse_1.DiscoveryWorkshopsSchema);
        const coreFeatures = yield fetchSection(coreFeaturesPrompt, "coreFeatures", validateResponse_1.CoreFeatureSchema);
        const userStories = yield fetchSection(userStoriesPrompt, "userStories", validateResponse_1.UserStorySchema);
        const architecture = yield fetchSection(architecturePrompt, "architecture", validateResponse_1.ArchitectureSchema);
        const techStackRecommendations = yield fetchSection(techStackRecommendationsPrompt, "techStackRecommendations", validateResponse_1.TechStackRecommendationSchema);
        const regulatoryCompliance = yield fetchSection(regulatoryCompliancePrompt, "regulatoryCompliance", validateResponse_1.RegulatoryComplianceSchema);
        const riskAssessment = yield fetchSection(riskAssessmentPrompt, "riskAssessment", validateResponse_1.RiskAssessmentSchema);
        const integrationAndInteroperability = yield fetchSection(integrationAndInteroperabilityPrompt, "integrationAndInteroperability", validateResponse_1.IntegrationAndInteroperabilitySchema);
        const scalabilityAndPerformance = yield fetchSection(scalabilityAndPerformancePrompt, "scalabilityAndPerformance", validateResponse_1.ScalabilityAndPerformanceSchema);
        const securityConsiderations = yield fetchSection(securityConsiderationsPrompt, "securityConsiderations", validateResponse_1.SecurityConsiderationsSchema);
        const refinedConcept = yield fetchSection(refinedConceptPrompt, "refinedConcept", validateResponse_1.RefinedConceptSchema);
        // Combine sections into their respective parent objects
        const businessAnalysis = {
            businessCase,
            swotAnalysis,
            businessModelCanvas,
        };
        const strategyAndPlanning = {
            longTermStrategy,
            discoveryWorkshops,
        };
        const productDefinition = {
            coreFeatures,
            userStories,
        };
        const technicalArchitecture = {
            architecture,
            techStackRecommendations,
        };
        const complianceAndRisk = {
            regulatoryCompliance,
            riskAssessment,
        };
        const systemDesign = {
            integrationAndInteroperability,
            scalabilityAndPerformance,
            securityConsiderations,
        };
        const refinedConceptData = refinedConcept;
        const productAnalysis = {
            productIdea: prompt,
            businessAnalysis,
            strategyAndPlanning,
            productDefinition,
            technicalArchitecture,
            complianceAndRisk,
            systemDesign,
            refinedConcept: refinedConceptData,
        };
        // Validate the final ProductAnalysis object
        const finalValidation = (0, validateResponse_1.validateResponse)(JSON.stringify(productAnalysis), validateResponse_1.ProductAnalysisSchema); // Validate entire object
        if (!finalValidation.valid) {
            console.warn(colors_1.default.yellow(`Final ProductAnalysis validation failed: ${(_a = finalValidation.errors) === null || _a === void 0 ? void 0 : _a.join("; ")}`));
            res.status(400).json({ errors: finalValidation.errors });
            return;
        }
        // Send the response
        res.json({ content: productAnalysis });
        console.log(colors_1.default.green(`Response: ${JSON.stringify(productAnalysis, null, 2)}`));
    }
    catch (error) {
        console.error(colors_1.default.red(`Error: ${error.message}`));
        if (error.message.includes("Rate limit")) {
            res.status(429).send(error.message);
        }
        else {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
});
exports.getOpenAIResponse = getOpenAIResponse;
