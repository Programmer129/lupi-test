`use-strict`
const https = require("https");
const Parser = require("node-html-parser");

const domain = "https://en.wikipedia.org";

const valid = (href) => {
    return href.startsWith("/wiki");
};

const isFound = (link, links) => {
    return links.includes(link);
}

async function parse(url, level, maxLinks = 100) {
    const result = [];
    let links = [{
        url: url,
        parentUrl: null,
        lvl: 0
    }];
    while (links.length > 0) {
        const lvl = links[0].lvl;
        const url = links[0].url
        const parentUrl = links[0].parentUrl;
        if (lvl > level) {
            links.shift();
            continue;
        }
        const res = await parsePage(url);
        const exploredLinks = res.links;
        if (res.title) {
            result.push({
                url: url,
                parentUrl,
                title: res.title,
                level: lvl
            });
        }

        links.shift();
        if (exploredLinks) {
            for (let i = 0; i < exploredLinks.length; i++) {
                const link = exploredLinks[i];
                if (!isFound(link, result.map(item => item.url))) {
                    links.push({
                        url: link,
                        parentUrl: url,
                        lvl: lvl + 1
                    });
                }
                if (i === maxLinks) {
                    break;
                }
            }
        }
    }

    return result;
}

async function parsePage(url) {
    return new Promise((resolve, reject) => {
        https.get(url, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                try {
                    const body = Buffer.concat(chunks);
                    const root = Parser.parse(body.toString());
                    const title = root.querySelector("title");
                    const links = root.querySelectorAll("a");
                    const res = [];
                    for (const link of links) {
                        const href = link.getAttribute("href");
                        if (href && valid(href)) {
                            res.push(`${domain}${href}`);
                        }
                    }

                    resolve({
                        links: res,
                        title: title ? title.rawText : null
                    });
                } catch (e) {
                    console.error(e);
                    reject(err);
                }
            });
        });
    });
}

module.exports = parse;