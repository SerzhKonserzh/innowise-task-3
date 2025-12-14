import { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router';
import { useGetProductItemQuery } from '../../store/products/productApi';
import Product from '../ui/Product';
import { CircularProgress, Container, Typography } from '@mui/material';
import { useNumberParams } from '../../hooks/useNumberParams';

const SingleProduct: FC = () => {
	const id = useNumberParams('id');

	if (id === null)
		return (
			<Container sx={{ py: 4 }}>
				<Typography variant="h5" align="center">
					Product not found, incorrect id
				</Typography>
			</Container>
		);

	const { data: product, isLoading, isError } = useGetProductItemQuery(Number(id));

	if (isLoading)
		return (
			<Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Container>
		);
	if (!product || isError)
		return (
			<Container sx={{ py: 4 }}>
				<Typography variant="h5" align="center">
					Product not found
				</Typography>
			</Container>
		);

	return <Product product={product} />;
};

export default SingleProduct;
