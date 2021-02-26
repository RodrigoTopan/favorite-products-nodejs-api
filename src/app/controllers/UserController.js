import UserModel from "../models/User";

import HttpError from "../../utils/HttpError";

class UserController {
    async store(req, res) {
        // Verify if already exists this username
        const userExists = await UserModel.findOne({
            username: req.body.username,
        }).lean();

        if (userExists) {
            throw new HttpError("User already exists", 400);
        }

        const { id, username } = await UserModel.create(req.body);
        return res.json({
            id,
            username,
        });
    }
}

export default new UserController();
