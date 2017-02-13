# Flip n Match Memory Game #

This application was built in React, in conjunction with a [Rails REST API](https://github.com/digivava/scores_api) for managing scores.


## How To Run
1. The Scores API needs to be running first. Clone the repo from [here](https://github.com/digivava/scores_api) and follow the directions in that project's README before continuing.

2. Once you have the Scores API running, clone this repo.

3. `$ cd valerie_conklin_project; cd flipnmatch`

4. `$ npm install`

5. `$ npm start` When prompted to use a different port because one is already using 3000, say yes.

6. In a different terminal window, `open http://localhost:3001` or open the page in your browser.


If you want to do an optimized production build, follow these steps:
- `$ npm run build`

- `$ npm install -g pushstate-server` (If you don't already have npm, download it [here](https://nodejs.org/en/).)

- `$ pushstate-server build`

- `$ open http://localhost:9000`

And play to your heart's content!
