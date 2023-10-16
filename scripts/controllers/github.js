const axios = require("axios");

const githubSdk = require("../apis/github");
const {
	replaceDashWithSpace,
	splitFrontmatterAndMarkdown,
} = require("../utils");

const { CONTENTS_PATH, CONTENTS_CATEGORIES } = require("../constants");

/**
 * lecture 별로 github contents data를 가공하여 반환한다.
 */
const getLectures = (data) => {
	const lectures = [];

	for (const { name, category, frontmatter, markdown } of data) {
		const [creatorName, lectureName] = name.split("#");
		lectures.push({
			name: replaceDashWithSpace(lectureName),
			creator: replaceDashWithSpace(creatorName),
			category: replaceDashWithSpace(category),
			frontmatter,
			markdown,
		});
	}

	return lectures;
};

/**
 * creator 별로 github contents data를 가공하여 반환한다.
 */
const getCreators = (data) => {
	const temp = [];

	for (const { name, category, frontmatter } of data) {
		const [creatorName, lectureName] = name.split("#");
		const { platforms } = frontmatter;

		temp.push({
			name: replaceDashWithSpace(creatorName),
			lectureName: replaceDashWithSpace(lectureName),
			category: replaceDashWithSpace(category),
			platforms,
		});
	}

	const reducedData = temp.reduce((acc, curr) => {
		const existingEntry = acc.find((item) => item.name === curr.name);
		if (existingEntry) {
			existingEntry.lectures.push(curr.lectureName);
		} else {
			acc.push({
				name: curr.name,
				lectures: [curr.lectureName],
				category: curr.category,
				platforms: curr.platforms,
			});
		}
		return acc;
	}, []);

	return reducedData;
};

/**
 * github contents data를 가공하여 반환한다.
 */
const getContents = async () => {
	const contentsData = [];

	for (const category of CONTENTS_CATEGORIES) {
		const categoryPath = `${CONTENTS_PATH}/${category}`;
		const contents = await githubSdk.getRepositoryContents(categoryPath);

		for (const { name } of contents) {
			const { download_url: downloadUrl } =
				await githubSdk.getRepositoryContents(
					`${categoryPath}/${encodeURIComponent(name)}/CONTENTS.md`
				);
			const lectureContentsFile = await axios.get(downloadUrl);

			const { frontmatter, markdown } = splitFrontmatterAndMarkdown(
				lectureContentsFile.data
			);
			const { platforms, hashtags, languages, summary, link } = frontmatter;
			contentsData.push({
				name,
				category,
				frontmatter: {
					platforms,
					hashtags,
					languages,
					summary,
					link,
				},
				markdown,
			});
		}
	}
	const creators = getCreators(contentsData);
	const lectures = getLectures(contentsData);

	return {
		creators: { items: creators, total: creators.length },
		lectures: { items: lectures, total: lectures.length },
	};
};

module.exports = {
	getContents,
};
