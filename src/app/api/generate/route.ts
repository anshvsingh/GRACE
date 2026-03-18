import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { idea, features, industry, audience, projectName } = await req.json();

    if (!idea) {
      return NextResponse.json({ error: "No idea provided" }, { status: 400 });
    }

const prompt = `You are an expert Next.js developer. Generate a complete, working Next.js 14 App Router project.

Project Name: ${projectName}
Startup Idea: ${idea}
Industry: ${industry}
Target Audience: ${audience}
Selected Features: ${features.join(", ")}

CRITICAL RULES:
- Use Next.js 14 App Router (src/app/ structure)
- Use TypeScript
- Use Tailwind CSS for styling
- NEVER import a component that you don't generate as a file
- NEVER reference external files that aren't in your file list
- Every import must have a corresponding file in the output
- Use inline components instead of separate files when possible
- No placeholders, no TODO comments, complete working code only

EXACT package.json to use:
{
  "name": "${projectName.toLowerCase().replace(/\s+/g, '-')}",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "15.0.0",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "typescript": "^5",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}

EXACT files to generate (no more, no less):
1. package.json (use exact content above)
2. tsconfig.json
3. tailwind.config.ts
4. postcss.config.js
5. next.config.js
6. src/app/globals.css
7. src/app/layout.tsx (NO external component imports)
8. src/app/page.tsx (full landing page, NO external imports)
9. 2-3 more pages based on features (each self-contained, NO external imports)

Return ONLY a valid JSON array, no markdown, no backticks:
[
  {
    "filename": "package.json",
    "content": "exact content here"
  }
]`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 8000,
    });

    const content = response.choices[0].message.content || "[]";

let files;
try {
  const cleaned = content.replace(/```json|```/g, "").trim();
  console.log("RAW CONTENT:", cleaned.slice(0, 500));
  files = JSON.parse(cleaned);
  console.log("PARSED FILES COUNT:", files.length);
} catch (e) {
  console.log("PARSE ERROR:", e);
  files = [];
}

    return NextResponse.json({ files });

  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}