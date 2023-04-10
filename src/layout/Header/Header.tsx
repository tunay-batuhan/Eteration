import {
  Box,
  Container,
  Flex,
  FormControl,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";
import { useAtom } from "jotai";
import { basketData, filterState } from "@/components/Products/Products";

export default function Header() {
  const [filterStatee, setFilterState] = useAtom(filterState);
  const [basketList] = useAtom(basketData);

  let timer: NodeJS.Timeout;
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setFilterState({
        ...filterStatee,
        search: e.target.value,
      });
    }, 300);
  };

  return (
    <Box
      bg="#2A59FE"
      py={{
        base: "16px",
        lg: "10px",
      }}
      mb="50px"
    >
      <Container
        maxW={{
          base: "600px",
          md: "760px",
          lg: "1000px",
          xl: "1200px",
          xxl: "1352px",
        }}
        px={{ base: "16px" }}
        color="white"
      >
        <HStack justify="space-between" alignItems="center">
          <Flex alignItems="center">
            <Link href={"/"}>
              <Text fontSize="24px" lineHeight="29px" fontWeight="800">
                Eteration
              </Text>
            </Link>
            <FormControl
              color="#868DA5"
              display={{
                base: "none",
                lg: "block",
              }}
              ml="129px"
              w="408px"
            >
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  // eslint-disable-next-line react/no-children-prop
                  children={<Box as="i" className="icon-Search" />}
                />
                <Input
                  type="text"
                  placeholder="Search"
                  _placeholder={{ color: "#868DA5" }}
                  color="black"
                  fontSize="18px"
                  lineHeight="22px"
                  fontWeight="500"
                  bg="white"
                  onChange={handleSearch}
                />
              </InputGroup>
            </FormControl>
          </Flex>
          <HStack
            gap={{
              base: "16px",
              lg: "22px",
            }}
          >
            <Flex
              gap={{
                base: "6px",
                lg: "12px",
              }}
              alignItems="center"
            >
              <Box fontSize="18px" as="i" className="icon-Portfeil" />
              <Text fontSize="16px" lineHeight="20px">
                {basketList?.reduce((acc: number, item: any) => {
                  return acc + item.price * item.count;
                }, 0)}{" "}
                ₺
              </Text>
            </Flex>
            <Flex
              gap={{
                base: "6px",
                lg: "12px",
              }}
              alignItems="center"
            >
              <Box fontSize="16px" as="i" className="icon-Profile" />
              <Text fontSize="16px" lineHeight="20px">
                Kerem
              </Text>
            </Flex>
          </HStack>
        </HStack>

        <FormControl
          mt="20px"
          color="#868DA5"
          display={{
            base: "block",
            lg: "none",
          }}
        >
          <InputGroup>
            <InputLeftElement
              pointerEvents="none"
              // eslint-disable-next-line react/no-children-prop
              children={<Box as="i" className="icon-Search" />}
            />
            <Input
              type="text"
              placeholder="Search"
              _placeholder={{ color: "#868DA5" }}
              color="black"
              fontSize="18px"
              lineHeight="22px"
              fontWeight="500"
              bg="white"
              onChange={handleSearch}
            />
          </InputGroup>
        </FormControl>
      </Container>
    </Box>
  );
}
