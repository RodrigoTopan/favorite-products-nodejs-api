import Youch from "youch";

export default async (err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        const { error } = await new Youch(err, req).toJSON();
        return res.status(error.statusCode).json({ error: error.message });
    }

    if (!err.statusCode || err.statusCode === 500)
        res.status(500).json({ error: "Internal Server Error" });

    return res.status(err.statusCode).json({ error: err.message });
};
