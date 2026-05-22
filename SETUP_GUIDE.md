# EDURA Test — Setup Guide (Non-Technical)

Follow these 4 steps. You should be done in **~15 minutes**.

---

## ✅ Step 1 — Set up the database (5 minutes)

This creates everything: all Edura tables AND the new quiz tables AND 12 sample students you can immediately test with.

1. Open https://supabase.com/dashboard
2. Sign in and click your project **`fwaqyoatqfgyydqvmazk`**
3. In the left sidebar click **SQL Editor**
4. Click **New query** (top right)
5. Open the file **`edura-test/COMPLETE_SETUP.sql`** on your computer
6. **Copy ALL of its content** (Ctrl+A then Ctrl+C)
7. **Paste** it into the Supabase SQL Editor (Ctrl+V)
8. Click the green **RUN** button (bottom right)
9. Wait ~10 seconds. You should see **"Success. No rows returned"**

✅ Done. Your database now has 12 students and all tables ready.

---

## ✅ Step 2 — Install the tablet app (5 minutes)

1. Open a **PowerShell** window
2. Run these commands one by one:

```powershell
cd "C:\Users\Hamada Salim G Trd\Desktop\pfe\edura-test"
npm install
```

Wait for the install to finish (you'll see a "found 0 vulnerabilities" or similar message).

---

## ✅ Step 3 — Start the app (1 minute)

Still in PowerShell, in the same folder:

```powershell
npx expo start
```

A QR code will appear in your terminal.

---

## ✅ Step 4 — Open on iPad/phone (2 minutes)

### Option A — On a real iPad (recommended for school use)
1. On the iPad, open the **App Store** → install **"Expo Go"** (free)
2. Open Expo Go
3. Tap **"Scan QR code"** and scan the QR from your PowerShell terminal
4. The app launches!

### Option B — On a phone (for quick testing)
Same as above — install Expo Go on Android/iPhone and scan the QR.

### Option C — In your computer browser (fastest)
In the PowerShell window where Expo is running, press the **`w`** key.
The app opens in a browser at http://localhost:8081.

---

## 🎯 Test it!

You'll see 12 student cards. Tap any name, then enter their date of birth as DD/MM/YYYY.

**Try this one:**
- Tap **"Amina Boudiaf"**
- Enter `12/05/2008`
- Take the assessment!
- After finishing, results auto-save to your Supabase.

To check results landed:
1. Go back to Supabase Dashboard → **Table Editor** → click **`test_results`**
2. You'll see the row with Amina's MBTI, IQ, intelligence, and career match.

---

## 📋 All 12 test students (name → DOB to enter):

| Student | Date of Birth |
|---------|--------------|
| Amina Boudiaf | 12/05/2008 |
| Yacine Belkacem | 23/09/2007 |
| Lina Hamidi | 14/02/2008 |
| Karim Ouali | 30/11/2007 |
| Sara Mansouri | 08/07/2008 |
| Mehdi Cherif | 19/03/2007 |
| Nour Benali | 04/12/2008 |
| Rayan Khelifi | 27/06/2007 |
| Yasmine Saidi | 15/01/2008 |
| Adam Brahimi | 21/08/2007 |
| Maya Tounsi | 09/04/2008 |
| Sami Larbi | 13/10/2007 |

---

## 🚨 If something doesn't work

| Problem | Fix |
|---------|-----|
| `npm install` fails | Install Node.js from https://nodejs.org (LTS version) and retry |
| QR code won't scan | Make sure iPad and computer are on the **same WiFi** |
| "No students found" in app | The SQL didn't run — repeat Step 1 |
| "Sync failed" after quiz | Check `.env` file has correct Supabase URL/key |
| App crashes | Stop with Ctrl+C in PowerShell, then `npx expo start --clear` |

---

## 📦 When you're ready for production (real iPads in school)

Build a real installable app:
```powershell
npm install -g eas-cli
eas build --platform ios --profile production
```

This creates an `.ipa` file you can install on the school's iPads via Apple's MDM or TestFlight.

---

**You're all set! 🚀**
