// api/demo-agent.ts - Vercel Serverless Function
import type { VercelRequest, VercelResponse } from '@vercel/node';

const GEMINI_API_KEY = "AIzaSyBhaKkM8LJSpykc7fX1woEPBaSgucnXkoQ"; // Replace with your API key

// ----------------------
// Nkateko's full profile for the AI to reference
// ----------------------
const nkatekoProfile = `
Name: Nkateko Nkuna
Location: Universitas, Bloemfontein, 9301
Contact: 084 695 1479 | nkunans98@gmail.com
LinkedIn: www.linkedin.com/in/nkateko-nkuna
Portfolio: https://nkateko-nkuna.vercel.app

Objective:
To obtain a challenging software developer position in a dynamic and innovative organisation where I can use my technical and analytical skills.

Skills & Abilities:
Languages: C#, Java, JavaScript, TypeScript, Kotlin, Python
Frameworks: React Native, ReactJS, AngularJS, Streamlit
Databases: MongoDB, SQL, Firebase, SQLite
Tools: Android Studio, Visual Studio Code, Git, Node.js
Core Competencies: Analytical Programming, Innovation, Adaptability
Soft Skills: Communication, Leadership, Collaboration, Problem-Solving
Other: Rest APIs

Education:
BSc Honours Computer Science, University of the Free State (Feb 2023 – Dec 2024)
Key Project: Job Interview Management System (Android Studio & Kotlin)

BSc Computer Science, University of the Free State (Feb 2017 – Dec 2021)

Work Experience:
- Junior Researcher, University of the Free State (Jan 2024 - Present)
  • Developed Lebitso App for South African Sign Language research
  • Co-authored reports advancing SASL for 4IR
  • Developed financial management app for small enterprises

- Full Stack Developer, Developmenthub (July 2022 – Dec 2022)
  • Built dynamic web apps using Angular & ASP.NET Boilerplate
  • Developed responsive front-end interfaces
  • Designed RESTful APIs & backend services with Node.js

Certificates:
- Software Engineer Intern – HackerRank 2025
- Ultimate C# Masterclass for 2024 – Udemy
- Python Practice: Object-Oriented Programming – Udemy
- Build an App with ASP.NET Core & Angular from Scratch – Udemy

Key Projects:
1. Job Interview Management System (Android Studio & Kotlin)
2. Lebitso App for South African Sign Language research
3. Financial management app for small enterprises
4. Dynamic web applications using Angular & ASP.NET Boilerplate
5. RESTful APIs & backend services with Node.js
`;

// ----------------------
// Demo Agent endpoint
// ----------------------
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Health check endpoint
  if (req.method === 'GET') {
    res.status(200).json({ status: "Demo Agent API is running" });
    return;
  }

  // Only allow POST requests for the main functionality
  if (req.method !== 'POST') {
    res.status(405).json({ reply: "Method not allowed" });
    return;
  }

  try {
    const { role, question } = req.body;

    if (!role?.trim() || !question?.trim()) {
      return res.status(400).json({ 
        reply: "Please provide both role and question." 
      });
    }

    // Create system prompt based on role
    const systemPrompt = `You are acting as Nkateko Nkuna, a skilled software developer. 
The user is playing the role of a ${role}. 
Answer their questions as if you were Nkateko in a real interview or project demo. 
Be professional, detailed, and highlight relevant skills, projects, and achievements.

Here is Nkateko's full profile for reference:
${nkatekoProfile}

Remember to:
- Speak in first person as Nkateko
- Be authentic and genuine in your responses
- Provide specific examples from your experience
- Show enthusiasm for technology and problem-solving
- Demonstrate both technical and soft skills
- Keep responses conversational but professional`;

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text: `${systemPrompt}\n\nQuestion from ${role}: ${question}`
                }
              ]
            }
          ]
        }),
      }
    );

    const textResponse = await geminiResponse.text();

    let data: any;
    try {
      data = JSON.parse(textResponse);
    } catch (err) {
      console.error("Gemini API returned invalid JSON:", textResponse);
      return res.status(500).json({ reply: "AI service error." });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I could not generate a response.";

    res.status(200).json({ reply });
  } catch (err) {
    console.error("Demo Agent error:", err);
    res.status(500).json({ reply: "Server error. Check backend logs." });
  }
}
