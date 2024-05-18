import { useGetJobsQuery } from "../states/jobsApi";

export default function MainPage() {

    const { data, isSuccess, isLoading } = useGetJobsQuery();

    if (isSuccess){

        return (
            <div>
                {   
                    data.data.map((job, index) => {
                        return(
                            <h1 key={index} className="text-red-500">{job.company}</h1>
                        )
                    })
                }
            </div>
        );

    }
}