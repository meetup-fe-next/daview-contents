const { load: parseYaml } = require("js-yaml");

const replaceDashWithSpace = (str) => {
	return str.replace(/-/g, " ");
};

const parseFrontmatter = (frontmatter) => {
	try {
		const parsedFrontmatter = parseYaml(frontmatter);
		return parsedFrontmatter;
	} catch (error) {
		console.error("Error parsing Frontmatter:", error);
		return {};
	}
};

/**
 * splitFrontmatterAndMarkdown
 *
 * @description frontmatter와 markdown을 분리한다.
 */
const splitFrontmatterAndMarkdown = (mdContent) => {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
	const match = mdContent.match(frontmatterRegex);

	if (match) {
		const frontmatter = match[1].trim();
		const markdown = mdContent.replace(frontmatterRegex, "").trim();
		const parsedFrontmatter = parseFrontmatter(frontmatter);

		return {
			frontmatter: parsedFrontmatter,
			markdown,
		};
	}

	// Frontmatter가 없는 경우
	return {
		frontmatter: {},
		markdown: mdContent.trim(),
	};
};

module.exports = {
	replaceDashWithSpace,
	splitFrontmatterAndMarkdown,
};
