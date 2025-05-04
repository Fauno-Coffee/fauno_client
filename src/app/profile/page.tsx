import s from './page.module.css';
import { Navbar } from '@/components/Navbar';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import { Profile } from '@/blocks/Profile';
import { StickyNavbar } from '@/components/StickyNavbar';

export default function ProfilePage() {
  return (
    <div className={s.page}>
      <Navbar black />
      <BurgerNavbar />
      <Profile />
    </div>
  );
}
