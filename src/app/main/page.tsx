"use client";
import { Box, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import ChattingRoom, {
  DietMsgType,
} from "../../../component/card/ChattingRoom";
import DietStateCard from "../../../component/card/DietStateCard";
import { useRouter } from "next/navigation";
import TheHeader from "../../../component/header/TheHeader";
import UserIcon from "../../../component/icon/UserIcon";
import TextLogoIcon from "../../../component/icon/TextLogoIcon";
import HealthMountainIcon from "../../../component/icon/HealthMountainIcon";
import DietStateSection from "../../../component/section/DietStateSection";
import { usePostUserDiet } from "../../../utils/hooks/usePostUserDiet";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UserInfoType } from "../../../component/template/SignupTemplate";
import { DietResponse } from "../../../utils/api/AxiosSetting";

export interface UserPostDietData extends UserInfoType {
  query: string;
  userId?: string | null;
}

const Page = () => {
  const router = useRouter();
  const [chattingData, setChattingData] = useState<string>("");
  const [userDiet, setUserDiet] = useState<boolean>(false);

  const {
    userDietResponseData: dietResponseData,
    postUserDietMutation,
    isLoading,
  } = usePostUserDiet();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<DietMsgType>();

  useEffect(() => {
    let userDietData: any = localStorage.getItem("userDiet");
    setUserDiet(userDietData);
  }, [userDiet]);

  const onSubmit: SubmitHandler<DietMsgType> = async (data) => {
    reset();
    const userInfoString: string | null = localStorage.getItem("userInfo");
    if (userInfoString !== null) {
      const userInfo: UserInfoType = JSON.parse(userInfoString);
      const userInfoData: UserPostDietData = {
        query: data.msg,
        name: userInfo.name,
        age: userInfo.age,
        weight: userInfo.weight,
        height: userInfo.height,
        targetWeight: userInfo.targetWeight,
        gender: userInfo.gender,
      };
      setChattingData(data.msg);
      await postUserDietMutation(userInfoData);
    }
  };

  return (
    <>
      <Flex
        flexDir={"column"}
        w={"100%"}
        h={"100vh"}
        pos={"relative"}
        margin={"0 auto"}
        maxW={"420px"}
        minW={"390px"}
        padding={"60px 0px 0px 0px"}
        bgColor={"#2B2C2C"}
        alignItems={"center"}
      >
        <TheHeader>
          <TextLogoIcon />
          <Text onClick={() => router.push("/mypage")} cursor={"pointer"}>
            <UserIcon />
          </Text>
        </TheHeader>
        <VStack spacing={"20px"} w={"100%"} h={"100%"}>
          {!userDiet ? (
            <DietStateCard>
              <HStack
                display={"flex"}
                margin={"0 auto"}
                w={"100%"}
                alignItems={"flex-end"}
              >
                <Box w={"100%"}>
                  <Text fontSize={"16px"} color={"#787878"}>
                    잠깐 스톱, 회원님 뭐드셨어요?
                  </Text>
                  <Text fontSize={"22px"}>
                    식단을 입력하시면
                    <br />
                    오늘의 솔루션을 드릴게요
                  </Text>
                </Box>
                <HealthMountainIcon />
              </HStack>
            </DietStateCard>
          ) : (
            <DietStateCard>
              <DietStateSection isLoading={isLoading} />
            </DietStateCard>
          )}

          <ChattingRoom
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            chattingData={chattingData}
            isLoading={isLoading}
            dietResponseData={dietResponseData}
          />
        </VStack>
      </Flex>
    </>
  );
};

export default Page;
