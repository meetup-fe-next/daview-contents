const axios = require("axios");
const {
	ALGOLIA_WRITE_HOST,
	ALGOLIA_APP_ID,
	ALGOLIA_ADMIN_API_KEY,
} = require("../constants");

const ALGOLIA_HEADERS = {
	"Content-Type": "application/json",
	"X-Algolia-Application-Id": ALGOLIA_APP_ID,
};

/**
 * [POST] Algolia Search API - saveObjectsToIndex
 *
 * @description 특정 index에 object 여러개 저장
 * @links https://www.algolia.com/doc/rest-api/search/#search-index-post
 */
const saveObjectsToIndex = async (indexName, objects) => {
	const requests = objects.map((item) => ({
		action: "addObject",
		body: item,
	}));

	const { data } = await axios.post(
		`${ALGOLIA_WRITE_HOST}/1/indexes/${indexName}/batch`,
		{
			requests,
		},
		{
			headers: {
				...ALGOLIA_HEADERS,
				"X-Algolia-API-Key": ALGOLIA_ADMIN_API_KEY,
			},
		}
	);

	return data;
};

/**
 * [POST] Algolia Search API - setSettingsToIndex
 *
 * @description 특정 index의 setting을 변경
 * @links https://www.algolia.com/doc/rest-api/search/#set-settings
 */
const setSettingsToIndex = async (indexName, settings) => {
	const { data } = await axios.put(
		`${ALGOLIA_WRITE_HOST}/1/indexes/${indexName}/settings`,
		{
			settings,
		},
		{
			headers: {
				...ALGOLIA_HEADERS,
				"X-Algolia-API-Key": ALGOLIA_ADMIN_API_KEY,
				"Content-Type": "application/json",
			},
		}
	);

	return data;
};

const deleteObjectsFromIndex = async (indexName) => {
	const { data } = await axios.post(
		`${ALGOLIA_WRITE_HOST}/1/indexes/${indexName}/clear`,
		{},
		{
			headers: {
				...ALGOLIA_HEADERS,
				"X-Algolia-API-Key": ALGOLIA_ADMIN_API_KEY,
			},
		}
	);

	return data;
};

module.exports = {
	saveObjectsToIndex,
	setSettingsToIndex,
	deleteObjectsFromIndex,
};
