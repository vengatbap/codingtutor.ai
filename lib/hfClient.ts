import { HfInference } from "@huggingface/inference";

const hf = new HfInference(process.env.HF_TOKEN); 
// HF_TOKEN is OPTIONAL for local / public models

export async function runHFModel(prompt: string) {
  const response = await hf.textGeneration({
    model: "mistralai/Mistral-7B-Instruct",
    inputs: prompt,
    parameters: {
      max_new_tokens: 400,
      temperature: 0.3,
      top_p: 0.9,
      return_full_text: false,
    },
  });

  return response.generated_text;
}
