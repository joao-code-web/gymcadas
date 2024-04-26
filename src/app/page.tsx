"use client"
import "./pag.css";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface TypesMonths {
    _id: string;
    Month: string;
}

export default function Home() {
    const [allMonths, setAllMonths] = useState<TypesMonths[]>([]);
    const [formData, setFormData] = useState<string>("");

    const fetGetMonth = async () => {
        try {
            const response = await axios.get("api/months");
            const months: TypesMonths[] = response.data;
            setAllMonths(months);
        } catch (error) {
            console.error("Erro ao buscar meses:", error);
        }
    };

    const handleAddMonth = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (!formData) {
            return;
        }
        try {
            const responseNewMonth = await axios.post(`api/months/`, { Month: formData });
            console.log("Novo mês adicionado:", responseNewMonth.data);
            setFormData("");
            fetGetMonth();
        } catch (error) {
            console.error("Erro ao adicionar novo mês:", error);
        }
    };

    const handleDelete = async (id: string) => {
        try {
            if (!id) {
                return;
            }
            const responseDelete = await axios.delete(`api/months/?monthId=${id}`);
            console.log(responseDelete);
            fetGetMonth();
        } catch (error) {
            console.log("erro");
        }
    };

    useEffect(() => {
        fetGetMonth();
    }, []);

    return (
        <main>
            <form>
                <h1>Adicionar mês</h1>
                <input type="text" onChange={(e) => setFormData(e.target.value)} />
                <button onClick={handleAddMonth}>Adicionar</button>
            </form>
            <div className="content">
                {allMonths.map((monthsDads) => (
                    <div className="month" key={`${monthsDads._id}`}>
                        <Link href={`/monthsId/${monthsDads._id}`}>
                            <h1>{monthsDads.Month}</h1>
                        </Link>
                        <button onClick={() => handleDelete(String(monthsDads._id))}><MdDelete /></button>
                    </div>
                ))}
            </div>
        </main>
    );
}
