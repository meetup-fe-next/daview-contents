const axios = require("axios");
const {
	GITHUB_REPOSITORY_API_URL,
	GITHUB_REPOSITORY_BRANCH,
} = require("../constants");

/**
 * [GET] Github Repository contents API - getContents
 *
 * @description path 하위의 Repository content를 가져오는 API
 * @links https://docs.github.com/en/rest/repos/contents?apiVersion=2022-11-28#get-repository-content
 */
const getRepositoryContents = async (path) => {
	try {
		const response = await axios.get(`${GITHUB_REPOSITORY_API_URL}/${path}`, {
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
