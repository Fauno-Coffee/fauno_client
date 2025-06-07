'use client';
import Image from 'next/image';
import s from './Delivery.module.css';
import Link from 'next/link';

export const Delivery = () => {
  return (
    <div className={s.recipes_wrapper}>
      <div className={s.header}>
        <h2 className={s.title}>Доставка и оплата</h2>
      </div>

      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>Доставка</p>
          <p>
            Наше производство работает ежедневно по будням, это позволяет нам отгружать заказы
            оперативно, а вам — наслаждаться только свежеобжаренным кофе.
          </p>
          <p>Доставка по Москве осуществляется одним из удобных для вас способов:</p>
          <p>
            — наши личные водители или курьерская служба могут доставить заказ до подъезда, двери
            или оставить у консьержа
          </p>
          <p>
            — компания СДЭК и Boxberry позволяют заказать кофе в любой удобный пункт выдачи и
            забрать его в нужный момент
          </p>
          <p>
            Доставка по России осуществляется посредством компаний СДЭК и Boxberry, прямо до адреса
            или в любой удобный пункт выдачи заказов.
          </p>
          <p>Стоимость доставки рассчитывается автоматически, в корзине.</p>
          <p>
            <u>При заказе на сумму свыше 3500 рублей</u> доставка по России любым из указанных
            способов осуществляется бесплатно.
          </p>
          <p>
            Для доставки заказа за пределы России — оставьте комментарий к заказу или напишите нам в{' '}
            <span className={s.link}>
              <Link href='#'>телеграм</Link>
            </span>{' '}
            и мы просчитаем для вас оптимальную стоимость.
          </p>
        </div>
        <div className={`${s.content_img_gifts} ${s.imggifts}`}>
          <Image
            fill
            src='/skald.png'
            alt='Warehouse'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>

      <div className={`${s.content_wrapper} ${s.mobileReverse}`}>
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
          <p className={s.content_info_title}>Сроки доставки</p>
          <p>График отгрузки заказов:</p>
          <ul>
            <li style={{ marginTop: '10px' }}>
              оформленные с понедельника по пятницу до 16:00 отправляются в службу доставки на
              следующий день
            </li>
            <li style={{ marginTop: '10px' }}>
              оформленные с понедельника по пятницу после 16:00 отгружаются через день
            </li>
            <li style={{ marginTop: '10px' }}>
              заказы, размещенные в выходные дни и в пятницу после 16:00 отгружаются во вторник
            </li>
          </ul>
          <p>
            Курьерские заказы по Москве попадают к клиенту в день отгрузки. Срок доставки заказов,
            отправленных службами СДЭК/ Boxberry/ Почтой России рассчитывается индивидуально при
            оформлении.
          </p>
        </div>
      </div>

      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>Оплата</p>
          <p>Оплатить заказ можно прямо на сайте, любым удобным для вас способом.</p>
          <p>
            Предоставляемая вами персональная информация (имя, адрес, телефон, e - mail, номер
            банковской карты) является конфиденциальной и не подлежит разглашению. Данные вашей
            банковской карты передаются только в зашифрованном виде и не сохраняются на нашем
            Web-сервере.
          </p>
          <p>После оплаты вы получите фискальный чек на электронную почту, указанную в заказе.</p>
          <p>
            Для оплаты по безналичному расчету перейдите в раздел{' '}
            <span className={s.link}>
              <Link href='/business'>Для бизнеса</Link>
            </span>{' '}
            или свяжитесь с нами через{' '}
            <span className={s.link}>
              <Link href='#'>Телеграм</Link>
            </span>
            .
          </p>
        </div>
        <div className={`${s.content_img_gifts} ${s.imggifts}`}>
          <Image
            fill
            src='/skald.png'
            alt='Warehouse'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};
