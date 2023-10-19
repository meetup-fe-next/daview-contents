const algoliaCtrl = require("./controllers/algolia");
const githubCtrl = require("./controllers/github");
const algoliaSdk = require("./libs/algoliaSdk");

const main = async () => {
	try {
		const { creators, lectures } = await githubCtrl.getContents();

		const { items: creatorItems } = creators;
		const { items: lecutureItems } = lectures;

		const { objectIDs: syncCreators } = await algoliaCtrl.syncContents(
			"creators",
			creatorItems
		);
		const { objectIDs: syncLectures } = await algoliaCtrl.syncContents(
			"lectures",
			lecutureItems
		);

		console.log("====================");
		console.log("SYNC COMPLETED !!!");
		console.log("CREATOR COUNT : ", syncCreators.length);
		console.log("LECTURE COUNT : ", syncLectures.length);
		console.log("====================");
	} catch (e) {
		console.log(e);
	}
};
main();
