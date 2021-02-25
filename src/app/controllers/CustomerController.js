import * as Yup from "yup";
import CustomerModel from "../models/Customer";

class CustomerController {
    async index(req, res) {
        const schema = Yup.object().shape({
            page: Yup.number().required(),
        });

        if (!(await schema.isValid(req.query))) {
            return res.status(400).json({ error: "Validation fails" });
        }
        // Validate with youch
        const limit = 20;
        const customers = await CustomerModel.find()
            .limit(limit)
            .skip(limit * req.query.page)
            .sort({ createdAt: "desc" })
            .lean();

        return res.json(customers);
    }

    async find(req, res) {
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const customer = await CustomerModel.findById(req.params.id).lean();

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        return res.json(customer);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const customerExists = await CustomerModel.findOne({
            email: req.body.email,
        }).lean();

        if (customerExists) {
            return res
                .status(400)
                .json({ error: "Customer email already exists" });
        }

        const { id, name, email } = await CustomerModel.create(req.body);

        return res.json({ id, name, email });
    }

    async delete(req, res) {
        // Validate with youch
        const schema = Yup.object().shape({
            id: Yup.string().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { id: customerId } = req.params;

        const customer = await CustomerModel.findById(customerId).lean();

        if (!customer) {
            return res.status(404).json({ error: "Customer not found" });
        }

        await CustomerModel.deleteOne({ _id: customerId });

        return res.json({ message: "Customer successfully removed " });
    }
}

export default new CustomerController();
