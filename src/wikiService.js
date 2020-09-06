const posts = require("./posts");
const parse = require("./parser");

async function parsePage(url, level, maxTraversedLinks) {
    const result = await parse(url, level, maxTraversedLinks);

    for (const item of result) {
        await posts.save(item.url, item.title, item.parentUrl, item.level);
    }

    return {
        itemsParsed: result.length
    };
}

async function findPath(pageId, queryString) {
    const page = await posts.findById(pageId);

    if (page) {
        const path = [];
        const rootUrl = page.url;
        const childPages = await posts.findChildPages(rootUrl);
        let parent = childPages.find(p => p.title.includes(queryString));

        if (!parent) {
            console.info(`No path from url: ${rootUrl}`);
            return [];
        }

        while (parent.url !== rootUrl) {
            path.push(parent.title);
            parent = childPages.find(p => p.url === parent.parentUrl);
        }
        path.push(page.title);

        return path.reverse();
    } else {
        throw Error(`Page not found: ${pageId}`);
    }
}

module.exports = {
    parsePage,
    findPath
}