import type { IconName } from '../components/icons';

export interface Service {
  /** Unieke sleutel — wordt ook gebruikt als waarde in het contactformulier. */
  id: string;
  title: string;
  description: string;
  icon: IconName;
}

/**
 * Diensten. Deze lijst voedt zowel de dienstensectie als de
 * "Type werkzaamheden"-keuze in het contactformulier, zodat beide
 * altijd synchroon blijven.
 */
export const services: Service[] = [
  {
    id: 'grondwerk',
    title: 'Grondwerken',
    description:
      'Ondersteuning bij grondwerk en voorbereidende werkzaamheden voor uiteenlopende projecten.',
    icon: 'excavator',
  },
  {
    id: 'kraanwerk',
    title: 'Kraanwerk',
    description: 'Inzetbaar als kraanmachinist voor professionele werkzaamheden op locatie.',
    icon: 'crane',
  },
  {
    id: 'shovelwerk',
    title: 'Shovelwerk',
    description: 'Ervaren inzet voor werkzaamheden waarbij een shovel nodig is.',
    icon: 'loader',
  },
  {
    id: 'straatwerk',
    title: 'Straatwerk',
    description: 'Ondersteuning bij bestrating en aanverwante werkzaamheden.',
    icon: 'paving',
  },
  {
    id: 'transport',
    title: 'Transport',
    description: 'Betrouwbaar vervoer voor materialen en werkzaamheden.',
    icon: 'truck',
  },
  {
    id: 'pakketten-transport',
    title: 'Pakketten transport',
    description: 'Flexibele ondersteuning voor pakket- en transportopdrachten.',
    icon: 'package',
  },
];

/** Opties voor het veld "Type werkzaamheden" in het contactformulier. */
export const werkzaamhedenOpties: { value: string; label: string }[] = [
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'anders', label: 'Anders' },
];
