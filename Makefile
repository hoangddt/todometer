run-dev:
	yarn run electron-dev

pre-build:
	yarn postinstall
	yarn pre-electron-pack

build-macos:
	electron-builder build --dir --mac
