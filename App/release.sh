
rm app.apks

java -jar bundletool-all.jar build-apks --bundle=android/app/build/outputs/bundle/release/app.aab --output=app.apks --ks=my-upload-key.keystore --ks-key-alias=my-key-alias --ks-pass=pass:test1234

java -jar bundletool-all.jar install-apks --adb=/usr/lib/android-sdk/platform-tools/adb --apks=app.apks
