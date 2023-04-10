import { GetServerSideProps } from "next";
import Basket from "@/components/Basket";
import DetailCard from "@/components/DetailCard.tsx";
import Layout from "@/layout/layout";
import { Container, Grid, GridItem } from "@chakra-ui/react";
import { ProductsData } from "@/pages";

const API = "https://5fc9346b2af77700165ae514.mockapi.io/products" as string;

export default function detail({ data }: { data: ProductsData }) {
  const title = "Detail";
  const description = "Detail page";

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
              md: 16,
              lg: 18,
            }}
          >
            <DetailCard data={data} />
          </GridItem>
          <GridItem
            colSpan={{
              base: 24,
              md: 8,
              lg: 6,
            }}
          >
            <Basket />
          </GridItem>
        </Grid>
      </Container>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  res,
  query,
}) => {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );
  try {
    const { id } = query;
    const response = await fetch(`${API}/${id}`);
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
