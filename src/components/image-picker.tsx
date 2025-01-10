'use client'

import { useState } from 'react'
import { Camera, Search, Globe, Folder, ArrowLeft } from 'lucide-react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import Image from 'next/image'

interface ImagePickerProps {
  open: boolean
  onClose: () => void
  onSelect: (image: string) => void
}

export function ImagePicker({ open, onClose, onSelect }: ImagePickerProps) {
  const [selectedTab, setSelectedTab] = useState('camera')

  const mockImages = [
    // 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Magic_Wardrobe-TpClqzeXAXs7jFGGouX3a71ayJXf4v.png',
    '/placeholder.svg?height=300&width=300',
    '/placeholder.svg?height=300&width=300',
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <button onClick={onClose} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-6">
            <button className="p-2">
              <Search className="h-6 w-6" />
            </button>
            <button className="p-2">
              <Globe className="h-6 w-6" />
            </button>
          </div>
        </div>
        <Tabs defaultValue="camera" className="w-full" onValueChange={setSelectedTab}>
          <TabsList className="grid grid-cols-3 p-0 h-12">
            <TabsTrigger value="camera" className="data-[state=active]:bg-purple-100">
              <Folder className="h-5 w-5 text-purple-500" />
            </TabsTrigger>
            <TabsTrigger value="search" className="data-[state=active]:bg-purple-100">
              <Search className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="web" className="data-[state=active]:bg-purple-100">
              <Globe className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
          <div className="p-4">
            <div className="grid grid-cols-3 gap-2">
              {selectedTab === 'camera' && (
                <button className="aspect-square flex items-center justify-center border-2 border-dashed rounded-lg">
                  <Camera className="h-6 w-6" />
                </button>
              )}
              {mockImages.map((src, i) => (
                <button
                  key={i}
                  className="aspect-square relative overflow-hidden rounded-lg"
                  onClick={() => onSelect(src)}
                >
                  <Image
                    src={src}
                    alt={`Gallery image ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

