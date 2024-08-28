import { UserInfo } from "@/stores/userStore";

// -----For Landing and Blogs (Not Routing to Auth Page)--------------
export const getUserInfo = async (
    isAuthorized: boolean,
    setIsAuthorized: (value: boolean) => void,
    getUserInfoByToken: () => Promise<any>,
    setUserInfo: (item: UserInfo) => void
) => {
    if (!isAuthorized) {
        const response = await getUserInfoByToken();
        const {  user } = response.data.getUserInfoByToken;
        if (user) {
            setIsAuthorized(true);
            setUserInfo({
                email: user.email || "",
                name: user.name || "",
                photo: user.photo || "",
                gender: user.gender || "",
                age: user.age || 0,
                city: user.city || "",
                country: user.country || "",
                phoneNumber: user.phoneNumber || "",
            });
        }
    }
};
