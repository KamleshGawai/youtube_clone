import React, { useState, useRef, useEffect } from 'react';

const CategoryFilter = ({ onCategoryChange, selectedCategory }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);
  
  const categories = [
    { id: 'all', label: 'All' },
    { id: 'news', label: 'News' },
    { id: 'music', label: 'Music' },
    { id: 'shaun-the-sheep', label: 'Shaun the Sheep' },
    { id: 'dreamworks', label: 'DreamWorks Animation' },
    { id: 'airplanes', label: 'Airplanes' }
  ];

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  return (
    <div className="filter-container">
      <div className="filter-wrapper">
        {scrollPosition > 0 && (
          <button
            onClick={() => scroll('left')}
            className="scroll-button"
          >
            <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        <div 
          ref={scrollContainerRef}
          className="category-list"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`category-button ${selectedCategory === category.id ? 'active' : ''}`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="scroll-button"
        >
          <svg className="scroll-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <style>
        {`
          .filter-container {
            position: relative;
            background-color: white;
            border-top: 1px solid #e5e5e5;
            border-bottom: 1px solid #e5e5e5;
          }

          .filter-wrapper {
            display: flex;
            align-items: center;
            position: relative;
            
          }

          .scroll-button {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 48px;
            height: 48px;
            background-color: white;
            border: none;
            cursor: pointer;
            transition: background-color 0.2s;
          }

          .scroll-button:hover {
            background-color: #f0f0f0;
          }

          .scroll-icon {
            width: 24px;
            height: 24px;
          }

          .category-list {
            display: flex;
            gap: 12px;
            overflow-x: auto;
            padding: 12px 16px;
            scroll-behavior: smooth;
            -ms-overflow-style: none;
            scrollbar-width: none;
          }

          .category-list::-webkit-scrollbar {
            display: none;
          }

          .category-button {
            padding: 6px 12px;
            border-radius: 8px;
            white-space: nowrap;
            font-size: 14px;
            font-weight: 500;
            border: none;
            background-color: #f0f0f0;
            color: #0f0f0f;
            cursor: pointer;
            transition: all 0.2s;
          }

          .category-button:hover {
            background-color: #e0e0e0;
          }

          .category-button.active {
            background-color: #0f0f0f;
            color: white;
          }

          @media (max-width: 768px) {
            .scroll-button {
              width: 40px;
              height: 40px;
            }

            .category-list {
              padding: 8px 12px;
            }

            .category-button {
              padding: 4px 10px;
              font-size: 13px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default CategoryFilter;