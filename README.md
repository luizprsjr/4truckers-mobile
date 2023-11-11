# 4Truckers

## Overview

This project uses Google SignIn. To run the app in debug mode, you can easily follow the instructions below and use the demonstration keys that I have configured.

To build an APK or publish on app stores, it is recommended to create a new project on the Google API Console since these keys are temporary. For more information, refer to [Expo Google Authentication Documentation](https://docs.expo.dev/guides/google-authentication/).

Additionally, for release builds, there is a script configured to fetch directly from the Keychain of the Mac, as seen in [android/app/build.gradle](https://github.com/luizprsjr/4truckers-mobile/blob/main/android/app/build.gradle#L118). If you do not use Keychain or do not have a Mac, you can set your password directly in [android/gradle.properties](https://github.com/luizprsjr/4truckers-mobile/blob/main/android/gradle.properties#L61).

### API
The API for this project can be found at [luizprsjr/4truckers](https://github.com/luizprsjr/4truckers).

## Getting Started

### Install Dependencies

```bash
npm install
```

### Install Pods (for iOS)

```bash
cd ios
pod install
cd ..
```

### Run the Project

#### iOS

```bash
npx expo run:ios
```

#### Android

```bash
npx expo run:android
```