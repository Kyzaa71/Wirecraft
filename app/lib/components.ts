import { Category } from '../types';

export const CATEGORIES: Category[] = [
  {
    name: 'Navigasi',
    items: [
      { id: 'navbar', name: 'Navbar', defaultW: 420, defaultH: 52, category: 'Navigasi', thumb: 'nav' },
      { id: 'sidebar-el', name: 'Sidebar', defaultW: 160, defaultH: 320, category: 'Navigasi', thumb: 'sb' },
      { id: 'tab-bar', name: 'Tab Bar', defaultW: 320, defaultH: 56, category: 'Navigasi', thumb: 'tab' },
      { id: 'footer', name: 'Footer', defaultW: 420, defaultH: 52, category: 'Navigasi', thumb: 'foot' },
      { id: 'breadcrumb', name: 'Breadcrumb', defaultW: 240, defaultH: 32, category: 'Navigasi', thumb: 'bc' },
    ],
  },
  {
    name: 'Layout & Konten',
    items: [
      { id: 'hero', name: 'Hero Section', defaultW: 400, defaultH: 220, category: 'Layout', thumb: 'hero' },
      { id: 'card', name: 'Card', defaultW: 180, defaultH: 230, category: 'Layout', thumb: 'card' },
      { id: 'grid-2', name: 'Grid 2 Kolom', defaultW: 300, defaultH: 160, category: 'Layout', thumb: 'g2' },
      { id: 'grid-3', name: 'Grid 3 Kolom', defaultW: 340, defaultH: 160, category: 'Layout', thumb: 'g3' },
      { id: 'modal', name: 'Modal / Dialog', defaultW: 260, defaultH: 210, category: 'Layout', thumb: 'modal' },
      { id: 'divider', name: 'Divider', defaultW: 320, defaultH: 24, category: 'Layout', thumb: 'div' },
      { id: 'accordion', name: 'Accordion', defaultW: 280, defaultH: 130, category: 'Layout', thumb: 'acc' },
    ],
  },
  {
    name: 'Tipografi',
    items: [
      { id: 'heading', name: 'Heading', defaultW: 260, defaultH: 72, category: 'Tipografi', thumb: 'h' },
      { id: 'text-block', name: 'Blok Teks', defaultW: 260, defaultH: 90, category: 'Tipografi', thumb: 'txt' },
      { id: 'badge', name: 'Badge / Tag', defaultW: 120, defaultH: 40, category: 'Tipografi', thumb: 'bdg' },
      { id: 'blockquote', name: 'Blockquote', defaultW: 260, defaultH: 80, category: 'Tipografi', thumb: 'bq' },
    ],
  },
  {
    name: 'Media',
    items: [
      { id: 'image', name: 'Gambar', defaultW: 220, defaultH: 160, category: 'Media', thumb: 'img' },
      { id: 'avatar', name: 'Avatar', defaultW: 80, defaultH: 80, category: 'Media', thumb: 'av' },
      { id: 'video', name: 'Video Player', defaultW: 280, defaultH: 170, category: 'Media', thumb: 'vid' },
      { id: 'map', name: 'Map', defaultW: 280, defaultH: 200, category: 'Media', thumb: 'map' },
    ],
  },
  {
    name: 'Form & Input',
    items: [
      { id: 'input', name: 'Input Field', defaultW: 240, defaultH: 40, category: 'Form', thumb: 'inp' },
      { id: 'textarea', name: 'Textarea', defaultW: 240, defaultH: 100, category: 'Form', thumb: 'ta' },
      { id: 'select', name: 'Dropdown', defaultW: 200, defaultH: 40, category: 'Form', thumb: 'sel' },
      { id: 'button', name: 'Tombol Filled', defaultW: 130, defaultH: 40, category: 'Form', thumb: 'btn' },
      { id: 'btn-outline', name: 'Tombol Outline', defaultW: 130, defaultH: 40, category: 'Form', thumb: 'bto' },
      { id: 'checkbox', name: 'Checkbox', defaultW: 160, defaultH: 80, category: 'Form', thumb: 'cb' },
      { id: 'radio', name: 'Radio Button', defaultW: 160, defaultH: 80, category: 'Form', thumb: 'rb' },
      { id: 'toggle', name: 'Toggle Switch', defaultW: 160, defaultH: 60, category: 'Form', thumb: 'tog' },
      { id: 'slider', name: 'Slider', defaultW: 220, defaultH: 44, category: 'Form', thumb: 'slid' },
      { id: 'form', name: 'Form', defaultW: 260, defaultH: 220, category: 'Form', thumb: 'frm' },
      { id: 'progress', name: 'Progress Bar', defaultW: 240, defaultH: 48, category: 'Form', thumb: 'prg' },
    ],
  },
  {
    name: 'Data',
    items: [
      { id: 'table', name: 'Tabel', defaultW: 340, defaultH: 190, category: 'Data', thumb: 'tbl' },
      { id: 'list-item', name: 'List Item', defaultW: 280, defaultH: 56, category: 'Data', thumb: 'lst' },
      { id: 'pagination', name: 'Pagination', defaultW: 240, defaultH: 40, category: 'Data', thumb: 'pag' },
      { id: 'stat-card', name: 'Stat Card', defaultW: 160, defaultH: 90, category: 'Data', thumb: 'stat' },
    ],
  },
  {
    name: 'Notifikasi',
    items: [
      { id: 'alert', name: 'Alert Banner', defaultW: 300, defaultH: 56, category: 'Notifikasi', thumb: 'alt' },
      { id: 'toast', name: 'Toast', defaultW: 240, defaultH: 56, category: 'Notifikasi', thumb: 'tst' },
      { id: 'tooltip', name: 'Tooltip', defaultW: 140, defaultH: 44, category: 'Notifikasi', thumb: 'tip' },
    ],
  },
];