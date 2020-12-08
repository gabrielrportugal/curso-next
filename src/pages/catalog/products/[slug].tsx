import { useRouter } from 'next/router';

export default function Product() {
  //Forma de acessar parâmetro na url da aplicação
  const router = useRouter();

  return <h1>{router.query.slug}</h1>;
}
