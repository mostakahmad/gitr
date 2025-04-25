// pages/index.js
import { useState, useEffect } from 'react';
import { FaHeart, FaGift, FaFacebookMessenger } from 'react-icons/fa';

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
  const [selectedmonth, setSelectedMonth] = useState(null);
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
          setSelectedMonth(existing.month);
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

  const handleMessenger = () => {
    if (selectedIndex === null) {
      alert("Please select a product first!");
      return;
    }
    const text = encodeURIComponent(`Please give me this item: ${products[selectedIndex].name}`);
    window.open(`https://m.me/YOUR_PAGE_USERNAME?ref=${text}`, '_blank');
  };

  return (
    <div style={{
      padding: '20px',
      fontFamily: '"Comic Sans MS", cursive, sans-serif',
      maxWidth: '850px',
      margin: '0 auto',
      background: 'linear-gradient(to bottom right, #ffe0f0, #f0e0ff)',
      borderRadius: '20px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '20px', position: 'relative' }}>
        {/* <img src="/lyandra-lyandra-family.gif" alt="hearts" style={{ width: '80px', position: 'absolute', top: '-20px', left: '30px' }} /> */}
        {/* <img src="/floating-gift.gif" alt="gift" style={{ width: '60px', position: 'absolute', top: '-10px', right: '30px' }} /> */}
        <h1 style={{ color: '#ff66b2', fontSize: '32px', fontWeight: 'bold' }}>🎀 Monthly Gifting Selection 🎀</h1>
        <p style={{ fontSize: '18px', color: '#555' }}>
          Please select your favorite gift from the list below. Choose wisely! <FaGift color="#f50057" />
        </p>
        <p style={{ fontSize: '16px', color: '#777' }}>
          {hasSelected ? `You have already selected a gift for ${selectedmonth}.` : "Select a gift for this month!"}
        </p>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '30px' }}>
        {products.map((product, index) => (
          <li
            key={index}
            onClick={() => handleSelect(index)}
            style={{
              padding: '15px',
              marginBottom: '12px',
              border: '2px dashed #d48eb2',
              borderRadius: '15px',
              backgroundColor: selectedIndex === index ? '#ffe6f0' : '#fff',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              cursor: hasSelected ? 'not-allowed' : 'pointer',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'transform 0.2s ease-in-out',
            }}
            onMouseEnter={(e) => {
              if (!hasSelected) e.currentTarget.style.transform = 'scale(1.03)';
            }}
            onMouseLeave={(e) => {
              if (!hasSelected) e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <div>
              <strong style={{ fontSize: '16px', color: '#c2185b' }}>{product.name}</strong>
              <p style={{ margin: '5px 0', fontSize: '14px', color: '#777' }}>
                Tk {product.price} ({product.type})
              </p>
            </div>
            {selectedIndex === index && (
              <span style={{ color: '#f50057', fontWeight: 'bold' }}>💖 Selected</span>
            )}
          </li>
        ))}
      </ul>

      {!hasSelected && (
        <>
          <button
            onClick={handleSubmit}
            style={{
              display: 'block',
              margin: '30px auto 10px',
              padding: '12px 25px',
              fontSize: '16px',
              color: '#fff',
              backgroundColor: '#f50057',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(245, 0, 87, 0.3)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#c51162')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f50057')}
          >
            🎁 Submit My Selection
          </button>

          <button
            onClick={handleMessenger}
            style={{
              display: 'block',
              margin: '15px auto 0',
              padding: '10px 22px',
              fontSize: '15px',
              color: '#fff',
              backgroundColor: '#0084FF',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 3px 8px rgba(0, 132, 255, 0.3)',
              transition: 'background-color 0.3s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#006fd6')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0084FF')}
          >
            {/* <FaFacebookMessenger style={{ marginRight: '8px' }} /> Message to Request 🎀 */}
          </button>
        </>
      )}

      {hasSelected && (
        <p style={{ color: '#c2185b', textAlign: 'center', marginTop: '30px', fontSize: '18px', fontWeight: 'bold' }}>
          💖 You've already selected a gift this month! 💖
        </p>
      )}
    </div>
  );
}