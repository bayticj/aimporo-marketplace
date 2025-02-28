export interface DatatableProps {
    columns: any[]; // You can replace `any[]` with the specific type of columns you expect
    dataSource: any[]; // You can replace `any[]` with the specific type of dataSource you expect
    Selection?: boolean | undefined;
  }

  export  interface Order {
    key: number;
    id: string;
    title: string;
    deliveryOn: string;
    seller: {
      name: string;
      avatarUrl: string;
    };
    feedback: string;
    cancel: string;
    amount: string;
    payment: string;
    status: string;
    action: string;
  }