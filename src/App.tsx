import React, { useState, useEffect } from 'react';
import { OutfitState, GarmentType } from './types';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { HomePage } from './pages/HomePage';
import { DiscoverPage } from './pages/DiscoverPage';
import { StudioPage } from './pages/StudioPage';
import { LookbookView } from './components/lookbook/LookbookView';
import { AIStylistDrawer } from './components/stylist/AIStylistDrawer';
import { getSavedLooks } from './services/storageService';
import { GARMENTS_DATA } from './data/garments';

export default function App() {
  const [currentTab, setCurrentTab] = useState<'home' | 'discover' | 'studio' | 'lookbook'>('home');
  const [isStylistOpen, setIsStylistOpen] = useState(false);
  const [savedCount, setSavedCount] = useState(0);

  // Active outfit state for Việt Phục Studio
  const [studioOutfit, setStudioOutfit] = useState<OutfitState>({
    garmentType: 'ao_dai',
    occasion: 'tet_nguyen_dan',
    style: 'traditional',
    primaryColor: 'red_crimson',
    accessories: ['kieng_bac', 'quat_xep'],
    title: 'Áo Dài Đỏ Son - Sắc Xuân Cố Đô'
  });

  const [initialDiscoverGarment, setInitialDiscoverGarment] = useState<GarmentType>('ao_dai');

  useEffect(() => {
    // Sync initial saved looks count
    const looks = getSavedLooks();
    setSavedCount(looks.length);
  }, []);

  const handleLookSaved = () => {
    const looks = getSavedLooks();
    setSavedCount(looks.length);
  };

  const handleNavigateToStudio = (garmentId?: GarmentType) => {
    if (garmentId) {
      const g = GARMENTS_DATA[garmentId];
      setStudioOutfit(prev => ({
        ...prev,
        garmentType: garmentId,
        primaryColor: g.defaultColor,
        accessories: g.defaultAccessories
      }));
    }
    setCurrentTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToDiscover = (garmentId?: GarmentType) => {
    if (garmentId) {
      setInitialDiscoverGarment(garmentId);
    }
    setCurrentTab('discover');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLoadOutfitToStudio = (outfit: OutfitState) => {
    setStudioOutfit(outfit);
  };

  return (
    <div className="min-h-screen bg-[#FBF9F5] text-[#222120] flex flex-col font-sans selection:bg-[#8B1E2F] selection:text-[#FFF8EE]">
      
      {/* GLOBAL NAVBAR */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenStylist={() => setIsStylistOpen(true)}
        savedCount={savedCount}
      />

      {/* MAIN VIEW CONTAINER */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {currentTab === 'home' && (
          <HomePage
            onNavigateToStudio={handleNavigateToStudio}
            onNavigateToDiscover={handleNavigateToDiscover}
            onOpenStylist={() => setIsStylistOpen(true)}
          />
        )}

        {currentTab === 'discover' && (
          <DiscoverPage
            onSelectGarmentForStudio={(garment) => handleNavigateToStudio(garment)}
            initialGarment={initialDiscoverGarment}
          />
        )}

        {currentTab === 'studio' && (
          <StudioPage
            outfit={studioOutfit}
            onUpdateOutfit={setStudioOutfit}
            onLookSaved={handleLookSaved}
            isStylistOpen={isStylistOpen}
            onOpenStylist={() => setIsStylistOpen(true)}
            onCloseStylist={() => setIsStylistOpen(false)}
          />
        )}

        {currentTab === 'lookbook' && (
          <LookbookView
            onLoadOutfitToStudio={handleLoadOutfitToStudio}
            onNavigateToStudio={() => {
              setCurrentTab('studio');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* GLOBAL AI STYLIST DRAWER (Accessible from any page via Navbar CTA) */}
      <AIStylistDrawer
        isOpen={isStylistOpen && currentTab !== 'studio'}
        onClose={() => setIsStylistOpen(false)}
        currentOutfit={studioOutfit}
        onApplyOutfit={(updated) => {
          setStudioOutfit(updated);
          setCurrentTab('studio');
        }}
      />

      {/* GLOBAL FOOTER */}
      <Footer
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

    </div>
  );
}
