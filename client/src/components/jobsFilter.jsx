import { useRef } from "react"

export default function JobsFilter(props) {

    const _ref = useRef(null)

    const onClearClick = () => {
        props.clearFilters()

        _ref.current.checked = false
    }

    return (
        <div className="w-full h-24 flex justify-center items-center text-sm">

            <div className="m-1 px-2 py-1 flex justify-center items-center border-gray-300 border rounded-md hover:bg-gray-200 hover:cursor-pointer duration-300">
                <p className="mr-2 font-medium">Vállalat</p>

                <input type="text" value={props.company} className="pl-1 border-gray-200 border rounded-sm" onChange={(e) => props._setCompany(e.target.value)} />
            </div>

            <div className="m-1 px-2 py-1 flex justify-center items-center border-gray-300 border rounded-md hover:bg-gray-200 hover:cursor-pointer duration-300">
                <p className="mr-2 font-medium">Bérsáv</p>

                <p className="mx-1">Min.</p>
                <input type="number" value={props.minSalary} className="pl-1 mr-1 border-gray-200 border rounded-sm" onChange={(e) => props._setMinSalary(e.target.value)} />

                <p className="mx-1 ">Max.</p>
                <input type="number" value={props.maxSalary} className="pl-1 border-gray-200 border rounded-sm" onChange={(e) => props._setMaxSalary(e.target.value)} />
            </div>

            <div className="m-1 px-2 py-1 flex justify-center items-center border-gray-300 border rounded-md hover:bg-gray-200 hover:cursor-pointer duration-300">
                <p className="mr-2 font-medium">Típus</p>

                <select className="border-gray-200 border rounded-sm" value={props.type} onChange={(e) => props._setType(e.target.value)}>
                    <option value=""></option>
                    <option value="full-time">Full-time</option>
                    <option value="part-time">Part-time</option>
                    <option value="internship">Internship</option>
                    <option value="contract">Contract</option>
                </select>
            </div>

            <div className="m-1 px-2 py-1 flex justify-center items-center border-gray-300 border rounded-md hover:bg-gray-200 hover:cursor-pointer duration-300">
                <p className="mr-2 font-medium">Helyszín</p>

                <p className="mx-1">Város</p>
                <input type="text" value={props.location} className="pl-1 border-gray-200 border rounded-sm" onChange={(e) => props._setLocation(e.target.value)} />

            </div>

            <div className="m-1 px-2 py-1 flex justify-center items-center border-gray-300 border rounded-md hover:bg-gray-200 hover:cursor-pointer duration-300">
                <p className="mr-2 font-medium">Remote</p>

                {props.isRemote ?
                    <input type="checkbox" className="mx-1 mt-0.5" checked onChange={(e) => props._setIsRemote(e.target.checked)} />
                    :
                    <input type="checkbox" className="mx-1 mt-0.5" onChange={(e) => props._setIsRemote(e.target.checked)} />
                }
            </div>

            <button onClick={() => onClearClick()} ref={_ref} className="m-1 px-2 py-1 flex justify-center items-center bg-gray-200 border-gray-300 border rounded-md hover:bg-gray-300 hover:cursor-pointer duration-300">
                Visszaállítás
            </button>
            <button onClick={() => props.applyFilters()} className="m-1 px-2 py-1 rounded-md text-white bg-green-500 border border-gray-300 hover:bg-green-300 duration-300">
                Keresés
            </button>
        </div>
    )

}