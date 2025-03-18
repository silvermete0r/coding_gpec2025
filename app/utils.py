import os
import google.generativeai as genai
from typing import Dict, Any, Optional
from dotenv import load_dotenv

load_dotenv()

def initialize_gemini_api():
    api_key = os.environ.get('GOOGLE_API')
    if not api_key:
        raise ValueError("GOOGLE_API environment variable is not set")
    
    genai.configure(api_key=api_key)

def generate_content(prompt: str, model: str = "gemini-1.5-flash", max_tokens: int = 800) -> Dict[str, Any]:
    try:
        initialize_gemini_api()
        
        # Configure the model
        generation_config = {
            "max_output_tokens": max_tokens,
            "temperature": 0.7,
            "top_p": 0.95,
            "top_k": 40
        }
        
        # Get the model
        model = genai.GenerativeModel(model_name=model, 
                                     generation_config=generation_config,
                                     system_instruction="You are story-teller.")
        
        # Generate content
        response = model.generate_content(prompt)
        
        # Return formatted response
        return {
            "status": True,
            "content": response.text
        }
        
    except Exception as e:
        return {
            "status": False,
            "error": str(e),
            "content": "Sorry, I couldn't generate a response at this time."
        }

if __name__ == "__main__":
    # Test the generate_content function
    prompt = "Once upon a time ..."
    response = generate_content(prompt)
    print(response)