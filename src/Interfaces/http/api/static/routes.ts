const routes = () => [
  {
    method: 'GET',
    path: '/images/{param*}',
    handler: {
      directory: {
        path: './images',
        redirectToSlash: true,
        index: true,
      },
    },
  },
]

export default routes
