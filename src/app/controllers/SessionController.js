import sessionService from "@services/SessionService";

class SesssionController {
    async store(req, res) {
        const { username, password } = req.body;
        const loginInformation = await sessionService.authenticate({
            username,
            password,
        });
        return res.json(loginInformation);
    }
}

export default new SesssionController();
