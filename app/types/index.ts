export type DeviceMode = 'web' | 'mobile';

export interface WireElement {
  id: string;
  compId: string;
  name: string;
  x: number;
  y: number;
  w: number;
  h: number;
  zIndex: number;
  label?: string;
}

export interface ComponentDef {
  id: string;
  name: string;
  defaultW: number;
  defaultH: number;
  category: string;
  thumb: string;
}

export interface Category {
  name: string;
  items: ComponentDef[];
}