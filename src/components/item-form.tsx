'use client'

import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Image from 'next/image'

interface ItemFormProps {
  imageUrl: string
  onBack: () => void
}

export function ItemForm({ imageUrl, onBack }: ItemFormProps) {
  const [fabricTags, setFabricTags] = useState(['Cotton', 'Polyester'])
  const [careTags, setCareTags] = useState(['Gentle Wash', 'Tumble Dry', 'No Bleach'])

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center justify-between p-4 border-b">
        <button onClick={onBack} className="p-2">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <Button variant="ghost">Save</Button>
      </div>

      <div className="p-4 space-y-6">
        <div className="bg-[#f8f0ff] rounded-lg p-4 aspect-square relative">
          <Image
            src={imageUrl}
            alt="Selected item"
            fill
            className="object-contain"
          />
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" defaultValue="Crewneck T-Shirt" />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select defaultValue="tshirt">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tshirt">T-Shirt</SelectItem>
                <SelectItem value="pants">Pants</SelectItem>
                <SelectItem value="shoes">Shoes</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="brand">Brand</Label>
            <Select defaultValue="uniqlo">
              <SelectTrigger>
                <SelectValue placeholder="Select brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uniqlo">Uniqlo</SelectItem>
                <SelectItem value="zara">Zara</SelectItem>
                <SelectItem value="hm">H&M</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="occasion">Occasion</Label>
            <Select defaultValue="casual">
              <SelectTrigger>
                <SelectValue placeholder="Select occasion" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual</SelectItem>
                <SelectItem value="formal">Formal</SelectItem>
                <SelectItem value="sport">Sport</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="size">Size</Label>
            <Select defaultValue="s">
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xs">XS</SelectItem>
                <SelectItem value="s">S</SelectItem>
                <SelectItem value="m">M</SelectItem>
                <SelectItem value="l">L</SelectItem>
                <SelectItem value="xl">XL</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="color">Color</Label>
            <Select defaultValue="black">
              <SelectTrigger>
                <SelectValue placeholder="Select color" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="black">Black</SelectItem>
                <SelectItem value="white">White</SelectItem>
                <SelectItem value="gray">Gray</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <Input id="price" type="number" defaultValue="19.99" />
          </div>

          <div>
            <Label>Fabric</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {fabricTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1.5 border-2 border-dashed rounded-full text-sm">
                Add
              </button>
            </div>
          </div>

          <div>
            <Label>Care</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {careTags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 bg-gray-100 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1.5 border-2 border-dashed rounded-full text-sm">
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

