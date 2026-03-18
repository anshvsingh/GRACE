"use client";

import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(220 47% 8%)" }}>

      {/* Navbar */}
      <nav className="flex items-center justify-between px-8 py-5"
        style={{ borderBottom: "1px solid hsl(217 33% 17%)" }}>
        <h1 className="text-2xl font-bold"
          style={{ color: "hsl(210 100% 56%)" }}>
          Grace
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/login")}
            className="text-sm font-medium px-4 py-2 rounded-lg"
            style={{ color: "hsl(215 20% 65%)" }}>
            Log In
          </button>
          <button
            onClick={() => router.push("/sign-up")}
            className="text-sm font-medium px-4 py-2 rounded-lg"
            style={{
              background: "linear-gradient(90deg, hsl(210 100% 56%), hsl(142 71% 45%))",
              color: "white",
            }}>
            Get Started Free
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex flex-col items-center text-center px-8 py-24">
        {/* Badge */}
        <div className="px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
          style={{
            backgroundColor: "hsl(210 100% 56% / 0.1)",
            border: "1px solid hsl(210 100% 56% / 0.3)",
            color: "hsl(210 100% 56%)",
          }}>
          ✨ AI-Powered SaaS MVP Generator
        </div>

        {/* Title */}
        <h1 className="text-6xl font-extrabold mb-6 max-w-3xl leading-tight">
          <span style={{
            background: "linear-gradient(90deg, hsl(210 100% 56%), hsl(142 71% 45%))",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Build Your SaaS MVP
          </span>
          <br />
          <span style={{ color: "hsl(210 40% 98%)" }}>
            in Minutes with AI
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg mb-10 max-w-xl"
          style={{ color: "hsl(215 20% 65%)" }}>
          Give Grace your startup idea. Get a fully working codebase with real project structure, auth, database, and frontend — ready to download and deploy.
        </p>

        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push("/sign-up")}
            className="px-8 py-4 rounded-xl font-bold text-base"
            style={{
              background: "linear-gradient(90deg, hsl(210 100% 56%), hsl(142 71% 45%))",
              color: "white",
            }}>
            🚀 Start Building for Free
          </button>
          <button
            onClick={() => router.push("/login")}
            className="px-8 py-4 rounded-xl font-bold text-base"
            style={{
              backgroundColor: "transparent",
              border: "1px solid hsl(217 33% 17%)",
              color: "hsl(210 40% 98%)",
            }}>
            View Demo →
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12"
          style={{ color: "hsl(210 40% 98%)" }}>
          Everything you need to ship fast
        </h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            { icon: "🧠", title: "AI Code Generation", desc: "Powered by Groq's blazing fast LLMs. Get real, working code — not templates." },
            { icon: "📁", title: "Real Project Structure", desc: "Full Next.js + Tailwind + TypeScript codebase with proper folder structure." },
            { icon: "🔐", title: "Auth Ready", desc: "Supabase authentication pre-wired. Login, signup, sessions out of the box." },
            { icon: "⚡", title: "Live Streaming", desc: "Watch your files being generated in real time, file by file with progress." },
            { icon: "📦", title: "ZIP Download", desc: "Download your entire project as a ZIP, ready to run locally or deploy." },
            { icon: "🤖", title: "AI Copilot", desc: "Built-in startup advisor to help with strategy, pricing, and growth." },
          ].map((feature) => (
            <div key={feature.title}
              className="p-6 rounded-xl"
              style={{ backgroundColor: "hsl(220 47% 11%)", border: "1px solid hsl(217 33% 17%)" }}>
              <p className="text-3xl mb-3">{feature.icon}</p>
              <h3 className="font-bold mb-2" style={{ color: "hsl(210 40% 98%)" }}>
                {feature.title}
              </h3>
              <p className="text-sm" style={{ color: "hsl(215 20% 65%)" }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12"
          style={{ color: "hsl(210 40% 98%)" }}>
          How it works
        </h2>
        <div className="grid grid-cols-3 gap-8">
          {[
            { step: "01", title: "Describe your idea", desc: "Tell Grace your startup idea, industry, target audience and select features." },
            { step: "02", title: "AI builds your MVP", desc: "Grace uses AI to generate a complete, working codebase file by file in real time." },
            { step: "03", title: "Download & Deploy", desc: "Download your ZIP, run it locally or deploy to Vercel in one click." },
          ].map((item) => (
            <div key={item.step} className="text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg, hsl(210 100% 56%), hsl(142 71% 45%))",
                  color: "white",
                }}>
                {item.step}
              </div>
              <h3 className="font-bold mb-2" style={{ color: "hsl(210 40% 98%)" }}>
                {item.title}
              </h3>
              <p className="text-sm" style={{ color: "hsl(215 20% 65%)" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="px-8 py-16 max-w-4xl mx-auto">
        <div className="rounded-2xl p-12 text-center"
          style={{
            background: "linear-gradient(135deg, hsl(210 100% 56% / 0.15), hsl(142 71% 45% / 0.15))",
            border: "1px solid hsl(210 100% 56% / 0.3)",
          }}>
          <h2 className="text-3xl font-bold mb-4"
            style={{ color: "hsl(210 40% 98%)" }}>
            Ready to build your MVP?
          </h2>
          <p className="text-sm mb-8" style={{ color: "hsl(215 20% 65%)" }}>
            Join builders who are shipping faster with Grace.
          </p>
          <button
            onClick={() => router.push("/sign-up")}
            className="px-8 py-4 rounded-xl font-bold text-base"
            style={{
              background: "linear-gradient(90deg, hsl(210 100% 56%), hsl(142 71% 45%))",
              color: "white",
            }}>
            🚀 Get Started for Free
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-8 text-center"
        style={{ borderTop: "1px solid hsl(217 33% 17%)" }}>
        <p className="text-sm" style={{ color: "hsl(215 20% 40%)" }}>
          © 2026 Grace. Built with ❤️ and AI.
        </p>
      </footer>
    </div>
  );
}