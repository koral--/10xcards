export interface TextImprover {
  improve(text: string): Promise<string>;
}

class SimpleTextImprover implements TextImprover {
  async improve(text: string): Promise<string> {
    // Simple text improvements that work in the browser
    return text
      .replace(/\s+/g, ' ')  // Remove extra spaces
      .trim()                // Remove leading/trailing whitespace
      .replace(/([.!?])([A-Za-z])/g, '$1 $2')  // Add space after punctuation
      .replace(/\s+([.!?,])/g, '$1');  // Remove space before punctuation
  }
}

export const textImprover = new SimpleTextImprover();