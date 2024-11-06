"use client";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IResError, TSignInData } from "@/types";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { showMessage } from "../message";
import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";
// const TokenProvider = dynamic(() => import("@/lib/providers/antDesign/TokenProvider"), {
//   ssr: false,
// });
const Login = () => {
  const [login, { status, data }] = useLoginMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePass = () => {
    setShowPassword(!showPassword);
  };

  const submitForm = async (values: TSignInData) => {
    // console.log(values);

    try {
      const res = await login(values).unwrap();

      if (res && res?.success) {
        // const user = verifyToken(res?.token || '') as IUser;
        dispatch(setUser({ user: res.data, token: res.token }));
        showMessage({ type: "success", message: "Login successful!" });
        console.log('role', res?.data?.role);
        
        if(res?.data?.role === "admin"){
          return router.push("/admin/dashboard");
        }
        return router.push("/user/dashboard");
      } else {
        showMessage({ type: "error", message: res?.message || "Login failed" });
        throw new Error(res.message || "Login failed");
      }
    } catch (error) {
      console.error();
      if ((error as IResError)?.message?.toLowerCase().includes("password")) {
        showMessage({ type: "error", message: "Password does not match!" });
      } else {
        showMessage({ type: "error", message: "Something went wrong!" });
      }
    }
  };
  return (
    <Form onFinish={submitForm} labelCol={{ span: 24 }}>
      <Form.Item
        label={<p style={{ color: TokenProvider()?.colorText }}>Your email</p>}
        name="email"
        className="!mb-4"
        rules={[
          { required: true, message: "Email is required." },
          { type: "email", message: "Enter a valid email." },
        ]}
      >
        <Input
          size="large"
          placeholder="Your email"
          prefix={<UserOutlined />}
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base mb-2 -mt-1"
        />
      </Form.Item>

      <Form.Item
        label={
          <div style={{ color: TokenProvider()?.colorText }}>Password</div>
        }
        name="password"
        className="!p-0"
        rules={[
          { required: true, message: "Password is required." },
          {
            min: 8,
            message: "Your password must be at least 8 characters.",
          },
        ]}
      >
        <Input.Password
          placeholder="Your password"
          type={showPassword ? "text" : "password"}
          prefix={<LockOutlined />}
          size="large"
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base mb-2 -mt-1"
          iconRender={(visible) =>
            visible ? (
              <FiEyeOff className="cursor-pointer" />
            ) : (
              <FiEye className="cursor-pointer" />
            )
          }
          onClick={togglePass}
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
          loading={status === "pending"}
          disabled={status === "pending"}
          iconPosition="end"
        >
          Sign in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
