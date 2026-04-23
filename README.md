# 🌟 Grace — AI SaaS MVP Generator

> Give Grace your startup idea. Get a fully working codebase in minutes.

![Grace Banner](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)
![Grace Banner](https://img.shields.io/badge/AI-Groq%20LLaMA-blue?style=for-the-badge)
![Grace Banner](https://img.shields.io/badge/Database-Supabase-green?style=for-the-badge&logo=supabase)
![Grace Banner](https://img.shields.io/badge/Styled%20with-Tailwind-cyan?style=for-the-badge&logo=tailwindcss)

---

## ✨ What is Grace?

**Grace** is an AI-powered SaaS MVP Generator. You describe your startup idea, pick your features, and Grace writes a complete, working Next.js codebase for you — ready to download and deploy.

No more spending weeks building boilerplate. Grace gives you a running start.

---

## 🚀 Features

| Feature | Description |
|--------|-------------|
| 🧠 **AI Code Generation** | Powered by Groq's LLaMA 3.3 70B — generates real, working code |
| ⚡ **Live File Streaming** | Watch your files being created in real time |
| 📦 **ZIP Download** | Download your entire project as a ZIP, ready to run |
| 🔐 **Auth Ready** | Supabase authentication — login, signup, sessions |
| 🤖 **AI Copilot** | Built-in startup advisor for strategy, pricing, and growth |
| 📁 **Warehouse** | View, manage, and re-download all your generated MVPs |
| ⚙️ **Studio** | Configure the AI model, temperature, and code quality |
| 🚀 **Deployments Center** | Push your MVPs to GitHub and Netlify |

---

## 🖥️ Pages

- `/` — Landing page
- `/sign-up` — Create an account
- `/login` — Log in
- `/dashboard` — Your AI SaaS control center
- `/create` — Generate a new MVP
- `/build` — Live file generation screen
- `/warehouse` — All your generated projects
- `/copilot` — AI startup advisor chat
- `/studio` — AI engine settings
- `/production` — Deployments center
- `/account` — Manage your profile

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 15, TypeScript, Tailwind CSS |
| **Backend** | Next.js API Routes |
| **AI** | Groq API (LLaMA 3.3 70B) |
| **Auth** | Supabase Auth |
| **Database** | Supabase (PostgreSQL) |
| **Deployment** | Vercel |

---

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com) (free)
- A [Supabase](https://supabase.com) project (free)

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/grace.git
cd grace

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

### Environment Variables

Create a `.env.local` file in the root:

```env
GROQ_API_KEY=gsk_xxxxxxxxxxxxxxxx
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_xxxxxxxxxxxxxxxx
```

### Database Setup

Run this SQL in your Supabase SQL editor:

```sql
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade,
  name text not null,
  idea text not null,
  industry text,
  audience text,
  features text[],
  files jsonb,
  status text default 'Draft',
  created_at timestamp with time zone default now()
);

alter table projects enable row level security;

create policy "Users can view own projects" on projects for select using (auth.uid() = user_id);
create policy "Users can insert own projects" on projects for insert with check (auth.uid() = user_id);
create policy "Users can update own projects" on projects for update using (auth.uid() = user_id);
create policy "Users can delete own projects" on projects for delete using (auth.uid() = user_id);
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🚀

---

## 🎯 How It Works

```
1. User describes their startup idea
        ↓
2. User selects features (Auth, Dashboard, Payments, etc.)
        ↓
3. Grace sends idea + features to Groq LLaMA AI
        ↓
4. AI generates complete Next.js app code
        ↓
5. Files stream to screen one by one (live!)
        ↓
6. User downloads ZIP and runs it locally
```

---

## 📁 Project Structure

```
grace/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/
│   │   │   └── sign-up/
│   │   ├── (dashboard)/
│   │   │   ├── dashboard/
│   │   │   ├── warehouse/
│   │   │   ├── copilot/
│   │   │   ├── studio/
│   │   │   ├── production/
│   │   │   └── account/
│   │   ├── api/
│   │   │   ├── generate/
│   │   │   └── copilot/
│   │   ├── create/
│   │   ├── build/
│   │   └── page.tsx
│   ├── components/
│   │   └── layout/
│   │       └── Sidebar.tsx
│   └── lib/
│       ├── supabase.ts
│       └── downloadZip.ts
├── .env.local
├── package.json
└── README.md
```

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT License — free to use, modify, and distribute.

---

## 👨‍💻 Built By ANSH VARDHAN SINGH
