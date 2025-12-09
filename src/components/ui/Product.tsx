import { FC } from 'react';
import React from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	Rating,
	Chip,
	Divider,
	useMediaQuery,
	useTheme,
	List,
	ListItem,
	Tooltip
} from '@mui/material';
import { IProduct } from '../../store/products/productTypes';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../../store/user/userSlice';
import { TypeRootState } from '../../store/store';
import QuantityChange from './QuantityChange';

const Product: FC<{ product: IProduct }> = ({ product }) => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
	const dispatch = useDispatch();

	const { isAuthenticated, cart } = useSelector(
		(state: TypeRootState) => state.user
	);

	const item = cart.find(i => i.id === product.id);

	const addToCart = () => {
		dispatch(addItemToCart(product));
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			<Grid
				container
				spacing={4}
				sx={{ textAlign: isMobile ? 'center' : 'left' }}
			>
				<Grid
					size={{ xs: 12, md: 6 }}
					sx={{
						display: isMobile ? 'flex' : 'block',
						justifyContent: isMobile ? 'center' : 'start'
					}}
				>
					<Box
						sx={{
							display: 'flex',
							flexDirection: isMobile ? 'row' : 'column',
							gap: 1
						}}
					>
						<Box
							component="img"
							src={product.images[0]}
							alt={product.title}
							sx={{
								width: '100%',
								maxWidth: isMobile ? 300 : 'z0%',
								borderRadius: 2,
								objectFit: 'cover',
								aspectRatio: '1 / 1',
								border: `2px solid ${theme.palette.primary.main}`
							}}
						/>
					</Box>
				</Grid>
				<Grid size={{ xs: 12, md: 6 }}>
					<Typography variant="h1" component="h1" gutterBottom>
						{product.title}
					</Typography>

					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							gap: 1,
							mb: 2,
							justifyContent: isMobile ? 'center' : 'start'
						}}
					>
						<Rating value={product.rating} readOnly precision={0.5} />
						<Typography variant="body2" color="text.secondary">
							({product.reviews.length} reviews)
						</Typography>
					</Box>

					<Typography variant="h2" color="primary" gutterBottom>
						${product.price.toFixed(2)}
					</Typography>

					{product.stock ? (
						<Chip
							label={`${product.stock} left`}
							color="success"
							size="small"
							sx={{ mb: 2 }}
						/>
					) : (
						<Chip
							label="Нет в наличии"
							color="error"
							size="small"
							sx={{ mb: 2 }}
						/>
					)}

					<Typography variant="body1">{product.description}</Typography>

					<Typography variant="subtitle1" fontWeight="600" sx={{ mb: 1 }}>
						Tags:
					</Typography>
					<List
						sx={{
							padding: '0 0 16px',
							display: 'flex',
							flexDirection: 'column'
						}}
					>
						{product.tags.map((tag, id) => (
							<ListItem
								key={id}
								sx={{
									textTransform: 'uppercase',
									padding: 0,
									justifyContent: isMobile ? 'center' : 'start'
								}}
							>
								<Typography variant="body2">{tag}</Typography>
							</ListItem>
						))}
					</List>

					<Box
						sx={{
							display: 'flex',
							gap: 2,
							flexWrap: 'wrap',
							justifyContent: isMobile ? 'center' : 'start'
						}}
					>
						{isAuthenticated ? (
							item ? (
								<QuantityChange item={item} />
							) : (
								<Button
									variant="contained"
									color="primary"
									size="large"
									onClick={addToCart}
								>
									Add to cart
								</Button>
							)
						) : (
							<Tooltip title={'You need to login'} arrow>
								<span>
									<Button
										variant="contained"
										color="primary"
										size="large"
										onClick={addToCart}
										disabled
									>
										Add to cart
									</Button>
								</span>
							</Tooltip>
						)}
					</Box>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Product;
