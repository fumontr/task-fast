/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    dirs: ['src/components/', 'src/lib/', 'src/pages/']
  }
}
