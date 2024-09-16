import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

export async function POST(request: Request) {
    try {
        const { data } = await request.json();
        console.log("Received Data:", data);

        const groq = createOpenAI({
            baseURL: 'https://api.groq.com/openai/v1',
            apiKey: process.env.GROQ_API_KEY,
        });

        const model = groq('llama3-8b-8192');

        const { text } = await generateText({
            model: model,
            system: `
                You are a flashcard creator. Your task is to generate concise and effective flashcards based on the given topic or content. Follow these guidelines strictly:

                1) Create clear and concise questions for the front of each flashcard.
                2) Provide accurate and informative answers for the back of each flashcard.
                3) Ensure each flashcard focuses on a single concept or piece of information.
                4) Use simple language to make flashcards accessible to a wide range of learners.
                5) Include a variety of question types, such as definitions, examples, comparisons, and applications.
                6) Avoid overly complex or ambiguous phrasing in both questions and answers.
                7) If given a body of text, extract the most important and relevant information for the flashcards.
                8) Generate exactly 8 flashcards.
                9) **Return ONLY a valid JSON object** without any additional text, headers, or formatting. Ensure the JSON is structured exactly as follows:
                
                \`\`\`json
                {
                    "flashcards": [
                        {"front": "Question 1", "back": "Answer 1"},
                        {"front": "Question 2", "back": "Answer 2"},
                        {"front": "Question 3", "back": "Answer 3"},
                        {"front": "Question 4", "back": "Answer 4"},
                        {"front": "Question 5", "back": "Answer 5"},
                        {"front": "Question 6", "back": "Answer 6"},
                        {"front": "Question 7", "back": "Answer 7"},
                        {"front": "Question 8", "back": "Answer 8"}
                    ]
                }
                \`\`\`

                10) **Do not include any commentary, explanation, or extra information outside of this JSON object.** Only provide the JSON object in your response.
                11)REMINDING AGAIN **RETURN ONLY A VALID JSON object**
            `,
            prompt: data,
        });

        console.log(text);

        let jsonResponse;
        try {
            jsonResponse = JSON.parse(text);
        } catch (jsonError) {
            console.error('Error parsing JSON:', jsonError);
            return Response.json({ message: "Error generating valid JSON response" }, { status: 500 });
        }

        return Response.json(jsonResponse, { status: 200 });
    } catch (err) {
        console.error('Error generating response:', err);
        return Response.json({ message: "Error generating response" }, { status: 500 });
    }
}
