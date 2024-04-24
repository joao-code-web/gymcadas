import "./pag.css";
import { useAllMonths } from "@/components/getMonths/getMonths";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const { allMonths, setAllMonths, fetGetMonth } = useAllMonths();
  const [formData, setFormData] = useState<string>("");

  const handleAddMonth = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (!formData) {
      return;
    }
    try {
      const responseNewMonth = await axios.post(`http://localhost:8000/api/months/`, { Month: formData });
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
      const responseDelete = await axios.delete(`http://localhost:8000/api/months/?monthId=${id}`);
      console.log(responseDelete);
      fetGetMonth();
    } catch (error) {
      console.log("erro");
    }
  };

  useEffect(() => {
    fetGetMonth();
  }, [fetGetMonth]);

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
