import Footer from "@/components/Footer";

export default function Layout({children}) {
    return (
        <>
            <main className={'px-4 pt-4 pb-72 max-w-lg mx-auto'}>
                {children}
            </main>
            <Footer/>
        </>
    )
}