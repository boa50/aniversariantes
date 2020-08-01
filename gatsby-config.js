require('dotenv').config({
    path: `.env.${process.env.NODE_ENV || 'development'}`,
});

module.exports = {
    siteMetadata: {
        title: `Aniversariantes`,
        description: `Uma aplicação para armazenar os dados de aniversariantes da família.`,
        author: `@boa50`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        {
            resolve: `gatsby-plugin-material-ui`,
            options: {
                stylesProvider: {
                    injectFirst: true,
                },
            },
        },
        {
            resolve: 'gatsby-plugin-google-fonts',
            options: {
                fonts: ['roboto:300,400,500,700'],
            },
        },
        {
            resolve: `gatsby-plugin-typescript`,
            options: {
                isTSX: true,
                allExtensions: true,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        `gatsby-plugin-sass`,
        {
            resolve: `gatsby-plugin-firebase`,
            options: {
                credentials: {
                    apiKey: process.env.GATSBY_DB_API_KEY,
                    appId: process.env.GATSBY_APP_ID,
                    messagingSenderId: process.env.GATSBY_MESSAGING_SENDER_ID,
                    projectId: process.env.GATSBY_PROJECT,
                },
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Aniversariantes da Família`,
                short_name: `Aniversariantes`,
                start_url: `/`,
                background_color: `#ffffff`,
                theme_color: `#000000`,
                display: `minimal-ui`,
                icon: `src/images/favicon.png`,
            },
        },
        `gatsby-plugin-offline`,
    ],
};
