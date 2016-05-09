# Setting up the Project

```
git clone https://github.com/kaw2374/stories_list.git
cd stories_list
npm install
npm start
```

Now open up [http://localhost:3000](http://localhost:3000)

Important points of use:
- `node.js` as server,
- `webpack` as means to compile es6 js,
- `react-router` for front-end navigation,
- `react` for front-end components

Currently, this is a single page site that renders
articles from the New York Times relevant to the New York
region. You can read the page in either English or Boinga,
and more stories can be loaded.


Want to change in the future:
- incorporate flux or redux in implementation
- remove all use of jquery