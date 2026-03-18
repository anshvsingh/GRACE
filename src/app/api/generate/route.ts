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

    const prompt = `You are an expert Next.js developer. Generate a complete working Next.js app.

Project: ${projectName}
Idea: ${idea}
Industry: ${industry}
Audience: ${audience}
Features: ${features.join(", ")}

Generate these EXACT files with COMPLETE content:

1. package.json - use EXACTLY this:
{
  "name": "${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}",
  "version": "0.1.0",
  "private": true,
  "scripts": { "dev": "next dev", "build": "next build", "start": "next start" },
  "dependencies": { "next": "14.2.5", "react": "^18.3.1", "react-dom": "^18.3.1" },
  "devDependencies": { "@types/node": "^20", "@types/react": "^18", "@types/react-dom": "^18", "typescript": "^5", "tailwindcss": "^3.4.1", "autoprefixer": "^10.0.1", "postcss": "^8" }
}

2. tsconfig.json - use EXACTLY this:
{
  "compilerOptions": {
    "target": "es5", "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true, "skipLibCheck": true, "strict": true,
    "noEmit": true, "esModuleInterop": true, "module": "esnext",
    "moduleResolution": "bundler", "resolveJsonModule": true,
    "isolatedModules": true, "jsx": "preserve", "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}

3. tailwind.config.ts - use EXACTLY this:
import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
export default config;

4. postcss.config.js - use EXACTLY this:
module.exports = { plugins: { tailwindcss: {}, autoprefixer: {} } }

5. next.config.js - use EXACTLY this:
/** @type {import('next').NextConfig} */
const nextConfig = {}
module.exports = nextConfig

6. src/app/globals.css - use EXACTLY this:
@tailwind base;
@tailwind components;
@tailwind utilities;

7. src/app/layout.tsx - use EXACTLY this structure:
import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = { title: "${projectName}", description: "${idea}" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}

8. src/app/page.tsx - Generate a BEAUTIFUL, COMPLETE landing page for "${projectName}" using Tailwind CSS with:
- A navbar with the project name
- A hero section with headline and CTA button
- A features section with 3 feature cards
- A footer
Use ONLY inline Tailwind classes. NO external component imports. Make it visually stunning with colors, gradients, shadows.

9. Generate 2-3 more pages based on these features: ${features.join(", ")}
Each page must be self-contained with NO external component imports.
Each page must use Tailwind CSS classes for styling.
Each page must be a complete, working React component.

CRITICAL RULES:
- NEVER import components that aren't in your file list
- NEVER use placeholder text like "your code here"
- EVERY file must be 100% complete and working
- Use Tailwind CSS classes for ALL styling
- Pages must look professional and modern

Return ONLY a valid JSON array with NO markdown backticks:
[
  { "filename": "package.json", "content": "..." },
  { "filename": "tsconfig.json", "content": "..." },
  { "filename": "tailwind.config.ts", "content": "..." },
  { "filename": "postcss.config.js", "content": "..." },
  { "filename": "next.config.js", "content": "..." },
  { "filename": "src/app/globals.css", "content": "..." },
  { "filename": "src/app/layout.tsx", "content": "..." },
  { "filename": "src/app/page.tsx", "content": "..." }
]`;

    const response = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: "You are an expert Next.js developer. You always return valid JSON arrays only. No markdown. No backticks. No explanation. Just the JSON array.",
        },
        { role: "user", content: prompt }
      ],
      max_tokens: 8000,
      temperature: 0.3,
    });

    const content = response.choices[0].message.content || "[]";

    let files;
    try {
      const cleaned = content
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      
      // Find the JSON array
      const start = cleaned.indexOf("[");
      const end = cleaned.lastIndexOf("]");
      
      if (start === -1 || end === -1) {
        throw new Error("No JSON array found");
      }
      
      const jsonStr = cleaned.slice(start, end + 1);
      files = JSON.parse(jsonStr);
    } catch (e) {
      console.error("Parse error:", e);
      files = [];
    }

    return NextResponse.json({ files });

  } catch (error) {
    console.error("Groq API error:", error);
    return NextResponse.json({ error: "Generation failed" }, { status: 500 });
  }
}