import LoginForm from "@/components/LoginForm"
import InputBlank from "@/components/InputBlank"
import MoreButton from "@/components/MoreButton"
import { useNavigate, useLocation } from "react-router-dom"
import Blank from "@/components/Blank"
import Icon from "@/assets/Icon.svg?react"
import { useInput } from "@/hooks/useInput"
import { useState } from "react"
import type { FormEvent, FocusEventHandler } from "react"
import type { ValueType } from "@/interfaces/ValueType"
import { useAuth } from "@/context/AuthContext"
import { toast } from "react-toastify"

import {
  checkValid,
  validateEmail,
  validatePassword,
} from "@/functions/checkValid"

const Login = () => {
  const form: ValueType = {
    email: "",
    password: "",
  }

  const [data, onChange] = useInput(form)
  const { isEmailValid, isPasswordValid } = checkValid(data)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  )

  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/my"
  const { login } = useAuth()

  const handleBlur: FocusEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setErrors((prev) => ({
      ...prev,
      email: name === "email" ? validateEmail(value) : prev.email,
      password: name === "password" ? validatePassword(value) : prev.password,
    }))
  }

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    onChange(e)

    const { name, value } = e.target

    if (name === "email" && errors.email !== undefined) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    }
    if (name === "password" && errors.password !== undefined) {
      setErrors((prev) => ({ ...prev, password: validatePassword(value) }))
    }
  }

  const handleLogin = async () => {
    if (!isEmailValid || !isPasswordValid) return

    try {
      const success = await login(data.email, data.password)

      if (success) {
        navigate(from, { replace: true })
      } else {
        toast.error("@kakao.com 이메일 주소만 가능합니다.")
      }
    } catch (error) {
      console.log("로그인 중 오류가 발생했습니다. 다시 시도해주세요.")
    }
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleLogin()
  }

  return (
    <LoginForm action="#" onSubmit={submitHandler}>
      <Icon width="88px" height="88px"></Icon>
      <div>
        <InputBlank<ValueType>
          width="388px"
          height="44px"
          placeholder="이메일"
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={handleBlur}
          message={errors.email ?? ""}
        ></InputBlank>
        <Blank height="16px"></Blank>
        <InputBlank<ValueType>
          width="388px"
          height="44px"
          placeholder="비밀번호"
          name="password"
          value={data.password}
          onChange={handleChange}
          onBlur={handleBlur}
          message={errors.password ?? ""}
        ></InputBlank>
        <MoreButton
          background="kakaoYellow"
          borderRadius="spacing0"
          disabled={!isEmailValid || !isPasswordValid}
        >
          로그인
        </MoreButton>
      </div>
    </LoginForm>
  )
}

export default Login
