import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
  *[_id == "heroSettings"][0] {
    craftBadge,
    title,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    "slides": slides[] {
      "imageUrl": image.asset->url,
      customTitle,
      customSubtitle
    },
    backgroundVideoUrl
  }
`);

export const SERVICES_PAGE_QUERY = defineQuery(`
  *[_id == "servicesPage"][0] {
    badge,
    title,
    subtitle,
    "headerImageUrl": headerImage.asset->url
  }
`);

export const ABOUT_PAGE_QUERY = defineQuery(`
  *[_id == "aboutPage"][0] {
    badge,
    headline,
    introText,
    "headerImageUrl": headerImage.asset->url,
    headerVideoUrl,
    storyHeadline,
    storyParagraph1,
    storyParagraph2,
    storyParagraph3,
    "workshopGallery": workshopGallery[] {
      "imageUrl": image.asset->url,
      caption
    }
  }
`);

export const TEAM_MEMBERS_QUERY = defineQuery(`
  *[_type == "teamMember"] | order(order asc, _createdAt asc) {
    _id,
    name,
    role,
    "imageUrl": image.asset->url,
    bio,
    since
  }
`);

export const GALLERY_PAGE_QUERY = defineQuery(`
  *[_id == "galleryPage"][0] {
    badge,
    title,
    subtitle,
    "headerImageUrl": headerImage.asset->url,
    headerVideoUrl
  }
`);

export const GALLERY_ITEMS_QUERY = defineQuery(`
  *[_type == "portfolioProject"] | order(_createdAt desc) {
    _id,
    title,
    category,
    location,
    year,
    "imageUrl": mainImage.asset->url,
    "galleryUrls": gallery[].asset->url,
    description,
    scope,
    featured
  }
`);

export const SHOP_PAGE_QUERY = defineQuery(`
  *[_id == "shopPage"][0] {
    badge,
    title,
    subtitle,
    "headerImageUrl": headerImage.asset->url
  }
`);

export const CONTACT_PAGE_QUERY = defineQuery(`
  *[_id == "contactPage"][0] {
    badge,
    title,
    subtitle,
    "headerImageUrl": headerImage.asset->url
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
  *[_type == "serviceItem"] | order(order asc, _createdAt asc) {
    _id,
    title,
    subtitle,
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
