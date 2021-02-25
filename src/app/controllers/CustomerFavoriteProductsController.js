import * as Yup from "yup";

import CustomerModel from "../models/Customer";
import CustomerFavoriteProductsService from "../services/CustomerFavoriteProductsService";

class CustomerFavoriteProductController {
    async store(req, res) {
        // Validate with youch
        const schema = Yup.object().shape({
            customerId: Yup.string().required(),
            productId: Yup.string().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { customerId, productId } = req.params;
        const customerExists = await CustomerModel.findById(customerId).lean();

        if (!customerExists) {
            return res.status(400).json({ error: "Customer does not exist" });
        }

        const addedFavoriteProduct = await CustomerFavoriteProductsService.add({
            customerId,
            productId,
        });

        if (!addedFavoriteProduct) {
            return res.status(500).json({
                error:
                    "Ocurred an error to add this product to favorites products list",
            });
        }

        return res.status(200).json(addedFavoriteProduct);
    }

    async delete(req, res) {
        // Validate with youch
        const schema = Yup.object().shape({
            customerId: Yup.string().required(),
            productId: Yup.string().required(),
        });

        if (!(await schema.isValid(req.params))) {
            return res.status(400).json({ error: "Validation fails" });
        }

        const { customerId, productId } = req.params;
        const customerExists = await CustomerModel.findById(customerId).lean();

        if (!customerExists) {
            return res.status(400).json({ error: "Customer does not exist" });
        }

        const removedFavoriteProduct = await CustomerFavoriteProductsService.remove(
            {
                customerId,
                productId,
            },
        );

        if (!removedFavoriteProduct) {
            return res.status(500).json({
                error:
                    "Ocurred an error to add this product to favorites products list",
            });
        }

        return res.status(200).json(removedFavoriteProduct);
    }
}

export default new CustomerFavoriteProductController();
