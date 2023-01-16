import Footer from "@/components/Footer";

export default function Layout({children}) {
    return (
        <>
            <main className={'pb-52'}>
                {children}
            </main>
            <Footer/>
        </>
    )
}