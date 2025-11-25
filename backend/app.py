from fastapi import FastAPI

app = FastAPI()

@app.get("/infer_text")
def inference():
    return