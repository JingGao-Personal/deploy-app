# deploy-app

This is to retend deployments in different environment.

## How to run it

Make sure you have a node v14+ installed, if not please follow [this] (https://nodejs.dev/learn/how-to-install-nodejs) for the steps.

Then after download the project, go into the directory by any terminal to run:

### `npm install`

Then:

### `npm start`

Check the console log the format will be: "'Release-1' kept because it was the most recently deployed to 'environment-1'".

Additionaly, run:

### `npm test`

For testing

## For Input Files

This project can consume huge dataset, as long as put the Deployments.json and Releases.json into data_files folder. Remember the format for each object should be correct.
