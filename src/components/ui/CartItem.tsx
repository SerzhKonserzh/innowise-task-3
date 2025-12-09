import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Typography,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { FC } from 'react';
import React from 'react';
import QuantityChange from './QuantityChange';
import { IProductCart } from '../../store/products/productTypes';

const CartItem: FC<{ item: IProductCart }> = ({ item }) => {
	const theme = useTheme();
	const isSmallMobile = useMediaQuery(theme.breakpoints.down('xs'));

	return (
		<Card key={item.id} sx={{ mb: 2 }}>
			<CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
				{isSmallMobile ? null : (
					<CardMedia
						component="img"
						image={item.thumbnail}
						alt={item.title}
						sx={{ width: 80, height: 80, objectFit: 'contain' }}
					/>
				)}
				<Box sx={{ flexGrow: 1 }}>
					<Typography variant="subtitle1">{item.title}</Typography>
					<Typography variant="body2" color="text.secondary">
						${item.price}
					</Typography>
				</Box>

				<QuantityChange item={item} />
			</CardContent>
		</Card>
	);
};

export default CartItem;
