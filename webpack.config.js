const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

const SitemapPlugin = require('sitemap-webpack-plugin').default;
const paths = [
    '/terms',
    '/welcome',
    '/updates',
    '/pricing',
    '/privacy',
    '/privacy',
];

module.exports = {
    mode: 'production',
    context: __dirname + '/app/',
    entry: {
        app: './assets/js/index.js',
    },
    plugins: [
        // new CleanWebpackPlugin(['dist/*']) for < v2 versions of CleanWebpackPlugin
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            inject: false,
            template: './index.html',
        }),

        new CopyPlugin([
            { from: 'assets/images', to: 'assets/images/' },
            { from: 'assets/videos', to: 'assets/videos/' },
            { from: 'assets/fonts', to: 'assets/fonts/' },
            { from: 'CNAME', to: '' },
            { from: 'robots.txt', to: '' },
            { from: '404.html', to: '' },
            { from: 'privacy.html', to: '' },
            { from: 'terms.html', to: '' },
            { from: 'updates.html', to: '' },
            { from: 'welcome.html', to: '' },
            {
                from:
                    '../node_modules/@fortawesome/fontawesome-free/svgs/solid/',
                to: 'assets/svgs',
            },
            {
                from:
                    '../node_modules/@fortawesome/fontawesome-free/svgs/brands/',
                to: 'assets/svgs',
            },
            {
                from:
                    '../node_modules/@fortawesome/fontawesome-free/svgs/regular/',
                to: 'assets/svgs',
            },
        ]),
        new MiniCssExtractPlugin(),

        new SitemapPlugin('https://www.removemyporn.com', paths),
        new WorkboxPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            importsDirectory: 'assets/',
            offlineGoogleAnalytics: true,
            clientsClaim: true,
            skipWaiting: true,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(jpe?g|png|gif)$/,
                loader: 'url-loader',
                options: {
                    // Images larger than 10 KB won’t be inlined
                    limit: 10 * 1024,
                },
            },
            {
                test: /\.svg$/,
                loader: 'svg-url-loader',
                options: {
                    // Images larger than 10 KB won’t be inlined
                    limit: 10 * 1024,
                    // Remove quotes around the encoded URL –
                    // they’re rarely useful
                    noquotes: true,
                },
            },
            {
                test: /\.(png|jpe?g|gif|xml|ico|svg|webmanifest)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            },
        ],
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs'),
    },
};
