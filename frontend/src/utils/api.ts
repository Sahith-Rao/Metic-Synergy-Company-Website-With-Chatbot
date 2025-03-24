interface SurveyData {
    name: string;
    email: string;
    answers: Record<number, string>;
  }
  
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  
  export const submitSurvey = async (data: SurveyData): Promise<void> => {
    const response = await fetch(`${BACKEND_URL}/api/survey-responses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit survey');
    }
  };