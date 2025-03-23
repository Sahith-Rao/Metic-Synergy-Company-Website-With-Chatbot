// API service for the Groq LLM integration with key rotation

interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}

interface ApiKeyStatus {
  key: string;
  isWorking: boolean;
  lastUsed: Date | null;
  errorCount: number;
}

// Advanced API service with key rotation for Groq LLM integration
class ApiService {
  private apiKeys: ApiKeyStatus[];
  private currentKeyIndex: number;
  private readonly MAX_RETRIES = 3;
  private readonly ERROR_THRESHOLD = 2; // Number of errors before switching keys
  private readonly API_URL = 'https://api.groq.com/openai/v1/chat/completions';
  private readonly MODEL = 'llama3-8b-8192';

  constructor() {
    // Initialize with all API keys from environment variables
    this.apiKeys = [
      { key: import.meta.env.VITE_GROQ_API_KEY_1 || '', isWorking: true, lastUsed: null, errorCount: 0 },
      { key: import.meta.env.VITE_GROQ_API_KEY_2 || '', isWorking: true, lastUsed: null, errorCount: 0 },
      { key: import.meta.env.VITE_GROQ_API_KEY_3 || '', isWorking: true, lastUsed: null, errorCount: 0 },
      { key: import.meta.env.VITE_GROQ_API_KEY_4 || '', isWorking: true, lastUsed: null, errorCount: 0 }
    ].filter(keyStatus => keyStatus.key !== ''); // Filter out empty keys
    
    this.currentKeyIndex = 0;
  }

  // Function to check if a message contains inappropriate content
  moderateContent(text: string): boolean {
    // List of inappropriate terms to filter out
    const inappropriateTerms = [
      'offensive', 'hate', 'racist', 'sexist', 'discrimination', 'violent', 'obscene',
      'pornographic', 'explicit', 'adult content', 'harmful', 'suicide', 'kill', 'illegal'
    ];
    
    const lowerText = text.toLowerCase();
    return !inappropriateTerms.some(term => lowerText.includes(term));
  }

  // Get the current API key
  private getCurrentKey(): string {
    if (this.apiKeys.length === 0) {
      console.error('No API keys available!');
      return '';
    }
    return this.apiKeys[this.currentKeyIndex].key;
  }

  // Mark the current key as having an error
  private markKeyError(): void {
    if (this.apiKeys.length === 0) return;
    
    this.apiKeys[this.currentKeyIndex].errorCount += 1;
    
    // If error count exceeds threshold, mark as not working
    if (this.apiKeys[this.currentKeyIndex].errorCount >= this.ERROR_THRESHOLD) {
      this.apiKeys[this.currentKeyIndex].isWorking = false;
      console.warn(`API key ${this.currentKeyIndex + 1} has been marked as not working due to multiple errors.`);
    }

    this.rotateToNextWorkingKey();
  }

  // Rotate to the next working key
  private rotateToNextWorkingKey(): void {
    if (this.apiKeys.length === 0) return;
    
    const workingKeys = this.apiKeys.filter(key => key.isWorking);
    if (workingKeys.length === 0) {
      // Reset all keys to working if all are marked as not working
      console.warn('All API keys have been marked as not working. Resetting all keys.');
      this.apiKeys.forEach(key => {
        key.isWorking = true;
        key.errorCount = 0;
      });
    }
    
    // Find the next working key
    let nextIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
    let attempts = 0;
    while (!this.apiKeys[nextIndex].isWorking && attempts < this.apiKeys.length) {
      nextIndex = (nextIndex + 1) % this.apiKeys.length;
      attempts++;
    }
    
    this.currentKeyIndex = nextIndex;
    this.apiKeys[this.currentKeyIndex].lastUsed = new Date();
    console.log(`Switched to API key ${this.currentKeyIndex + 1}`);
  }

