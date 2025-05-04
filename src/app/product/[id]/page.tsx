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
import { CategoryCard } from '@/components/CategoryCard';
import { BurgerNavbar } from '@/components/BurgerNavbar';
import { Clouds } from '@/blocks/Clouds';
import { NotCoffee } from '@/blocks/NotCoffee';
import { useUserStore } from '@/shared/stores/UserStore/UserStoreProvider';
import { StickyNavbar } from '@/components/StickyNavbar';

export default function CatalogPage() {
    const { id } = useParams();

    const [productInfo, setProductInfo] = useState<IProduct>()

    const { openCart } = useCartStore((state) => state)
    const { user } = useUserStore(state => state);

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
            openCart(user.id)
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
            <StickyNavbar />
            <BurgerNavbar />
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
                                                style={{transform: "scale(1.02)", objectFit: 'cover'}}
                                                alt='Background'
                                                layout='fill'
                                                objectFit='cover'
                                                objectPosition='center center'
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
                                {(productInfo && productInfo.old_price > 0) && <p className={s.priceOld}>{productInfo?.old_price} ₽</p>}
                            </div>
                            <div className={s.buttonWrapper}>
                                <button className={s.addToCart} onClick={addToCart}>Добавить в корзину</button>
                            </div>
                        </div>
                    </div>
                    {
                        productInfo?.about &&
                        <div className={s.pageBlock}>
                            <p className={s.blockHeading}>Информация о лоте</p>
                            <p className={s.productInfo}>{productInfo?.about}</p>
                        </div>
                    }
                    {
                        productInfo?.recipe &&
                        <div className={s.pageBlock}>
                            <p className={s.blockHeading}>Рецепт заваривания</p>
                            <div className={s.recipe}>
                                {
                                    Object.entries(productInfo.recipe).map((data) => {
                                        if(data[0] != "description"){
                                            return (
                                                <p className={s.recipeRow}key={data[0]}>{data[0]}: <span>{data[1]}</span></p>
                                            )
                                        }
                                    })
                                }
                                {
                                    Object.entries(productInfo.recipe).map((data) => {
                                        if(data[0] == "description"){
                                            return (
                                                <p className={s.recipeRowFootnote}key={data[0]}>{data[1]}</p>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    }
                </div>
                {
                    productInfo?.category && 
                    <div className={s.categoryWrapper}>
                        <CategoryCard category={productInfo?.category} noButton />
                    </div>
                }
            </div>
            <Clouds />
            <NotCoffee />
            <Footer />
        </div>
    );
}
