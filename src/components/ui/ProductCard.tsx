import { FC } from 'react';
import React from 'react';
import {
	Box,
	Grid,
	Card,
	CardMedia,
	CardContent,
	Typography,
	Button
} from '@mui/material';
import { IProduct } from '../../store/products/productTypes';
import { Link } from 'react-router';

const ProductCard: FC<{ product: IProduct; size?: number }> = ({
	product,
	size = 3
}) => {
	return (
		<Grid
			size={size}
			key={product.id}
			sx={{
				border: '1px solid purple',
				borderRadius: '5px'
			}}
		>
			<Button component={Link} to={`/product/${product.id}`} fullWidth sx={{
						height: '100%',
            p: '0'
					}}>
				<Card 
					sx={{
						height: '100%',
            width: '100%',
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
						<Typography gutterBottom variant="subtitle1" component="div">
							{product.title}
						</Typography>
						<Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
							{product.brand} • {product.category}
						</Typography>
						<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
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
				</Card>
			</Button>
		</Grid>
	);
};

export default ProductCard;
