module.exports = 
{
  images: {
    domains: ["dinemaster0.s3.us-west-2.amazonaws.com"]
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/passport/landing',
        permanent: true,
      }
    ]
  },
}