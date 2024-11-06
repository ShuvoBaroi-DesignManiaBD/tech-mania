"use client";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useRegisterUserMutation } from "@/redux/features/users/userApi";
import { setUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { IRegisterData } from "@/types";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { showMessage } from "../message";
import { useRouter } from "next/navigation";

const Register = () => {
  const [register, { status }] = useRegisterUserMutation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Separate states for password and confirm password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const submitForm = async (values: IRegisterData) => {
    try {
      const userData = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
      };
      const res = await register(userData).unwrap();

      if (res && res.success) {
        dispatch(setUser({ user: res.data, token: res.token }));
        showMessage({
          type: "success",
          message: "Register successful! Redirecting to login page ...",
        });
        return router.push("/login");
      } else {
        showMessage({
          type: "error",
          message: res.message || "Register failed",
        });
      }
    } catch (error) {
      console.error(error);
      showMessage({ type: "error", message: "Something went wrong!" });
    }
  };

  // Store token color to reuse
  const colorText = TokenProvider()?.colorText;

  return (
    <Form onFinish={submitForm} layout='vertical' labelCol={{ span: 24 }} className="grid grid-cols-2 gap-x-4">
      <Form.Item
        label={<p style={{ color: colorText }}>Full Name</p>}
        name="name"
        rules={[{ required: true, message: "Name is required." }]}
      >
        <Input
          size="large"
          type="text"
          placeholder="Your full name"
          prefix={<UserOutlined />}
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base -mt-1"
        />
      </Form.Item>

      <Form.Item
        label={<p style={{ color: colorText }}>Username</p>}
        name="username"
        rules={[{ required: true, message: "Username is required." }]}
      >
        <Input
          size="large"
          type="text"
          placeholder="Your username (must be unique)"
          prefix={<UserOutlined />}
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base -mt-1"
        />
      </Form.Item>

      <Form.Item
        label={<p style={{ color: colorText }}>Your Email</p>}
        name="email"
        className="col-span-full"
        rules={[
          { required: true, message: "Email is required." },
          { type: "email", message: "Enter a valid email." },
        ]}
      >
        <Input
          size="large"
          placeholder="Your email"
          prefix={<MailOutlined />}
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base -mt-1"
        />
      </Form.Item>

      <Form.Item
        label={<div style={{ color: colorText }}>Password</div>}
        name="password"
        className="!p-0 col-span-full"
        rules={[
          { required: true, message: "Password is required." },
          { min: 8, message: "Your password must be at least 8 characters." },
        ]}
      >
        <Input.Password
          placeholder="Your password"
          type={showPassword ? "text" : "password"}
          prefix={<LockOutlined />}
          size="large"
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base -mt-1"
          iconRender={(visible) => visible ? <FiEyeOff onClick={togglePasswordVisibility} /> : <FiEye onClick={togglePasswordVisibility} />}
        />
      </Form.Item>

      <Form.Item
        label={<div style={{ color: colorText }}>Confirm Password</div>}
        name="confirmPassword"
        className="!p-0 col-span-full"
        rules={[
          { required: true, message: "Confirm password is required!" },
          { min: 8, message: "Your password must be at least 8 characters." },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Passwords do not match!"));
            },
          }),
        ]}
      >
        <Input.Password
          placeholder="Confirm your password"
          type={showConfirmPassword ? "text" : "password"}
          prefix={<LockOutlined />}
          size="large"
          className="!py-3 block w-full border-2 focus:outline-primary rounded-lg !text-base -mt-1"
          iconRender={(visible) => visible ? <FiEyeOff onClick={toggleConfirmPasswordVisibility} /> : <FiEye onClick={toggleConfirmPasswordVisibility} />}
        />
      </Form.Item>

      <Form.Item className="col-span-full">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          className="w-full"
          loading={status === "pending"}
          disabled={status === "pending"}
        >
          Register
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Register;
