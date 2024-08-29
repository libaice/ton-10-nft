import { toNano } from '@ton/core';
import { NFTCollection } from '../wrappers/NFTCollection';
import { compile, NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const nFTCollection = provider.open(NFTCollection.createFromConfig({}, await compile('NFTCollection')));

    await nFTCollection.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(nFTCollection.address);

    // run methods on `nFTCollection`
}
