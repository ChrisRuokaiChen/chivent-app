// client/src/pages/HomePage.jsx

import NavBar        from '../components/NavBar';
import HeroCarousel  from '../components/HeroCarousel';
import EventsGrid    from '../components/EventsGrid';

export default function HomePage() {
  return (
    <>
      <NavBar />
      <HeroCarousel />
      <EventsGrid />
    </>
  );
}
