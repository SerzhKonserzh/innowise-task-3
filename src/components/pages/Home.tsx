import { useState, useEffect, useMemo } from 'react';
import React from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	TextField,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Pagination,
	CircularProgress,
	Slider,
	FormHelperText,
	Button,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
	useGetProductsWithParamsQuery,
	useGetCategoriesQuery
} from '../../store/products/productApi';
import ProductCard from '../ui/ProductCard';

const CatalogPage = () => {
	const [page, setPage] = useState(1);
	const [limit] = useState(12);
	const [category, setCategory] = useState('');
	const [sortBy, setSortBy] = useState('title');
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	useEffect(() => {
		setPage(1);
	}, [category, sortBy, sortOrder]);

	const skip = (page - 1) * limit;

	const { data, isLoading, isError } = useGetProductsWithParamsQuery({
		skip,
		limit,
		category: category || undefined,
		sortBy: sortBy || undefined,
		order: sortOrder
	});

	const { data: categoriesData } = useGetCategoriesQuery();

	const totalPages = data ? Math.ceil(data.total / limit) : 1;

	const displayedProducts = useMemo(() => {
		if (!data?.products) return [];

		if (category) {
			return [...data.products].sort((a, b) => {
				if (sortBy === 'title') {
					return sortOrder === 'asc'
						? a.title.localeCompare(b.title)
						: b.title.localeCompare(a.title);
				}
				if (sortBy === 'price') {
					return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
				}
				if (sortBy === 'rating') {
					return sortOrder === 'asc'
						? a.rating - b.rating
						: b.rating - a.rating;
				}
				if (sortBy === 'stock') {
					return sortOrder === 'asc' ? a.stock - b.stock : b.stock - a.stock;
				}
				return 0;
			});
		}

		return data.products;
	}, [data, category, sortBy, sortOrder]);

	const handleResetFilters = () => {
		setCategory('');
		setSortBy('title');
		setSortOrder('asc');
		setPage(1);
	};

	if (isLoading) {
		return (
			<Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Container>
		);
	}

	if (isError) {
		return (
			<Container sx={{ py: 4 }}>
				<Typography color="error">Error during getting product list</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ py: 4 }}>
			<Typography variant="h4" gutterBottom>
				Catalog
			</Typography>

			<Box sx={{ mb: 4, bgcolor: 'background.default', borderRadius: 2 }}>
				<Grid container spacing={2} alignItems="center">
					<Grid size={{ xs: 12, sm: 5, md: 3 }}>
						<FormControl fullWidth size="small">
							<InputLabel>Category</InputLabel>
							<Select
								value={category}
								label="Категория"
								onChange={e => setCategory(e.target.value)}
							>
								<MenuItem value="">All</MenuItem>
								{categoriesData?.map(cat => (
									<MenuItem key={cat} value={cat}>
										{cat.toUpperCase()}
									</MenuItem>
								))}
							</Select>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 12, sm: 5, md: 3 }}>
						<FormControl fullWidth size="small">
							<InputLabel>Sort</InputLabel>
							<Select
								value={sortBy}
								label="Sort"
								onChange={e => setSortBy(e.target.value)}
							>
								<MenuItem value="title">By name</MenuItem>
								<MenuItem value="price">By price</MenuItem>
								<MenuItem value="rating">By rating</MenuItem>
								<MenuItem value="stock">By availability</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid size={{ xs: 12, sm: 1, md: 3 }} textAlign={isMobile ? 'center' : 'left'}>
						<Button
							variant="outlined"
							size="small"
							onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
						>
							{sortOrder === 'asc' ? '↑' : '↓'}
						</Button>
					</Grid>

					<Grid size={{ xs: 12 }} textAlign={isMobile ? 'center' : 'left'}>
						<Button variant="text" onClick={handleResetFilters} size="small">
							Refresh
						</Button>
					</Grid>
				</Grid>
			</Box>

			{data?.products.length === 0 ? (
				<Typography>Products not found</Typography>
			) : (
				<>
					<Grid container spacing={3}>
						{displayedProducts.map(product => (
							<Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
								<ProductCard product={product} />
							</Grid>
						))}
					</Grid>

					{totalPages > 1 && (
						<Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
							<Pagination
								size="small"
								count={totalPages}
								page={page}
								onChange={(_, newPage) => setPage(newPage)}
								color="primary"
							/>
						</Box>
					)}
				</>
			)}
		</Container>
	);
};

export default CatalogPage;
