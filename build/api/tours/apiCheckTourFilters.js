"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tourFilters_1 = require("../../model/shared/tourFilters");
const messages_1 = require("../../model/shared/messages");
exports.apiCheckTourFilters = (req, res, next) => {
    const filters = new tourFilters_1.TourFilters(req.query);
    // console.log(filters);
    for (let filter of Object.getOwnPropertyNames(req.query)) {
        if (!filters.hasOwnProperty(filter)) {
            // next(new APIError("Query String Error", "No such filter.", 400));
            next(messages_1.APIError.errInvalidQueryParameter({ filter: filter }));
        }
    }
    next();
};
