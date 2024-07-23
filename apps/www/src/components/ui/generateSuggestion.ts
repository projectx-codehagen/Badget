const baseSuggestions = [
    { name: "Groceries", baseAmount: 400 },
    { name: "Transportation", baseAmount: 150 },
    { name: "Entertainment", baseAmount: 200 },
    { name: "Utilities", baseAmount: 100 },
    { name: "Dining Out", baseAmount: 250 },
  ];
  
  const generateSuggestion = (name, baseAmount) => {
    // Simple logic to vary the suggested amount slightly
    const variation = Math.floor(Math.random() * 50) - 25; // Randomly add or subtract up to $25
    const adjustedAmount = baseAmount + variation;
  
    // Different templates for suggestions
    const templates = [
      `Considering last month's expenses, a budget of $${adjustedAmount} for ${name.toLowerCase()} seems reasonable.`,
      `Your spending on ${name.toLowerCase()} last month suggests a budget of $${adjustedAmount} for this month.`,
      `A good starting point for your ${name.toLowerCase()} budget this month could be $${adjustedAmount}.`,
    ];
  
    // Randomly select a template
    const templateIndex = Math.floor(Math.random() * templates.length);
    return templates[templateIndex];
  };
  
  const generateSuggestions = () => {
    return baseSuggestions.map(({ name, baseAmount }) => ({
      name,
      suggestion: generateSuggestion(name, baseAmount),
    }));
  };
  
  export default generateSuggestions;
  