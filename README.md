# Legacy React Component

This repository includes a simple (Profile)[./src/profile.jsx] React component that renders
a centered profile component on a page. It utilizes the following libraries:

* React 17
* Redux
* CSS Modules
* Webpack (4) + webpack-dev-server
* Babel 7

After installing the npm dependencies, you can run this project with: `npm start`
Then, browse to: [http://localhost:8081](http://localhost:8081)

This is a class-based component using vanilla Javascript w/prop-types. It was written
on a much older version of React and still uses class lifecycle methods. Over the years, updates
have been made to keep it working, such as migrating to UNSAFE methods.

We'd like to make the following migrations to this component to modernize it:

1. Remove any extraneous dependencies in favor of modern Javascript features.

2. Convert to Typescript as this is maintained by a large team that can benefit from static typing protections.

3. Migrate from class based to functional components leveraging hooks.

Bonus items:

1. Modernize and update the build tooling for leaner/quicker build times.

2. Introduce tests.
