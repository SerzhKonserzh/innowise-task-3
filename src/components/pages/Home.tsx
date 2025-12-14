import { useState, useMemo } from 'react';
import React from 'react';
import {
	Box,
	Container,
	Grid,
	Typography,
	Select,
	MenuItem,
	FormControl,
	InputLabel,
	Pagination,
	CircularProgress,
	Button,
	useTheme,
	useMediaQuery
} from '@mui/material';
import {
	useGetProductsWithParamsQuery,
	useGetCategoriesQuery
} from '../../store/products/productApi';
import ProductCard from '../ui/ProductCard';

interface FiltersState {
	page: number;
	limit: number;
	category: string;
	sortBy: string;
	sortOrder: 'asc' | 'desc';
}

const Home = () => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

	const [filters, setFilters] = useState<FiltersState>({
		page: 1,
		limit: 12,
		category: '',
		sortBy: 'title',
		sortOrder: 'asc'
	});

	const handleCategoryChange = (category: string) => {
		setFilters(prev => ({
			...prev,
			category,
			page: 1
		}));
	};

	const handleSortByChange = (sortBy: string) => {
		setFilters(prev => ({
			...prev,
			sortBy,
			page: 1
		}));
	};

	const handleSortOrderToggle = () => {
		setFilters(prev => ({
			...prev,
			sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc',
			page: 1
		}));
	};

	const handlePageChange = (page: number) => {
		setFilters(prev => ({ ...prev, page }));
	};

	const handleResetFilters = () => {
		setFilters({
			page: 1,
			limit: 12,
			category: '',
			sortBy: 'title',
			sortOrder: 'asc'
		});
	};

	const skip = (filters.page - 1) * filters.limit;

	const { data, isLoading, isError } = useGetProductsWithParamsQuery({
		skip,
		limit: filters.limit,
		category: filters.category || undefined,
		sortBy: filters.sortBy || undefined,
		order: filters.sortOrder
	});

	const { data: categoriesData } = useGetCategoriesQuery();

	const totalPages = data ? Math.ceil(data.total / filters.limit) : 1;

	const displayedProducts = useMemo(() => {
		if (!data?.products) return [];

		if (filters.category) {
			return [...data.products].sort((a, b) => {
				if (filters.sortBy === 'title') {
					return filters.sortOrder === 'asc'
						? a.title.localeCompare(b.title)
						: b.title.localeCompare(a.title);
				}
				if (filters.sortBy === 'price') {
					return filters.sortOrder === 'asc'
						? a.price - b.price
						: b.price - a.price;
				}
				if (filters.sortBy === 'rating') {
					return filters.sortOrder === 'asc'
						? a.rating - b.rating
						: b.rating - a.rating;
				}
				if (filters.sortBy === 'stock') {
					return filters.sortOrder === 'asc'
						? a.stock - b.stock
						: b.stock - a.stock;
				}
				return 0;
			});
		}

		return data.products;
	}, [data, filters.category, filters.sortBy, filters.sortOrder]);

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
			<Typography variant="h1" gutterBottom>
				Shop catalog
			</Typography>

			<Box sx={{ mb: 4, bgcolor: 'background.default', borderRadius: 2 }}>
				<Grid container spacing={2} alignItems="center">
					<Grid size={{ xs: 12, sm: 5, md: 3 }}>
						<FormControl fullWidth size="small">
							<InputLabel id="category-label">Category</InputLabel>
							<Select
								value={filters.category}
								onChange={e => handleCategoryChange(e.target.value)}
								labelId="category-label"
								label="Category"
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
							<InputLabel id="sort-label">Sort</InputLabel>
							<Select
								value={filters.sortBy}
								onChange={e => handleSortByChange(e.target.value)}
								aria-label="Select parameter to sort"
								labelId="sort-label"
								label="Sort"
							>
								<MenuItem value="title">By name</MenuItem>
								<MenuItem value="price">By price</MenuItem>
								<MenuItem value="rating">By rating</MenuItem>
								<MenuItem value="stock">By availability</MenuItem>
							</Select>
						</FormControl>
					</Grid>

					<Grid
						size={{ xs: 12, sm: 1, md: 3 }}
						textAlign={isMobile ? 'center' : 'left'}
					>
						<Button
							variant="outlined"
							size="small"
							onClick={handleSortOrderToggle}
							aria-label="Change sort order"
						>
							{filters.sortOrder === 'asc' ? '↑' : '↓'}
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
								page={filters.page}
								onChange={(_, newPage) => handlePageChange(newPage)}
								color="primary"
							/>
						</Box>
					)}
				</>
			)}
		</Container>
	);
};

export default Home;
