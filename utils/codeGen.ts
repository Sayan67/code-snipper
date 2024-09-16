
// Make sure to include these imports:
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY as string);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const codeGen = async (params="java") => {
  const prompt = `Write an advanced code block(within 25 lines) in ${params} and add comments on each line and each line should not be more than 6 words if it is greater than 6 words then break the line into two or more lines as a single line comment. and do not add anything like "\`\`\`python \`\`\`" before and after the code`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

export function whichLanguage(topic="Data Structures(java)"){
    if(topic==='AI/ML'){
        return 'python';
    }else if(topic ==='Data Structures(java)'){
        return 'java'
    }else if(topic==='React'){
        return 'javascript'
    }
}

export const codeGenOnTopic = async (params="Data Structures(java)") => {
    let lang = whichLanguage(params)
    
  const prompt = `Write an advanced code block(within 30 lines) in ${lang} for ${params} and add comments on each line and each line should not be more than 6 words if it is greater than 6 words then break the line into two or more lines as a single line comment. and do not add anything like "\`\`\`python \`\`\`" before and after the code`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};
