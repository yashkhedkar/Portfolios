"use client";

import { useState } from 'react';
import './flipcards.css';

interface PetCard {
  id: number;
  name: string;
  subtitle: string;
  age: string;
  length: string;
  weight: string;
  // URLs are handled in CSS for this specific implementation to match the provided code exactly
}

const pets: PetCard[] = [
  {
    id: 1,
    name: 'Jenny',
    subtitle: 'felis hairyus',
    age: '6 years',
    length: '46cm',
    weight: '4kg'
  },
  {
    id: 2,
    name: 'Mishka',
    subtitle: 'felis catus',
    age: '7 years',
    length: '42cm',
    weight: '3.8kg'
  },
  {
    id: 3,
    name: 'Kyra',
    subtitle: 'felix pumus',
    age: '5 years',
    length: '50cm',
    weight: '5.2kg'
  }
];

const FlipCardsSection = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [prevCard, setPrevCard] = useState<number | null>(null);

  const handleFlip = (id: number) => {
    // If clicking the currently active card, close it
    if (activeCard === id) {
      setPrevCard(id);
      setActiveCard(null);
    } else {
      // If clicking a new card, close the old one (if exists) and open the new one
      if (activeCard !== null) {
        setPrevCard(activeCard);
      }
      setActiveCard(id);
    }
  };

  const getFlipClass = (id: number) => {
    if (activeCard === id) return 'flip-in';
    if (prevCard === id) return 'flip-out';
    return ''; // Initial state or closed
  };

  return (
    <section className="cards-container-wrapper">
      {/* Container wrapper for centering/bg matching the provided body styles */}
      
      <div className="cards-wrapper"> 
        {pets.map((pet) => (
          <div key={pet.id} className="card-wrapper">
            <div className={`card-${pet.id} card-object card-object-hf ${getFlipClass(pet.id)}`}>
              
              {/* Front Face */}
              <a 
                className="face front" 
                href="#"
                onClick={(e) => { e.preventDefault(); handleFlip(pet.id); }}
              >
                <div className="title-wrapper">
                  <div className="title">{pet.name}</div>
                  <div className="subtitle">{pet.subtitle}</div>
                </div>
              </a>

              {/* Back Face */}
              <a 
                className="face back" 
                href="#"
                onClick={(e) => { e.preventDefault(); handleFlip(pet.id); }}
              >
                <div className="img-wrapper">
                  {/* Image set via CSS */}
                  <div className="avatar"></div>
                </div>
                
                <div className="info-wrapper">
                  <div className="info-title">{pet.name}</div>
                  <ul className="info-content">
                    <li className="info-content-item">
                      Age <span>{pet.age}</span>
                    </li>
                    <li className="info-content-item">
                      Length <span>{pet.length}</span>
                    </li>
                    <li className="info-content-item">
                      Weight <span>{pet.weight}</span>
                    </li>
                  </ul>
                </div>
              </a>

            </div>
          </div>
        ))}
      </div>
      
    </section>
  );
};

export default FlipCardsSection;
