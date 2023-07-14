import { expect } from 'chai';
import { Repository, Loader } from '../src/RepositoryLoader';

describe('Repository', () => {
    const authKey = "" // access token
    const author = "neopkr";
    const repository = "RepositoryLoader";

    let repo: Repository;

    beforeEach(() => {
        repo = new Repository(authKey, author, repository);
    });

    it('should initialize successfully', async () => {
        try {
            await repo.init();
            expect(repo.RepoURL()).to.not.equal('Data cannot be loaded: undefined');
        } catch (error) {
            // Manejar el error
            console.error("Error occurred during initialization:", error);
            throw error;
        }
    });

    it('should retrieve the license information', async () => {
        try {
            await repo.init();
            const license = repo.License();
            expect(license).to.have.property('license');
        } catch (error) {
            // Manejar el error
            console.error("Error occurred while retrieving license information:", error);
            throw error;
        }
    });

    it('should retrieve the owner information', async () => {
        try {
            await repo.init();
            const owner = repo.Owner();
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
    const repository = "RepositoryLoader";

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