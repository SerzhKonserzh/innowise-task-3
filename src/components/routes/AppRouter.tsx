import { createHashRouter, Navigate } from 'react-router';
import React from 'react';
import Home from '../pages/Home';
import HomeLayout from '../layouts/HomeLayout';
import SingleProduct from '../pages/SingleProduct';
import AuthLayout from '../layouts/AuthLayout';
import Auth from '../pages/login/Auth';
import Cart from '../pages/Cart';
import ProtectedRoute from './ProtectedRoute';

export const router = createHashRouter([
	{
		path: '/',
		Component: HomeLayout,
		children: [
			{ index: true, element: <ProtectedRoute redirectPath='/login'><Home /></ProtectedRoute> },
			{ path: 'product/:id', element: <ProtectedRoute redirectPath='/login'><SingleProduct /></ProtectedRoute> }
		]
	},
	{
		path: 'cart',
		Component: HomeLayout,
		children: [{ index: true, element: <ProtectedRoute redirectPath='/login'><Cart /></ProtectedRoute> }]
	},
	{
		path: 'login',
		Component: AuthLayout,
		children: [{ index: true, Component: Auth }]
	},
	{
		path: '*',
		element: <Navigate to="/" replace />,
	}
]);
