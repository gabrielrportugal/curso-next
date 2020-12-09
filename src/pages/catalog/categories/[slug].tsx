import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';

interface IProduct {
  id: string;
  title: string;
}

interface CategoryProps {
  products: IProduct[];
}

export default function Category({ products }: CategoryProps) {
  //Forma de acessar parâmetro na url da aplicação
  const router = useRouter();

  // Fallback true
  // Verifica se a página está em processo de renderização estática
  if (router.isFallback) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <h1>{router.query.slug}</h1>
      <ul>
        {products.map(product => {
          return <li key={product.id}>{product.title}</li>;
        })}
      </ul>
    </div>
  );
}

//Método para página ser estática porém possuir parâmetros dinâmicos
export const getStaticPaths: GetStaticPaths = async () => {
  const response = await fetch('http://localhost:3333/categories');
  const categories = await response.json();

  const paths = categories.map(category => {
    return {
      params: { slug: category.id },
    };
  });

  return {
    paths,
    // Fallback true, se o usuário tentar acessar uma rota que ainda não foi gerada ele buscará na api novamente
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async context => {
  //Acessar parâmetros da rota
  const { slug } = context.params;

  const response = await fetch(
    `http://localhost:3333/products?category_id=${slug}`,
  );
  const products = await response.json();

  return {
    props: {
      products,
    },
    revalidate: 60,
  };
};
