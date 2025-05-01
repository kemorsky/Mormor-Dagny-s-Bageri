import Menu from "../../elements/menu/menu"
import { useNavigate } from "react-router"
import { Button } from "../../components/ui/button-shadcn";

export default function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4"> 
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <div className="inline-flex flex-col items-center justify-start md:grid md:grid-cols-2 md:place-items-start md:gap-12 gap-6 py-4">
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">
                            Användare hantering
                        </h2>
                        <Button onClick={() => {navigate('/admin-add-user')}}>Registrera användare</Button>
                        <Button onClick={() => {navigate('/admin-edit-user')}}>Redigera användare</Button>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans  font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Beställning hantering</h2>
                        <Button onClick={() => {navigate('/order')}}>Skapa beställning</Button>
                        <Button onClick={() => {navigate('/orders')}}>Se beställnignar</Button>
                        <Button onClick={() => {navigate('/planerare-dashboard')}}>Se statistiker (dashboard)</Button>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Butik hantering</h2>
                        <Button onClick={() => {navigate('/admin-stores')}}>Se butiker</Button>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Produkt hantering</h2>
                        <Button onClick={() => {navigate('/admin-products')}}>Se produkter</Button>
                    </article>
                </div>           
            </div>            
        </main>
    )
}