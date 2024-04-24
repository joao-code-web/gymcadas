// getMonths.tsx
import axios from "axios";
import { useState } from "react";

interface MonthTypes {
  _id: string;
  Month: string;
}

export function useAllMonths() {
  const [allMonths, setAllMonths] = useState<MonthTypes[]>([]);

  const fetGetMonth = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/months");
      const months = response.data;
      setAllMonths(months);
    } catch (error) {
      console.log("deu error");
    }
  };

  return { allMonths, setAllMonths, fetGetMonth };
}

interface UsersTypes {
  _id: string;
  nameuser: string;
  value: number;
  dataPag: string;
}

export function getUsers() {
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

export function getUnicMonthAll() {
  const [getUnicMonth, setGetUnicMonth] = useState<MonthTypes[]>([]);

  const getUnicMonthFetch = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/months/${id}`);
      setGetUnicMonth([response.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return { getUnicMonth, getUnicMonthFetch };
}
