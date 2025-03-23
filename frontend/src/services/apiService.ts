// API service for the Groq LLM integration

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

// This is a simplified API service for Groq LLM integration
const apiService = {
  // The API key (in a production environment, this would be secured better)
  groqApiKey: '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',

  // Function to check if a message contains inappropriate content
  moderateContent(text: string): boolean {
    // List of inappropriate terms to filter out
    const inappropriateTerms = [
      'offensive', 'hate', 'racist', 'sexist', 'discrimination', 'violent', 'obscene',
      'pornographic', 'explicit', 'adult content', 'harmful', 'suicide', 'kill', 'illegal'
    ];
    
    const lowerText = text.toLowerCase();
    return !inappropriateTerms.some(term => lowerText.includes(term));
  },

  // Function to call the Groq API with moderation
  async getChatResponse(messages: ChatMessage[]): Promise<string> {
    try {
      // Check user message for inappropriate content
      const userMessage = messages[messages.length - 1];
      if (userMessage.role === 'user' && !this.moderateContent(userMessage.content)) {
        return "I'm sorry, but I can't respond to messages containing inappropriate content. Let's keep our conversation focused on marketing strategy and growing your business!";
      }
      
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.groqApiKey}`
        },
        body: JSON.stringify({
          model: 'llama3-8b-8192', // Using Llama 3 model
          messages: messages,
          temperature: 0.7,
          max_tokens: 1024
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data: GroqResponse = await response.json();
      const responseContent = data.choices[0].message.content;
      
      // Also moderate the API response for extra safety
      if (!this.moderateContent(responseContent)) {
        return "I apologize, but I couldn't generate an appropriate response. Let's continue discussing how I can help with your marketing needs!";
      }
      
      return responseContent;
    } catch (error) {
      console.error('Error calling Groq API:', error);
      return "I'm having trouble connecting to my brain right now. Please try again in a moment!";
    }
  },
  
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
};

export default apiService;