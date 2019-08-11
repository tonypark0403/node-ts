"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const data_1 = require("../../data/data");
const static_1 = require("../general/static");
const messages_1 = require("../../model/shared/messages");
exports.apiUploadImage = (req, res, next) => {
    const tourID = req.params.id;
    const tourIndex = data_1.DataStore.tours.findIndex((item) => item.id == tourID);
    if (tourIndex == -1) {
        // res.json({ status: "error", message: "Tour not found" });
        next(messages_1.APIError.errNotFound());
    }
    else {
        const upload = static_1.getFileUploader(req.app.get("env"));
        upload(req, res, err => {
            if (err) {
                console.log(err);
                // res.json({ status: "error", message: "File Upload Failed!" });
                next(messages_1.APIError.errServerError());
            }
            else {
                data_1.DataStore.tours[tourIndex].img.push(req.file.filename);
                // res.json({ status: "success", message: "File Uploaded!" });
                res.json(messages_1.PublicInfo.infoCreated({ uploadedFile: req.file.filename }));
            }
        });
    }
};
