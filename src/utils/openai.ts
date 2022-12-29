import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const MODEL = "text-embedding-ada-002";

export async function createEmbedding(text: string) {
  const embedding = await openai.createEmbedding({
    model: MODEL,
    input: text,
  });

  return embedding.data;
}
