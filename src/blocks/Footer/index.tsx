import Link from 'next/link';
import s from './footer.module.css';
import {
  CloudPaymentsLogo,
  FaunoBigLogo,
  MastercardLogo,
  MirLogo,
  VisaLogo,
} from '@/shared/assets';

export const Footer = () => {
  return (
    <footer className={s.footer}>
      <FaunoBigLogo />

      <div className={s.data_wrapper}>
        <div className={s.data}>
          <span className={s.heading}>
            <Link href='/about'>О нас</Link>
          </span>
          <span>
            <Link href='/delivery'>Доставка и оплата</Link>
          </span>
          <span>
            <Link href='/business'>Для бизнеса</Link>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <Link href='/catalog'>Кофе</Link>
          </span>
          <span>
            <Link href='/catalog'>Фильтр</Link>
          </span>
          <span>
            <Link href='/catalog'>Эспрессо</Link>
          </span>
          <span>
            <Link href='/catalog'>Дрипы</Link>
          </span>
          <span>
            <Link href='/catalog'>Капсулы</Link>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <Link href='/catalog?category=10'>Не кофе</Link>
          </span>
          <span>
            <Link href='/catalog?category=10&subcategory=13'>Мерч</Link>
          </span>
          <span>
            <Link href='/catalog?category=10&subcategory=12'>Подарочные наборы</Link>
          </span>
          <span>
            <Link href='/catalog?category=10&subcategory=11'>Домашняя коллекция</Link>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <p>Контакты</p>
          </span>
          <span>
            <a href='mailto:fauno@fauno.coffee'>fauno@fauno.coffee</a>
          </span>
          <span>
            <a href='tel:89859119114'>+7 985 911-91-14</a>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <a href=''>Медиа</a>
          </span>
          <span>
            <a href=''>Instagram*</a>
          </span>
          <span>
            <a href=''>Telegram</a>
          </span>
        </div>

        <div className={s.data}>
          <div className={s.payments}>
            <span className={s.heading}>Оплата</span>
            <CloudPaymentsLogo />
            <div className={s.logos}>
              <VisaLogo />
              <MastercardLogo />
              <MirLogo />
            </div>
          </div>
        </div>
      </div>

      <div className={s.legal_wrapper}>
        <span>
          2023-{new Date().getFullYear()} © ИП Фадеев С. А. ИНН: 502 919 589 904 ОГРН 315 502 900
          011 337
        </span>
        <span>
          <a href='#'>/ Политика обработки персональных данных</a>
        </span>
        <span>
          <a href='#'>/ Оферта</a>
        </span>
      </div>
    </footer>
  );
};
