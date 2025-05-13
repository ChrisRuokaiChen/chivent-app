import { useState, useEffect } from 'react';

const slides = [
  {
    id: '1',
    title: 'Coding Social',
    imageUrl: '/images/jazz.jpg'
  },
  {
    id: '2',
    title: 'Live Music Fest',
    imageUrl: '/images/park.jpg'
  },
  {
    id: '3',
    title: 'Garden Gallery',
    imageUrl: '/images/utah.jpg'
  },
  {
    id: '4',
    title: 'Paint Night',
    imageUrl: '/images/mountain.jpg'
  },
  {
    id: '5',
    title: 'Moonlight',
    imageUrl: '/images/water.jpg'
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((c) => (c + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="carousel">
      <div
        className="slides"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((s) => (
          <div key={s.id} className="slide">
            <img src={s.imageUrl} alt={s.title} />
            <div className="slide-overlay" />
            <div className="slide-content">
              <h2>{s.title}</h2>
            </div>
          </div>
        ))}
      </div>
      <div className="discover">Discover more</div>
      <a href="#events" className="scroll-arrow">▼</a>
      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot${i === current ? ' active' : ''}`}
            onClick={() => setCurrent(i)}
          />
        ))}
      </div>
    </section>
  );
}
