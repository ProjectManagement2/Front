module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:4444',
                changeOrigin: true
            },
        }
    }
}