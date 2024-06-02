import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { useGetUserQuery } from "../states/usersApi";
import ProfileCardJobSeeker from "../components/profileCardJobSeeker";
import ProfileCardEmployer from "../components/profileCardEmployer";

export default function Profile() {
    const { profileId } = useParams()

    const isAuthenticated = useSelector(state => !!state.user.token)

    if (!isAuthenticated) {
        return <Navigate to="/login" />
    }

    const { data: profileData, isLoading: isProfileLoading, isSuccess: isProfileSuccess } = useGetUserQuery(profileId)

    if (isProfileLoading) {
        return (
            <div className="loader"></div>
        )
    }

    if (isProfileSuccess) {

        return (
            <div className="w-full flex flex-col justify-start items-center">

                {/* Dummy */}
                <div className="w-full h-10"></div>


                {profileData.role == 'company' ?
                    <ProfileCardEmployer profile={profileData} />
                    :
                    <ProfileCardJobSeeker profile={profileData} />
                }

                {/* Dummy */}
                <div className="w-full h-10"></div>

            </div>
        )
    }
}