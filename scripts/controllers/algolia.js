const githubCtrl = require("../controllers/github");
const algoliaSdk = require("../apis/algolia");

const saveConents = async () => {
	const { creators, lectures } = await githubCtrl.getContents();
	const { items: lecutureItems } = lectures;
	const { items: creatorItems } = creators;

	const res1 = await algoliaSdk.saveObjectsToIndex("lectures", lecutureItems);
	const res2 = await algoliaSdk.saveObjectsToIndex("creators", creatorItems);

	console.log(res1);
	console.log(res2);
};

module.exports = {
	saveConents,
};
