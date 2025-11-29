import { FC, useState } from 'react';
import React from 'react';
import { ProductService } from '../../../services/ProductService';

import {
	useGetProductItemQuery,
	useGetProductsQuery
} from '../../../store/products/productApi';

const Home: FC = () => {
	const { data, isLoading, error } = useGetProductsQuery();

	return (
		<div>
			{isLoading ? (
				'loading'
			) : error ? (
				'error' in error ? (
					<div>{error.error}</div>
				) : (
					'error'
				)
			) : (
				data?.products.map(product => (<div>{product.title}</div>))
				// <Grid container spacing={2} padding={2}>
				// 	{data?.products.map(product => (
				// 		<Card key={product.id}>
				// 			<CardMedia
				// 				component="img"
				// 				height="140"
				// 				image={product.images[0]}
				// 				alt={product.title}
				// 			/>
				// 			<CardContent>
				// 				<Typography gutterBottom variant="h5" component="div">
				// 					{product.title}
				// 				</Typography>
				// 				<Typography variant="body2" color="text.secondary">
				// 					{product.description}
				// 				</Typography>
				// 				<Button
				// 					component={Link}
				// 					to={`/product/${product.id}`}
				// 					variant="contained"
				// 					sx={{ mt: 2 }}
				// 				>
				// 					Смотреть подробнее
				// 				</Button>
				// 			</CardContent>
				// 		</Card>
				// 	))}
				// </Grid>
			)}
		</div>
	);
};

export default Home;
