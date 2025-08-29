# Demo Agent Feature

## Overview
The Demo Agent is an interactive AI feature that simulates Nkateko Nkuna in various interview scenarios. Visitors can choose different roles (Technical Interviewer, HR Recruiter, Client, or General Q&A) and have realistic conversations with an AI that responds as Nkateko would.

## Features

### Backend (`api/demo-agent.ts`)
- **Express endpoint**: `/api/demo-agent`
- **Port**: 5001 (separate from main chat API)
- **AI Integration**: Uses Gemini API with custom system prompts
- **Role-based responses**: Tailors responses based on the selected role

### Frontend (`src/components/DemoAgent.tsx`)
- **Role Selection**: Dropdown with 4 different interview roles
- **Chat Interface**: Modern chat-style UI with message bubbles
- **Real-time Interaction**: Live typing indicators and smooth animations
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Demo Agent Backend
```bash
npm run server:demo
```
This will start the Demo Agent API on `http://localhost:5001`

### 3. Start the Frontend
```bash
npm run dev
```
This will start the Vite development server on `http://localhost:5173`

### 4. Run Everything Together
```bash
npm run dev:all
```
This starts both the frontend and all backend servers simultaneously.

## API Endpoints

### POST `/api/demo-agent`
**Request Body:**
```json
{
  "role": "Technical Interviewer",
  "question": "Tell me about your experience with React Native"
}
```

**Response:**
```json
{
  "reply": "As Nkateko, I have extensive experience with React Native..."
}
```

### GET `/api/demo-agent/health`
**Response:**
```json
{
  "status": "Demo Agent API is running"
}
```

## Available Roles

1. **Technical Interviewer**
   - Ask about coding challenges, architecture decisions
   - Technical problem-solving approaches
   - Programming languages and frameworks

2. **HR Recruiter**
   - Soft skills and teamwork experiences
   - Career goals and cultural fit
   - Leadership and communication abilities

3. **Client**
   - Project management and delivery
   - Communication with stakeholders
   - Handling client requirements and feedback

4. **General Q&A**
   - General questions about background
   - Personal interests and motivations
   - Any other topics

## Usage

1. Navigate to the "Demo Agent" section on the portfolio
2. Select your role from the dropdown
3. Type your question in the input field
4. Click "Send" or press Enter
5. View Nkateko's response in the chat interface

## Technical Details

### AI System Prompt
The AI is configured with a comprehensive system prompt that includes:
- Nkateko's full profile and background
- Role-specific instructions
- Guidelines for authentic, professional responses
- Emphasis on first-person perspective

### Error Handling
- Input validation for role and question
- Network error handling with user-friendly messages
- Loading states and typing indicators
- Graceful fallbacks for API failures

### Styling
- Built with Tailwind CSS and shadcn/ui components
- Responsive design with mobile-first approach
- Smooth animations and transitions
- Consistent with the overall portfolio design

## Troubleshooting

### Common Issues

1. **"Failed to get response" error**
   - Check if the Demo Agent backend is running on port 5001
   - Verify the Gemini API key is valid
   - Check network connectivity

2. **CORS errors**
   - Ensure the backend has CORS middleware enabled
   - Check that the frontend is making requests to the correct URL

3. **Port conflicts**
   - The Demo Agent uses port 5001 to avoid conflicts with the main chat API (port 5000)
   - If port 5001 is in use, modify the PORT variable in `api/demo-agent.ts`

### Development Tips

- Use browser developer tools to monitor network requests
- Check the backend console for detailed error logs
- Test with different roles to ensure varied responses
- Verify the AI responses align with Nkateko's profile

## Future Enhancements

Potential improvements for the Demo Agent feature:
- Conversation history persistence
- Voice interaction capabilities
- More specialized role scenarios
- Analytics and usage tracking
- Customizable AI personality traits
