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

## Screens

<div style="display:flex; justify-content: space-between; margin-top: 20px;">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282333021-7a6d658c-6977-45ce-8f28-42061116063e.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282333184-c1c23eb4-2e83-4ed2-b565-ec6829132701.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282333343-7870311b-8290-4d11-a322-6763a5dac9e2.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335565-403fbd1d-e638-4f67-b8d9-6b7e116eaa3a.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335633-9d158303-ad9b-47aa-bdd6-79a4bb986cc8.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335664-31da06f2-ad4c-49cf-bb93-f7917b05b889.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335696-cd737ce1-bc95-4247-a95f-e77ac8f1a1f0.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335720-24bb2d6c-29e7-4f2b-8d80-20d79eb46796.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335785-496ec19b-c7bd-4ea6-b197-cb886b3a0ca1.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335814-864c6dbc-a7f4-4a84-a6e5-1f3ab36ecff0.png" width="250">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/59424748/282335850-34c2d3d9-f7ca-4478-b10e-ffcbbff5c036.png" width="250">
</div>