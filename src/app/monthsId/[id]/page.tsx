// MonthId.tsx
"use client";
import { useUnicMonthAll } from "@/components/getMonths/getUnicMonth";
import { useUsers } from "@/components/getMonths/getUsers";
import axios from "axios";
import { useEffect, useState } from "react";

import "../pageId.css"

export default function MonthId({ params }: { params: { id: string } }) {
    const { getUnicMonth, getUnicMonthFetch } = useUnicMonthAll();
    const { getUsersAll, getUsersAllFetch } = useUsers();
    const [formDataUsers, setFormDataUsers] = useState<{ nameuser: string; value: string }>({ nameuser: '', value: '' });
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataUsers({ ...formDataUsers, [e.target.name]: e.target.value });
    };

    const handleAddUser = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        // Verifica se os campos estão vazios
        if (!formDataUsers.nameuser || !formDataUsers.value) {
            setError("Por favor, preencha todos os campos.");
            return;
        }

        setSubmitting(true);

        try {
            const currentDate = new Date();

            const dateTimeInfo = {
                day: currentDate.getDate(),
                month: currentDate.getMonth() + 1,
                year: currentDate.getFullYear(),
                hour: currentDate.getHours(),
                minuts: currentDate.getMinutes(),
            };

            const reset = `${dateTimeInfo.day}/${dateTimeInfo.month}/${dateTimeInfo.year} as ${dateTimeInfo.hour}:${dateTimeInfo.minuts}`;

            const formDataPost = {
                nameuser: formDataUsers.nameuser,
                value: formDataUsers.value,
                dataPag: reset,
            };

            await axios.post(`http://localhost:8000/api/users/?monthId=${params.id}`, formDataPost);
            setFormDataUsers({ nameuser: '', value: '' });
            setError(null);
            getUsersAllFetch(params.id);
        } catch (error) {
            setError("Ocorreu um erro ao adicionar o usuário. Por favor, tente novamente mais tarde.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleDeleteUser = async (id: string) => {

        if (!id) {
            console.log("sem esse id")
        }

        const response = await axios.delete(`http://localhost:8000/api/users/?monthId=${params.id}&userId=${id}`);
        console.log(response);
        getUsersAllFetch(params.id);
    }

    useEffect(() => {
        getUnicMonthFetch(params.id);
        getUsersAllFetch(params.id);
    }, [params.id]);

    return (
        <div>
            <form>
                {getUnicMonth.map((dadsMonth) => (

                    <h1 key={dadsMonth._id}>{dadsMonth.Month}</h1>

                ))}

                <input type="text" name="nameuser" value={formDataUsers.nameuser} onChange={handleInputChange} placeholder="Nome do usuário" />
                <input type="text" name="value" value={formDataUsers.value} onChange={handleInputChange} placeholder="Valor" />
                <button onClick={handleAddUser} disabled={submitting}>Enviar</button>
            </form>

            {error && <p>{error}</p>}

            <table>
                <thead>
                    <tr>
                        <th>Nome do usuário</th>
                        <th>Valor</th>
                        <th>Data</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {getUsersAll.map((user) => (
                        <tr key={user._id}>
                            <td>{user.nameuser}</td>
                            <td>{user.value}</td>
                            <td>{user.dataPag}</td>
                            <td><button onClick={() => handleDeleteUser(String(user._id))}>Excluir</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
