// pages/index.js
import { useState, useEffect } from 'react';

const products = [
  { name: "Eveline Mattifying Primer", price: 399, type: "Primer" },
  { name: "GOSH Velvet Touch Primer", price: 2120, type: "Primer" },
  { name: "Eveline Selfie Time Foundation", price: 399, type: "Foundation" },
  { name: "GOSH Full Coverage Foundation", price: 2120, type: "Foundation" },
  { name: "Eveline Liquid Camouflage Concealer", price: 499, type: "Concealer" },
  { name: "MAC Studio Fix Concealer", price: 3500, type: "Concealer" },
  { name: "Eveline Banana Loose Powder", price: 1085, type: "Setting Powder" },
  { name: "Laura Mercier Setting Powder", price: 4500, type: "Setting Powder" },
  { name: "Focallure Eyeshadow Palette", price: 650, type: "Eyeshadow" },
  { name: "Huda Beauty Obsessions Palette", price: 3500, type: "Eyeshadow" },
  { name: "Eveline Waterproof Eyeliner Pencil", price: 349, type: "Eyeliner" },
  { name: "MAC Liquidlast Liner", price: 2500, type: "Eyeliner" },
  { name: "Eveline Big Volume Mascara", price: 449, type: "Mascara" },
  { name: "GOSH Boombastic Mascara", price: 1560, type: "Mascara" },
  { name: "LAKME Enrich Matte Lipstick", price: 350, type: "Lipstick" },
  { name: "MAC Matte Lipstick", price: 2200, type: "Lipstick" },
  { name: "NYX Butter Gloss", price: 850, type: "Lip Gloss" },
  { name: "Fenty Gloss Bomb", price: 2500, type: "Lip Gloss" }
];

export default function Home() {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [hasSelected, setHasSelected] = useState(false);
  const currentMonth = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

  useEffect(() => {
    fetch('/api/gift')
      .then(res => res.json())
      .then(data => {
        const existing = data.data.find(gift => gift.month === currentMonth);
        if (existing) {
          setSelectedIndex(existing.productIndex);
          setHasSelected(true);
        }
      });
  }, [currentMonth]);

  const handleSelect = (index) => {
    if (hasSelected) return;
    setSelectedIndex(index);
  };

  const handleSubmit = () => {
    if (selectedIndex === null) {
      alert("Please select a product.");
      return;
    }

    const product = products[selectedIndex];
    const payload = {
      productIndex: selectedIndex,
      productName: product.name,
      price: product.price,
      type: product.type,
      month: currentMonth,
    };

    fetch('/api/gift', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert("Gift selection saved!");
          setHasSelected(true);
        } else {
          alert("Failed to save selection.");
        }
      });
  };


  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', color: '#4CAF50', marginBottom: '20px' }}>Monthly Gifting Selection</h1>
      <p style={{ textAlign: 'center', fontSize: '18px', color: '#555' }}>
        Please select your favorite gift from the list below. Choose wisely! 🎁✨
      </p>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
        {products.map((product, index) => (
          <li
            key={index}
            onClick={() => handleSelect(index)}
            style={{
              padding: '15px',
              marginBottom: '12px',
              border: '1px solid #ddd',
              borderRadius: '10px',
              backgroundColor: selectedIndex === index ? '#e8f5e9' : '#fff',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              cursor: hasSelected ? 'not-allowed' : 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              if (!hasSelected) e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              if (!hasSelected) e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div>
              <strong style={{ fontSize: '16px', color: '#333' }}>{product.name}</strong>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#777' }}>
                Tk {product.price} ({product.type})
              </p>
            </div>
            {selectedIndex === index && (
              <span style={{ color: '#4CAF50', fontWeight: 'bold' }}>Selected</span>
            )}
          </li>
        ))}
      </ul>
      {!hasSelected && (
        <button
          onClick={handleSubmit}
          style={{
            display: 'block',
            margin: '30px auto 0',
            padding: '12px 25px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#4CAF50',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#45a049')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#4CAF50')}
        >
          Submit Selection
        </button>
      )}
      {hasSelected && (
        <p style={{ color: '#4CAF50', textAlign: 'center', marginTop: '30px', fontSize: '16px' }}>
          You've already selected a gift this month 💚
        </p>
      )}
    </div>
  );
}
