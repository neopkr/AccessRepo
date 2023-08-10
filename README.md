![NPM Version](https://img.shields.io/npm/v/accessrepo) 
![Downloads](https://img.shields.io/npm/dm/accessrepo)
![NPM Build](https://img.shields.io/github/actions/workflow/status/neopkr/accessrepo/npm-publish.yml)

# AccessRepo
A library made on NodeJS for read private repositorys from Github. See on [npm](https://www.npmjs.com/package/accessrepo?activeTab=readme)

# Name history:
- repositoryloader
- gitrepository
- @neokeee/gitrepository
- **accessrepo** (Actual)
# Usage
The usage of the lib is very easy because i created only for read private content and more in any time that i can spend in this lib.

```ts
import { Repository, Loader } from 'accessrepo'

let GITHUB_ACCESS_TOKEN = "xxxx-xxxx-xxxx-xxxx";
let GITHUB_USERNAME = "neopkr";
let GITHUB_REPOSITORY = "AccessRepo";

const repository = new Repository(GITHUB_ACCESS_TOKEN, GITHUB_USERNAME, GITHUB_REPOSITORY);
const rl = Loader(GITHUB_ACCESS_TOKEN, GITHUB_USERNAME, GITHUB_REPOSITORY)

const myfunc = async () => {
    await repository.init()
    const lic = await repository.getLicense();
    console.log(lic);
};

// Loader example (1)
const licenseContent = async () => {
    const license = await rl.ReadFile("LICENSE")
    console.log(license.content)
}

myfunc()
licenseContent()

// Loader example (2)
rl.ReadFile(/path/to/content/)
    .then((content) => {
        if (content === null) { return; /* Handle null... */ }
        console.log(content)
        /* content output:
                {
                    "name": ...,
                    "path": ...,
                    "download_url": ...,
                    "html_url": ...,
                    "content": ...,
                    "links": { ... },
                }
        */
    })
```

There is not other function in the classes because i build it only for read content in private repository so probably later add more functions.
[See more on GitHub](https://github.com/neopkr/AccessRepo/)

## Errors
- If you are getting error HTTP Status 403 check the token that are you using or check token permissions.
- If you get another errors: [Create a new issue or check if exist](https://github.com/neopkr/AccessRepo/issues)

## Versions
- [1.0.1](https://github.com/neopkr/AccessRepo/releases/tag/1.0.1) __Unstable__ | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#101)
- [1.0.2](https://github.com/neopkr/AccessRepo/releases/tag/1.0.2) __Unstable__ | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#102)
- [1.0.3](https://github.com/neopkr/AccessRepo/releases/tag/1.0.3) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#103)
- [1.0.5](https://github.com/neopkr/AccessRepo/releases/tag/1.0.5) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#105)
- [1.0.6](https://github.com/neopkr/AccessRepo/releases/tag/1.0.6) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#106)
- [1.0.7](https://github.com/neopkr/AccessRepo/releases/tag/1.0.7) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#107)
- [1.0.8](https://github.com/neopkr/AccessRepo/releases/tag/1.0.8) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#108)
- [1.0.9](https://github.com/neopkr/AccessRepo/releases/tag/1.0.9) __Unstable__ | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#109)
# Changelog
### 1.0.1
First Update, added two new classes:
 - Repository
 - Loader
Repository: has the entire repository settings and data from the users/repo
Loader: Actually only have 1 function: ReadFile(/path/to/file); return the content of the file that you select, file that is on your Github no on your local xd
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
### 1.0.2
- Added yaml for npm publish with github, added some test.
- Change name to 'accessrepo'
- Bug: ```Module 'accessrepo' not found``` for typescript.
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
### 1.0.3
- Fixed [npm-publish.yml](https://github.com/neopkr/AccessRepo/blob/main/.github/workflows/npm-publish.yml) for login with token and clear cache with --force
- Fixed bug with import in typescript ``Fixed types/index.d.ts to dist/index.d.ts``
- Bug: ``Repository returns undefined``, change event.on to then-catch.
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
### 1.0.5
- Version 1.0.4 don't exist by problems with npm, [check workflow action error](https://github.com/neopkr/AccessRepo/actions/runs/5563240856)
- Fixed some imports on javascript.
- class Repository:
    - ``RepoURL`` change name to: ``getURL`` and now returns: `` { url: ... } ``
    - ``License`` change name to: ``getLicense``
    - ``Owner`` change name to: ``getOwner``
- Fixed: ```class Repository returns undefined``` should be fixed now at least inside of a async functions. _Check [repository.spec.ts](https://github.com/neopkr/AccessRepo/blob/main/tests/repository.spec.ts) for more information.
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
### 1.0.6
- Added new functions to Repository:
    - ``getID()`` - Array (should be Number)
    - ``getName()`` - Array
    - ``getDescription()`` - Array
    - ``getLanguage()`` - Array
    - ``getVisibility()`` - Array
    - ``getSuscribers()`` - Number
    - ``getForks()`` - Number
    - ``getWatchers()`` - Number
    - ``getTopics()`` - Array
    - ``isPrivate()`` - Boolean
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
- Fixed some functions summarys and added new ones
- For get file content use Loader.ReadFile() => Array.
### 1.0.7
- Added ```getWorflow(workflow: string)``` to Loader class. This returns the last run of the workflow action: sucess, failed, pending or not found.
- Example:
```ts
const func = async () => {
    const workflowStatus = await Loader.getWorkflow("npm-publish.yml")
    if (workflowStatus === "not_found") {
        console.log("Error: Workflow not found.");
        return;
    }
    console.log(workflowStatus) // success, failed, pending
    if (workflowStatus === "success") {
        return "Build passing";
    }
}

Loader.getWorkflow("npm-publish.yml").then((action) => console.log(action)) // success, failed, pending, not_found
```
- Rename function ```ReadFile()``` to ```readFile()``` for keep consistency.
- New function on Loader class: ```getLastWorkflow()```, get last workflow action used on repository.
### 1.0.8
- New Release, new functions.
- New functions on Repository class: ```getPublishVersions(), getPreReleaseVersions(), getAllVersions()```, all returns an array with the list of public versions on github.
- Maybe on next version v1.1.0 Loader class would be deleted and added all functions to Repository class.
- Error menssages translated it to english.
- If you having HTTP Status o errors see: [Errors](https://github.com/neopkr/AccessRepo/blob/main/README.md#Errors) section.
* _See [RepositoryLoader.d.ts](https://github.com/neopkr/AccessRepo/blob/main/dist/RepositoryLoader.d.ts) for more info with properties_
### 1.0.9
- Build not passing: ```readFileFromTree()``` always return null
- Very light update, added one fundamental function on Loader class
- New function: ```readFileFromTree(tree: string, filePath: string)``` read file from selected tags or branches, usage example:
```ts
Loader.readFileFromTree("1.0.8", 'src/RepositoryLoader.ts').then((content) => {
    if (content === null) { return; }
    console.log(content);
    /* content output:
                {
                    "name": ...,
                    "path": ...,
                    "download_url": ...,
                    "html_url": ...,
                    "content": ...,
                    "links": { ... },
                }
        */
})
```
- Changed workflow, deleted npm adduser.
