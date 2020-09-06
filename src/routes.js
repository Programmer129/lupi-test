const express = require("express");
const {validate, Joi} = require('express-validation');
const wikiService = require("./wikiService");

const router = express.Router();

const parseValidation = {
    body: Joi.object({
        url: Joi.string()
            .required(),
        level: Joi
            .number()
            .required(),
        maxTraversedLinks: Joi
            .number()
    }),
};

const searchValidation = {
    body: Joi.object({
        pageId: Joi.number()
            .required(),
        queryString: Joi
            .string()
            .required(),
    }),
};

/**
 * In real world parsing should be background task
 */
router.post("/parse", validate(parseValidation, {}, {}), async (req, res, next) => {
    try {
        const {url, level, maxTraversedLinks} = req.body;

        const result = await wikiService.parsePage(url, level, maxTraversedLinks);

        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post("/search", validate(searchValidation, {}, {}), async (req, res, next) => {
    try {
        const {pageId, queryString} = req.body;

        const result = await wikiService.findPath(pageId, queryString);

        res.status(200).json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;