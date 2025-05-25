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
            <a href=''>О нас</a>
          </span>
          <span>
            <a href=''>Доставка и оплата</a>
          </span>
          <span>
            <a href=''>Для бизнеса</a>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <a href=''>Кофе</a>
          </span>
          <span>
            <a href=''>Фильтр</a>
          </span>
          <span>
            <a href=''>Эспрессо</a>
          </span>
          <span>
            <a href=''>Дрипы</a>
          </span>
          <span>
            <a href=''>Капсулы</a>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <a href=''>Не кофе</a>
          </span>
          <span>
            <a href=''>Аксессуары</a>
          </span>
          <span>
            <a href=''>Домашняя коллекция</a>
          </span>
          <span>
            <a href=''>Мерч</a>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <a href=''>Контакты</a>
          </span>
          <span>
            <a href=''>Написать в Whatsapp</a>
          </span>
          <span>
            <a href=''>fauno@fauno.coffee</a>
          </span>
          <span>
            <a href=''>+7 999 999 99 99</a>
          </span>
        </div>

        <div className={s.data}>
          <span className={s.heading}>
            <a href=''>Медиа</a>
          </span>
          <span>
            <a href=''>instagram*</a>
          </span>
          <span>
            <a href=''>fauno touring club</a>
          </span>
          <span>
            <a href=''>подписаться на рассылку</a>
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
        <span>2023-{new Date().getFullYear()} © ИП Фадеев С. А. ИНН: 502 919 589 904 ОГРН 315 502 900 011 337</span>
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
