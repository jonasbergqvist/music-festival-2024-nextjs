import Head from "next/head"
import Footer from "./Footer"
import Navbar from "./Navbar"

export function Layout({ children }: any) {
    return (
        <div className="bg-gray-900">
            <Head>
                <title>Music Festival 2024</title>
                <meta name='description' content="" />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <Navbar />
            <main>{children}</main>
            <Footer />
        </div>
    )
}