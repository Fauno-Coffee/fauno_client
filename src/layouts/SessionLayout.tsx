'use client'

import { apiUrlBuilder } from "@/shared/utils/urlBuilder";
import { FC, ReactNode, useEffect } from "react";

interface iLayoutProps {
    children: ReactNode;
}

export const SessionLayout: FC<iLayoutProps> = ({children}) => {
    useEffect(() => {
        const session = localStorage.getItem("session");
        if (!session) {
            const url = `/user/session`;
            try {
                fetch(apiUrlBuilder(url))
                .then((res) => {
                    res.json()
                    .then((responce) => {
                        localStorage.setItem("session", responce)
                    })
                })
            } catch (error) {
                console.log(error);
            }        
        }
    }, [])

    return children
}