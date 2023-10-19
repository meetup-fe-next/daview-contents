const algoliaSdk = require("../libs/algoliaSdk");

const syncContents = async (algoliaIndex, contents) => {
	await algoliaSdk.deleteObjectsFromIndex(algoliaIndex);

	const res = await algoliaSdk.saveObjectsToIndex(algoliaIndex, contents);

	return res;
};

module.exports = {
	syncContents,
};
