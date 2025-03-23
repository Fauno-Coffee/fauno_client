'use client'
import Image from 'next/image';
import s from './clouds.module.css';
import {motion, useScroll, useTransform, useSpring} from "framer-motion"
import { useRef } from 'react';
import { FaunoGreenLogo } from '@/shared/assets/FaunoGreenLogo';
import Link from 'next/link';

export const Clouds = () => {
  const secondRef = useRef<HTMLDivElement>(null)
  
  const scroll = useScroll({
    target: secondRef,
    offset: ["0 1", "2 1"]
  })

  const right = useTransform(useSpring(scroll.scrollYProgress, {
    stiffness: 60,
    damping: 30,
    restDelta: 0.001
  }), [0, 1], ["0px", "-200px"])

  return (
    <section className={s.clouds_block}>
      <h1 className={s.heading}>
      “Fauno заботится о качестве<br/> жизни и превращает редкий,<br/> особенный и необычный кофе<br/> в ежедневный ритуал“
      </h1>
      <div className={s.company}>
        <FaunoGreenLogo />
        <Link 
          href="/about"
          className={s.more}
        >
          УЗНАТЬ БОЛЬШЕ О КОМПАНИ
        </Link>
      </div>
      <motion.div ref={secondRef} className={s.image} style={{right: right}}>
        <Image
          fill
          objectFit='cover'
          sizes='100%'
          src="/clouds.png"
          alt="Облака"
        />
      </motion.div>
    </section>
  );
};
