
      import { GoogleGenerativeAI } from "@google/generative-ai";
      // Fetch your API_KEY
      const API_KEY = "AIzaSyAAPBwGCTvd6akZO72ruKSvqi3SuaZ1cuQ";
      // Reminder: This should only be for local testing

      // Access your API key (see "Set up your API key" above)
      const genAI = new GoogleGenerativeAI('AIzaSyAAPBwGCTvd6akZO72ruKSvqi3SuaZ1cuQ');

      // ...

      // The Gemini 1.5 models are versatile and work with most use cases
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
      

export { 
  model,
  genAI
}


// Access your API key (see "Set up your API key" above)
/* 
async function run() {
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

  const prompt = "are successfully connected myapp."

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

run();
*/
