import openai
import os

openai.api_key = os.getenv("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")
response = openai.ChatCompletion.create(
    model="llama3-8b-8192",
    messages=[{"role": "user", "content": "Hello, how are you?"}]
)
print(response["choices"][0]["message"]["content"])
