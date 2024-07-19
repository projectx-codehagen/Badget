export function parsePrismaError(error: any): string {
  // A simple error message parser that looks for missing arguments
  const missingArgumentMatch = error.message.match(
    /Argument `(\w+)` is missing./
  );
  if (missingArgumentMatch) {
    let fieldName = missingArgumentMatch[1];
    let baseMessage = `The '${fieldName}' field is required but was not provided.`;

    // Specific instructions for known fields
    if (fieldName === "channel") {
      baseMessage += " You need to add 'channel' to your call to make it work.";
    }
    // Add more specific messages for other fields if necessary
    return baseMessage;
  }
  // Default to returning the original error message if no known patterns are matched
  return error.message;
}
