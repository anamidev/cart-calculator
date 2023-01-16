import Footer from "@/components/Footer";

export default function Layout({children}) {
    return (
        <>
            <main className={'pb-52 max-w-lg mx-auto'}>
                {children}
            </main>
            <Footer/>
        </>
    )
}