# Automatisch Einträge auf HanDeDict@zydeo machen

## Installation
1. `npm install`
2. env.json auf Basis von `env_template.json` erstellen `cp env_template.json env.json`
   
    NIEMALS EINE DATEI MIT LOGIN DATEN EINCHECKEN! AUCH VORHER PRÜFEN, OB EIN EDITOR SICHERHEITSKOPIEN ANGELEGT HAT!!! `env.json` ist in der `.gitignore`

## Starten
1. Datei entries.csv auf Basis von entries_template.csv erstellen `cp entries_template.csv entries.csv`
2. `npm run insert`
3. Der Browser wird gestartet und ein Login wird ausgeführt. Jeder Eintrag wird automatisch eingetragen. Beim Pinyin und beim traditionellen Zeichen wird der Standard übernommen.

## Verbesserungen für die Zukunft
1. Prüfen, ob traditionelle Zeichen übergeben wurden und falls ja, diese auch wirklich eintragen.
2. Ein Flag einbauen, mit dem man, falls mehrere Pinyin Aussprachen vorhanden sind, diese manuell zwischendrin auswählen kann und der Automatismus erst weitergeht, wenn man Pinyin bestätigt hat.
3. Den Login wiederverwenden. Aktuell wird jedes Mal eine komplett neue Session aufgemacht. Bei vielen Einträgen könnte man es viel einfacher nacheinander machen.
4. Ein Flag für headless runs einbauen, dass es auch noch schneller geht und man das Fenster nicht im Vordergrund sieht.
