import crypto from 'node:crypto';
import Mystery from '../../models/Mystery.js';
import {env} from '../../config/env.js';
import {GeminiTextProvider} from '../ai/geminiProvider.js';
import {mysteryPrompt} from '../../prompts/mystery.prompt.js';
import {validateBlueprint} from '../../validators/mystery.js';
const provider=new GeminiTextProvider();
export async function createMysteryJob(input,sessionId){const caseId=`AMR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;const mystery=await Mystery.create({caseId,sessionId,title:input.title||'Untitled Investigation',scenario:input.scenario,category:input.category,difficulty:input.difficulty,generationStatus:'GENERATING',generationProgress:4});generateInBackground(mystery._id,input).catch(async error=>{await Mystery.findByIdAndUpdate(mystery._id,{generationStatus:'FAILED',generationError:error.message,generationProgress:0});console.error(`Mystery generation failed for ${caseId}.`);});return mystery;}
async function generateInBackground(id,input){
  await Mystery.findByIdAndUpdate(id,{generationProgress:12});
  let errors='';
  for(let attempt=0;attempt<3;attempt++){
    await Mystery.findByIdAndUpdate(id,{generationProgress:18+attempt*16});
    let raw;
    try{raw=await provider.generate(mysteryPrompt(input,errors));}
    catch(error){
      if(error instanceof SyntaxError&&attempt<2){errors='The previous response was not valid JSON. Return one valid JSON object only.';continue;}
      throw error;
    }
    let blueprint;
    try{blueprint=validateBlueprint(raw);}
    catch(error){if(attempt===2)throw new Error('Gemini returned an invalid case structure after three attempts. Please retry.');errors=error.message;continue;}
    await Mystery.findByIdAndUpdate(id,{generationProgress:72});
    const evidence=blueprint.evidence.map(item=>({...item,generationStatus:'READY',metadata:{...item.metadata,fictional:true,...(item.type==='image'?{assetFallback:'Illustrative still described by the case file. No generated photograph is configured.'}:{}),...(item.type==='cctv'?{assetFallback:'No video provider configured. This item is presented as a text timeline, not a video.'}:{})}}));
    await Mystery.findByIdAndUpdate(id,{$set:{title:input.title||blueprint.title,caseDescription:blueprint.caseDescription,incidentDetails:blueprint.incidentDetails,suspects:blueprint.suspects,evidence,timeline:blueprint.timeline,canonicalSolution:{culpritSuspectId:blueprint.culpritSuspectId,motive:blueprint.motive,method:blueprint.method,opportunity:blueprint.opportunity,explanation:blueprint.explanation,whyNot:blueprint.whyNot,decisiveClues:blueprint.decisiveClues,redHerringExplanations:blueprint.redHerringExplanations},generationStatus:'READY',generationProgress:100}});
    return;
  }
}
export function publicEvidence(item){const metadata=item.metadata||{};let safe={fictional:true};if(item.type==='chat')safe={...safe,participants:Array.isArray(metadata.participants)?metadata.participants:[],messages:Array.isArray(metadata.messages)?metadata.messages.map(({sender,recipient,content,timestamp,status})=>({sender,recipient,content,timestamp,status})):[]};if(item.type==='image')safe={...safe,visualDescription:metadata.visualDescription||'',assetFallback:metadata.assetFallback||''};if(item.type==='witness')safe={...safe,witnessName:metadata.witnessName||'',reliability:metadata.reliability||''};if(item.type==='cctv')safe={...safe,cameraId:metadata.cameraId||'',events:Array.isArray(metadata.events)?metadata.events.map(({time,event})=>({time,event})):[],assetFallback:metadata.assetFallback||''};if(item.type==='document')safe={...safe,documentType:metadata.documentType||'',subject:metadata.subject||'',sender:metadata.sender||'',recipient:metadata.recipient||''};return {evidenceId:item.evidenceId,type:item.type,title:item.title,description:item.description,assetUrl:item.assetUrl||null,timestamp:item.timestamp,location:item.location,relatedSuspectIds:item.relatedSuspectIds,relatedEvidenceIds:item.relatedEvidenceIds,metadata:safe,generationStatus:item.generationStatus};}
export function publicMystery(m){return {caseId:m.caseId,title:m.title,scenario:m.scenario,category:m.category,difficulty:m.difficulty,caseDescription:m.caseDescription,incidentDetails:m.incidentDetails,suspects:m.suspects,evidence:m.evidence.map(publicEvidence),timeline:m.timeline,generationStatus:m.generationStatus,generationProgress:m.generationProgress,generationMessage:m.generationStatus==='FAILED'?m.generationError:undefined,createdAt:m.createdAt};}
export async function getOwnedMystery(caseId,sessionId){return Mystery.findOne({caseId,sessionId}).select('+generationError');}
