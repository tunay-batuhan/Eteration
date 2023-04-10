import { ProductsData } from "@/pages";
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { basketData } from "../Products/Products";
import { useEffect } from "react";

export default function Basket(): JSX.Element {
  const [basketList, setBasketList] = useAtom(basketData) as unknown as [
    ProductsData[],
    (list: ProductsData[]) => void
  ];

  useEffect(() => {
    const cart = localStorage.getItem("cart");
    if (cart) {
      setBasketList(JSON.parse(cart));
    }
  }, [setBasketList]);

  const decreaseItemCount = (id: string) => {
    const index = basketList.findIndex((item) => item.id === id);
    const newList = [...basketList];
    if (newList[index].count >= 1) {
      newList[index].count -= 1;
      setBasketList(newList);
      localStorage.setItem("cart", JSON.stringify(newList));
    }
    if (newList[index].count === 0) {
      newList.splice(index, 1);
      setBasketList(newList);
      localStorage.setItem("cart", JSON.stringify([...newList]));
    }
  };

  const increaseItemCount = (id: string) => {
    const index = basketList.findIndex((item) => item.id === id);
    basketList[index].count += 1;
    setBasketList([...basketList]);
    localStorage.setItem("cart", JSON.stringify(basketList));
  };
  return (
    <Stack gap="20px">
      <Box>
        <Text fontSize="12px" mb="6px">
          Cart
        </Text>
        <Box
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          p="16px 20px"
          bg="white"
        >
          {basketList?.length === 0 ? (
            <Text textAlign="center" fontSize="14px">
              Your cart is empty
            </Text>
          ) : (
            <Stack gap="15px">
              {basketList?.map((item: ProductsData) => {
                return (
                  <Flex justify="space-between" key={item?.id}>
                    <Box>
                      <Text fontSize="12px">{item?.name}</Text>
                      <Text color="#2A59FE" fontSize="12px">
                        {item?.price}₺
                      </Text>
                    </Box>
                    <Flex maxH="30px">
                      <Center
                        px="5px"
                        bg="#F3F4F6"
                        rounded="4px"
                        cursor="pointer"
                        onClick={() => decreaseItemCount(item.id)}
                      >
                        <Box className="icon-minusIcon" />
                      </Center>
                      <Center>
                        <Text
                          textAlign="center"
                          w="30px"
                          bg="#2A59FE"
                          color="white"
                          py="5px"
                        >
                          {item?.count}
                        </Text>
                      </Center>
                      <Center
                        px="5px"
                        bg="#F3F4F6"
                        rounded="4px"
                        cursor="pointer"
                        onClick={() => increaseItemCount(item.id)}
                      >
                        <Box as="i" className="icon-plusIcon" />
                      </Center>
                    </Flex>
                  </Flex>
                );
              })}
            </Stack>
          )}
        </Box>
      </Box>
      <Box>
        <Text fontSize="12px" mb="6px">
          Checkout
        </Text>
        <Box
          boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
          p="16px 20px"
          bg="white"
        >
          <HStack fontSize="14px" mb="15px">
            <Text>Total Price: </Text>
            <Text color="#2A59FE">
              {basketList?.reduce((acc: number, item: any) => {
                return acc + item.price * item.count;
              }, 0)}{" "}
              ₺
            </Text>
          </HStack>
          <Button w="100%" bg="#2A59FE" color="white">
            <Text fontSize="16px">Checkout</Text>
          </Button>
        </Box>
      </Box>
    </Stack>
  );
}
