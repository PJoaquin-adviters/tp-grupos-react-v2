import { fetchContent, login } from "../utils/fetchUtils";
// import LoginContext from "../context/LoginContext";

export const loginServices = async (emailAuth, passwordAuth) => {
    // const { saveToken, hookToken } = useContext(LoginContext);
    try {

        return await login(emailAuth, passwordAuth);

    } catch (error) {

        throw new Error("[getLogin service error]: " + error);

    }
};