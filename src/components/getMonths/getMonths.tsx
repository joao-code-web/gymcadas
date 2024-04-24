import axios from "axios";
import { useState } from "react";

interface typesMonth {
    _id: String;
    Month: String;
}

export function getMonths() {
    const [allMonths, setAllMonths] = useState<typesMonth[]>([]);

    const fetGetMonth = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/months");
            const months = response.data;
            setAllMonths(months);
        } catch (error) {
            console.log("deu error");
        }
    }

    return { allMonths, setAllMonths, fetGetMonth }
}