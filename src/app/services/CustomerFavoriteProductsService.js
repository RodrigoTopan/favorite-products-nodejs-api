import axios from "axios";
import cache from "../../cache";
import HttpError from "../../utils/HttpError";
import logger from "../../utils/Logger";
import CustomerModel from "../models/Customer";

const { DEFAULT_EXPIRE_CACHE = 100 } = process.env;

class CustomerFavoriteProductsService {
    async add({ customerId, productId }) {
        await this.validateCustomer(customerId);

        const product = await this.findProduct(productId);

        return CustomerModel.findByIdAndUpdate(
            customerId,
            {
                $addToSet: { favoriteProducts: product },
            },
            { new: true }
        );
    }

    async remove({ customerId, productId }) {
        await this.validateCustomer(customerId);

        return CustomerModel.findByIdAndUpdate(
            customerId,
            {
                $pull: { favoriteProducts: { id: productId } },
            },
            { new: true }
        );
    }

    async validateCustomer(id) {
        const customerExists = await CustomerModel.findById(id).lean();

        if (!customerExists) {
            throw new HttpError("Customer does not exist", 404);
        }
    }

    async findProduct(id) {
        try {
            const cachedProduct = await cache.get(`PRODUCT:${id}`);
            if (cachedProduct) {
                logger.info("GETTING PRODUCT FROM CACHE");
                return JSON.parse(cachedProduct);
            }

            const { PRODUCTS_API_URL } = process.env;
            const { data: foundProduct } = await axios.get(
                `${PRODUCTS_API_URL}/${id}/`
            );

            await cache.setex(
                `PRODUCT:${id}`,
                DEFAULT_EXPIRE_CACHE,
                JSON.stringify(foundProduct)
            );

            return foundProduct;
        } catch (error) {
            if (error.response && error.response.status === 404) {
                throw new HttpError("Product does not exists", 404);
            }
            throw error;
        }
    }
}

export default new CustomerFavoriteProductsService();
