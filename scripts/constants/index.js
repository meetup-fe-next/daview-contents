/**
 * Contents 관련
 */

const CONTENTS_PATH = "contents";
const CATEGORY_CONTENTS_PATH = [
	`${CONTENTS_PATH}/algorithm`,
	`${CONTENTS_PATH}/front-end`,
	`${CONTENTS_PATH}/back-end`,
];

/**
 * Github API 관련
 */
const GITHUB_USER_NAME = "meetup-fe-next";
const GITHUB_REPOSITORY_NAME = "daview-contents";
const GITHUB_REPOSITORY_API_URL = `https://api.github.com/repos/${GITHUB_USER_NAME}/${GITHUB_REPOSITORY_NAME}/contents`;
const GITHUB_REPOSITORY_BRANCH = "develop";

module.exports = {
	CONTENTS_PATH,
	CATEGORY_CONTENTS_PATH,

	GITHUB_USER_NAME,
	GITHUB_REPOSITORY_NAME,
	GITHUB_REPOSITORY_API_URL,
	GITHUB_REPOSITORY_BRANCH,
};
