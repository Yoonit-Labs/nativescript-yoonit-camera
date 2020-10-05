build: node_modules
	rm -f ./src/platforms/android/nativescript_yoonit_camera.aar
	cd src && npm run build

node_modules: ./src/package.json
	rm -rf ./src/node_modules
	cd src && npm i

pack:
	rm -f ./publish/package/nativescript-yoonit-camera-1.0.0.tgz
	cd publish && chmod 777 pack.sh
	cd publish && ./pack.sh
	mv ./publish/package/nativescript-yoonit-camera-1.0.0.tgz ./publish

extract:
	rm -rf ./publish/node_modules
	cd publish && npm i
	cd publish && node extractTGZ.js

development: build pack extract
	cd publish && chmod 777 deploy.development.sh
	cd publish && ./deploy.development.sh
	rm -f ./publish/package/package.json
	rm -f ./publish/nativescript-yoonit-camera-1.0.0.tgz
	rm -rf ./publish/package
	rm -f ./src/platforms/android/nativescript_yoonit_camera.aar
	rm -f ./src/platforms/android/yoonit-camera-debug.aar
	rm -f ./src/platforms/android/yoonit-camera-release.aar

deploy: build pack extract
	cd publish && chmod 777 deploy.sh
	cd publish && ./deploy.sh
	rm -f ./publish/package/package.json
	rm -f ./publish/nativescript-yoonit-camera-1.0.0.tgz
	rm -rf ./publish/package
	rm -f ./src/platforms/android/nativescript_yoonit_camera.aar
	rm -f ./src/platforms/android/yoonit-camera-debug.aar
	rm -f ./src/platforms/android/yoonit-camera-release.aar
