const validateResponse = (response) => {
  try {
    const parsedResponse = JSON.parse(response);

    // Validate the structure of the parsed response
    const errors = [];

    // Check for required fields in ProductAnalysis
    if (!parsedResponse.productIdea) {
      errors.push("Missing field: productIdea");
    }
    if (!parsedResponse.businessAnalysis) {
      errors.push("Missing field: businessAnalysis");
    } else {
      // Validate BusinessAnalysis structure
      const { businessCase, swotAnalysis, businessModelCanvas } =
        parsedResponse.businessAnalysis;

      if (!businessCase) {
        errors.push("Missing field: businessCase in businessAnalysis");
      } else {
        if (!businessCase.realWorldExamples) {
          errors.push("Missing field: realWorldExamples in businessCase");
        }
        if (!businessCase.marketTrends) {
          errors.push("Missing field: marketTrends in businessCase");
        }
        if (!businessCase.competitorAnalysis) {
          errors.push("Missing field: competitorAnalysis in businessCase");
        }
        if (!businessCase.customerSegments) {
          errors.push("Missing field: customerSegments in businessCase");
        }
        if (!businessCase.financialProjections) {
          errors.push("Missing field: financialProjections in businessCase");
        }
      }

      if (!swotAnalysis) {
        errors.push("Missing field: swotAnalysis in businessAnalysis");
      }

      if (!businessModelCanvas) {
        errors.push("Missing field: businessModelCanvas in businessAnalysis");
      }
    }

    // Validate StrategyAndPlanning structure
    if (!parsedResponse.strategyAndPlanning) {
      errors.push("Missing field: strategyAndPlanning");
    }

    // Validate ProductDefinition structure
    if (!parsedResponse.productDefinition) {
      errors.push("Missing field: productDefinition");
    }

    // Validate TechnicalArchitecture structure
    if (!parsedResponse.technicalArchitecture) {
      errors.push("Missing field: technicalArchitecture");
    }

    // Validate ComplianceAndRisk structure
    if (!parsedResponse.complianceAndRisk) {
      errors.push("Missing field: complianceAndRisk");
    }

    // Validate SystemDesign structure
    if (!parsedResponse.systemDesign) {
      errors.push("Missing field: systemDesign");
    }

    // Validate RefinedConcept structure
    if (!parsedResponse.refinedConcept) {
      errors.push("Missing field: refinedConcept");
    }

    // If there are errors, return them
    if (errors.length > 0) {
      return { valid: false, errors };
    }

    return { valid: true };
  } catch (e) {
    return { valid: false, errors: ["Invalid JSON format"] };
  }
};

module.exports = validateResponse;
