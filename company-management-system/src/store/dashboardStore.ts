import { create } from 'zustand';
import { WidgetConfig } from '../types/widget';

interface DashboardState {
  selectedCategory: string;
  layout: WidgetConfig[];
  setSelectedCategory: (category: string) => void;
  setLayout: (layout: WidgetConfig[]) => void;
  saveLayout: () => void;
  loadLayout: () => void;
}

const DEFAULT_LAYOUT: WidgetConfig[] = [
  { id: 'total-value', type: 'stat', title: 'Total Inventory Value', colSpan: 1 },
  { id: 'category-dist', type: 'chart', title: 'Category Distribution', colSpan: 2 },
  { id: 'top-expensive', type: 'table', title: 'Top 5 Expensive Products', colSpan: 3 },
];

export const useDashboardStore = create<DashboardState>((set, get) => ({
  selectedCategory: 'All Categories',
  layout: DEFAULT_LAYOUT,
  
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  
  setLayout: (layout) => set({ layout }),
  
  saveLayout: () => {
    localStorage.setItem('dashboard-layout', JSON.stringify(get().layout));
  },
  
  loadLayout: () => {
    const saved = localStorage.getItem('dashboard-layout');
    if (saved) {
      try {
        set({ layout: JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to load layout from localStorage', e);
      }
    }
  },
}));
