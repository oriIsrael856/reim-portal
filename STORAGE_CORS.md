# פתרון CORS להעלאת תמונות ל-Firebase Storage

כשמפתחים ב-localhost, הדפדפן חוסם העלאות ל-Firebase Storage בגלל CORS. צריך להגדיר CORS על ה-Storage bucket פעם אחת.

## דרוש: Google Cloud SDK (gsutil)

1. התקיני את [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) (כולל `gsutil`).
2. התחברי לחשבון:  
   `gcloud auth login`
3. הגדירי את הפרויקט:  
   `gcloud config set project reim-portal`

## איזה bucket יש לפרויקט?

הרצי קודם:

```bash
gsutil ls
```

תופיע רשימה של buckets (למשל `gs://reim-portal.appspot.com` או `gs://reim-portal.firebasestorage.app`). העתיקי את השם המלא של ה-bucket (כולל `gs://`).

## החלת ההגדרה

מתוך תיקיית הפרויקט (איפה ש-`storage.cors.json`), הרצי (החליפי BUCKET_NAME בשם שיצא מ-`gsutil ls`):

```bash
gsutil cors set storage.cors.json gs://BUCKET_NAME
```

דוגמאות לשמות נפוצים:
- `gsutil cors set storage.cors.json gs://reim-portal.appspot.com`
- `gsutil cors set storage.cors.json gs://reim-portal.firebasestorage.app`

## אימות

```bash
gsutil cors get gs://BUCKET_NAME
```

אחרי שהפקודה עוברת בהצלחה, רענני את האתר ב-localhost ונסי שוב להעלות תמונה.
