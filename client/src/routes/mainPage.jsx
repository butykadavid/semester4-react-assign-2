import { useEffect, useState } from "react";
import JobCard from "../components/jobCard";
import JobsFilter from "../components/jobsFilter";
import { useGetJobsQuery } from "../states/jobsApi";

export default function MainPage() {

    // filter settings
    const [company, setCompany] = useState("")
    const [minSalary, setMinSalary] = useState(0)
    const [maxSalary, setMaxSalary] = useState(Infinity)
    const [type, setType] = useState("")
    const [location, setLocation] = useState("")
    const [isRemote, setIsRemote] = useState(null)

    const [filters, setFilters] = useState({})

    const {data, isSuccess, isLoading} = useGetJobsQuery(filters);

    const _setCompany = (value) => {
        setCompany(value)
    }

    const _setMinSalary = (value) => {
        setMinSalary(value)
    }

    const _setMaxSalary = (value) => {
        setMaxSalary(value)
    }

    const _setType = (value) => {
        setType(value)
    }

    const _setLocation = (value) => {
        setLocation(value)
    }

    const _setIsRemote = (value) => {
        setIsRemote(value)
    }

    const applyFilters = () => {
        setFilters({
            company: company,
            minSalary: minSalary,
            maxSalary: maxSalary,
            type: type,
            loc: location,
            isRemote: isRemote,
          });
    }

    const clearFilters = () => {
        setCompany("")
        setMinSalary(0)
        setMaxSalary(Infinity)
        setType("")
        setLocation("")
        setIsRemote(null)
    }

    // useEffect(() => {
    //     console.log(`${name} ${minSalary} ${maxSalary} ${type} ${location} ${isRemote}`)
    // }, [name, minSalary, maxSalary, type, location, isRemote])

    if (isLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isSuccess) {

        return (
            <div className="w-full flex flex-wrap justify-center items-start">

                <JobsFilter _setCompany={_setCompany}
                            _setMinSalary={_setMinSalary} 
                            _setMaxSalary={_setMaxSalary} 
                            _setType={_setType} 
                            _setLocation={_setLocation} 
                            _setIsRemote={_setIsRemote} 
                            company={company}
                            minSalary={minSalary}
                            maxSalary={maxSalary}
                            type={type}
                            location={location}
                            isRemote={isRemote}
                            clearFilters={clearFilters}
                            applyFilters={applyFilters}
                            />

                {/* Dummy */}
                <div className="w-full h-10"></div>

                {
                    data.data.map((job, index) => {
                        return (
                            <JobCard job={job} key={index} isDetailsPageLayout={false}/>
                        )
                    })
                }

                {/* Dummy */}
                <div className="w-full h-10"></div>

            </div>
        );

    }
}