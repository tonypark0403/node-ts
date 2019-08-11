"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = require("../../../model/shared/messages");
const dateFormat = new RegExp("(\\d{4})-(\\d{1,2})-(\\d{1,2})");
exports.dateParam = (req, res, next, value, name) => {
    const parsedComponents = dateFormat.exec(value);
    if (parsedComponents) {
        // console.log(parsedComponents);
        const [_, year, month, day] = parsedComponents.map(item => {
            console.log(parseInt(item));
            return parseInt(item);
        });
        const date = new Date(year, month - 1, day);
        req.params[name] = date;
        next();
    }
    else {
        next(new messages_1.APIError("Parse Error", "Date could not be parsed. Date Format: YYYY-MM-DD.", 400));
    }
};
