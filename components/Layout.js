export default function Layout({children}) {
    return (
        <div className={'max-w-md mx-auto'}>
            <main className={'p-2 flex flex-col h-screen'}>
                {children}
            </main>
        </div>
    )
}