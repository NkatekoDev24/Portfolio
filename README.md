# Nkateko's AI Portfolio Assistant

Welcome to my AI-powered portfolio! This project showcases my skills, projects, and experience through interactive AI-driven features.

## 🚀 Features

- **AI Chat Assistant**: Engage in real-time conversations with an AI that simulates my responses, providing insights into my background and expertise.
- **Job Matcher & Cover Letter Generator**: Analyze job descriptions and receive tailored cover letters and skill assessments.
- **Demo Agent**: Experience a mock interview or project walkthrough, simulating real-world scenarios.

## 🛠️ Technologies Used

- **Frontend**: React, Vite, Tailwind CSS, shadcn UI
- **Backend**: Node.js, Express, TypeScript
- **AI Integration**: Gemini API
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Styling**: Tailwind CSS, Radix UI, Lucide Icons

## 📦 Installation

Clone the repository:

```bash
git clone https://github.com/NkatekoDev24/Portfolio.git
cd Portfolio
```

### Environment Variables

Create a `.env` file in the root directory:

```bash
# Required for AI features
GEMINI_API_KEY=your_gemini_api_key_here
```

**Important**: Never commit your API keys to version control. Add `.env` to your `.gitignore` file.

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables** (see above)

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **For full functionality with AI features**:
   ```bash
   npm run dev:all
   ```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm run dev:all` - Start both frontend and backend servers
