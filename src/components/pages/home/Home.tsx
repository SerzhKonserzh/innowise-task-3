import { FC, useMemo, useState } from 'react';
import React from 'react';
import {
	Box,
	Grid,
	CircularProgress,
	Container,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button,
	ButtonGroup
} from '@mui/material';
import {
	useGetProductItemQuery,
	useGetProductsQuery
} from '../../../store/products/productApi';

const Home: FC = () => {
	const { data, isLoading, error } = useGetProductsQuery();

	const uniqueCategories = useMemo(() => {
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
								<Button variant='contained'>{category}</Button>
							))}
						</ButtonGroup>
					</Box>
					<Box my={4}>
						<Grid container spacing={4}>
							{data?.products.map(product => (
								<Grid size={3} key={product.id}>
									<Card
										sx={{
											height: '100%',
											display: 'flex',
											flexDirection: 'column',
											justifyContent: 'space-between'
										}}
									>
										<CardMedia
											component="img"
											height="160"
											image={product.thumbnail}
											alt={product.title}
											sx={{ objectFit: 'contain', p: 1 }}
										/>
										<CardContent sx={{ flexGrow: 1 }}>
											<Typography
												gutterBottom
												variant="subtitle1"
												component="div"
											>
												{product.title}
											</Typography>
											<Typography
												variant="body2"
												color="text.secondary"
												sx={{ mb: 1 }}
											>
												{product.brand} • {product.category}
											</Typography>
											<Box
												sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
											>
												<Typography variant="h6" color="primary">
													${product.price}
												</Typography>
												{product.discountPercentage > 0 && (
													<Typography
														variant="body2"
														color="text.secondary"
														sx={{ textDecoration: 'line-through' }}
													>
														$
														{(
															product.price /
															(1 - product.discountPercentage / 100)
														).toFixed(2)}
													</Typography>
												)}
											</Box>
											<Typography variant="body2" color="warning.main">
												★ {product.rating}
											</Typography>
										</CardContent>

										{/* Можно добавить кнопку "В корзину", если реализуете корзину позже */}
										{/* <Button size="small" variant="outlined" fullWidth>
        В корзину
      </Button> */}
									</Card>
								</Grid>
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
