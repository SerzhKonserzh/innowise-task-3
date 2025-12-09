import {
	Card,
	CardMedia,
	CardContent,
	Typography,
	Box,
	Rating,
	Stack
} from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../store/products/productTypes';

interface CatalogProductCardProps {
	product: IProduct;
}

const ProductCard = ({ product }: CatalogProductCardProps) => {
	return (
		<Card
			component={Link}
			to={`/product/${product.id}`}
			sx={{
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				textDecoration: 'none',
				color: 'inherit',
				transition: 'box-shadow 0.2s',
				'&:hover': {
					boxShadow: 3
				},
				borderRadius: 2
			}}
		>
			<Box
				sx={{
					height: 160,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					p: 1,
					bgcolor: 'background.paper'
				}}
			>
				<CardMedia
					component="img"
					image={product.thumbnail}
					alt={product.title}
					sx={{
						objectFit: 'contain',
						maxWidth: '100%',
						maxHeight: '100%'
					}}
				/>
			</Box>

			<CardContent sx={{ p: 1.5, flexGrow: 1 }}>
				<Typography
					variant="caption"
					color="text.secondary"
					sx={{ textTransform: 'uppercase', fontWeight: 'bold' }}
				>
					{product.category}
				</Typography>

				<Typography
					variant="subtitle2"
					fontWeight="medium"
					sx={{
						mt: 0.5,
						mb: 1,
						display: '-webkit-box',
						WebkitLineClamp: 2,
						WebkitBoxOrient: 'vertical',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						minHeight: 40
					}}
				>
					{product.title}
				</Typography>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
					sx={{ mb: 1 }}
				>
					<Rating value={product.rating} readOnly size="small" />
					<Typography variant="caption" color="text.secondary">
						{product.brand}
					</Typography>
				</Stack>
				<Stack
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="h6" color="primary" fontWeight="bold">
						${product.price}
					</Typography>
					<Typography
						variant="caption"
						color={product.stock > 0 ? 'success.main' : 'error.main'}
					>
						{product.stock > 0 ? 'В наличии' : 'Нет в наличии'}
					</Typography>
				</Stack>
			</CardContent>
		</Card>
	);
};

export default ProductCard;
