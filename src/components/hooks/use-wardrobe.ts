'use client'

import { useState, useCallback } from 'react'
import { ClothingItem, WardrobeState } from '../../types/clothing'

export function useWardrobe(items: ClothingItem[]) {
  const [state, setState] = useState<WardrobeState>({
    currentShirtIndex: 0,
    currentPantsIndex: 0,
    currentShoesIndex: 0,
  })

  const shirts = items.filter(item => item.type === 'shirt')
  const pants = items.filter(item => item.type === 'pants')
  const shoes = items.filter(item => item.type === 'shoes')

  const cycleItem = useCallback((type: 'shirt' | 'pants' | 'shoes', direction: 'next' | 'prev') => {
    setState(prev => {
      const getNextIndex = (current: number, max: number) => {
        if (direction === 'next') {
          return (current + 1) % max
        }
        return (current - 1 + max) % max
      }

      switch (type) {
        case 'shirt':
          return {
            ...prev,
            currentShirtIndex: getNextIndex(prev.currentShirtIndex, shirts.length)
          }
        case 'pants':
          return {
            ...prev,
            currentPantsIndex: getNextIndex(prev.currentPantsIndex, pants.length)
          }
        case 'shoes':
          return {
            ...prev,
            currentShoesIndex: getNextIndex(prev.currentShoesIndex, shoes.length)
          }
      }
    })
  }, [shirts.length, pants.length, shoes.length])

  return {
    currentShirt: shirts[state.currentShirtIndex],
    currentPants: pants[state.currentPantsIndex],
    currentShoes: shoes[state.currentShoesIndex],
    allShirts: shirts,
    allPants: pants,
    allShoes: shoes,
    cycleItem
  }
}

