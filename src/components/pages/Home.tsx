import { FC, useMemo } from 'react';
import React from 'react';
import {
	Box,
	Grid,
	CircularProgress,
	Container,
	Button,
	ButtonGroup
} from '@mui/material';
import {
	useGetProductItemQuery,
	useGetProductsQuery
} from '../../store/products/productApi';
import ProductCard from '../ui/ProductCard';
import { Link } from 'react-router';

const Home: FC = () => {
	const { data, isLoading, error } = useGetProductsQuery();

	const uniqueCategories: string[] = useMemo(() => {
		return Array.from(new Set(data?.products.map(product => product.category)));
	}, [data]);

	return (
		<div>
			{isLoading ? (
				<CircularProgress />
			) : error ? (
				'error' in error ? (
					<div>{error.error}</div>
				) : (
					'error'
				)
			) : (
				<Container>
					<Box my={4} sx={{ display: 'flex', justifyContent: 'center' }}>
						<ButtonGroup variant="contained" aria-label="Basic button group">
							{uniqueCategories.map(category => (
								<Button variant="contained" component={Link} to={`/`}>
									{category}
								</Button>
							))}
						</ButtonGroup>
					</Box>
					<Box my={4}>
						<Grid container spacing={4}>
							{data?.products.map(product => (
								<ProductCard product={product} />
							))}
						</Grid>
					</Box>
				</Container>
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
