import { heroSettings } from "./heroSettings";
import { companyInfo } from "./companyInfo";
import { aboutPage } from "./aboutPage";
import { servicesPage } from "./servicesPage";
import { galleryPage } from "./galleryPage";
import { shopPage } from "./shopPage";
import { contactPage } from "./contactPage";
import { serviceItem } from "./serviceItem";
import { catalogProduct } from "./catalogProduct";
import { portfolioProject } from "./portfolioProject";
import { teamMember } from "./teamMember";
import { showcaseVideo } from "./showcaseVideo";

export const schemaTypes = [
  // Page Settings / Singletons
  heroSettings,
  showcaseVideo,
  servicesPage,
  aboutPage,
  galleryPage,
  shopPage,
  contactPage,
  companyInfo,

  // Collection Items
  serviceItem,
  catalogProduct,
  portfolioProject,
  teamMember,
];
