

'use client'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Toaster } from 'sonner';
import { NextUIProvider } from "@nextui-org/react";
import LogoutModal from '@/components/LogoutModal';
import { getCookie } from '@/components/utils/Cookie';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import React from 'react'

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {

    const token = getCookie("token");
    const tokenParts = token.split(" ");
    const [windowWidth, setWindowWidth] = useState<number>(0);

    const headers = {
        authorization: tokenParts ? tokenParts[1] : "",
        'client-name': 'WidgetX Ecom [web]',
        'client-version': '1.0.0'
    };

    const graphqlClient = new ApolloClient({
        // uri: "https://nephara-backend.onrender.com/graphql",
        uri: "http://localhost:8000/graphql",
        cache: new InMemoryCache(),
        headers: headers
    });

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const updateWindowWidth = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', updateWindowWidth);

        return () => {
            window.removeEventListener('resize', updateWindowWidth);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    useEffect(() => {
        AOS.init({
            once: false,
            // disable: 'phone',
            duration: windowWidth > 640 ? 600 : 300,
            easing: 'ease-out-sine',
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <ApolloProvider client={graphqlClient}>
            <NextUIProvider>
                <LogoutModal />
                {children}
            </NextUIProvider>
            <Toaster richColors position="top-right" />
        </ApolloProvider>
    )
}

export default LayoutWrapper

