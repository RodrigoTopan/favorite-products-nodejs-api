import * as Yup from "yup";

import UserModel from "../models/User";

class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            username: Yup.string().required(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        // Verify if already exists this username
        const userExists = await UserModel.findOne({
            username: req.body.username,
        }).lean();

        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        const { id, username } = await UserModel.create(req.body);
        return res.json({
            id,
            username,
        });
    }
}

export default new UserController();
