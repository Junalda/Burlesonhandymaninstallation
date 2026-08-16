export interface NavLink {
  label: string;
  href: string;
}

export const navLinks: NavLink[] = [
  { label: 'Diensten', href: '#diensten' },
  { label: 'Over ons', href: '#over-ons' },
  { label: 'Certificaten', href: '#certificaten' },
  { label: 'Contact', href: '#contact' },
];

export const footerLinks: NavLink[] = [
  { label: 'Diensten', href: '/#diensten' },
  { label: 'Over ons', href: '/#over-ons' },
  { label: 'Contact', href: '/#contact' },
  { label: 'Privacy', href: '/privacy/' },
];
