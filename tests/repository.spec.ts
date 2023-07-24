import { expect } from 'chai';
import { Repository, Loader } from '../src/RepositoryLoader';

describe('Repository', () => {
    const authKey = ""; // access token
    const author = "neopkr";
    const repository = "AccessRepo";

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
            expect(isPriv).to.be.false
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
});


describe('Loader', () => {
    const authKey = "" // access token
    const author = "neopkr";
    const repository = "AccessRepo";

    let loader: Loader;

    beforeEach(() => {
        loader = new Loader(authKey, author, repository);
    });

    it('should read a file successfully', async () => {
        const pathFile = '/README.md';
        const fileData = await loader.ReadFile(pathFile);
        expect(fileData).to.not.be.null;
        expect(fileData).to.have.property('name');
        expect(fileData).to.have.property('path');
        expect(fileData).to.have.property('download_url');
        expect(fileData).to.have.property('html_url');
        expect(fileData).to.have.property('content');
        expect(fileData).to.have.property('links');
    });
});