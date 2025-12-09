import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import type { Configuration as DevServerConfiguration } from 'webpack-dev-server';

type Mode = 'production' | 'development';

//interface для переменных окружения
interface EnvVariables {
	mode: Mode;
	port: number;
}

export default (env: EnvVariables) => {
	const isDev = env.mode === 'development';

	const config: webpack.Configuration = {
		//режим разработки
		mode: env.mode ?? 'development',
		//входной файл
		entry: path.resolve(__dirname, 'src', 'main.tsx'),
		//выходной файл
		output: {
			filename: '[name].[contenthash].js', //каждый раз подставляет хэш от контента
			path: path.resolve(__dirname, 'dist'),
			clean: true,
			publicPath: './' //для корректной работы маршрутов
		},
		//подключаемые плагины
		plugins: [
			new HtmlWebpackPlugin({
				template: path.resolve(__dirname, 'index.html')
			})
		],
		module: {
			//массив loader в необходимом порядке
			rules: [
				//настройка отдельного loader
				{
					//регулярное выражение для проверки файлов на .ts и .tsx
					test: /\.tsx?$/,
					//используемый лоадер
					use: 'ts-loader',
					//то, что не обрабатываем
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			// расширения, которые необходимо обрабатывать
			extensions: ['.tsx', '.ts', '.js']
		},
		//создает карту исходного кода, упрощает поиск ошибок
		devtool: isDev ? 'inline-source-map' : false,
		//настройка devServer
		devServer: isDev
			? {
					port: env.port ?? 3000,
					open: true,
					historyApiFallback: true, 
					static: {
						directory: path.join(__dirname, 'dist')
					}
			  }
			: undefined
	};

	return config;
};
