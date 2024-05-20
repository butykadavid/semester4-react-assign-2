import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../states/usersApi";
import { useGetExpQuery } from "../states/experiencesApi"
import ProfileCard from "../components/profileCard";

export default function Profile() {
    const { profileId } = useParams()

    const isAuthenticated = useSelector(state => !!state.user.token)
    
    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    const { data: profileData, isLoading: isProfileLoading, isSuccess: isProfileSuccess } = useGetUserQuery(profileId)
    const { data: expData, isLoading: isExpLoading, isSuccess: isExpSuccess } = useGetExpQuery()

    if (isProfileLoading || isExpLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isProfileSuccess && isExpSuccess) {
        return (
            <div className="w-full flex flex-col justify-start items-center">

                {/* Dummy */}
                <div className="w-full h-10"></div>

                <ProfileCard profile={profileData} experiences={expData.data}/>

                {/* Dummy */}
                <div className="w-full h-10"></div>

            </div>
        )
    }
}