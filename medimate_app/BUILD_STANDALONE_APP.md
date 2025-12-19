# Installing Standalone App to iPhone

Quick reference for getting your React Native/Expo app running on your iPhone without Metro bundler.

## Prerequisites (One-time setup)

1. **Mac with Xcode installed** (from App Store)
2. **iPhone with Developer Mode enabled**
   - Settings → Privacy & Security → Developer Mode → ON
   - Restart iPhone after enabling
3. **USB cable** to connect iPhone to Mac
4. **Apple ID** (free, no $99/year needed)

## Steps to Install

### 1. Connect iPhone
```bash
# Plug in your iPhone via USB cable
```

### 2. Build & Install Standalone App
```bash
cd your_project_name
npx expo run:ios --device --configuration Release
```

**What this does:**
- Builds the app with JavaScript bundled inside
- Installs directly to your connected iPhone
- No Metro bundler needed after installation

### 3. Trust Developer Certificate (First time only)
On your iPhone:
1. Settings → General → VPN & Device Management
2. Tap your Apple ID email
3. Tap "Trust [your email]"
4. Tap "Trust" to confirm

### 4. Done!
- App is now installed on your iPhone
- Works completely offline
- No Mac needed to run it
- App expires in 7 days (free Apple ID)

## Rebuilding After 7 Days

When app expires, just run step 2 again:
```bash
npx expo run:ios --device --configuration Release
```

## Alternative: Development Mode (with Metro)

If you want hot reloading while developing:
```bash
# Terminal 1: Start Metro
npx expo start --dev-client

# Terminal 2: Build & install
npx expo run:ios --device
```

This requires Metro to stay running but gives you live updates.

## Troubleshooting

**Error: "Developer Mode disabled"**
- Enable Developer Mode on iPhone (see Prerequisites)

**Error: "No signing certificate"**
- Xcode → Preferences → Accounts → Add your Apple ID

**App won't open / crashes**
- Trust the developer certificate (see Step 3)

**Build fails**
```bash
# Clean and rebuild
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
npx expo run:ios --device --configuration Release
```

## Key Differences

| Debug Build | Release Build (Standalone) |
|-------------|----------------------------|
| Needs Metro running | No Metro needed |
| Hot reload works | No hot reload |
| Slower performance | Production speed |
| For active development | For testing/demos |
| `npx expo run:ios --device` | `npx expo run:ios --device --configuration Release` |

## Notes

- **Free Apple ID**: Apps expire every 7 days, must rebuild
- **Paid Apple ID ($99/year)**: Apps expire every 365 days
- The generated `ios/` folder can be deleted and regenerated anytime with `npx expo prebuild`
- This is a "development build" - it has native capabilities that Expo Go doesn't support