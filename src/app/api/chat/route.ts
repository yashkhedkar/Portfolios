import { NextRequest, NextResponse } from 'next/server';

const portfolioData = {
    "name": "Yash Khedkar",
    "contact": {
        "email": "ykhedkar55@gmail.com",
        "phone": "+91 91120 12345"
    },
    "summary": "Professional Web Developer specializing in React, Next.js, and AI integrations. Passionate about creating immersive web experiences with 3D visualizations and smooth animations.",
    "experience": [
        {
            "company": "Hanumatrix",
            "role": "Web Developer Intern",
            "period": "June 2025 – Present",
            "highlights": [
                "Developed 'The System' website using React, Javascript, Tailwind CSS, and GSAP.",
                "Integrated GSAP for smooth UI/UX animations which improved engagement by 40%.",
                "Collaborated on delivering scalable and high-performance UI components."
            ]
        },
        {
            "company": "NSPA Global",
            "role": "Web Developer Intern",
            "period": "Feb 2025 - April 2025",
            "highlights": [
                "Developed a Maid Hiring Website as part of the development team.",
                "Built responsive frontend with ReactJS and backend with Node.js, Express, and MongoDB."
            ]
        }
    ],
    "projects": [
        {
            "title": "SkillBridge",
            "subtitle": "AI EdTech",
            "description": "An AI-powered smart career development platform built using n8n Agentic AI workflows.",
            "technologies": ["Next.js", "n8n", "OpenAI API", "MongoDB", "Node.js"]
        },
        {
            "title": "Emp. Portal",
            "subtitle": "Management Sys",
            "description": "Comprehensive Employee Management System with a responsive CRUD dashboard.",
            "technologies": ["Angular", ".NET Core", "MongoDB", "TypeScript"]
        },
        {
            "title": "Fertilizer AI",
            "subtitle": "AgriTech",
            "description": "ML-based web application that predicts suitable fertilizers for crops.",
            "technologies": ["Angular", "Python", "Scikit-Learn", "Flask"]
        },
        {
            "title": "The System",
            "subtitle": "Hanumatrix",
            "description": "Interactive web app with 3D visualizations and high-performance animations.",
            "technologies": ["React", "Three.js", "GSAP", "Tailwind CSS"]
        },
        {
            "title": "Aadya Creation",
            "subtitle": "Event Management",
            "description": "High-fidelity event management portfolio built on Framer with custom animations.",
            "technologies": ["Framer", "React", "Motion"]
        },
        {
            "title": "Prompt Consultants",
            "subtitle": "Industrial 3D",
            "description": "Industrial portfolio with 3D scrollytelling for boiler feed pump specialists.",
            "technologies": ["Next.js 15", "React Three Fiber", "GSAP", "Tailwind CSS"]
        }
    ],
    "skills": {
        "frontend": ["React", "Next.js", "Angular", "Tailwind CSS", "GSAP", "Three.js", "Framer Motion"],
        "backend": ["Node.js", "Express.js", ".NET Core", "Flask"],
        "database": ["MongoDB", "SQLite"],
        "languages": ["JavaScript", "TypeScript", "Python", "C#"]
    }
};

export async function POST(request: NextRequest) {
    try {
        const { message, conversation_history } = await request.json();

        const systemContext = `You are "Yash AI", a professional and friendly AI assistant for Yash Khedkar's portfolio. 
Your goal is to answer questions about Yash's background using the provided JSON data.

GUIDELINES:
1. Accuracy: Only state facts present in the provided resume data.
2. Persona: Be helpful, professional, and concise. 
3. Redirection: If asked about personal life, politics, or unrelated topics, politely redirect back to Yash's professional work.
4. Contact: If asked for contact details, provide Yash's email (ykhedkar55@gmail.com) and phone number.
5. Formatting: Use Markdown for bold text and lists to ensure readability.
6. Constraint: Keep responses under 150 words.

Data: ${JSON.stringify(portfolioData)}`;

        // Debug log to check API key (DO NOT LOG ENTIRE KEY)
        console.log('API Key Status:', process.env.OPENROUTER_API_KEY ? `Found (ends with ${process.env.OPENROUTER_API_KEY.slice(-4)})` : 'NOT FOUND');

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY?.trim()}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3001', // Updated to match current port
                'X-Title': 'Yash Khedkar Portfolio',
            },
            body: JSON.stringify({
                model: 'google/gemini-2.0-flash-001',
                messages: [
                    { role: 'system', content: systemContext },
                    ...(conversation_history || []).map((m: any) => ({
                        role: m.type === 'user' ? 'user' : 'assistant',
                        content: m.content
                    })),
                    { role: 'user', content: message }
                ],
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('OpenRouter API Error:', errorData);
            return NextResponse.json({ message: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later!" }, { status: response.status });
        }

        const data = await response.json();
        const assistantMessage = data.choices?.[0]?.message?.content || "I'm sorry, I couldn't process that request.";

        return NextResponse.json({ message: assistantMessage });
    } catch (error) {
        console.error('Chat API Error:', error);
        return NextResponse.json({ message: "Something went wrong. Please try again later." }, { status: 500 });
    }
}
