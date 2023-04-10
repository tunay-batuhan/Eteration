import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Input,
  InputGroup,
  InputLeftElement,
  Radio,
  RadioGroup,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { filterState, filteredLastData } from "../Products/Products";
import { ProductsData } from "@/pages";
import { useEffect, useState } from "react";

export default function FilterComp() {
  const [filterStateValue, setFilterState] = useAtom(filterState);
  const [filteredData] = useAtom(filteredLastData);
  const [searchBrand, setSearchBrand] = useState<string[]>([]);
  const [searchModel, setSearchModel] = useState<string[]>([]);
  useEffect(() => {
    setSearchBrand(
      Array.from(new Set(filteredData?.map((item: ProductsData) => item.brand)))
    );
    setSearchModel(
      Array.from(new Set(filteredData?.map((item: ProductsData) => item.model)))
    );
  }, [filteredData]);

  const handleRadioGrup = (event: string) => {
    setFilterState({
      ...filterStateValue,
      sortBy: event,
    });
  };
  const handleBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterState({
        ...filterStateValue,
        brand: [...filterStateValue.brand, event.target.value],
      });
    } else {
      setFilterState({
        ...filterStateValue,
        brand: filterStateValue.brand.filter(
          (item: string) => item !== event.target.value
        ),
      });
    }
  };
  const handleModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setFilterState({
        ...filterStateValue,
        model: [...filterStateValue.model, event.target.value],
      });
    } else {
      setFilterState({
        ...filterStateValue,
        model: filterStateValue.model.filter(
          (item: string) => item !== event.target.value
        ),
      });
    }
  };
  let timerBrands: NodeJS.Timeout;
  const handleInputBrands = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerBrands);
    timerBrands = setTimeout(() => {
      setSearchBrand(
        Array.from(
          new Set(
            filteredData
              ?.filter((item: ProductsData) =>
                item.brand
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
              .map((item: ProductsData) => item.brand)
          )
        )
      );
    }, 300);
  };
  let timerModel: NodeJS.Timeout;
  const handleInputModel = (event: React.ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timerModel);
    timerModel = setTimeout(() => {
      setSearchModel(
        Array.from(
          new Set(
            filteredData
              ?.filter((item: ProductsData) =>
                item.model
                  .toLowerCase()
                  .includes(event.target.value.toLowerCase())
              )
              .map((item: ProductsData) => item.model)
          )
        )
      );
    }, 300);
  };

  return (
    <Stack>
      <Grid
        templateColumns="repeat(12, 1fr)"
        gap={{
          base: "10px",
        }}
        w="100%"
      >
        <GridItem
          colSpan={{
            base: 12,
            lg: 12,
            xl: 12,
          }}
          mb="40px"
        >
          <Stack>
            <Text fontSize="12px" mb="6px">
              Sort By
            </Text>
            <Box
              bg="white"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              p="16px 20px"
            >
              <RadioGroup onChange={handleRadioGrup}>
                <Stack gap="18px" color="#333333">
                  <Radio value="ASC">
                    <Text color="#333333" fontSize="14px" lineHeight="17px">
                      Old to new
                    </Text>
                  </Radio>
                  <Radio value="DESC">
                    <Text color="#333333" fontSize="14px" lineHeight="17px">
                      New to old
                    </Text>
                  </Radio>
                  <Radio value="PDESC">
                    <Text color="#333333" fontSize="14px" lineHeight="17px">
                      Price hight to low
                    </Text>
                  </Radio>
                  <Radio value="PASC">
                    <Text color="#333333" fontSize="14px" lineHeight="17px">
                      Price low to High
                    </Text>
                  </Radio>
                </Stack>
              </RadioGroup>
            </Box>
          </Stack>
        </GridItem>
        <GridItem
          colSpan={{
            base: 12,
            lg: 12,
            xl: 12,
          }}
          mb="40px"
        >
          <Text fontSize="12px" mb="6px">
            Brands
          </Text>
          <Box
            bg="white"
            boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
            p="16px 20px"
          >
            <FormControl color="#868DA5" mb="15px">
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
                  bg="#FAFAFB"
                  border="none"
                  _focusVisible={{
                    border: "none",
                  }}
                  onChange={handleInputBrands}
                />
              </InputGroup>
            </FormControl>
            <Stack
              gap="18px"
              h="130px"
              overflow="auto"
              className="customScroll"
              onChange={handleBrands}
            >
              {searchBrand.map((item, index) => {
                return (
                  <Checkbox colorScheme="blue" key={index + item} value={item}>
                    <Text color="#333333" fontSize="14px" lineHeight="17px">
                      {item}
                    </Text>
                  </Checkbox>
                );
              })}
            </Stack>
          </Box>
        </GridItem>
        <GridItem
          colSpan={{
            base: 12,
            lg: 12,
            xl: 12,
          }}
        >
          <Stack>
            <Text fontSize="12px" mb="6px">
              Modal
            </Text>
            <Box
              bg="white"
              mt="0 !important"
              boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
              p="16px 20px"
            >
              <FormControl color="#868DA5" mb="15px">
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
                    bg="#FAFAFB"
                    border="none"
                    _focusVisible={{
                      border: "none",
                    }}
                    onChange={handleInputModel}
                  />
                </InputGroup>
              </FormControl>
              <Stack
                gap="18px"
                h="130px"
                overflow="auto"
                className="customScroll"
                onChange={handleModel}
              >
                {searchModel?.map((item, index) => {
                  return (
                    <Checkbox
                      colorScheme="blue"
                      key={index + item}
                      value={item}
                    >
                      <Text color="#333333" fontSize="14px" lineHeight="17px">
                        {item}
                      </Text>
                    </Checkbox>
                  );
                })}
              </Stack>
            </Box>
          </Stack>
        </GridItem>
      </Grid>
    </Stack>
  );
}
