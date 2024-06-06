import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from '../../styles/commonTheme';

import logo from '../../assets/images/logo.png';

import { DefaultAxios } from "../../apis/CommonAxios";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { styled as muiStyled } from "@mui/system";
import Swal from "sweetalert2";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Button } from "@mui/material";

const Base = styled.div`
  max-width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.beige};
`;

const Body = styled.div`
  max-width: 1200px; /* 필요에 따라 조절 */
  width: 100%;
  display: flex;
  justify-content: center;
  background-color: ${theme.colors.beige};
`;


const TitleSmall = styled.h2`
  font-size: 24px;
  line-height: 35px;
  text-align: center;
  font-family:englogo;
`;

const Container = styled.div`
  max-width: 1200px;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  background-color: ${theme.colors.beige};
`;

const TitleWrapper = styled.div`
  margin-top: 1px;
  margin-bottom: -40px; /* 여기에 여백 추가 */
  display: flex;
  justify-content: center; /* 수평 가운데 정렬 */
  align-items: center; /* 수직 가운데 정렬 */
  flex-direction: column; /* 아래로 정렬되도록 설정 */
  max-width: 1200px;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  margin-bottom: 7px;
  margin: 0 auto; /* 수평 가운데 정렬 */
  
`;

const CustomButton = muiStyled(Button)({
  
  backgroundColor: "#000",
  color:  "#ffffff",
  "&:hover": {
    backgroundColor: "#fff",
  },
  width: "150px",
  height: "50px",
  fontSize: "20px",
  alignSelf: "center",
});


 

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();
  const [joinedDate, setJoinedDate] = useState(null);
  const [isShowPw, setShowPwState] = useState(false);

  const password = watch("password");
  const comfirmPassword = watch("confirmPassword");

  const toggleHidePassword = () => {
    setShowPwState(!isShowPw);
  };

  const navigate = useNavigate();

  const signUp = async (data) => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    console.log(data);
    try {
      const res = await DefaultAxios.post(`${API_BASE_URL}/v1/auth/local/sign-up`, data);
      
      if (res.data.result === "_OK") {
        Swal.fire({
          icon: "success",
          title: "회원가입이 완료되었습니다.",
          showConfirmButton: true,
          confirmButtonColor: "black",
          confirmButtonText: "확인",
        }).then(() => {
          navigate("/main"); // 회원가입 성공 시 로그인 페이지로 이동
        });
      }
    } catch (e) {
      Swal.fire({
        icon: "error",
        title: "회원가입에 실패했습니다.",
        showConfirmButton: true,
        confirmButtonColor: "gray",
        confirmButtonText: "확인",
        footer: "이미 등록된 회원입니다.",
      });
    }
  };


  useEffect(() => {
    if (password && comfirmPassword && password !== comfirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "비밀번호가 일치하지 않습니다.",
      });
    } else {
      clearErrors("confirmPassword");
    }
  }, [password, comfirmPassword, setError, clearErrors]);

  return (
    <Base>
      <Body>
        
        <Container>
          <TitleWrapper>
            <TitleSmall>Welcome to Gramary</TitleSmall>&nbsp;
        
          </TitleWrapper>
          <form
            onSubmit={handleSubmit((data) => {
              data.joinedAt = joinedDate;
              signUp(data);
            })}
          >
            <InputWrapper>
              <StyleTextField
                id="name"
                label="이름"
                variant="outlined"
                placeholder="이름을 입력하세요."
                {...register("name")}
              />
              <StyleTextField
                id="nickname"
                label="닉네임"
                variant="outlined"
                placeholder="닉네임을 입력하세요."
                {...register("nickname")}
              />
              <StyleTextField
                id="social"
                label="직업"
                variant="outlined"
                placeholder="직업을 입력하세요."
                {...register("social")}
              />
              <StyleTextField
                id="phoneNum"
                label="전화번호"
                variant="outlined"
                placeholder="전화번호를 입력하세요."
                {...register("phoneNum")}
              />
              <StyleTextField
                id="email"
                label="이메일"
                variant="outlined"
                placeholder="이메일을 입력하세요."
                {...register("email")}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <StyleTextField
                  id="password"
                  label="비밀번호"
                  type={isShowPw ? "text" : "password"}
                  variant="outlined"
                  placeholder="비밀번호를 입력하세요."
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password ? errors.password.message : ""}
                />
                <Icon onClick={toggleHidePassword}>
                  {isShowPw ? <FaEyeSlash /> : <FaEye />}
                </Icon>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  position: "relative",
                }}
              >
                <StyleTextField
                  id="confirmPassword"
                  label="비밀번호 확인"
                  type={isShowPw ? "text" : "password"}
                  variant="outlined"
                  placeholder="비밀번호를 다시 입력하세요."
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={
                    errors.confirmPassword ? errors.confirmPassword.message : ""
                  }
                />
                <Icon onClick={toggleHidePassword}>
                  {isShowPw ? <FaEyeSlash /> : <FaEye />}
                </Icon>
              </div>
              {password === comfirmPassword ? (
                <CustomButton type="submit" variant="contained">
                  회원가입
                </CustomButton>
              ) : (
                <CustomButton disabled>회원가입</CustomButton>
              )}
            </InputWrapper>
          </form>
        </Container>
      </Body>
    </Base>
  );
};

export default SignUp;

const StyleTextField = styled(TextField)`
  width: 300px;
  max-width: 300px; /* 최대 너비를 설정 */
  margin: 3px auto; /* 위아래 마진을 설정하고 가로는 자동으로 조정 */
  background-color: #fbfcfe;
`;

const Icon = styled.div`
  position: absolute;
  top: 50%;
  right: 8px; /* 오른쪽 여백을 조정 */
  transform: translateY(20%); /* 세로 중앙 정렬 */
  height: 30px; /* 아이콘의 높이 설정 */
  cursor: pointer;
  margin-top: -15px; /* 아이콘을 수직 가운데로 조정 */
`;
