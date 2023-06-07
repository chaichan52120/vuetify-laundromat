import { readonly } from "vue";
interface machineType {
  id: number;
  name: string;
  rates: number;
  timer: number;
}

interface notiType {
  id: number;
  message: string;
  isReaded: boolean;
  created_at: string;
}

interface CreditCardType {
  id: number;
  fullName: string;
  cardNumber: string;
  validThrough: string;
  cvv: string;
}

const machineList = readonly<machineType[]>([
  {
    id: 1,
    name: "Washing Machine 01",
    rates: 20,
    timer: 120,
  },
  {
    id: 2,
    name: "Washing Machine 02",
    rates: 20,
    timer: 120,
  },
  {
    id: 3,
    name: "Washing Machine 03",
    rates: 20,
    timer: 120,
  },
  {
    id: 4,
    name: "Washing Machine 04",
    rates: 30,
    timer: 180,
  },
  {
    id: 5,
    name: "Washing Machine 05",
    rates: 30,
    timer: 180,
  },
  {
    id: 6,
    name: "Washing Machine 06",
    rates: 30,
    timer: 180,
  },
  {
    id: 7,
    name: "Washing Machine 07",
    rates: 40,
    timer: 300,
  },
  {
    id: 8,
    name: "Washing Machine 08",
    rates: 40,
    timer: 300,
  },
  {
    id: 9,
    name: "Washing Machine 09",
    rates: 40,
    timer: 300,
  },
  {
    id: 10,
    name: "Washing Machine 10",
    rates: 40,
    timer: 300,
  },
]);

export { machineList };
export type { machineType, notiType, CreditCardType };
