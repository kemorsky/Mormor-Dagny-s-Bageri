import Menu from "../../elements/menu/menu"
import { useNavigate } from "react-router"
import { ButtonAdmin } from "../../components/ui/button";

export default function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <main className="w-full min-h-screen inline-flex flex-col items-center justify-start bg-Branding-backgroundPrimary px-4"> 
            <div className="max-w-[60rem] w-full inline-flex flex-col items-center justify-start gap-6 py-4">
                <Menu />
                <div className="inline-flex flex-col items-center justify-start md:grid md:grid-cols-2 md:place-items-start lg:gap-12 gap-6 py-4">
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">
                            Användare hantering
                        </h2>
                        <ButtonAdmin onClick={() => {navigate('/admin-add-user')}}>Registrera användare</ButtonAdmin>
                        <ButtonAdmin onClick={() => {navigate('/admin-edit-user')}}>Redigera användare</ButtonAdmin>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans  font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Beställning hantering</h2>
                        <ButtonAdmin onClick={() => {navigate('/order')}}>Skapa beställning</ButtonAdmin>
                        <ButtonAdmin onClick={() => {navigate('/orders')}}>Se beställnignar</ButtonAdmin>
                        <ButtonAdmin onClick={() => {navigate('/planerare-dashboard')}}>Se statistiker (dashboard)</ButtonAdmin>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Butik hantering</h2>
                        <ButtonAdmin onClick={() => {navigate('/admin-stores')}}>Se butiker</ButtonAdmin>
                    </article>
                    <article className="inline-flex flex-col gap-4">
                        <h2 className="font-open-sans font-semibold text-[1.125rem] leading-[1.375rem] text-Branding-textHeading">Produkt hantering</h2>
                        <ButtonAdmin onClick={() => {navigate('/admin-products')}}>Se produkter</ButtonAdmin>
                    </article>
                </div>           
            </div>            
        </main>
    )
}