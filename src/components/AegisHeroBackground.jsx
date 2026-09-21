import React from 'react';
import './AegisHeroBackground.css';

export default function AegisHeroBackground({ className = '' }) {
  return (
    <div className={`aegis-hero-bg ${className}`} aria-hidden="true">
      {/* Precision Technical Grid */}
      <div className="aegis-hero-bg__grid" />

      {/* Subtle Micro Crosshairs for Technical Infrastructure Aesthetic */}
      <div className="aegis-hero-bg__crosshairs" />

      {/* Restrained Cyan Depth Glow */}
      <div className="aegis-hero-bg__atmosphere" />

      {/* Clean Edge Fade */}
      <div className="aegis-hero-bg__vignette" />
    </div>
  );
}
