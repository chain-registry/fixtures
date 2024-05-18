const siteUrl = 'https://chainregistry.org';
const siteAddress = new URL(siteUrl);
const canonical = siteAddress.href.slice(0, -1);
const title = 'Chain Registry';
const description =
  'Get everything from token symbols, logos, and IBC denominations for all assets you want to support in your application.';

module.exports = {
  siteUrl,
  title,
  canonical,
  description,
  openGraph: {
    type: 'website',
    url: siteUrl,
    title,
    description,
    site_name: title,
    images: [
      {
        url: canonical + '/og_image/chain-registry.jpg',
        alt: title,
      },
    ],
  },
  twitter: {
    handle: '@cosmology_tech',
    site: '@cosmology_tech',
  }
};