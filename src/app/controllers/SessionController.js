import jwt from "jsonwebtoken";

import * as Yup from "yup";

import UserModel from "../models/User";

import authConfig from "../../configurations/auth";

class SesssionController {
    async store(req, res) {
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { username, password } = req.body;

        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(400).json({ error: "Password does not match" });
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
            },
            token: jwt.sign({ id }, authConfig.secret, {
                expiresIn: authConfig.expiresIn,
            }),
        });
    }
}

export default new SesssionController();
