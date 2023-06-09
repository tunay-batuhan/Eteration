import Basket from "@/components/Basket";
import FilterComp from "@/components/FilterComp";
import Products from "@/components/Products";
import Layout from "@/layout/layout";
import { Container, Grid, GridItem, Icon, Text } from "@chakra-ui/react";
import { ServerResponse } from "http";
import { GetServerSideProps } from "next";

export interface ProductsData {
  count: number;
  brand: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  model: string;
  name: string;
  price: string;
}
const API = "https://5fc9346b2af77700165ae514.mockapi.io/products" as string;

export default function Home({ data }: { data: ProductsData[] }) {
  const title = "Home";
  const description = "Home page";
  return (
    <Layout title={title} description={description}>
      <Container
        maxW={{
          base: "600px",
          md: "760px",
          lg: "1000px",
          xl: "1200px",
          xxl: "1352px",
        }}
        px={{ base: "16px" }}
      >
        <Grid
          templateColumns="repeat(24, 1fr)"
          gap={{
            base: "10px",
            sm: "20px",
          }}
        >
          <GridItem
            colSpan={{
              base: 24,
              lg: 5,
            }}
          >
            <FilterComp />
          </GridItem>
          <GridItem
            colSpan={{
              base: 24,
              lg: 14,
            }}
          >
            <Products data={data} />
          </GridItem>
          <GridItem
            colSpan={{
              base: 24,
              lg: 5,
            }}
          >
            <Basket />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  try {
    const response = await fetch(API);
    const products = await response.json();
    return {
      props: {
        data: products,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
};
