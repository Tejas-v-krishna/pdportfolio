import json
import sys

transcript_path = r"c:\Users\tejas\.gemini\antigravity\brain\bb7734c9-ac68-4bc1-a0fe-eb3f7eefddee\.system_generated\logs\transcript_full.jsonl"
output_path = r"c:\Users\tejas\.gemini\antigravity\Antigravity Projects\ProductDesignPortfolio\scratch\user_request.md"

with open(transcript_path, "r", encoding="utf-8") as f, open(output_path, "w", encoding="utf-8") as out:
    for line in f:
        try:
            data = json.loads(line)
            if data.get("type") == "USER_INPUT":
                out.write("==============================\n")
                out.write(data.get("content", ""))
                out.write("\n==============================\n")
        except:
            pass
