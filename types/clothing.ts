export interface ClothingItem {
  id: string
  name: string
  imageUrl: string
  type: 'shirt' | 'pants' | 'shoes'
}

export interface WardrobeState {
  currentShirtIndex: number
  currentPantsIndex: number
  currentShoesIndex: number
}

