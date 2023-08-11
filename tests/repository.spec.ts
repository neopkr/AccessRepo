import { expect } from 'chai';
import { Repository, Loader } from '../src/RepositoryLoader';
import dotenv from "dotenv"
dotenv.config(); // Use local

describe('Repository', () => {
    const authKey = process.env.AUTH_KEY ?? "";
    const author = "neopkr";
    const repository = "testing"; // using private repository now for test | If you're running test please change it to your private repository.

    let repo: Repository;

    beforeEach(async () => {
        repo = new Repository(authKey, author, repository); // Init now called on the constructor
        await repo.init(); // Wait for initialization to complete
    });

    it("should retrieve the html url", async () => {
        try {
            const url = await repo.getURL(); // Wait for the promise to resolve
            expect(url).to.have.property("url");
        } catch (error) {
            console.error("Error occurred while retrieving url information:", error);
            throw error;
        }
    });

    it("Retrieve boolean of repository state (public/private)", async () => {
        try {
            const isPriv = await repo.isPrivate(); // Wait for the promise to resolve
            expect(isPriv).to.be.true // Previous update this was false for pass the test, because AccessRepo is public
        } catch (error) {
            console.error("Error occurred while retrieving repository information:", error);
            throw error;
        }
    });


    it('should retrieve the license information', async () => {
        try {
            const license = await repo.getLicense(); // Wait for the promise to resolve
            expect(license).to.have.property('license');
        } catch (error) {
            // Manejar el error
            console.error("Error occurred while retrieving license information:", error);
            throw error;
        }
    });

    it('should retrieve the owner information', async () => {
        try {
            const owner = await repo.getOwner(); // Wait for the promise to resolve
            expect(owner).to.have.property('owner');
        } catch (error) {
            // Manejar el error
            console.error("Error occurred while retrieving owner information:", error);
            throw error;
        }
    });

    it("should retrieve published releases versions", async () => {
        const releases = await repo.getPublishedVersions();
        expect(releases).to.be.an("array");
    })

    it("should retrieve published pre-releases versions", async () => {
        const preReleases = await repo.getPreReleaseVersions();
        expect(preReleases).to.be.an("array");
    })

    it("should retrieve published all versions", async () => {
        const allReleases = await repo.getAllVersions();
        expect(allReleases).to.be.an("array");
    })
});


describe('Loader', () => {
    const authKey = process.env.AUTH_KEY ?? ""; // env for action secret
    const author = "neopkr";
    const repository = "AccessRepo"; // Test passed on private repositories and public

    let loader: Loader;

    beforeEach(() => {
        loader = new Loader(authKey, author, repository);
    });

    it('should read a file successfully', async () => {
        const pathFile = 'src/RepositoryLoader.ts';
        const fileData = await loader.readFile(pathFile); // Function changed v1.0.7
        expect(fileData).to.not.be.null;
        expect(fileData).to.have.property('name');
        expect(fileData).to.have.property('path');
        expect(fileData).to.have.property('download_url');
        expect(fileData).to.have.property('html_url');
        expect(fileData).to.have.property('content');
        expect(fileData).to.have.property('links');
    });

    it('should read a file from tree successfully', async () => {
        const pathFile = 'src/RepositoryLoader.ts'; // In this function please don't add / at the beginning of the path.
        const fileData = await loader.readFileFromTree("1.0.6", pathFile);
        expect(fileData).to.not.be.null;
        expect(fileData).to.have.property('name');
        expect(fileData).to.have.property('path');
        expect(fileData).to.have.property('content');
        expect(fileData).to.have.property('url');
    });

    it('should retrieve workflow last run status (success, failed, pending, not_found)', async () => { // Success
        const workflowStatus = await loader.getWorkflow("npm-publish.yml")
        expect(workflowStatus).to.not.be.null;
    })

    it("should retrieve last workflow run of the repository", async () => {
        const lastWorkflowStatus = await loader.getLastWorkflow();
        expect(lastWorkflowStatus).to.not.be.null;
    })

    // took 1000ms
});