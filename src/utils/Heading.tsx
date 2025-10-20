"use client";

import Head from "next/head";

type Props = {
  title: string;
  description: string;
  keywords?: string;
  logoUrl?: string; // optional logo URL for favicon / social previews
};

const Heading: React.FC<Props> = ({
  title,
  description,
  keywords = "",
  logoUrl = "/logo.png", // default logo from public folder
}) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Favicon */}
      <link rel="icon" href={logoUrl} type="image/png" />

      {/* Open Graph / SEO */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={logoUrl} /> {/* Logo for OG preview */}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={logoUrl} /> {/* Logo for Twitter preview */}
    </Head>
  );
};

export default Heading;
