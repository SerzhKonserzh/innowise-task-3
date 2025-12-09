import { Add, Delete, Remove } from '@mui/icons-material';
import {
	Box,
	IconButton,
	TextField,
	useMediaQuery,
	useTheme
} from '@mui/material';
import { FC } from 'react';
import React from 'react';
import { IProductCart } from '../../store/products/productTypes';
import { useDispatch } from 'react-redux';
import {
	removeItemFromCart,
	updateCartItemQuantity
} from '../../store/user/userSlice';

const QuantityChange: FC<{ item: IProductCart }> = ({ item }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const handleRemove = (id: number) => {
		dispatch(removeItemFromCart(id));
	};

	const handleQuantityChange = (id: number, quantity: number) => {
		if (quantity < 1) return;
		dispatch(updateCartItemQuantity({ id, quantity }));
	};

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: isMobile ? 'column' : 'row',
				alignItems: 'center',
				gap: 1
			}}
		>
			<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
				<IconButton
					size="small"
					disabled={item.quantity <= 1}
					onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
				>
					<Remove />
				</IconButton>
				<TextField
					size="small"
					value={item.quantity}
					onChange={e => {
						const val = Number(e.target.value);
						if (!isNaN(val) && val > 0) {
							handleQuantityChange(item.id, val);
						}
					}}
					inputProps={{ min: 1, style: { textAlign: 'center' } }}
					sx={{ width: 60 }}
				/>
				<IconButton
					size="small"
					onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
				>
					<Add />
				</IconButton>
			</Box>
			<IconButton
				onClick={() => handleRemove(item.id)}
				color="error"
				sx={{ maxWidth: 40 }}
			>
				<Delete />
			</IconButton>
		</Box>
	);
};

export default QuantityChange;
