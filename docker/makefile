# IMAGE_NAME = hub.docker.com/r/ueber/svelte-environment
IMAGE_NAME = ueber/svelte-environment
TAG = 0.0.1

.PHONY: build
build:
	docker buildx build --platform linux/amd64 --tag ${IMAGE_NAME}:${TAG} .

.PHONY: build-and-push
build-and-push:
	docker buildx build --push --platform linux/amd64 --tag ${IMAGE_NAME}:${TAG} .
