const githubSdk = require("../libs/github");
const { replaceDashWithSpace } = require("../utils");

const { CATEGORY_CONTENTS_PATH } = require("../constants");

const getCreatorsFromGithub = async () => {
	const creators = [];

	for (const categoryPath of CATEGORY_CONTENTS_PATH) {
		const contents = await githubSdk.getContents(categoryPath);

		for (const { name: creatorName, path: lecturesPath } of contents) {
			/**
			 * category
			 *
			 * @description lecturesPath에서 category를 추출한다.
			 * @example lecturesPath = 'contents/frontend/드림코딩-엘리' -> category = 'frontend'
			 */
			const category = lecturesPath.split("/")[1];
			const lectures = await githubSdk.getContents(lecturesPath);
			const creator = {
				name: replaceDashWithSpace(creatorName),
				lectures,
				category,
			};

			creators.push(creator);
		}
	}

	console.log({ items: creators, total: creators.length });
	// return { items: creators, total: creators.length };
};

const creatorCtrl = {
	getCreatorsFromGithub,
};

module.exports = creatorCtrl;
