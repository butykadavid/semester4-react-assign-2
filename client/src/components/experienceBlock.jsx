export default function ExperienceBlock({info, index}) {
    return (
        <div className="w-full flex justify-evenly items-center p-2 my-2">
            <p>{index + 1}</p>
            <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={info.company} />
            <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={info.title} />
            <input type="text" className="p-2 w-1/4 border border-gray-300 rounded-md" value={info.interval} />
            
            <button className="p-2 border border-gray-200 bg-red-300 rounded-md text-xs hover:bg-red-200 duration-300">❌</button>
        </div>
    )
}