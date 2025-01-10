export interface Outfit {
    id: string
    name: string
    items: {
      shirt: string
      pants: string
      shoes: string
    }
    createdAt: Date
  }
  
  export interface Filter {
    category?: string
    brand?: string
    occasion?: string
    color?: string
  }
  
  