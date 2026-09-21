// Bilingual presentation taxonomy for the category filter dropdown.
//
// This is UI-only data: the backend stores 3 flat categories (Guitars, Drums,
// Keyboards) with no subcategory field on products, so these subcategories
// don't correspond to real database rows. Parent `name` here is the canonical
// English key and must match a real Category.name from the API exactly — the
// component uses it to look up the real category id (and its DB-sourced
// nameKa) to actually filter products. Subcategory names have no backend
// counterpart, so their Georgian names live here instead.
//
// See localizedText() in lib/i18n.tsx for the fallback rule (Georgian if
// present, else English) this dictionary is designed to be read through.

export interface TaxonomyNode {
  name: string;
  nameKa: string;
}

export interface TaxonomyParent extends TaxonomyNode {
  subcategories: TaxonomyNode[];
}

export const CATEGORY_TAXONOMY: TaxonomyParent[] = [
  {
    name: 'Guitars',
    nameKa: 'გიტარები',
    subcategories: [
      { name: 'Acoustic Guitars', nameKa: 'აკუსტიკური გიტარები' },
      { name: 'Electric Guitars', nameKa: 'ელექტრო გიტარები' },
      { name: 'Bass Guitars', nameKa: 'ბას-გიტარები' },
      { name: 'Ukulele', nameKa: 'უკულელე' },
      { name: 'Classical Guitars', nameKa: 'კლასიკური გიტარები' },
    ],
  },
  {
    name: 'Drums',
    nameKa: 'დასარტყამი ინსტრუმენტები',
    subcategories: [
      { name: 'Acoustic Drum Sets', nameKa: 'აკუსტიკური დრამები' },
      { name: 'Electronic Drums', nameKa: 'ელექტრონული დრამები' },
      { name: 'Percussion', nameKa: 'პერკუსია' },
      { name: 'Cymbals', nameKa: 'თეფშები' },
      { name: 'Drum Accessories', nameKa: 'დასარტყამების აქსესუარები' },
    ],
  },
  {
    name: 'Keyboards',
    nameKa: 'კლავიშებიანი ინსტრუმენტები',
    subcategories: [
      { name: 'Acoustic Pianos', nameKa: 'აკუსტიკური პიანინო' },
      { name: 'Digital Pianos', nameKa: 'ციფრული პიანინოები' },
      { name: 'Synthesizers', nameKa: 'სინთეზატორები' },
      { name: 'MIDI Keyboards', nameKa: 'MIDI კლავიატურები' },
      { name: 'Organs / Accordions', nameKa: 'ორღანები / აკორდეონები' },
    ],
  },
];
