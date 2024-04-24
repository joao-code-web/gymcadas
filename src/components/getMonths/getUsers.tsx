import axios from "axios";
import { useState } from "react";

interface UsersTypes {
    _id: string;
    nameuser: string;
    value: number;
    dataPag: string;
}

export function useUsers() {
    const [getUsersAll, setGetUsers] = useState<UsersTypes[]>([]);

    const getUsersAllFetch = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/users/?monthId=${id}`);
            setGetUsers(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return { getUsersAll, getUsersAllFetch };
}