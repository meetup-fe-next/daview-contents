const axios = require("axios");
const {
	GITHUB_REPOSITORY_API_URL,
	GITHUB_REPOSITORY_BRANCH,
	GITHUB_TOKEN,
} = require("../constants");

/**
 * [GET] Github Repository contents API - getContents
 *
 * @description path 하위의 Repository content를 가져오는 API
 * @links https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
 */
const getRepositoryContents = async (path) => {
	console.log("GET GITHUB CONTENTS...", new Date().getTime());

	try {
		const response = await axios.get(`${GITHUB_REPOSITORY_API_URL}/${path}`, {
			headers: {
				Authorization: `token ${GITHUB_TOKEN}`,
			},
			params: { ref: GITHUB_REPOSITORY_BRANCH },
		});

		return response.data;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getRepositoryContents,
};
