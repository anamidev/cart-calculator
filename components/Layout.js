import Footer from "@/components/Footer";

export default function Layout({children}) {
    return (
        <div className={'flex flex-col h-screen max-w-lg mx-auto'}>
            <main className={'p-4 grow overflow-scroll'}>
                {children}
            </main>
            <Footer/>
        </div>
    )
}