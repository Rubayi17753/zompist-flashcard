import csv
import json
from pathlib import Path

csv_folderpath = 'decks_csv/'
js_folderpath = 'decks_js/'
manifest_fp = 'manifest.js'

def csv_to_js(deck_name):

    read_fp = f"{csv_folderpath}{deck_name}.csv"
    write_fp = f"{js_folderpath}{deck_name}.js"

    print(f'Reading from {read_fp}')
    with open(read_fp, newline="", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        data = list(reader)

    print(f'Writing to {write_fp}')
    with open(write_fp, "w", encoding="utf-8") as f:
        f.write("const cards = ")
        json.dump(data, f, ensure_ascii=False, indent=2)
        f.write(";")

def main():

    csv_deck_names = [p.stem for p in Path(csv_folderpath).iterdir() if p.is_file()] # .stem
    js_deck_names = [p.stem for p in Path(js_folderpath).iterdir() if p.is_file()] # .stem
    new_deck_names = [deck for deck in csv_deck_names 
                        if deck not in js_deck_names]

    # Read/write
    if new_deck_names:
        for deck_name in new_deck_names:
            csv_to_js(deck_name)

    # Update manifest
    js_deck_names.extend(new_deck_names)
    with open(manifest_fp, "w", encoding="utf-8") as f:
        f.write("const deckList = ")
        json.dump(js_deck_names, f, ensure_ascii=False, indent=2)
        f.write(";")

if __name__ == '__main__':
    main()