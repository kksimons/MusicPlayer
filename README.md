# Getting Started

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

```bash
# using npm
npm run android
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Signing Into The App

You can sign into the app using an existing test account:

`email: testuser@gmail.com`
`password: 123456`

Or feel free to create your own account and sign in.

### Now What?

Once you sign in, you can:
- **Listen to Music**: Access a wide range of songs and albums.
- **Search for Music**: Use the hourglass icon to find your favorite tracks.
- **Explore Playlists**: Discover music curated by genre, mood, or artist on the home page.
- **Create Playlists**: Use the plus icon to compile your personal mixes.
- **Offline Playback**: Download songs using the download icon to enjoy without an internet connection.
- **Social Features**: Follow other users like `ggwp2804` and `cat123` to see their playlists.
- **FAQ**: Find answers to common questions.
- **Profile and Settings**: Access the Settings tab to edit your profile.
- **Sign Out**: Securely log out of the app.
- **Theme Toggle**: Switch between light and dark mode by clicking the sun or moon icon.

# Troubleshooting

If you can't get the npm install to work, we had issues with a recent firebase vulnerabilities. 
Everything has since been updated to latest but if something like that comes up again, delete the package-lock.json, all firebase depedencies from the package.json  here:

`"@react-native-firebase/auth": "20.3.0",
"@react-native-firebase/app": "20.3.0",
"@react-native-firebase/firestore": "20.3.0",
"@react-native-firebase/messaging": "20.3.0"`

and then reinstall them at latest with the following:

`npm install @react-native-firebase/messaging@latest`
`npm install @react-native-firebase/firestore@latest`
`npm install @react-native-firebase/auth@latest`
`npm install @react-native-firebase/app@latest`
