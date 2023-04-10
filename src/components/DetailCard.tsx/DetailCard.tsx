import { ProductsData } from "@/pages";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import Image from "next/image";
import { basketData } from "../Products/Products";

export default function DetailCard({ data }: { data: ProductsData }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [basketDataValue, setBasketData] = useAtom(basketData) as
    | ProductsData[]
    | any;
  const addToCard = (id: string) => {
    const controlId = basketDataValue.find(
      (item: ProductsData) => item.id == id
    );
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    let findItem = data;

    if (!controlId) {
      findItem = { ...findItem, count: 1 };
      setBasketData([...basketDataValue, findItem]);
      localStorage.setItem("cart", JSON.stringify([...cartData, findItem]));
    } else {
      onOpen();
    }
  };
  return (
    <Box
      p="10px"
      bg="white"
      display={{
        md: "flex",
      }}
    >
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={{
          base: "10px",
          sm: "20px",
        }}
      >
        <GridItem
          colSpan={{
            base: 12,
            xl: 6,
          }}
        >
          <Image
            src={data.image}
            title={data.brand}
            alt={data.model}
            width={800}
            height={300}
            loading="lazy"
          />
        </GridItem>
        <GridItem
          colSpan={{
            base: 12,
            xl: 6,
          }}
        >
          <Text fontSize="24px">{data.name}</Text>
          <Text mb="25px" color="#2A59FE" fontWeight="500" fontSize="24px">
            {data.price} ₺
          </Text>
          <Button
            w="100%"
            bg="#2A59FE"
            color="white"
            mb="19px"
            onClick={() => addToCard(data.id)}
          >
            <Text fontSize="16px">Add to Cart</Text>
          </Button>
          <Text fontSize="18px">{data.description}</Text>
        </GridItem>
      </Grid>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py="30px" textAlign="center" fontWeight="700">
            This product is already in your cart
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
