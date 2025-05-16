'use client';

import Image from 'next/image';
import s from './clouds.module.css';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaunoGreenLogo } from '@/shared/assets/FaunoGreenLogo';
import Link from 'next/link';
import { FaunoHeaderLogo } from '@/shared/assets/FaunoHeaderLogo';

export const Clouds = () => {
  const secondRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (window !== undefined) {
      setIsMobile(window?.innerWidth <= 768);
    }
  }, []);

  const scroll = useScroll({
    target: secondRef,
    offset: ['0 1', '2 1'],
  });

  const right = useTransform(
    useSpring(scroll.scrollYProgress, {
      stiffness: 60,
      damping: 30,
      restDelta: 0.001,
    }),
    [0, 1],
    isMobile ? ['-200px', '-400px'] : ['0px', '-200px'],
  );

  return (
    <section className={s.clouds_block}>
      <h1 className={s.heading}>
        “Fauno заботится о качестве
        <br /> жизни и превращает редкий,
        <br /> особенный и необычный кофе
        <br /> в ежедневный ритуал“
      </h1>
      <div className={s.company}>
        <FaunoHeaderLogo width='auto' fill='black' />
        <Link href='/business' className={s.more}>
          Узнать больше о компании
        </Link>
      </div>
      <motion.div ref={secondRef} className={s.image} style={{ right: right }}>
        <Image fill objectFit='cover' sizes='100%' src='/clouds.png' alt='Облака' />
      </motion.div>
    </section>
  );
};
