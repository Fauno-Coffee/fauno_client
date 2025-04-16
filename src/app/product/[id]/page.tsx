'use client'

import s from './page.module.css';

import { Footer } from '@/blocks/Footer';
import { Navbar } from '@/components/Navbar';
import { useParams } from 'next/navigation';
import { apiUrlBuilder, imageUrlBuilder } from '@/shared/utils/urlBuilder';
import { useEffect, useState } from 'react';
import { IProduct } from '@/shared/types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, Autoplay, Pagination } from 'swiper/modules';
import Image from 'next/image';
import axios from 'axios';
import { useCartStore } from '@/shared/store/CartStoreProvider';

export default function CatalogPage() {
    const { id } = useParams();

    const [productInfo, setProductInfo] = useState<IProduct>()

    const { openCart } = useCartStore((state) => state)

    async function getProduct() {
        const url = `/product/${id}`;
        try {
          const res = await fetch(apiUrlBuilder(url));
          const data = await res.json();
          setProductInfo(data);
        } catch (error) {
          console.log(error);
        }
    }

    async function addToCart() {
        const url = `/user/plusCart`;
        try {
            await axios.post(apiUrlBuilder(url), {
                session: localStorage.getItem("session"),
                productId: productInfo?.id
            });
            openCart()
        } catch (error) {
          console.log(error);
        }
    }

    useEffect(() => {
        getProduct();
    }, [id]);

    return (
        <div className={s.page}>
            <Navbar black />
            <div className={s.productGridWrapper}>
                <div className={s.productGrid}>
                    <div className={s.productImages}>
                        <Swiper
                            className={s.swiper}
                            modules={[Pagination, A11y, Autoplay]}
                            spaceBetween={0}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            loop={true}
                            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
                            speed={1000}
                        >
                            {
                                productInfo?.images.map((image, index) => {
                                    return (
                                        <SwiperSlide key={image.imageUrl + index} className={s.image}>
                                            <Image
                                                src={imageUrlBuilder(image.imageUrl as string)}
                                                style={{transform: "scale(1.02)"}}
                                                alt='Background'
                                                layout='fill'
                                                objectFit='cover'
                                                objectPosition='center top'
                                                priority
                                            />
                                        </SwiperSlide>
                                    );
                                })
                            }
                        </Swiper>
                    </div>
                    <div className={s.aboutProduct}>
                        <div className={s.productHeading}>
                            <h1 className={s.name}>{productInfo?.name}</h1>
                            <p className={s.description}>{productInfo?.description}</p>
                        </div> 
                        <div className={s.feauturesList}>
                            {
                                productInfo?.weight &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Масса</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo?.weight}</p>
                                </div>
                            }
                            {
                                (productInfo?.variation && productInfo.variation.length > 0) &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Разновидность</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo.variation.join(', ')}</p>
                                </div>
                            }
                            {
                                (productInfo?.processing && productInfo.processing.length > 0) &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Обработка</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo.processing.join(', ')}</p>
                                </div>
                            }
                            {
                                (productInfo?.fermentation && productInfo.fermentation.length > 0) &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Ферментация</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo.fermentation.join(', ')}</p>
                                </div>
                            }
                            {
                                productInfo?.region &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Регион</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo?.region}</p>
                                </div>
                            }
                            {
                                productInfo?.farmer &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Фермер</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo?.farmer}</p>
                                </div>
                            }
                            {
                                productInfo?.keyDescriptor &&
                                <div className={s.feauture}>
                                    <p className={s.feautureName}>Ключевой дескриптор</p>
                                    <div className={s.divider}></div>
                                    <p className={s.feautureValue}>{productInfo?.keyDescriptor}</p>
                                </div>
                            }
                        </div>
                        <div className={s.priceBlock}>
                            <div className={s.priceWrapper}>
                                <p className={s.price}>{productInfo?.price} ₽</p>
                                {productInfo?.old_price && <p className={s.priceOld}>{productInfo?.old_price} ₽</p>}
                            </div>
                            <div className={s.buttonWrapper}>
                                <button className={s.addToCart} onClick={addToCart}>Добавить в корзину</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
