export interface Service {
  /** Wordt gebruikt als waarde in het contactformulier (Type werkzaamheden). */
  id: string;
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    id: 'grondwerk',
    title: 'Grondwerken',
    description:
      'Ondersteuning bij grondwerk en voorbereidende werkzaamheden voor uiteenlopende projecten.',
  },
  {
    id: 'kraanwerk',
    title: 'Kraanwerk',
    description: 'Inzetbaar als kraanmachinist voor professionele werkzaamheden op locatie.',
  },
  {
    id: 'shovelwerk',
    title: 'Shovelwerk',
    description: 'Ervaren inzet voor werkzaamheden waarbij een shovel nodig is.',
  },
  {
    id: 'straatwerk',
    title: 'Straatwerk',
    description: 'Ondersteuning bij bestrating en aanverwante werkzaamheden.',
  },
  {
    id: 'transport',
    title: 'Transport',
    description: 'Betrouwbaar vervoer voor materialen en werkzaamheden.',
  },
  {
    id: 'pakketten-transport',
    title: 'Pakketten transport',
    description: 'Flexibele ondersteuning voor pakket- en transportopdrachten.',
  },
];

/** Opties voor het veld "Type werkzaamheden" in het contactformulier. */
export const workTypeOptions = [
  ...services.map((service) => ({ value: service.id, label: service.title })),
  { value: 'anders', label: 'Anders' },
];
