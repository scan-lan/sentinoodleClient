build:
	gcloud builds submit --tag gcr.io/sentinoodle/sentinoodle-image

deploy:
	gcloud run deploy sentinoodle-front-end --image gcr.io/sentinoodle/sentinoodle-image --platform managed --allow-unauthenticated

build-and-deploy: build deploy
	echo "You did that!!!"
