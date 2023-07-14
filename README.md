# Repository
A library made on NodeJS for read private repositorys from Github

# Usage
The usage of the lib is very easy because i created only for read private content and more in any time that i can spend in this lib.

```ts
import { Repository, Loader } from 'repository'

// RepositoryLoader example, i gonna change to simple .then-catch in any time
let GITHUB_ACCESS_TOKEN = "xxxx-xxxx-xxxx-xxxx";
let GITHUB_USERNAME = "neopkr";
let GITHUB_REPOSITORY = "RepositoryLoader";

const repository = new Repository(GITHUB_ACCESS_TOKEN, GITHUB_USERNAME, GITHUB_REPOSITORY);
repository.init(); // Load data from repository

repository.on("initialized", () => {
    repository.RepoURL(); // => string
    repository.License(); // => string
    repository.Owner(); // => string
    // need more functions but i didn't priorize this class.
})

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

There is not other function in the classes because i build it only for read content in private repository so probably later add more functions