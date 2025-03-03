import DenseTable from "../../components/table"
export function Home() {

   
    return (
        <main className="w-full mx-auto flex flex-col items-center justify-center gap-5 py-10">
            <h1 className="text-zinc-400 text-2xl">Lista de funcionários cadastrados</h1>
            <DenseTable  />
        </main>
    )
}