import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from huggingface_hub import InferenceClient
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class InferenceRequest(BaseModel):
    text: str

# Asumming environment variables are set for MODEL_ID and HF_TOKEN
MODEL_ID = os.getenv("MODEL_ID")
HF_TOKEN = os.getenv("HF_TOKEN")

client = InferenceClient(token=HF_TOKEN)

@app.post("/infer_text")
async def inference(request: InferenceRequest):
    if not HF_TOKEN:
        raise HTTPException(status_code=500, detail="HF_TOKEN is not set. Create a .env file with your token.")

    # Prompt structure for the legal text simplification task
    prompt = f"""<|start_header_id|>system<|end_header_id|>

    Eres un asistente legal. Simplifica el siguiente texto complejo a lenguaje claro.<|eot_id|><|start_header_id|>user<|end_header_id|>

    {request.text}<|eot_id|><|start_header_id|>assistant<|end_header_id|>
    """

    try:
        # Call to Hugging Face Inference API
        response = client.text_generation(
            model=MODEL_ID,
            prompt=prompt,
            max_new_tokens=256,
            temperature=0.1,
            return_full_text=False
        )
        return {"simplified_text": response.strip()}
    except Exception as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error connecting to Hugging Face: {str(e)}")