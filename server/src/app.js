import express from 'express';
import cors from 'cors';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import api from './routes/api.js';
import {env} from './config/env.js';
import {errorHandler,notFound} from './middleware/errors.js';
const app=express();app.disable('x-powered-by');app.set('trust proxy',1);const allowedOrigins=env.clientOrigin.split(',').map(origin=>origin.trim()).filter(Boolean);if(env.nodeEnv!=='production')allowedOrigins.push('http://localhost:5173','http://127.0.0.1:5173');app.use(cors({origin(origin,callback){const isLocalDevelopmentOrigin=env.nodeEnv!=='production'&&/^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin||'');if(!origin||allowedOrigins.includes(origin)||isLocalDevelopmentOrigin)return callback(null,true);return callback(new Error('Origin not allowed by CORS'));},credentials:true}));app.use(express.json({limit:'32kb'}));app.use(session({name:'amr.sid',secret:env.sessionSecret,resave:false,saveUninitialized:false,store:MongoStore.create({mongoUrl:env.mongoUri,collectionName:'sessions',ttl:60*60*24*14}),cookie:{httpOnly:true,sameSite:'lax',secure:env.nodeEnv==='production',maxAge:14*24*60*60*1000}}));app.get('/health',(req,res)=>res.json({status:'ok',service:'AI Mystery Room API'}));app.use('/api/v1',api);app.use(notFound);app.use(errorHandler);export default app;
