import Link from "next/link";
import s from "./Breadcrubs.module.css"

type Breadcrub = {
    name: string;
    link: string;
}

interface IBreadcrubs {
    data: Breadcrub[]
}

export const Breadcrubs = ({data}: IBreadcrubs) => {
    return(
        <div className={s.breadcrubs}>
            {
                data.map((breadcrumb, index) => {
                    return <Link className={s.breadcrumb} key={index} href={breadcrumb.link}>
                        {breadcrumb.name}
                        <p>{data.length != index + 1 ? " — " : <></>}</p>
                    </Link>
                })
            }
        </div>
    )
}