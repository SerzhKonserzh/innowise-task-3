import { FC } from 'react';
import React from 'react';
import {
	Box,
	Typography,
	Button,
	CardMedia,
	Container,
	CircularProgress
} from '@mui/material';
import { IProduct } from '../../store/products/productTypes';
import { Link } from 'react-router-dom';

const Product: FC<{ product: IProduct }> = ({ product }) => {
	return (
		<Container>
			<Box my={4}>
				<CardMedia
					component="img"
					height="400"
					image={product.thumbnail}
					alt={product.title}
				/>
				<Typography variant="h4" my={2}>
					{product.title}
				</Typography>
				<Typography variant="body1">{product.description}</Typography>
				<Typography variant="h6" color="primary">
					${product.price}
				</Typography>
				<Button variant="outlined" sx={{ mt: 2 }}>
					Add to cart
				</Button>
				<Button component={Link} to="/" variant="outlined" sx={{ mt: 2 }}>
					Back to catalog
				</Button>
			</Box>
		</Container>
	);
};

export default Product;
