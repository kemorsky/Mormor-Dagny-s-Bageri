import { useNavigate } from 'react-router'
import { Home, Delivery, Order, Settings } from '../../assets/icons/footer-icons';

export default function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="w-full max-w-[27.5rem] h-[6.25rem] bg-[#282729] inline-flex items-start justify-center py-2 px-4">
            <section className="w-[416px] inline-flex items-start justify-between">
                <div className="w-[4.6875rem] h-[3.75rem] inline-flex flex-col items-center justify-start">
                    <a href='/dashboard' className='w-11 h-11 flex items-center justify-center' onClick={() => navigate('/dashboard')}>
                        <Home color={"text-Branding-textSecondary"}/>
                    </a>
                    <p className='font-inter font-bold text-Branding-textSecondary text-[0.625rem]'>Hem</p>
                </div>
                <div className="w-[4.6875rem] h-[3.75rem] inline-flex flex-col items-center justify-start">
                    <a href='/deliveries' className='w-11 h-11 flex items-center justify-center' onClick={() => navigate('/deliveries')}>
                        <Delivery color="text-Branding-textSecondary" />
                    </a>
                    <p className='font-inter font-bold text-Branding-textSecondary text-[0.625rem]'>Leverans</p>
                </div>
                <div className="w-[4.6875rem] h-[3.75rem] inline-flex flex-col items-center justify-start">
                    <a href='/new-order' className='w-11 h-11 flex items-center justify-center' onClick={() => navigate('/new-order')}>
                        <Order color="text-Branding-textSecondary" />
                    </a>
                    <p className='font-inter font-bold text-Branding-textSecondary text-[0.625rem]'>Ny Beställning</p>
                </div>
                <div className="w-[4.6875rem] h-[3.75rem] inline-flex flex-col items-center justify-start">
                    <a href='/settings' className='w-11 h-11 flex items-center justify-center' onClick={() => navigate('/settings')}>
                        <Settings color="text-Branding-textSecondary" />
                    </a>
                    <p className='font-inter font-bold text-Branding-textSecondary text-[0.625rem]'>Inställningar</p>
                </div>
            </section>
        </footer>
    )
};