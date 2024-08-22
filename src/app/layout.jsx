import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@components/navbar/Navbar";
import Footer from "@components/footer/Footer";
import { getServerSessionWrapper } from '@lib/ServerNavbar';
import Script from 'next/script';

const inter=Inter( { subsets: [ "latin" ] } );

export const metadata={
        title: {
                default: "Next.js 14 Homepage",
                template: "%s | Next Js 14"
        },
        description: "Just Next",
};

export default async function RootLayout ( { children } )
{
        const session=await getServerSessionWrapper();
        return (
                <html lang="en">
                        <head>
                                <Script
                                        src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                                        strategy="afterInteractive"
                                />
                                <Script id="google-translate-init" strategy="afterInteractive">
                                        { `
            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {pageLanguage: 'en'},
                'google_translate_element'
              );
            }
          `}
                                </Script>
                        </head>
                        <body className={ inter.className }>
                                <div className="container">
                                        <Navbar session={ session } />
                                        <div id="google_translate_element"></div>
                                        { children }
                                </div>
                        </body>
                </html>
        );
}