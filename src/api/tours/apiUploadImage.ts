// import { DataStore } from "../../data/data";
import { RequestHandler } from "express";
import { getFileUploader } from "../general/static";
import { APIError, PublicInfo } from "../../model/shared/messages";
import { db } from "../../db/db";

export const apiUploadImage: RequestHandler = (req, res, next) => {
  const tourID = req.params.id;
  const upload = getFileUploader(req.app.get("env"));
  upload(req, res, err => {
    if (err) {
      console.log(err);
      // res.json({ status: "error", message: "File Upload Failed!" });
      next(APIError.errServerError());
    } else {
      const sql =
        "update tours\
                        set img = array_append(img, ${file})\
                        where id = ${id}";
      db.none(sql, { file: req.file.filename, id: tourID }).then(() => {
        res.json(PublicInfo.infoCreated({ uploadedFile: req.file.filename }));
      });
    }
  });
  // }
};
