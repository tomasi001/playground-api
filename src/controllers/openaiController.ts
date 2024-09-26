import axios, { AxiosResponse } from "axios";
import colors from "colors";
import { Request, Response } from "express";
import {
    ArchitectureSchema,
    BusinessCaseSchema,
    BusinessModelCanvasSchema,
    CoreFeatureSchema,
    DefinedSchemas,
    DiscoveryWorkshopsSchema,
    IntegrationAndInteroperabilitySchema,
    LongTermStrategySchema,
    ProductAnalysis,
    ProductAnalysisSchema,
    RefinedConceptSchema,
    RegulatoryComplianceSchema,
    RiskAssessmentSchema,
    ScalabilityAndPerformanceSchema,
    SecurityConsiderationsSchema,
    SWOTAnalysisSchema,
    TechStackRecommendationSchema,
    UserStorySchema,
    validateResponse,
} from "../utils/validateResponse";

/**
 * Helper function to fetch a specific section from OpenAI with retry logic and exponential backoff.
 */
const fetchSection = async (
    sectionPrompt: string,
    sectionName: string,
    schema: DefinedSchemas, // Add schema parameter
    retries: number = 3,
    backoffDelay: number = 1000 // Initial backoff delay in milliseconds
): Promise<any> => {
    let errorMessage = "";
    // const responseFormat = zodResponseFormat(schema, sectionName);
    while (retries > 0) {
        try {
            const response: AxiosResponse = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo", // Ensure this model name is correct
                    messages: [
                        {
                            role: "user",
                            content: `${sectionPrompt}${errorMessage} Return only the JSON object for the ${sectionName}, starting with open curly brace and closing with closing curly brace. Do not include the key "${sectionName}" in the response. just the object`,
                        },
                    ],
                    max_tokens: 1000, // Adjust as needed
                    // responseFormat: responseFormat,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Ensure the API key is set in the environment variables
                    },
                }
            );

            const responseContent = response.data.choices[0].message.content;
            console.log(colors.blue(`Response content for ${sectionName}: ${responseContent}`)); // Log the response content

            const validation = validateResponse(responseContent ?? "", schema); // Pass schema

            if (validation.valid) {
                console.log(colors.green(`${sectionName} validated successfully.`));
                return JSON.parse(responseContent);
            } else {
                console.warn(
                    colors.yellow(
                        `Validation failed for ${sectionName}: ${validation.errors?.join(
                            "; "
                        )}`
                    )
                );
                errorMessage =
                    " The previous response was invalid. Please ensure the response adheres to the specified structure.";
                retries--;
                console.log(
                    colors.yellow(`Retries left for ${sectionName}: ${retries}`)
                );
            }
        } catch (error: any) {
            if (error.response && error.response.status === 429) {
                console.error(
                    colors.red(
                        `Rate limit exceeded while fetching ${sectionName}: ${error.message}`
                    )
                );
                if (retries > 1) {
                    console.log(colors.yellow(`Waiting for ${backoffDelay}ms before retrying...`));
                    await new Promise(res => setTimeout(res, backoffDelay));
                    backoffDelay *= 2; // Exponential backoff
                }
                retries--;
            } else {
                console.error(
                    colors.red(
                        `Error fetching ${sectionName} from OpenAI API: ${error.message}`
                    )
                );
                throw new Error("Error communicating with OpenAI API");
            }
        }
    }
    console.warn(colors.red(`Failed to fetch ${sectionName} after multiple attempts. Returning empty object.`));
    return {}; // Return empty object if all retries fail
};

/**
 * Handles incoming requests to fetch a detailed product analysis from OpenAI.
 * It sends the user's prompt to the OpenAI API, validates the response structure,
 * and returns the validated data to the client.
 */
export const getOpenAIResponse = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { prompt } = req.body;
    console.log(colors.magenta(`Input prompt: ${prompt}`));

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
        const businessCase = await fetchSection(businessCasePrompt, "businessCase", BusinessCaseSchema);
        const swotAnalysis = await fetchSection(swotAnalysisPrompt, "swotAnalysis", SWOTAnalysisSchema);
        const businessModelCanvas = await fetchSection(businessModelCanvasPrompt, "businessModelCanvas", BusinessModelCanvasSchema);
        const longTermStrategy = await fetchSection(longTermStrategyPrompt, "longTermStrategy", LongTermStrategySchema);
        const discoveryWorkshops = await fetchSection(discoveryWorkshopsPrompt, "discoveryWorkshops", DiscoveryWorkshopsSchema);
        const coreFeatures = await fetchSection(coreFeaturesPrompt, "coreFeatures", CoreFeatureSchema);
        const userStories = await fetchSection(userStoriesPrompt, "userStories", UserStorySchema);
        const architecture = await fetchSection(architecturePrompt, "architecture", ArchitectureSchema);
        const techStackRecommendations = await fetchSection(techStackRecommendationsPrompt, "techStackRecommendations", TechStackRecommendationSchema);
        const regulatoryCompliance = await fetchSection(regulatoryCompliancePrompt, "regulatoryCompliance", RegulatoryComplianceSchema);
        const riskAssessment = await fetchSection(riskAssessmentPrompt, "riskAssessment", RiskAssessmentSchema);
        const integrationAndInteroperability = await fetchSection(integrationAndInteroperabilityPrompt, "integrationAndInteroperability", IntegrationAndInteroperabilitySchema);
        const scalabilityAndPerformance = await fetchSection(scalabilityAndPerformancePrompt, "scalabilityAndPerformance", ScalabilityAndPerformanceSchema);
        const securityConsiderations = await fetchSection(securityConsiderationsPrompt, "securityConsiderations", SecurityConsiderationsSchema);
        const refinedConcept = await fetchSection(refinedConceptPrompt, "refinedConcept", RefinedConceptSchema);

        // Combine sections into their respective parent objects
        const businessAnalysis: ProductAnalysis["businessAnalysis"] = {
            businessCase,
            swotAnalysis,
            businessModelCanvas,
        };

        const strategyAndPlanning: ProductAnalysis["strategyAndPlanning"] = {
            longTermStrategy,
            discoveryWorkshops,
        };

        const productDefinition: ProductAnalysis["productDefinition"] = {
            coreFeatures,
            userStories,
        };

        const technicalArchitecture: ProductAnalysis["technicalArchitecture"] = {
            architecture,
            techStackRecommendations,
        };

        const complianceAndRisk: ProductAnalysis["complianceAndRisk"] = {
            regulatoryCompliance,
            riskAssessment,
        };

        const systemDesign: ProductAnalysis["systemDesign"] = {
            integrationAndInteroperability,
            scalabilityAndPerformance,
            securityConsiderations,
        };

        const refinedConceptData: ProductAnalysis["refinedConcept"] = refinedConcept;

        const productAnalysis: ProductAnalysis = {
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
        const finalValidation = validateResponse(JSON.stringify(productAnalysis), ProductAnalysisSchema); // Validate entire object
        if (!finalValidation.valid) {
            console.warn(
                colors.yellow(
                    `Final ProductAnalysis validation failed: ${finalValidation.errors?.join(
                        "; "
                    )}`
                )
            );
            res.status(400).json({ errors: finalValidation.errors });
            return;
        }

        // Send the response
        res.json({ content: productAnalysis });
        console.log(
            colors.green(`Response: ${JSON.stringify(productAnalysis, null, 2)}`)
        );
    } catch (error: any) {
        console.error(colors.red(`Error: ${error.message}`));
        if (error.message.includes("Rate limit")) {
            res.status(429).send(error.message);
        } else {
            res.status(500).send(`Error: ${error.message}`);
        }
    }
};
