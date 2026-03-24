# Page 3 — Figma cache (`figma-cache-page3.json`)

## RTL (חובה)

האתר בעברית ו־**RTL**: משמאל לימין כמו שכותבים בעברית. פרטים מלאים בשדה `_rtl` בקובץ ה־JSON ובכללי הפרויקט (`.cursor/rules`, `CLAUDE.md`).

## למה קובץ מטמון?

כדי לא לפגוע ב־**rate limit** של Figma (HTTP 429) ולא לקרוא שוב ושוב ל־API/MCP בזמן פיתוח — מריצים **חילוץ חד־פעמי**, שומרים את ה־JSON ב־repo, ובונים קומפוננטות לפיו.

## מקור בעיצוב

- קישור (עותק עדכני): [Figma — node 253-6705](https://www.figma.com/design/pCQsVHvp5kYNlIvoXTlqqf/%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA-%D7%A8%D7%A2%D7%99%D7%9D--Copy---Copy-?node-id=253-6705&m=dev)
- `fileKey`: `pCQsVHvp5kYNlIvoXTlqqf` (עותק ישן: `C2NkiNoHtXbBcYwBG3u0Ad`)
- `nodeId`: `253:6705`
- דאמפ MCP מלא (עץ): `docs/figma-mcp-pCQsVHvp5kYNlIvoXTlqqf-node-253-6705.yaml`

## מילוי הקובץ (מומלץ)

1. הגדר במסוף (PowerShell) את אותו **Personal Access Token** שב־MCP (לא לשמור ב־git):

   ```powershell
   $env:FIGMA_API_KEY="figd_..."   # או FIGMA_TOKEN
   # אופציונלי: $env:FIGMA_FILE_KEY="C2NkiNoHtXbBcYwBG3u0Ad"
   npm run figma:cache-page3
   ```

2. הסקריפט ייצור/ידרוס את `docs/figma-cache-page3.json` עם עץ צמתים, טיפוגרפיה לדוגמה, צבעים שנדגמו, ורשימת פריימים.

3. אחרי בדיקה ידנית, אפשר למזג ידנית ל־`sections.*` לפי שמות שכבות בפיגמה ולעדכן `_meta.extractedAt` / `extractionStatus`.

## MCP ב־Cursor

ה־MCP מוגדר ב־`.cursor/mcp.json` — השיחה כאן **לא** מפעילה אותו אוטומטית; השימוש הוא מקומי דרך הסקריפט או דרך כלים שמחוברים ל־MCP בעורך שלך.
