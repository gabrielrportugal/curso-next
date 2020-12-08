import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category(){
  //Forma de acessar parâmetro na url da aplicação
  const router = useRouter();

  return <h1>{router.query.slug}</h1>
}

//Método para página ser estática porém possuir parâmetros dinâmicos
export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths:[],
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<CategoryProps> = async (context) => {
  //Acessar parâmetros da rota
  const {slug} = context.params;

  const response = await fetch(`http://localhost:3333/products?category_id=${slug}`);
  const products = await response.json();

  return {
    props:{
      products
    },
    revalidate: 60,
  }
}
