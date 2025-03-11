import Card from "../../blocks/card"

export default function DashBoard() {
    return (
        <main className="min-h-[59.75rem] w-full bg-gradient-primary inline-flex flex-col items-center justify-start pt-[3.125rem]">
            <div className="w-[25.5rem] inline-flex flex-col items-center justify-start gap-6">
                <section>icons</section>
                <h1>Välkommen, Michael!</h1>
                <div className="w-full inline-flex flex-col items-end justify-center gap-3">
                    <article>
                        <p>Dina pågående beställningar</p>
                        <button>Se alla</button>
                    </article>
                    <div className="inline-flex items-center justify-center gap-3 py-2">
                        <Card />
                    </div>
                    <button>Skapa ny beställning</button>
                </div>
            </div>
        </main>
    )
};