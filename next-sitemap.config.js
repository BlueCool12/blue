/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: 'https://www.pyomin.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
        policies: [{ userAgent: '*', allow: '/', }],
    },    
};

module.exports = config;
