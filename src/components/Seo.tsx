import { Helmet } from "react-helmet-async";

const SITE_URL = "https://amanparganiha.github.io";
const DEFAULT_IMAGE = `${SITE_URL}/profile.jpg`;

interface SeoProps {
  title: string;
  description: string;
  /** Path-only canonical, e.g. "/blogs". Optional. */
  path?: string;
  image?: string;
  type?: "website" | "article";
  /** schema.org structured data, rendered as application/ld+json. */
  jsonLd?: Record<string, unknown>;
}

const Seo = ({ title, description, path, image, type = "website", jsonLd }: SeoProps) => {
  const fullTitle = `${title} | Aman Parganiha`;
  const url = path ? `${SITE_URL}${path}` : SITE_URL;
  const img = image ?? DEFAULT_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default Seo;
