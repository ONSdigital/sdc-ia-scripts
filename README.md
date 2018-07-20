# SDC IA Scripts

A collection of scripts for getting useful information about ONSDigital GitHub repositories.

## Getting started

### Prerequisites

1.  [Node.js](https://nodejs.org/)
2.  [Yarn](https://yarnpkg.com/)
3.  A Github account

### Installing

After cloning the repository, run `yarn`. This will install all necessary dependencies.

### Running a script

There are two ways to run a script:

1.  Using node.js
2.  Running the executable binary

> Running the executable binary **does not** require you to have node.js installed, but building the executable does.

Both methods require you to supply a GitHub Personal Access Token. You can create one by [following this guide](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/). When selecting scopes for your token, you must select the following options:

```
user
public_repo
repo
repo_deployment
repo:status
read:repo_hook
read:org
read:public_key
read:gpg_key
```

#### Using node.js

1.  Navigate to `src/scripts` from the root directory in a terminal window
2.  Run `GITHUB_API_KEY=key node nameOFScript`

#### Running the executable binary

The executable binary is not available on GitHub; it will either be supplied to you, or you will need to build you own.

To build your own, navigate to the root directory of the repository and run `yarn build`. This will create three binaries: one for Windows, MacOS, and Linux. They will be stored in `dist`.

After the binary is created, you can run it by:

**MacOS**

1.  Navigate to `dist` from the root directory in a terminal window
2.  Run `chmod +x ./NameOfBinary`
3.  Run `GITHUB_API_KEY=key ./NameOfBinary`

**Windows, Linux**

1.  Navigate to `dist` from the root directory in a terminal window
2.  Run `GITHUB_API_KEY=key nameOfBinary.exe`

## Contributing

### Adding a script

When adding a new script to the library, you should build it within the `src/scripts` folder; the name of the script should be obvious about its purpose.

You must import the `githubApi` module from the `src/github` directory. This will allow you to make a validated call to the GitHub GraphQL API.

`githubApi` is a function that takes two arguments:

1.  GitHub Personal Access Token
2.  Query

It returns a JSON string, which you should format with your own callback function before outputting it to the console. For example:

```
githubApi(process.env.GITHUB_API_KEY, query).then(data => {
  console.log(callback(data));
});
```

In short, your script must...

- ... import `githubApi` from `src/github` to make calls to the GitHub GraphQL API,
- ... contain a query to send to the GitHub GraphQL API,
- ... contain a callback function to format the JSON data returned from the api,
- ... take in the users Personal Access Token through an environment variable.

### Testing

Currently, the library only supports one test: linting JavaScript. You can run this test by executing the `yarn test` command.
