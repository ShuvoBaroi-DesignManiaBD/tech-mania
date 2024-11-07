"use client";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import { useRegisterUserMutation } from "@/redux/features/users/userApi";
import { IRegisterData } from "@/types";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select } from "antd";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { showMessage } from "@/components/ui/message";

const UserCreatePopup = ({ visible, setVisible }) => {
  const [register, { status }] = useRegisterUserMutation();
  const router = useRouter();

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
        role: values.role,
      };
      const res = await register(userData).unwrap();

      if (res && res.success) {
        showMessage({
          type: "success",
          message: "Register successful!",
        });
        setVisible(!visible);
        router.push("/login");
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

  const colorText = TokenProvider()?.colorText;

  return (
    <Modal
      visible={visible}
      onCancel={() => setVisible(!visible)}
      footer={null}
      centered
    >
      <Form onFinish={submitForm} layout="vertical" labelCol={{ span: 24 }}>
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
          />
        </Form.Item>

        <Form.Item
          label={<p style={{ color: colorText }}>Your Email</p>}
          name="email"
          rules={[
            { required: true, message: "Email is required." },
            { type: "email", message: "Enter a valid email." },
          ]}
        >
          <Input
            size="large"
            placeholder="Your email"
            prefix={<MailOutlined />}
          />
        </Form.Item>

        <Form.Item
          label={<div style={{ color: colorText }}>Password</div>}
          name="password"
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
            iconRender={(visible) =>
              visible ? (
                <FiEyeOff onClick={togglePasswordVisibility} />
              ) : (
                <FiEye onClick={togglePasswordVisibility} />
              )
            }
          />
        </Form.Item>

        <Form.Item
          label={<div style={{ color: colorText }}>Confirm Password</div>}
          name="confirmPassword"
          rules={[
            { required: true, message: "Confirm password is required!" },
            { min: 8, message: "Your password must be at least 8 characters." },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
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
            iconRender={(visible) =>
              visible ? (
                <FiEyeOff onClick={toggleConfirmPasswordVisibility} />
              ) : (
                <FiEye onClick={toggleConfirmPasswordVisibility} />
              )
            }
          />
        </Form.Item>

        <Form.Item
          label={<p style={{ color: colorText }}>User Role</p>}
          name="role"
          rules={[{ required: true, message: "User role is required." }]}
        >
          <Select size="large" placeholder="Select user role">
            <Select.Option value="user">User</Select.Option>
            <Select.Option value="admin">Admin</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            className="w-full"
            loading={status === "pending"}
            disabled={status === "pending"}
          >
            Add user
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UserCreatePopup;