  // Make an API call with the current key
  private async makeApiCall(messages: ChatMessage[]): Promise<GroqResponse> {
    if (this.apiKeys.length === 0) {
      throw new Error('No API keys available');
    }
    
    const currentKey = this.getCurrentKey();
    this.apiKeys[this.currentKeyIndex].lastUsed = new Date();
    
    const response = await fetch(this.API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${currentKey}`
      },
      body: JSON.stringify({
        model: this.MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 1024
      })
    });
    
    if (!response.ok) {
      this.markKeyError();
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    // Reset error count on successful call
    this.apiKeys[this.currentKeyIndex].errorCount = 0;
    
    return await response.json();
  }

  // Function to call the Groq API with moderation and key rotation
  async getChatResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // Check user message for inappropriate content
      const userMessage = messages[messages.length - 1];
      if (userMessage.role === 'user' && !this.moderateContent(userMessage.content)) {
        return "I'm sorry, but I can't respond to messages containing inappropriate content. Let's keep our conversation focused on marketing strategy and growing your business!";
      }
      
      // Attempt API call with retries and key rotation
      let lastError: Error | null = null;
      
      for (let attempt = 0; attempt < this.MAX_RETRIES; attempt++) {
        try {
          const data = await this.makeApiCall(messages);
          const responseContent = data.choices[0].message.content;
          
          // Also moderate the API response for extra safety
          if (!this.moderateContent(responseContent)) {
            return "I apologize, but I couldn't generate an appropriate response. Let's continue discussing how I can help with your marketing needs!";
          }
          
          return responseContent;
        } catch (error) {
          console.error(`API call attempt ${attempt + 1} failed:`, error);
          lastError = error instanceof Error ? error : new Error(String(error));
          
          // If we have more keys to try, we'll rotate in the next iteration
          if (attempt < this.MAX_RETRIES - 1) {
            console.log(`Retrying with a different API key. Attempt ${attempt + 2} of ${this.MAX_RETRIES}`);
          }
        }
      }
      
      // If we've exhausted all retries
      console.error('All API call attempts failed', lastError);
      return "I'm having trouble connecting to my brain right now. Please try again in a moment!";
    } catch (error) {
      console.error('Unexpected error in getChatResponse:', error);
      return "Something unexpected happened. Please try again later!";
    }
  }
  
  // Create the detailed system prompt for MetaGrow AI based on requirements
  getMetaGrowSystemPrompt(): string {
    return `You are MetaGrow AI, an intelligent marketing assistant for Metic-Synergy, a digital marketing agency. Your main purpose is to act as a mini marketing consultant for website visitors, providing valuable insights and guiding them toward hiring our agency.

Your conversation should follow this specific 5-step process:

STEP 1: GREETING & ANALYZING
- Start by greeting users warmly and asking about their business niche and goals
- Use engaging questions like: "Hey there! Want a quick marketing boost? Tell me your niche, and I'll give you personalized insights!"
- Always collect information about their business type, target audience, and marketing goals

STEP 2: MINI AUDIT (When users share links)
- If a user shares a website, Instagram, or YouTube link, simulate analyzing their content and engagement
- Provide specific metrics and insights like: "I checked your Instagram! Your engagement rate is around 2.1%, which is decent but can improve. Want some quick tips?"
- For websites, comment on design, call-to-action placement, and content structure
- For social media, discuss posting frequency, engagement metrics, and content quality

STEP 3: CONTENT SUGGESTIONS & HASHTAGS
- Provide 3-5 specific content ideas tailored to the user's niche
- Recommend relevant, high-performing hashtags to improve their reach
- Example format: "In your niche (Fitness), trending topics are '5-Min Home Workouts' & 'No Equipment Challenges.' Also, use hashtags like #FitnessGoals #HomeWorkout."
- Ensure suggestions are practical, trending, and specific to their industry

STEP 4: BUDGET & ROI ESTIMATOR
- When users mention their marketing budget, provide allocation recommendations
- Suggest percentage breakdowns across different channels (social media, SEO, content, etc.)
- Example: "With a ₹10,000/month budget, I'd recommend 60% for social media ads, 30% for content marketing, and 10% for SEO. Need help optimizing?"
- Explain the potential ROI they could expect from this allocation

STEP 5: LEAD GENERATION
- After providing value, gently guide users toward booking a consultation
- Suggest a free consultation or a paid audit to get expert-level insights
- Example: "Want a full, expert-level audit? We can analyze your strategy in detail. Let's set up a free call!"
- Emphasize the additional value they'll receive from working with our team

The agency (Metic-Synergy) specializes in:
- Digital marketing
- Photography
- Videography
- Brand development
- Social media management
- Content creation

Always be helpful, professional, and focused on providing genuine value before suggesting a consultation. Your tone should be conversational but expert, and avoid generic advice - always tailor your recommendations to their specific situation.`;
  }
}

// Export an instance of the service
const apiService = new ApiService();
export default apiService;