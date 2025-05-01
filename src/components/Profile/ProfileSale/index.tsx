import s from './ProfileSale.module.css';

import {FC} from 'react';
import {ProfileBgCard} from '@/components/Profile/ProfileBgCard';
import {useUserStore} from '@/shared/stores/UserStore/UserStoreProvider';
import {numberWithSpaces} from '@/shared/utils/numberWithSpaces';

export const ProfileSale: FC = () => {
  const {user} = useUserStore(state => state);
  console.log(user);

  return (
    <ProfileBgCard
      title='Ваша скидка'
      subTitle='Скидка увеличивается по мере увеличения суммы всех ваших заказов'
    >
      <div className={s.sale_wrapper}>
        <div className={s.sale_calculator_wrapper}>
          <div className={s.calculator_hero}>
            <div className={s.total}>
              <span className={s.title}>{numberWithSpaces(user?.total)} ₽</span>
              <span className={s.subTitle}>Текущая сумма ваших заказов</span>
            </div>
            <div className={s.sale}>
              <span className={s.title}>{user?.discount}%</span>
              <span className={s.subTitle}>Ваша скидка</span>
            </div>
          </div>

          <div className={s.sale_blocks_stack}>
            <div className={s.sale_block}>
              <div className={s.sale_block_name}>Silver</div>
              <div className={`${s.sale_block_color} ${s.silver}`}></div>
              <div className={s.sale_block_sale}>
                Скидка: <b>2%</b>
              </div>
              <div className={s.sale_block_from_total}>от 15.000₽</div>
            </div>
            <div className={s.sale_block}>
              <div className={s.sale_block_name}>Gold</div>
              <div className={`${s.sale_block_color} ${s.gold}`}></div>
              <div className={s.sale_block_sale}>
                Скидка: <b>5%</b>
              </div>
              <div className={s.sale_block_from_total}>от 30.000₽</div>
            </div>
            <div className={s.sale_block}>
              <div className={s.sale_block_name}>Platinum</div>
              <div className={`${s.sale_block_color} ${s.platinum}`}></div>
              <div className={s.sale_block_sale}>
                Скидка: <b>7%</b>
              </div>
              <div className={s.sale_block_from_total}>от 50.000₽</div>
            </div>
            <div className={s.sale_block}>
              <div className={s.sale_block_name}>Private customer</div>
              <div className={`${s.sale_block_color} ${s.private}`}></div>
              <div className={s.sale_block_sale}>
                Скидка: <b>10%</b>
              </div>
              <div className={s.sale_block_from_total}>от 100.000₽</div>
            </div>
          </div>
        </div>

        <span className={s.title}>Правила программы</span>
        <span className={s.subTitle}>
          Скидка увеличивается по мере увеличения суммы всех ваших заказов
        </span>
      </div>
    </ProfileBgCard>
  );
};
