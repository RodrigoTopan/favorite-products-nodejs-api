import CustomerModel from "../models/Customer";

import HttpError from "../../utils/HttpError";

class CustomerController {
    async index(req, res) {
        const limit = 20;
        const customers = await CustomerModel.find()
            .limit(limit)
            .skip(limit * req.query.page)
            .sort({ createdAt: "desc" })
            .lean();

        return res.json(customers);
    }

    async find(req, res) {
        const customer = await CustomerModel.findById(req.params.id).lean();

        if (!customer) {
            throw new HttpError("Customer not found", 404);
        }

        return res.json(customer);
    }

    async store(req, res) {
        const customerExists = await CustomerModel.findOne({
            email: req.body.email,
        }).lean();

        if (customerExists) {
            throw new HttpError("Customer email already exists", 400);
        }

        const { id, name, email } = await CustomerModel.create(req.body);

        return res.json({ id, name, email });
    }

    async update(req, res) {
        const customer = await CustomerModel.findById(req.params.id).lean();

        if (!customer) {
            throw new HttpError("Customer does not exist", 404);
        }

        if (req.body === { name: customer.name, email: customer.email }) {
            throw new HttpError("Customer was not updated", 400);
        }

        const foundCustomer = await CustomerModel.findOne({
            email: req.body.email,
        }).lean();

        if (foundCustomer && foundCustomer.id !== req.params.id) {
            throw new HttpError("Customer email already exists", 400);
        }

        const { id, name, email } = await CustomerModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
            }
        );

        return res.json({ id, name, email });
    }

    async delete(req, res) {
        const { id: customerId } = req.params;

        const customer = await CustomerModel.findById(customerId).lean();

        if (!customer) {
            throw new HttpError("Customer not found", 404);
        }

        await CustomerModel.deleteOne({ _id: customerId });

        return res.json({ message: "Customer successfully removed " });
    }
}

export default new CustomerController();
