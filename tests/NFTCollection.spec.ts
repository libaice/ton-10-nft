import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { NFTCollection } from '../wrappers/NFTCollection';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('NFTCollection', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('NFTCollection');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let nFTCollection: SandboxContract<NFTCollection>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        nFTCollection = blockchain.openContract(NFTCollection.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await nFTCollection.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: nFTCollection.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and nFTCollection are ready to use
    });
});
