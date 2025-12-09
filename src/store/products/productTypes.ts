export interface IProducts {
	products: IProduct[];
	total: number;
	skip: number;
	limit: number;
}

export interface IProduct {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	discountPercentage: number;
	rating: number;
	stock: number;
	tags: string[];
	brand?: string;
	sku: string;
	weight: number;
	dimensions: IDimensions;
	warrantyInformation: string;
	shippingInformation: string;
	availabilityStatus: string;
	reviews: IReview[];
	returnPolicy: string;
	minimumOrderQuantity: number;
	meta: IMeta;
	images: string[];
	thumbnail: string;
}

export interface IProductCart extends IProduct {
	quantity: number;
}

export interface IProductsParams {
	skip?: number;
	limit?: number;
	select?: string;
	sortBy?: string;
	order?: 'asc' | 'desc';
	category?: string;
}

interface IMeta {
	createdAt: string;
	updatedAt: string;
	barcode: string;
	qrCode: string;
}

interface IReview {
	rating: number;
	comment: string;
	date: string;
	reviewerName: string;
	reviewerEmail: string;
}

interface IDimensions {
	width: number;
	height: number;
	depth: number;
}

// getProductsWithParams: build.query<IProducts, IProductsParams>({
//       query: (params) => {
//         const {
//           skip = 0,
//           limit = 12,
//           sortBy,
//           order = 'asc',
//           category,
//           brand,
//           price
//         } = params;

//         const searchParams = new URLSearchParams();

//         // Пагинация
//         searchParams.append('skip', skip.toString());
//         searchParams.append('limit', limit.toString());

//         // Фильтрация
//         if (category) searchParams.append('category', category);
//         if (brand) searchParams.append('brand', brand);
//         if (price) {
//           searchParams.append('price[gte]', price[0].toString());
//           searchParams.append('price[lte]', price[1].toString());
//         }

//         // Сортировка
//         if (sortBy) {
//           searchParams.append('sort', sortBy);
//           searchParams.append('order', order);
//         }

//         return `/products?${searchParams.toString()}`;
//       },
// 	}),
