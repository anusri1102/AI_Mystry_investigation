import {GoogleGenAI} from '@google/genai';
import {env} from '../../config/env.js';
export class GeminiTextProvider {
  async generate(prompt){
    if(!env.geminiKey)throw new Error('Mystery generation is not configured. Set GEMINI_API_KEY in server/.env.');
    const client=new GoogleGenAI({apiKey:env.geminiKey,httpOptions:{timeout:900000}});
    let result;
    const models=[...new Set([env.geminiModel,...(env.geminiModel==='gemini-3.8-flash'?['gemini-3.6-flash']:[])])];
    for(let modelIndex=0;modelIndex<models.length;modelIndex++){
      try{result=await client.models.generateContent({model:models[modelIndex],contents:prompt,config:{responseMimeType:'application/json'}});break;}
      catch(error){
        if(error.status===503&&modelIndex<models.length-1)continue;
        if(error.status===401||error.status===403)throw new Error('Gemini authentication failed. Check the API key and its project access.');
        if(error.status===404)throw new Error('The configured Gemini model was not found. Check GEMINI_MODEL in server/.env.');
        if(error.status===429)throw new Error('Gemini quota or rate limit reached. Check the project quota and try again later.');
        if(error.status===400)throw new Error('Gemini rejected the request. Verify the selected model supports JSON output and check the request configuration.');
        if(error.status===504)throw new Error('Gemini timed out after 15 minutes. Try a shorter scenario or retry later.');
        if(error.status>=500)throw new Error(`Gemini is temporarily unavailable (HTTP ${error.status}). Try again later.`);
        const detail=`${error.name||''} ${error.message||''} ${error.cause?.code||''}`;
        if(/abort|timeout|timed out|ETIMEDOUT|ECONNRESET|ENOTFOUND|EAI_AGAIN/i.test(detail))throw new Error('Gemini request timed out or could not reach Google. Check outbound access to generativelanguage.googleapis.com.');
        throw new Error('Gemini request failed. Check the API key, configured model, quota, and network access.');
      }
    }
    if(!result)throw new Error('Gemini did not return a response. Try again later.');
    return JSON.parse(result.text);
  }
}
