import dotenv from 'dotenv';
dotenv.config();
export const env={port:Number(process.env.PORT||4000),mongoUri:process.env.MONGODB_URI,geminiKey:process.env.GEMINI_API_KEY,geminiModel:process.env.GEMINI_MODEL||'gemini-3.8-flash',sessionSecret:process.env.SESSION_SECRET||'replace-this-development-session-secret-with-32-characters',clientOrigin:process.env.CLIENT_ORIGIN||'http://localhost:5173',nodeEnv:process.env.NODE_ENV||'development',imageProvider:process.env.IMAGE_PROVIDER||'none',videoProvider:process.env.VIDEO_PROVIDER||'none'};
