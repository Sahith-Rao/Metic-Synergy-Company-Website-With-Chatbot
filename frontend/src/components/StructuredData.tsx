import React from 'react';

interface OrganizationSchemaProps {
  name: string;
  logo: string;
  url: string;
  description: string;
  telephone?: string;
  email?: string;
  address?: {
    street?: string;
    city: string;
    state?: string;
    country: string;
    postalCode?: string;
  };
  sameAs?: string[]; // Social media links
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  url: string;
  image?: string;
  area?: string;
}

interface FAQSchemaProps {
  questions: {
    question: string;
    answer: string;
  }[];
}

interface BreadcrumbSchemaProps {
  items: {
    name: string;
    url: string;
  }[];
}

/**
 * Organization schema.org structured data
 */
export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name,
  logo,
  url,
  description,
  telephone,
  email,
  address,
  sameAs
}) => {
  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name,
    url,
    logo,
    description,
    ...(email && { email }),
    ...(telephone && { telephone }),
    ...(address && {
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.city,
        addressCountry: address.country,
        ...(address.street && { streetAddress: address.street }),
        ...(address.state && { addressRegion: address.state }),
        ...(address.postalCode && { postalCode: address.postalCode })
      }
    }),
    ...(sameAs && { sameAs })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
    />
  );
};

/**
 * Service schema.org structured data
 */
export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  provider,
  url,
  image,
  area
}) => {
  const serviceData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider
    },
    url,
    ...(image && { image }),
    ...(area && { areaServed: area })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
    />
  );
};

/**
 * FAQ schema.org structured data
 */
export const FAQSchema: React.FC<FAQSchemaProps> = ({ questions }) => {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  );
};

/**
 * Breadcrumb schema.org structured data
 */
export const BreadcrumbSchema: React.FC<BreadcrumbSchemaProps> = ({ items }) => {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  );
};