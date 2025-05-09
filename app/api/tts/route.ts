import OpenAI from "openai";
 
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});
 
export const POST = async (req: Request) => {
  const form = await req.formData();
  const reply = form.get('reply')?.toString();

  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "nova",
    input: reply || "",
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());

  return Response.json({ buffer: buffer.toString("base64") });
};