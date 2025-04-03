import Menu from "../../elements/menu/menu"

export default function AdminDashboard() {
    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <button>Registrera användare</button>
                <button>Redigera användare</button>
                <button>Ta bort användare</button>
                <button>Skapa beställning</button>
                <button>Se beställnignar</button>
                <button>Se produkter</button>
            </div>            
        </main>
    )
}