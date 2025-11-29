export const ProductService = {
	async getProducts() {
		const response = await fetch('https://dummyjson.com/products');

		return response.json();
	}
};
