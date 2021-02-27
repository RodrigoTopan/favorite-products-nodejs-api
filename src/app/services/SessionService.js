import jwt from "jsonwebtoken";

import UserModel from "@models/User";

import authConfig from "@configurations/auth";

import HttpError from "@utils/HttpError";

class SessionService {
    async authenticate({ username, password }) {
        const user = await UserModel.findOne({ username });

        if (!user) {
            throw new HttpError("Access denied", 401);
        }

        if (!(await user.checkPassword(password))) {
            throw new HttpError("Access denied", 401);
        }

        const { id } = user;

        return {
            user: {
                id,
                username,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        };
    }
}

export default new SessionService();
