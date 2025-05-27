import type { IConfig } from "next-sitemap";

const config: IConfig = {
    siteUrl: 'https://www.pyomin.com',
    generateRobotsTxt: true,
    sitemapSize: 5000,
    changefreq: 'daily',
    priority: 0.7,
    exclude: ['/admin/*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
            },
        ],
    },
};

export default config;