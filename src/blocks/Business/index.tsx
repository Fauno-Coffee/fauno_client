import s from './Business.module.css';
import { BusinessIcon } from '@/shared/assets/BysinessIcon';
import { ArrowIcon } from '@/shared/assets';
import { GlobeIcon } from '@/shared/assets/GlobeIcon';
import Image from 'next/image';
import { CheckIcon } from '@/shared/assets/CheckIcon';
import { Button } from '@/shared/ui';
import Link from 'next/link';

export const Business = () => {
  return (
    <section className={s.block}>
      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '64px' }}>
          <p className={s.content_info_title}>
            Компания fauno™ специализируется на производстве свежеобжаренного кофе полного цикла в
            Москве
          </p>

          <div className={s.content_info_scheme}>
            <div className={s.scheme_element}>
              <GlobeIcon />
              <p>от закупок зеленого зерна в странах произрастания </p>
            </div>
            <div className={s.heroDiv} style={{ flexShrink: 0, width: '18px' }}>
              <ArrowIcon stroke='black' />
            </div>
            <div className={s.scheme_element}>
              <BusinessIcon />
              <p>до чашки эспрессо в вашем заведении</p>
            </div>
          </div>

          <div className={s.list}>
            <div className={s.listItem}>
              <div className={s.check} style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <p>Собственное современное производство</p>
            </div>
            <div className={s.listItem}>
              <div className={s.check} style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <p>Персональный менеджер</p>
            </div>
            <div className={s.listItem}>
              <div className={s.check} style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <p>Постоянный контроль качества</p>
            </div>
            <div className={s.listItem}>
              <div className={s.check} style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <p>Обучение для вашего персонала</p>
            </div>
            <div className={s.listItem}>
              <div className={s.check} style={{ flexShrink: 0 }}>
                <CheckIcon />
              </div>
              <p>Команда с более чем десятилетним опытом работы с кофе в сегменте specialty.</p>
            </div>
          </div>
        </div>

        <div className={s.content_img}>
          <Image
            fill
            src='/businessmap.png'
            alt='Map of Africa'
            priority
            sizes='100%'
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>

      <div className={s.content_wrapper}>
        <div className={`${s.content_img_gifts} ${s.imggifts}`}>
          <Image
            fill
            src='/gifts.png'
            alt='Gifts'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p>
            Каждый лот в ассортименте компании fauno™ тщательно подбирается исходя из десятка
            внутренних требований и параметров, начиная от органолептической составляющей,
            происхождения разновидности и заканчивая подходом фермера или кооператива к процессингу
            и контролю качества.
          </p>
          <p>
            Четыре коллекции кофе, разделенные по смыслам и сегментам, в числе которых вы найдете
            как понятный и привычный кофе, так и редчайшие бриллианты со сложным букетом.
          </p>
          <p>
            Ведь fauno™ превращает интересный, редкий и особенный кофе в ежедневный ритуал для вас
            и ваших гостей.
          </p>
        </div>
      </div>

      <div className={s.action_block}>
        <div className={s.line}></div>
        <div className={s.actions_content}>
          <div className={s.actions_content_wrapper}>
            <div className={s.actions_content_title}>
              Разместить заказ можно в свободной форме через мессенджеры WhatsApp и Telegram, просто
              написав персональному менеджеру по номеру:{' '}
              <span className={s.phone}>
                <Link href='tel:+79859119114'>+7 (985) 911-911-4</Link>
              </span>
            </div>
            <p className={s.actions_content_desc}>
              Минимальный заказ составляет всего 6 кг любого кофе в зернах. Счет для безналичной
              оплаты будет выставлен в течение дня и сразу после оплаты заказ будет передан на
              производство.
            </p>
            <p className={s.actions_content_desc}>
              Кофе обжаривается непосредственно под вас; заказ собирается и передается в доставку в
              течение 4-х рабочих дней. Доставка до дверей кофейни, терминала ТК или ПВЗ — за наш
              счет.
            </p>
          </div>
          <div className={s.actions_content_buttons}>
            <Button>Telegram</Button>
            <Button>WhatsApp</Button>
          </div>
        </div>

        <div className={s.line}></div>
      </div>

      <div className={s.candle_img}>
        <Image
          src='/home.png'
          alt='Gifts'
          sizes='100%'
          fill
          quality={100}
          style={{ objectFit: 'cover' }}
        />
      </div>

      <div className={s.content_wrapper}>
        <div className={s.content_heading}>
          <p>ПРОГРАММА</p>
          <p>ЛОЯЛЬНОСТИ</p>
        </div>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p>
            Специально для вашего удобства мы разработали систему лояльности, привносящую в наши
            отношения комфорт и предсказуемость.
          </p>
          <p>
            Мы ценим вас за проявленный интерес и доверие к нашей компании, поэтому индивидуальные
            условия, крупнооптовые заказы и работу с СТМ обсуждаем в частном порядке.
          </p>
        </div>
      </div>

      <div className={s.status_cards}>
        <div className={s.status}>
          <div className={s.status_head}>
            <div className={s.status_number}>1</div>
            <div className={`${s.status_color} ${s.silver}`}></div>
          </div>
          <div className={s.status_info}>
            Базовый уровень рассчитан на новых клиентов, которые только начинают с нами работать,
            знакомятся со стилистикой обжарки и ассортиментом.
          </div>
        </div>
        <div className={s.status}>
          <div className={s.status_head}>
            <div className={s.status_number}>2</div>
            <div className={`${s.status_color} ${s.gold}`}></div>
          </div>
          <div className={s.status_info}>
            Средний или продвинутый уровень рассчитан на клиентов, которые доверяют нам и работают с
            нами более 3-х месяцев, разместивших более 10-ти оптовых заказов.
          </div>
        </div>
        <div className={s.status}>
          <div className={s.status_head}>
            <div className={s.status_number}>3</div>
            <div className={`${s.status_color} ${s.platinum}`}></div>
          </div>
          <div className={s.status_info}>
            Самый высокий уровень лояльности рассчитан на клиентов, стабильно работающих с нами уже
            более 9-ти месяцев, разместивших не менее 30-ти оптовых заказов.
          </div>
        </div>
      </div>
    </section>
  );
};
