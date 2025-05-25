import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // не забудьте стили
import s from "./notCoffee.module.css"
import Image from 'next/image';
import Link from 'next/link';

export default function SwiperSlider() {
    const slides = [
        {
            id: "goods",
            title: 'Goods',
            image: '/goods.png',
            href: '/catalog?category=10&subcategory=13',
        },
        {
            id: "gift_kits",
            title: 'Gift kits',
            image: '/gifts.png',
            href: '/catalog?category=10&subcategory=12',
        },
        {
            id: "home_collection",
            title: 'Home collection',
            image: '/home.png',
            href: '/catalog?category=10&subcategory=11',
        },
    ];

    return (
        <div style={{ width: '100%', overflow: 'hidden', display: "flex", justifyContent: "center", paddingLeft: "133vw" }}>
            <Swiper
                modules={[Autoplay]}
                slidesPerView={3}
                centeredSlides={true}
                loop={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                spaceBetween={46} // добавим отступ между слайдами
                style={{ width: '240vw', overflow: 'visible' }}
                >
                {slides.map((slide) => (
                    <SwiperSlide key={slide.id}>
                    <Link href={slide.href} className={s.slideContent}>
                        <div className={s.image}>
                            <Image
                                fill={true}
                                objectFit="cover"
                                src={slide.image}
                                alt={slide.title}
                                style={{
                                maxWidth: '80vw',
                                objectFit: 'cover',
                                marginBottom: '20px',
                                }}
                            />
                        </div>
                        <div className={s.cardInfo}>
                            <h2 className={s.name}>{slide.title}</h2>
                        </div>
                    </Link>
                    </SwiperSlide>
                ))}
                </Swiper>
        </div>
    );
}
