const pool = require('./db');

const TRAVERSAL = `
WITH RECURSIVE CTE AS (
    SELECT id, url, title, parentUrl, level
    FROM wiki_posts
         WHERE url = (?)
UNION ALL
SELECT t.id, t.url, t.title, t.parentUrl, t.level
FROM wiki_posts t INNER JOIN CTE c ON t.parentUrl = c.url
    )
SELECT * FROM CTE
ORDER BY level
`;

const BY_ID = "SELECT * FROM wiki_posts WHERE id = (?)";

const INSERT = "INSERT into wiki_posts (url, title, parentUrl, level) VALUES (?, ?, ?, ?)";

async function findById(id) {
    const result = await pool.query(BY_ID, [id]);

    return result[0][0];
}

async function findChildPages(url) {
    const result = await pool.query(TRAVERSAL, [url]);

    return result[0];
}

async function save(url, title, parentUrl, level) {
    return new Promise((resolve, reject) => {
        const result = pool.execute(INSERT, [url, title, parentUrl, level]);
        if (result) {
            resolve(result);
        }

        reject(false);
    });
}

module.exports = {
    findById,
    findChildPages,
    save
}