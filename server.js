// server.js
require("dotenv").config(); // Load environment variables from .env

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const colors = require("colors");

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's actual domain
  })
);

app.use(express.json()); // Parse incoming JSON requests

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(colors.blue(`Incoming request: ${req.method} ${req.url}`));
  next();
});

// Route for interacting with OpenAI API
app.post("/api/openai", async (req, res) => {
  const { prompt } = req.body; // Extract the prompt from the request body
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
    tabularContent: {
      [key: string]: string;
    };
  }
  \`\`\`

  Ensure that every field is populated appropriately. **Return only the JSON object, starting with '{' and ending with '}'. Do not include any additional text, variable declarations, or type declarations. do not return the word json and do not return a string. Return only the JSON object, starting with '{' and ending with '}' ** Here are your instructions:`;

  const basePrompt = `${typePrompt} Scope a product:Given the following paragraph describing a product idea,perform a comprehensive analysis and documentation to cover the entirety of the discovery and design phase of the product lifecycle.The analysis should include the following areas and produce detailed documentation that can be used to move to the engineering phase of a product:Harden the business case:Research and provide real world examples and data that support the viability of the idea.Include market trends,competitor analysis,and potential customer segments.Provide financial projections including costs,revenues,and profitability over time.SWOT analysis:Conduct a SWOT analysis(strengths,weaknesses,opportunities,threats)of the concept.Present the findings in a table format.Business model canvas:Create a business model canvas for the product,covering key partners,key activities,value propositions,customer relationships,customer segments,key resources,channels,cost structure,and revenue streams.Long term strategy:Outline the long term strategy for the product including growth opportunities,potential challenges,and the market positioning.Include a roadmap with milestones and timelines.Discovery workshops:Set the team up for discovery workshops with the customer,highlighting areas that need more work.Attempt to answer the discovery workshop topics with the most likely answers to the best of your knowledge.Core features documentation:Document the core features of the concept.Prioritize features based on customer needs and market demands.User stories:Document the user stories of the said features.Include acceptance criteria for each user story.Architecture definition:Define the architecture of the application using AWS.Include diagrams and explanations of key components and interactions.Tech stack recommendations:Make tech stack recommendations with AWS,Node.js,and React as anchors in the tech stack decision.Justify each choice with pros,cons,and alternatives.Regulatory and compliance considerations:Identify any regulatory and compliance requirements relevant to the product.Outline steps to ensure compliance.Risk assessment and mitigation:Conduct a risk assessment and propose mitigation strategies.Include a risk matrix with impact and likelihood ratings.Integration and interoperability:Identify integration points with existing systems.Ensure interoperability and data consistency.Scalability and performance:Assess the scalability and performance requirements.Propose solutions to ensure the product can scale effectively.Security considerations:Identify potential security threats.Propose security measures to protect user data and maintain integrity.Once the analysis is complete,recheck all produced work for accuracy and completeness.Refine the concept based on identified weaknesses before producing the final output.Use tabular format where appropriate to enhance readability and organization. Here is the Product idea: `;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o", // Specify the OpenAI model
        messages: [
          {
            role: "user",
            content:
              basePrompt +
              prompt +
              "Return only the JSON object, starting with open curly brace and closing with closing curly brace",
          },
        ], // Append the user prompt to the base prompt
        max_tokens: 4000, // Adjust as needed
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // Use the API key from the .env file
        },
      }
    );

    // Return only the content from the OpenAI response
    res.json({ content: response.data.choices[0].message.content }); // Send back only the content
    console.log(
      colors.green(`Response: ${response.data.choices[0].message.content}`)
    );
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error(colors.red(`Rate limit exceeded: ${error.message}`));
      res.status(429).send("Rate limit exceeded. Please try again later.");
    } else {
      console.error(colors.red(`Error calling OpenAI API: ${error.message}`));
      res.status(500).send("Error communicating with OpenAI API");
    }
  }
});

// Start the server
app.listen(port, () => {
  console.log(colors.blue(`Server running on port ${port}`));
});
