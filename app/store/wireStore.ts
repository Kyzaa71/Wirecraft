import { create } from 'zustand';
import { WireElement, DeviceMode } from '../types';

interface HistoryEntry {
  elements: WireElement[];
}

interface WireStore {
  elements: WireElement[];
  selectedId: string | null;
  mode: DeviceMode;
  history: HistoryEntry[];
  historyIndex: number;

  setMode: (mode: DeviceMode) => void;
  addElement: (el: WireElement) => void;
  updateElement: (id: string, updates: Partial<WireElement>) => void;
  deleteElement: (id: string) => void;
  selectElement: (id: string | null) => void;
  clearCanvas: () => void;
  bringForward: (id: string) => void;
  sendBackward: (id: string) => void;
  duplicateElement: (id: string) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

let idCounter = 0;
export const newId = () => `el_${Date.now()}_${++idCounter}`;

const snapshot = (elements: WireElement[]): HistoryEntry => ({
  elements: elements.map(e => ({ ...e })),
});

export const useWireStore = create<WireStore>((set, get) => ({
  elements: [],
  selectedId: null,
  mode: 'web',
  history: [{ elements: [] }],
  historyIndex: 0,
  canUndo: false,
  canRedo: false,

  setMode: (mode) => set({ mode, elements: [], selectedId: null, history: [{ elements: [] }], historyIndex: 0, canUndo: false, canRedo: false }),

  addElement: (el) => {
    const { elements, history, historyIndex } = get();
    const newElements = [...elements, el];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(snapshot(newElements));
    set({
      elements: newElements,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: true,
      canRedo: false,
      selectedId: el.id,
    });
  },

  updateElement: (id, updates) => {
    set((state) => ({
      elements: state.elements.map(el => el.id === id ? { ...el, ...updates } : el),
    }));
  },

  deleteElement: (id) => {
    const { elements, history, historyIndex } = get();
    const newElements = elements.filter(el => el.id !== id);
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(snapshot(newElements));
    set({
      elements: newElements,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: true,
      canRedo: false,
      selectedId: null,
    });
  },

  selectElement: (id) => set({ selectedId: id }),

  clearCanvas: () => {
    const { history, historyIndex } = get();
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push({ elements: [] });
    set({
      elements: [],
      selectedId: null,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: true,
      canRedo: false,
    });
  },

  bringForward: (id) => {
    set((state) => {
      const max = Math.max(...state.elements.map(e => e.zIndex));
      return {
        elements: state.elements.map(el => el.id === id ? { ...el, zIndex: max + 1 } : el),
      };
    });
  },

  sendBackward: (id) => {
    set((state) => {
      const min = Math.min(...state.elements.map(e => e.zIndex));
      return {
        elements: state.elements.map(el => el.id === id ? { ...el, zIndex: Math.max(0, min - 1) } : el),
      };
    });
  },

  duplicateElement: (id) => {
    const { elements, history, historyIndex } = get();
    const src = elements.find(e => e.id === id);
    if (!src) return;
    const newEl: WireElement = { ...src, id: newId(), x: src.x + 20, y: src.y + 20 };
    const newElements = [...elements, newEl];
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(snapshot(newElements));
    set({
      elements: newElements,
      history: newHistory,
      historyIndex: newHistory.length - 1,
      canUndo: true,
      canRedo: false,
      selectedId: newEl.id,
    });
  },

  undo: () => {
    const { historyIndex, history } = get();
    if (historyIndex <= 0) return;
    const newIndex = historyIndex - 1;
    const entry = history[newIndex];
    set({
      elements: entry.elements.map(e => ({ ...e })),
      historyIndex: newIndex,
      selectedId: null,
      canUndo: newIndex > 0,
      canRedo: true,
    });
  },

  redo: () => {
    const { historyIndex, history } = get();
    if (historyIndex >= history.length - 1) return;
    const newIndex = historyIndex + 1;
    const entry = history[newIndex];
    set({
      elements: entry.elements.map(e => ({ ...e })),
      historyIndex: newIndex,
      selectedId: null,
      canUndo: true,
      canRedo: newIndex < history.length - 1,
    });
  },
}));