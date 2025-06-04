'use client';
import Image from 'next/image';
import s from './About.module.css';

// TODO: СДЕЛАТЬ СЕРВЕРНЫЙ ЗАПРОС

export const About = () => {
  return (
    <div className={s.recipes_wrapper}>
      <div className={s.header}>
        <h2 className={s.title}>О компании</h2>
      </div>
      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>Команда</p>
          <p>
            Fáuno - небольшая кофейная компания, собравшая в одном месте энтузиастов, специалистов и профессионалов индустрии с многолетним опытом, созданная в апреле 2023 года в Москве.
          </p>
        </div>
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
          <p className={s.content_info_title}>Миссия</p>
          <p>
            Мы скрупулезно следим за сезонностью и ежегодно летаем в страны произрастания к нашим партнерам, производителям и фермерам, регулярно выбирая самый лучший, интересный и особенный кофе, чтобы показать вам самые отдаленные уголки мира, рассказать историю и развить субъективный вкусовой опыт.
          </p>
        </div>
      </div>
      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>Ценности</p>
          <p>
            Fáuno построена на принципах и ценностях, которые служат ориентиром для работы всей компании. Эстетический интеллект, размеренность в жизни, собственный комфорт, любопытство и гедонизм - наша роза ветров.
          </p>
        </div>
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
      </div>
      <div className={`${s.content_wrapper} ${s.mobileReverse}`}>
        <div className={`${s.content_img_gifts} ${s.imggifts}`}>
          <Image
            fill
            src='/history.jpg'
            alt='Gifts'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>История</p>
          <p>
            «Всё начиналось с озорного, авторского проекта Burnerhaus, в ходе работы над которым шаг за шагом стали формироваться первые признаки новой кофейной компании.
          </p>
          <p>
            Сначала появилось ощущение, которое хотелось передать, когда ты берешь в руки красивую, тактильно приятную пачку кофе. Затем впечатление от вкуса кофе, который ты не пил прежде. После - интерьер, окружение и, наконец, образ мысли.
          </p>
          <p>
            Дело оставалось за малым - облачить эти образцы в имя. 
          </p>
          <p>
            Путешествуя по югу Италии, на одной из площадей в Сорренто я увидел старый, очень старый, хранящий в своих стенах историю, бар, на веранде которого сидели люди с чашками эспрессо и маккиато, олицетворяющие всё то, что я себе представлял. И назывался этот бар - Fáuno. В тот момент пазл сложился и началась наша история.»
          </p>
          <p>
            Фадеев Святослав, основатель Fáuno
          </p>
        </div>
      </div>
      <div className={s.content_wrapper}>
        <div className={s.content_info} style={{ gap: '16px' }}>
          <p className={s.content_info_title}>Кофейня</p>
          <p>
            Чтобы быть ближе и из первых рук рассказывать историю кофе, мы открыли небольшой кофе-бар на территории Завода Кристалл в Москве. Классические напитки на основе эспрессо, фильтр кофе, большой ассортимент свежеобжаренного зерна, дрипы и чай.
          </p>
        </div>
        <div className={`${s.content_img_gifts} ${s.imggifts}`}>
          <Image
            fill
            src='/faunoCoffePoint.jpg'
            alt='Gifts'
            priority
            sizes='100%'
            style={{ objectFit: 'cover' }}
          />
        </div>
      </div>
    </div>
  );
};
