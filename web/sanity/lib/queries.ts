import { defineQuery } from "next-sanity";

export const HERO_QUERY = defineQuery(`
  *[_id == "heroSettings"][0] {
    title,
    subtitle,
    primaryButtonText,
    primaryButtonLink,
    secondaryButtonText,
    secondaryButtonLink,
    "imageUrls": images[].asset->url,
    "legacySlideUrls": slides[].image.asset->url,
    backgroundVideoUrl
  }
`);

export const SHOWCASE_VIDEO_QUERY = defineQuery(`
  *[_id == "showcaseVideo"][0] {
    title,
    videoDesktopUrl,
    videoMobileUrl,
    "posterImageUrl": posterImage.asset->url,
    badge,
    headline,
    subheadline
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
    storyContent,
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

export const PRODUCT_CATEGORIES_QUERY = defineQuery(`
  *[_type == "productCategory"] | order(order asc, _createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    order
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
    "galleryUrls": gallery[].asset->url,
    order
  }
`);

export const PRODUCTS_QUERY = defineQuery(`
  *[_type == "catalogProduct"] {
    _id,
    title,
    "category": coalesce(categoryRef->title, categoryRef->slug.current, category),
    "categorySlug": coalesce(categoryRef->slug.current, category),
    woodType,
    dimensions,
    price,
    available,
    description,
    "imageUrl": images[0].asset->url,
    "images": images[].asset->url,
    "glbUrl": glbFile.asset->url
  }
`);

export const HOME_SECTIONS_QUERY = defineQuery(`
  *[_id == "homeSections"][0] {
    storyEyebrow,
    storyHeadline,
    storyParagraph1,
    storyParagraph2,
    stat1Value,
    stat1Label,
    stat2Value,
    stat2Label,
    stat3Value,
    stat3Label,
    "storyImageUrl": storyImage.asset->url,
    storyImageCaption,
    storyButtonText,
    servicesEyebrow,
    servicesHeadline,
    "customServices": customServices[]-> {
      _id,
      title,
      subtitle,
      category,
      "imageUrl": image.asset->url,
      description,
      features
    },
    shopEyebrow,
    shopHeadline,
    shopSubtitle,
    "featuredProducts": featuredProducts[]-> {
      _id,
      title,
      price,
      woodType,
      dimensions,
      description,
      "imageUrl": images[0].asset->url,
      "slug": coalesce(slug.current, _id)
    }
  }
`);
