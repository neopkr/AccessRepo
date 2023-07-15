# AccessRepo
A library made on NodeJS for read private repositorys from Github. See on [npm](https://www.npmjs.com/package/accessrepo)

# Name history:
- repositoryloader
- gitrepository
- @neokeee/gitrepository
- **accessrepo** (Actual)
# Usage
The usage of the lib is very easy because i created only for read private content and more in any time that i can spend in this lib.

```ts
import { Repository, Loader } from 'accessrepo'

// RepositoryLoader example, i gonna change to simple .then-catch in any time
let GITHUB_ACCESS_TOKEN = "xxxx-xxxx-xxxx-xxxx";
let GITHUB_USERNAME = "neopkr";
let GITHUB_REPOSITORY = "RepositoryLoader";

const repository = new Repository(GITHUB_ACCESS_TOKEN, GITHUB_USERNAME, GITHUB_REPOSITORY);
repository.init(); // Load data from repository

const license = repository.License();
const URL = repository.RepoURL();
const owner = repository.Owner();

// Loader example
const rl = Loader(GITHUB_ACCESS_TOKEN, GITHUB_USERNAME, GITHUB_REPOSITORY)
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

## Versions
- [1.0.1](https://github.com/neopkr/AccessRepo/releases/tag/1.0.1) __Unstable__ | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#101)
- [1.0.2](https://github.com/neopkr/AccessRepo/releases/tag/1.0.2) __Unstable__ | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#102)
- [1.0.3](https://github.com/neopkr/AccessRepo/releases/tag/1.0.3) __Stable__   | [Changelog](https://github.com/neopkr/AccessRepo/blob/main/README.md#103)

# Changelog
### 1.0.1
First Update, added two new classes:
 - Repository
 - Loader
Repository: has the entire repository settings and data from the users/repo
Loader: Actually only have 1 function: ReadFile(/path/to/file); return the content of the file that you select, file that is on your Github no on your local xd
### 1.0.2
- Added yaml for npm publish with github, added some test.
- Change name to 'accessrepo'
- Bug: ```Module 'accessrepo' not found``` for typescript.
### 1.0.3
- Fixed [npm-publish.yml](https://github.com/neopkr/AccessRepo/blob/main/.github/workflows/npm-publish.yml) for login with token and clear cache with --force
- Fixed bug with import in typescript ``Fixed types/index.d.ts to dist/index.d.ts``
- Bug: ``Repository returns undefined``
