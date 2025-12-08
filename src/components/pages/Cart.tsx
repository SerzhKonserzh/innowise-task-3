import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	Box,
	Container,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Button,
	Divider,
	Grid,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { TypeRootState } from '../../store/store';

import QuantityChange from '../ui/QuantityChange';
import CartItem from '../ui/CartItem';

const Cart = () => {
	const cart = useSelector((state: TypeRootState) => state.user.cart);
	const isAuthenticated = useSelector(
		(state: TypeRootState) => state.user.isAuthenticated
	);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

	const getTotalPrice = () => {
		return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	};

	if (!isAuthenticated) {
		return (
			<Container sx={{ py: 4, textAlign: 'center' }}>
				<Typography variant="h5" align="center">
					Please, enter your account to view cart
				</Typography>
				<Button variant="contained" sx={{ my: 2 }} component={Link} to="/login">
					Sign in
				</Button>
			</Container>
		);
	}

	if (cart.length === 0) {
		return (
			<Container sx={{ py: 4 }}>
				<Typography variant="h5" align="center">
					Your cart is empty
				</Typography>
				<Box display="flex" justifyContent="center" mt={2}>
					<Button component={Link} to="/" variant="contained" color="primary">
						Continue shopping
					</Button>
				</Box>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Cart ({cart.length} {cart.length === 1 ? 'item' : 'items'})
			</Typography>

			<Grid container spacing={3}>
				<Grid size={{ xs: 12, md: 6 }}>
					{cart.map(item => (
						<CartItem item={item}/>
					))}
				</Grid>

				{/* Итоговая сумма */}
				<Grid size={{ xs: 12, md: 6 }}>
					<Card sx={{ p: 3, height: 'fit-content' }}>
						<Typography variant="h6" gutterBottom>
							Total
						</Typography>
						<Divider sx={{ my: 2 }} />
						<Box display="flex" justifyContent="space-between" mb={2}>
							<Typography variant="body1">
								Products ({totalItems} {' '}
								{totalItems === 1 ? 'item' : 'items'}):
							</Typography>
							<Typography variant="body1">
								${getTotalPrice().toFixed(2)}
							</Typography>
						</Box>
						<Button
							fullWidth
							variant="contained"
							color="primary"
							size="large"
							// Здесь можно добавить обработчик оформления заказа
						>
							Confirm
						</Button>
						<Button
							fullWidth
							component={Link}
							to="/"
							variant="outlined"
							sx={{ mt: 1 }}
						>
							Continue shopping
						</Button>
					</Card>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Cart;
