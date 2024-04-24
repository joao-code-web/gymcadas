import axios from "axios";
import { useState } from "react";

interface MonthTypes {
    _id: string;
    Month: string;
}

export function useUnicMonthAll() {
    const [getUnicMonth, setGetUnicMonth] = useState<MonthTypes[]>([]);

    const getUnicMonthFetch = async (id: string) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/months/${id}`);
            setGetUnicMonth([response.data]);
        } catch (error) {
            console.log(error)
        }
    }

    return { getUnicMonth, getUnicMonthFetch };
}