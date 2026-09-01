import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
  *[_id == "heroSettings"][0] {
    "slides": slides[] {
      "imageUrl": image.asset->url,
      craftBadge,
      title,
      subtitle,
      primaryButtonText,
      primaryButtonLink,
      secondaryButtonText,
      secondaryButtonLink,
      durationSeconds
    },
    backgroundVideoUrl
  }
`);

export const COMPANY_INFO_QUERY = defineQuery(`
  *[_id == "companyInfo"][0] {
    companyName,
    owner,
    phone,
    email,
    street,
    zipCity,
    hoursWeekdays,
    hoursSaturday
  }
`);

export const SERVICES_QUERY = defineQuery(`
  *[_type == "serviceItem"] | order(order asc) {
    _id,
    title,
    category,
    description,
    features,
    "imageUrl": image.asset->url,
    order
  }
`);

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "catalogProduct"] {
    _id,
    title,
    category,
    woodType,
    dimensions,
    price,
    available,
    description,
    "imageUrl": images[0].asset->url
  }
`);

export const ABOUT_QUERY = defineQuery(`
  *[_id == "aboutPage"][0] {
    headline,
    introText,
    milestones
  }
`);
