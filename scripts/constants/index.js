require("dotenv").config();

/**
 * Contents 관련
 */

const CONTENTS_PATH = "contents";
const CONTENTS_CATEGORIES = [
	"algorithm",
	"architecture",
	// "database",
	"front-end",
	"back-end",
];

/**
 * Github API 관련
 */
const GITHUB_USER_NAME = "meetup-fe-next";
const GITHUB_REPOSITORY_NAME = "daview-contents";
const GITHUB_REPOSITORY_API_URL = `https://api.github.com/repos/${GITHUB_USER_NAME}/${GITHUB_REPOSITORY_NAME}/contents`;
const GITHUB_REPOSITORY_BRANCH = "main";
const GIT_HUB_TOKEN = process.env.GIT_HUB_TOKEN;

/**
 * Algolia
 */
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_ADMIN_API_KEY = process.env.ALGOLIA_ADMIN_API_KEY;
const ALGOLIA_READ_HOST = `https://${ALGOLIA_APP_ID}-dsn.algolia.net`;
const ALGOLIA_WRITE_HOST = `https://${ALGOLIA_APP_ID}.algolia.net`;

module.exports = {
	CONTENTS_PATH,
	CONTENTS_CATEGORIES,

	GITHUB_USER_NAME,
	GITHUB_REPOSITORY_NAME,
	GITHUB_REPOSITORY_API_URL,
	GITHUB_REPOSITORY_BRANCH,
	GIT_HUB_TOKEN,

	ALGOLIA_APP_ID,
	ALGOLIA_API_KEY,
	ALGOLIA_ADMIN_API_KEY,
	ALGOLIA_READ_HOST,
	ALGOLIA_WRITE_HOST,
};
