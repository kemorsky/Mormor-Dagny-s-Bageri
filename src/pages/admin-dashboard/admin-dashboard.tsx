import Menu from "../../elements/menu/menu"
import { useNavigate } from "react-router"
import { ButtonAdmin } from "../../components/ui/button";

export default function AdminDashboard() {
    const navigate = useNavigate();

    return (
        <main className="w-full min-h-[59.75rem] inline-flex flex-col items-center justify-start bg-gradient-primary px-4">
            <div className="w-full inline-flex flex-col items-center justify-start gap-6 py-3 mt-[3.125rem]">
                <Menu />
                <ButtonAdmin onClick={() => {navigate('/admin-add-user')}}>Registrera användare</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/admin-edit-user')}}>Redigera användare</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/admin-remove-user')}}>Ta bort användare</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/order')}}>Skapa beställning</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/orders')}}>Se beställnignar</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/admin-products')}}>Se produkter</ButtonAdmin>
                <ButtonAdmin onClick={() => {navigate('/admin-stores')}}>Se butiker</ButtonAdmin>
            </div>            
        </main>
    )
}