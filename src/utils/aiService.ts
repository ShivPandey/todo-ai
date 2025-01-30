import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

// Initialize OpenAI with API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

/**
 * Generates task priority based on the task description using AI.
 * @param description - Task description provided by the user.
 * @returns "high", "normal", or "low" based on AI analysis.
 */
export const generateTaskPriority = async (
  description: string
): Promise<string> => {
  try {
    const prompt = `Analyze the task description and strictly return one of these labels: 
    - High
    - Normal
    - Low

    Task: "${description}"
    Return only one word (High, Normal, or Low).`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 5,
      temperature: 0.3, // Reduce randomness for consistent output
    });

    // Ensure response is always a string
    const priority: string =
      response.choices[0]?.message?.content?.trim().toLowerCase() || "normal";

    console.log("AI Response:", priority);

    // Explicitly check if priority is one of the allowed values
    if (["high", "normal", "low"].includes(priority)) {
      return priority;
    }

    return "normal"; // Default if AI response is unexpected
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "normal";
  }
};

/**
 * Provides an AI-generated productivity tip for the user.
 * @returns A string containing a productivity tip.
 */
export const generateProductivityTip = async (): Promise<string> => {
  try {
    const prompt = `Give a productivity tip for better task management.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 50,
      temperature: 0.7,
    });

    return (
      response.choices[0]?.message?.content?.trim() ||
      "Stay focused and plan your day ahead!"
    );
  } catch (error) {
    console.error("OpenAI Error:", error);
    return "Stay focused and plan your day ahead!";
  }
};

/**
 * Fetch OpenAI API credit balance.
 * @returns Remaining API credits in USD.
 */
export const checkOpenAICredit = async (): Promise<{
  total: number;
  remaining: number;
} | null> => {
  try {
    const response = await fetch(
      "https://api.openai.com/v1/dashboard/billing/credit_grants",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const { total_granted, total_used } = data;
    return { total: total_granted, remaining: total_granted - total_used };
  } catch (error) {
    console.error("Error fetching OpenAI credit:", error);
    return null;
  }
};
