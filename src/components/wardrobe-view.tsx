'use client';

import { useState } from 'react';
import {
  Heart,
  Plus,
  Home,
  Calendar,
  Wand2,
  ShirtIcon,
  User,
} from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ImagePicker } from './image-picker';
import { ItemForm } from './item-form';
import { useWardrobe } from './hooks/use-wardrobe';
import { wardrobeItems } from '../../data/wardrobe-items';
import { ClothingItem } from '../../types/clothing';
import { Filter } from '../../types/outfit'
import { FilterSidebar } from './filter-sidebar'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { useCallback } from 'react';
import { useEffect } from 'react';
import { type CarouselApi } from '@/components/ui/carousel';
import { useToast } from "@/components/hooks/use-toast"

interface ClothingSectionProps {
  items: ClothingItem[];
  type: 'shirt' | 'pants' | 'shoes';
  onPrev: () => void;
  onNext: () => void;
}

function ClothingSection({
  items,
  type,
  onPrev,
  onNext,
}: ClothingSectionProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const imageHeight = type === 'shoes' ? 100 : 300;
  const imageWidth = type === 'shoes' ? 150 : type === 'pants' ? 150 : 250;

  const handlePrev = useCallback(() => {
    api?.scrollPrev();
    onPrev();
  }, [api, onPrev]);

  const handleNext = useCallback(() => {
    api?.scrollNext();
    onNext();
  }, [api, onNext]);

  return (
    <Carousel className="w-full max-w-xs mx-auto" setApi={setApi}>
      <CarouselContent>
        {items.map((item, index) => (
          <CarouselItem key={item.id}>
            <div className="flex items-center justify-center p-2">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={imageWidth}
                height={imageHeight}
                className="object-contain"
                priority
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious onClick={handlePrev} />
      <CarouselNext onClick={handleNext} />
    </Carousel>
  );
}

export default function WardrobeView() {
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const {
    currentShirt,
    currentPants,
    currentShoes,
    cycleItem,
    allShirts,
    allPants,
    allShoes,
  } = useWardrobe(wardrobeItems);
  const [filters, setFilters] = useState<Filter>({})
  const { toast } = useToast()

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setIsImagePickerOpen(false);
  };

  if (selectedImage) {
    return (
      <ItemForm
        imageUrl={selectedImage}
        onBack={() => setSelectedImage(null)}
      />
    );
  }

  const handleSaveOutfit = () => {
    // Mock save functionality - replace with actual data storage
    toast({
      title: "Outfit saved!",
      description: "Your outfit has been saved to your collection."
    })
  }

  return (
    <div className="py-2 w-full max-w-md mx-auto bg-white flex flex-col">
      <div className="px-4 py-2 flex items-center justify-between"></div>

      {/* Top Actions */}
      <div className="px-4 py-2 flex items-center justify-between">
        <FilterSidebar filters={filters} onFilterChange={setFilters} />
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsImagePickerOpen(true)}
          >
            <Plus className="h-6 w-6" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleSaveOutfit}
          >
            <Heart className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4 pt-10 pb-5 flex flex-col gap-8">
        <ClothingSection
          items={allShirts}
          type="shirt"
          onPrev={() => cycleItem('shirt', 'prev')}
          onNext={() => cycleItem('shirt', 'next')}
        />
        <ClothingSection
          items={allPants}
          type="pants"
          onPrev={() => cycleItem('pants', 'prev')}
          onNext={() => cycleItem('pants', 'next')}
        />
        <ClothingSection
          items={allShoes}
          type="shoes"
          onPrev={() => cycleItem('shoes', 'prev')}
          onNext={() => cycleItem('shoes', 'next')}
        />
      </div>
      <div className="px-4 border-t flex items-center justify-around">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Calendar className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="bg-purple-100 rounded-full"
        >
          <Wand2 className="h-6 w-6 text-purple-500" />
        </Button>
        <Button variant="ghost" size="icon">
          <ShirtIcon className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <User className="h-6 w-6" />
        </Button>
      </div>

      <ImagePicker
        open={isImagePickerOpen}
        onClose={() => setIsImagePickerOpen(false)}
        onSelect={handleImageSelect}
      />
    </div>
  );
}

