export interface Options {
  id: string;
  title: string;
  description: string;
  section: string;
  checked: boolean;
  function?: string;
}

export const defaultOptions: Options[] = [
  {
    id: 'c28ab596-04eb-4247-b9b6-827cb85e0673',
    title: 'Hide home',
    description: 'Hide home option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '6808e452-0a35-4eb4-9c16-361e23d223fc',
    title: 'Hide diary',
    description: 'Hide diary option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '56a30745-7289-4743-ace9-9ac2f27c3a8a',
    title: 'Hide reviews',
    description: 'Hide reviews option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '26a16e37-3af2-48fb-a150-c970b3abd47a',
    title: 'Hide likes',
    description: 'Hide likes option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '93f8967e-fb6c-470e-9eab-98fcadf61fbb',
    title: 'Hide tags',
    description: 'Hide tags option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: 'a042f97e-14e4-49ea-ab8e-e7f75028d3f6',
    title: 'Hide network',
    description: 'Hide network option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '7f8aa1e7-4a62-4984-bd45-f8ebabbb378a',
    title: 'Hide subscriptions',
    description: 'Hide subscriptions option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '76bfe9a4-c15b-4150-9a8d-89f0cb670e08',
    title: 'Hide subscriptions',
    description: 'Hide subscriptions option from the main menu',
    section: 'Menu',
    checked: false
  },
  {
    id: '1af6f649-002b-4064-a18f-87312c54270e',
    title: 'Hide members',
    description: 'Hide members option from the navbar',
    section: 'Navbar',
    checked: false
  },
  {
    id: 'c1494c7d-fd3f-4d23-b954-21152b3022c0',
    title: 'Hide journal',
    description: 'Hide journal option from the navbar',
    section: 'Navbar',
    checked: false
  },
  {
    id: '7bc424e0-1f01-447d-8b50-8b509ce1186c',
    title: 'Hide journal',
    description: 'Hide journal option from the navbar',
    section: 'Navbar',
    checked: false
  },
  {
    id: '5a16c928-7bba-4851-8fdc-e6f59fa4d123',
    title: 'Open with large cards',
    description: 'Always open films with large cards',
    section: 'Films',
    checked: false
  },
  {
    id: 'c2446f09-f9ea-4369-a4f9-29a21f89cc53',
    title: 'Show films score',
    description: 'Show films score on its poster',
    section: 'Films',
    function: 'showFilmsScore',
    checked: false
  },
  {
    id: 'a295bb8f-cc92-411c-b33e-844877a3e3ef',
    title: 'Show english title',
    description: 'Show films english title on its poster',
    section: 'Films',
    checked: false
  },
  {
    id: 'c5e09c57-e0ec-4d8b-b680-8dcbfa8c4b00',
    title: 'Hide reviewed filter',
    description: 'Hide reviewed filter',
    section: 'Filter',
    checked: false
  },
  {
    id: '47d993eb-8de1-46aa-88e3-096902dab498',
    title: 'Hide rewatched filter',
    description: 'Hide rewatched filter',
    section: 'Filter',
    checked: false
  },
  {
    id: '30c62cfe-aec2-45cb-90bb-2a01d9a70bb7',
    title: 'Hide logged filter',
    description: 'Hide logged filter',
    section: 'Filter',
    checked: false
  },
  {
    id: 'd8d9fa87-e9be-47cd-adbe-caebb0c2009a',
    title: 'Hide rated filter',
    description: 'Hide rated filter',
    section: 'Filter',
    checked: false
  },
  {
    id: '0da1fb63-2ae1-4180-b1ca-72311a297156',
    title: 'Hide liked filter',
    description: 'Hide liked filter',
    section: 'Filter',
    checked: false
  },
  {
    id: '4a589e1f-d063-44cd-85c4-972f18f1df00',
    title: 'Hide documentries filter',
    description: 'Hide documentries filter',
    section: 'Filter',
    checked: false
  },
  {
    id: 'ea2824c3-7dd7-47a7-9c4b-bb0094716127',
    title: 'Hide tvshows filter',
    description: 'Hide tvshows filter',
    section: 'Filter',
    checked: false
  },
  {
    id: '742370ca-b3da-43b5-ab14-694fd3fa5f31',
    title: 'Hide your rating sort',
    description: 'Hide your rating sort',
    section: 'Sort',
    checked: false
  },
  {
    id: 'cb12b7cb-1847-4444-9e7b-e001d1a0187f',
    title: 'Hide your interest sort',
    description: 'Hide your interest sort',
    section: 'Sort',
    checked: false
  },
  {
    id: '816d24b0-a225-428f-a545-f17d821406f5',
    title: 'Hide popularity with friends sort',
    description: 'Hide popularity with friends sort',
    section: 'Sort',
    checked: false
  }
];
