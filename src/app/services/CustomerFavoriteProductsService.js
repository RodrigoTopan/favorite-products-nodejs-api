import axios from "axios";

import HttpError from "../utils/HttpError";
import cache from "../../providers/cache";
import CustomerModel from "../models/Customer";

class CustomerFavoriteProductsService {
    async findProduct(id) {
        try {
            const cachedProduct = await cache.get(`PRODUCT:${id}`);
            if (cachedProduct) {
                console.log("GETTING PRODUCT FROM CACHE");
                return cachedProduct;
            }

            const { PRODUCTS_API_URL } = process.env;
            const { data: foundProduct } = await axios.get(
                `${PRODUCTS_API_URL}/${id}/`,
            );

            await cache.setex(`PRODUCT:${id}`, 300, foundProduct);
            return foundProduct;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new HttpError("Product does not exists", 404);
            }
            throw error;
        }
    }

    async add({ customerId, productId }) {
        const product = await this.findProduct(productId);

        return CustomerModel.findByIdAndUpdate(
            customerId,
            {
                $addToSet: { favoriteProducts: product },
            },
            { new: true },
        );
    }

    async remove({ customerId, productId }) {
        return CustomerModel.findByIdAndUpdate(
            customerId,
            {
                $pull: { favoriteProducts: { id: productId } },
            },
            { new: true },
        );
    }
}

export default new CustomerFavoriteProductsService();
