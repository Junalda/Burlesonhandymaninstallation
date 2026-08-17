import type { IconName } from '../components/icons';

export interface Benefit {
  title: string;
  description: string;
  icon: IconName;
}

/** Sectie "Waarom Burleson Handyman Installation?" */
export const benefits: Benefit[] = [
  {
    title: 'Punctueel',
    description:
      'Een afspraak is een afspraak. Werkzaamheden worden serieus en professioneel aangepakt.',
    icon: 'clock',
  },
  {
    title: 'Gedisciplineerd',
    description: 'Focus op veilig, zorgvuldig en efficiënt werken.',
    icon: 'shield',
  },
  {
    title: 'Eigen vervoer',
    description: 'Flexibel inzetbaar zonder afhankelijk te zijn van extern vervoer.',
    icon: 'truck',
  },
  {
    title: 'Eigen gereedschap',
    description: 'Voorbereid om direct aan de slag te kunnen.',
    icon: 'tools',
  },
  {
    title: 'Breed inzetbaar',
    description: 'Van grondwerk tot transport en machinewerk.',
    icon: 'grid',
  },
  {
    title: 'Persoonlijk contact',
    description: 'Direct contact met de uitvoerende vakman.',
    icon: 'chat',
  },
];
