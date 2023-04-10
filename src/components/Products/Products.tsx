import { ProductsData } from "@/pages";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { atom } from "jotai";
import { nanoid } from "nanoid";

interface SortData {
  price: string;
  createdAt: string;
}

export const filterState = atom({
  key: "filterState",
  search: "",
  sortBy: "",
  brand: [] as string[],
  model: [] as string[],
});
export const filteredLastData = atom([]);
export const basketData = atom([]);
export default function Products({ data }: { data: ProductsData[] }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [basketDataValue, setBasketData] = useAtom(basketData) as
    | ProductsData[]
    | any;
  const [filterStateValue] = useAtom(filterState);
  const [, setFilteredLastData] = useAtom(filteredLastData) as
    | ProductsData[]
    | any;
  const filteredData = useMemo(() => {
    setCurrentPage(1);
    return data.filter((item) => {
      return item.name
        .toLowerCase()
        .includes(filterStateValue.search.toLowerCase());
    });
  }, [data, filterStateValue]);
  const filteredBrandAndModel = filteredData
    .filter((item) => {
      if (filterStateValue.brand.length) {
        return filterStateValue.brand.includes(item.brand);
      }
      return true;
    })
    .filter((item) => {
      if (filterStateValue.model.length) {
        return filterStateValue.model.includes(item.model);
      }
      return true;
    })
    .sort((a: SortData, b: SortData) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (filterStateValue.sortBy === "PASC") {
        return Number(a.price) - Number(b.price);
      } else if (filterStateValue.sortBy === "PDESC") {
        return Number(b.price) - Number(a.price);
      } else if (filterStateValue.sortBy === "ASC") {
        return dateA.getTime() - dateB.getTime();
      } else if (filterStateValue.sortBy === "DESC") {
        return dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

  useEffect(() => {
    setFilteredLastData(filteredData);
  }, [
    filterStateValue,
    filteredData,
    setFilteredLastData,
    filteredBrandAndModel,
  ]);

  const startIndex = (currentPage - 1) * 12;
  const endIndex = startIndex + 12;
  const currentData = filteredBrandAndModel.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredBrandAndModel.length / 12);

  const addToCard = (id: string) => {
    const controlId = basketDataValue.find(
      (item: ProductsData) => item.id == id
    );
    const cartData = JSON.parse(localStorage.getItem("cart") || "[]");
    let findItem = filteredBrandAndModel.find(
      (item: ProductsData) => item.id == id
    ) as ProductsData;

    if (!controlId) {
      findItem = { ...findItem, count: 1 };
      setBasketData([...basketDataValue, findItem]);
      localStorage.setItem("cart", JSON.stringify([...cartData, findItem]));
    } else {
      onOpen();
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      {!filteredBrandAndModel.length ? (
        <Text textAlign="center" fontSize="24px" color="#2A59FE">
          No products found
        </Text>
      ) : (
        <>
          <AnimatePresence>
            <motion.div
              key={`${currentPage}-${filterStateValue.search}-${
                filterStateValue.sortBy
              }-${filterStateValue.brand.join(
                "-"
              )}-${filterStateValue.model.join("-")}
              
              `}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                filter: "blur(0px)",
                transition: { duration: 0.6, delay: 0.3 },
              }}
              exit={{
                opacity: 0,
                filter: "blur(20px)",
                transition: { duration: 0.3 },
              }}
            >
              <Grid
                templateColumns="repeat(12, 1fr)"
                gap={{
                  base: "10px",
                  sm: "20px",
                  lg: "10px",
                  xl: "20px",
                }}
              >
                {currentData?.map((item) => {
                  return (
                    <GridItem
                      colSpan={{
                        base: 12,
                        sm: 6,
                        md: 4,
                        lg: 4,
                        xxl: 3,
                      }}
                      key={item.id}
                    >
                      <Stack
                        p="10px"
                        bg="white"
                        h="100%"
                        justify="space-between"
                      >
                        <Link href={`/detail?id=${item.id}`}>
                          <Box>
                            <Center>
                              <Image
                                src={item.image}
                                title={item.brand}
                                alt={item.model}
                                width={312}
                                height={184}
                                loading="lazy"
                              />
                            </Center>
                            <Text
                              my="15px"
                              color="#2A59FE"
                              fontWeight="500"
                              fontSize="14px"
                            >
                              {item.price} ₺
                            </Text>
                            <Text mb="15px" fontWeight="500" fontSize="14px">
                              {item.name}
                            </Text>
                          </Box>
                        </Link>
                        <Button
                          w="100%"
                          bg="#2A59FE"
                          color="white"
                          _hover={{
                            bg: "#2A59FE",
                            color: "white",
                            boxShadow: "0px 0px 10px rgba(42, 89, 254, 0.25)",
                          }}
                          onClick={() => addToCard(item.id)}
                        >
                          <Text fontSize="16px">Add to Cart</Text>
                        </Button>
                      </Stack>
                    </GridItem>
                  );
                })}
              </Grid>
            </motion.div>
          </AnimatePresence>
          <Center my="20px" display={totalPages == 1 ? "none " : "flex"}>
            <HStack color="#868DA5">
              <Box
                as="i"
                className="icon-arrowLeft"
                onClick={handlePrevPage}
                cursor={currentPage === 1 ? "no-drop" : "pointer"}
              />
              <HStack>
                {[...Array(totalPages)].map((_, i) => {
                  return (
                    <Center
                      key={i}
                      boxSize={{
                        base: "25px",
                        sm: "30px",
                      }}
                      rounded="6px"
                      textAlign="center"
                      lineHeight="30px"
                      fontSize="14px"
                      fontWeight="500"
                      bg={currentPage === i + 1 ? "white" : "transparent"}
                      color={currentPage === i + 1 ? "#2A59FE" : "#868DA5"}
                      onClick={() => setCurrentPage(i + 1)}
                      cursor="pointer"
                      _hover={{ cursor: "pointer" }}
                      boxShadow={
                        currentPage === i + 1
                          ? "0px 0px 10px rgba(162, 170, 180, 0.25)"
                          : "none"
                      }
                    >
                      {i + 1}
                    </Center>
                  );
                })}
              </HStack>
              <Box
                as="i"
                className="icon-ArrowRight"
                onClick={handleNextPage}
                cursor={currentPage === totalPages ? "no-drop" : "pointer"}
              />
            </HStack>
          </Center>
        </>
      )}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody py="30px" textAlign="center" fontWeight="700">
            This product is already in your cart
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
