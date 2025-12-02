import { FC } from 'react';
import React from 'react';
import { useParams } from 'react-router';
import { useGetProductItemQuery } from '../../store/products/productApi';
import Product from '../ui/Product';
import { CircularProgress } from '@mui/material';


const SingleProduct: FC = () => {
  const { id } = useParams();

  const {data: product, isLoading} = useGetProductItemQuery(Number(id));
  
  if (isLoading) return <CircularProgress />;
  if (!product) return <div>Товар не найден</div>;

  return (
    <Product product={product}/>
  );
};

export default SingleProduct;