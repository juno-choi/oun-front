export default function ErrorDiv({error}) {
    return (
        <div className="text-red-500">😢 Error: {error.message}</div>
    );
}


