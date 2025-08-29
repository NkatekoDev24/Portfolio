# Vercel Deployment Guide

This project has been configured for deployment on Vercel. Here's how to deploy it:

## Prerequisites

1. Make sure you have a [Vercel account](https://vercel.com)
2. Install Vercel CLI (optional but recommended):
   ```bash
   npm i -g vercel
   ```

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub/GitLab/Bitbucket**
   - Make sure all changes are committed and pushed to your repository

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your repository
   - Vercel will automatically detect it's a Vite project

3. **Configure Environment Variables (if needed)**
   - If you have any environment variables, add them in the Vercel dashboard
   - Go to Project Settings > Environment Variables

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your project automatically

### Option 2: Deploy via Vercel CLI

1. **Login to Vercel**
   ```bash
   vercel login
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Follow the prompts**
   - Select your project scope
   - Confirm the project name
   - Choose to link to existing project or create new one

## Project Configuration

The project has been configured with:

- **`vercel.json`**: Configuration for Vercel deployment
- **API Routes**: Serverless functions in the `api/` directory
- **Build Settings**: Configured for Vite build process

## API Endpoints

- **Demo Agent API**: `/api/demo-agent`
  - Method: POST
  - Body: `{ "role": "string", "question": "string" }`
  - Returns: `{ "reply": "string" }`

## Environment Variables

If you need to add environment variables:

1. Go to your Vercel project dashboard
2. Navigate to Settings > Environment Variables
3. Add any required variables

## Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Navigate to Settings > Domains
3. Add your custom domain
4. Configure DNS settings as instructed

## Troubleshooting

### Build Issues
- Check that all dependencies are in `package.json`
- Ensure the build command is correct: `npm run build`
- Verify the output directory is `dist`

### API Issues
- Check that API routes are in the `api/` directory
- Verify the function exports are correct
- Check Vercel function logs for errors

### Environment Variables
- Make sure all required environment variables are set in Vercel
- Check that variable names match your code

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Review the [Vercel documentation](https://vercel.com/docs)
3. Check the [Vercel community](https://github.com/vercel/vercel/discussions)
