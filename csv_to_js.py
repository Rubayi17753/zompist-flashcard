import csv
import json

with open("cards.csv", newline="", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    data = list(reader)

with open("cards.js", "w", encoding="utf-8") as f:
    f.write("const cards = ")
    json.dump(data, f, ensure_ascii=False, indent=2)
    f.write(";")