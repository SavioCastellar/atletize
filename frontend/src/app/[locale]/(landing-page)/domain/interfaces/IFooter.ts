interface Navigation {
  support: {
    name: string;
    href: string;
  }[];
  company: {
    name: string;
    href: string;
  }[];
  legal: {
    name: string;
    href: string;
  }[];
  social: {
    name: string;
    href: string;
  }[];
}

export interface IFooterIntl {
  description: string;
  menuTitle1: string;
  menuTitle2: string;
  menuTitle3: string;
  navigation: Navigation;
  copyright: string;
}
