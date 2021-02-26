import customerFavoriteProductsService from "../services/CustomerFavoriteProductsService";

class CustomerFavoriteProductController {
    async store(req, res) {
        const { customerId, productId } = req.params;
        const addedFavoriteProduct = await customerFavoriteProductsService.add({
            customerId,
            productId,
        });

        return res.status(200).json(addedFavoriteProduct);
    }

    async delete(req, res) {
        const { customerId, productId } = req.params;

        const removedFavoriteProduct = await customerFavoriteProductsService.remove(
            {
                customerId,
                productId,
            }
        );

        return res.status(200).json(removedFavoriteProduct);
    }
}

export default new CustomerFavoriteProductController();
