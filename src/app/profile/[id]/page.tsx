
export default function Page({ params }:any) {
    console.log("Params", params)
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-3xl mb-2">Profile Id</h1>
            <h2 className="bg-green-500 p-2 rounded-lg">{params.id}</h2>
        </div>
    )
}