'use client'
import React, { useState } from 'react';
import { categories } from '../data/categories';
// import { useStore } from '../store/store';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

export const CategoryFilter = () => {
  const [selectedCategory, setSelectedCategory] = useState<any>();

  return (
    <div className="mb-6 flex items-center">
      <Filter className="mr-2" />
      <span className="mr-4 font-medium">Filter by Category:</span>
      <div className="flex space-x-2">
        <Button
          variant={!selectedCategory ? 'default' : 'outline'}
          onClick={() => setSelectedCategory(null)}
        >
          All
        </Button>
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
};
