/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Divider, Typography } from "antd";
import Logo from "@/components/ui/Logo";
import TokenProvider from "@/lib/providers/antDesign/TokenProvider";
import Button from "@/components/ui/button/Button";
import dynamic from "next/dynamic";

const Login = dynamic(() => import("@/components/ui/forms/Login").then(mod => mod.default), {
  ssr: false,
});
const LoginPage = () => {
  // const router = useRouter();

  // const currentUser = useAppSelector(selectCurrentUser);
  // useEffect(() => {
  //   if (currentUser) {
  //     router.push("/dashboard");
  //   }
  // }, [currentUser, router]);

  // if (currentUser) {
  //   return router.push("/dashboard");
  // } else {
    return (
      <main
        className="w-[100vw] h-[100vh] flex items-center justify-center mx-auto my-auto p-6"
        style={{ backgroundColor: TokenProvider().colorBgContainer }}
      >
        <div
          className="w-[480px] py-5 md:py-0 mt-7 border rounded-xl shadow-sm"
          style={{
            backgroundColor: TokenProvider().colorBgElevated,
            borderColor: TokenProvider().colorBorder,
          }}
        >
          <div className="p-4 sm:p-7">
            <div className="text-center space-y-4">
              <Logo className="w-[180px] mx-auto mb-10" />
              <Typography.Title
                level={1}
                className="block !text-2xl text-center mt-6 font-bold dark:text-white text-primary"
                style={{ color: TokenProvider().colorText }}
              >
                Sign in
              </Typography.Title>
            </div>
            <div className="mt-5">
              <div className="flex justify-center gap-x-5 my-4">
                <FcGoogle size={48} className="border rounded py-3 w-20" />
                <BsFacebook
                  size={48}
                  className="w-20 border text-white bg-blue-600 rounded p-3"
                />
              </div>
              <div
                className="py-3 mx-auto flex items-center text-xs text-gray-400 uppercase"
                style={{ borderColor: TokenProvider().colorBorder }}
              >
                <Divider style={{ color: TokenProvider().colorText }}>
                  Or
                </Divider>
              </div>
              {/* <Form onFinish={submitForm} labelCol={{ span: 24 }}>
                <Form.Item
                  label={<p style={{ color: TokenProvider().colorText }}>Password</p>}
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
                  label={<div style={{ color: TokenProvider().colorText }}>Password</div>}
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
                      visible ? <FiEyeOff className="cursor-pointer"/> : <FiEye className="cursor-pointer"/>
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
                    // loading={status === "pending"}
                  >
                    Sign in
                  </Button>
                </Form.Item>
              </Form> */}
              <Login></Login>

              <div className="flex md:flex-row gap-2 justify-between items-end textSm font-medium -mt-3">
                <div className="mt-2 flex gap-0 justify-center items-center dark:text-gray-400">
                  <Typography.Text>Not a member?</Typography.Text>
                  <Button
                    href="/register"
                    className="text-secondary font-semibold decoration-2 hover:underline"
                    type="link"
                    style={{ color: TokenProvider().colorTextHeading }}
                  >
                    Sign up
                  </Button>
                </div>
                <Button
                  type="link"
                  href="/forget-password"
                  className="text-secondary decoration-2 hover:underline font-semibold !px-0"
                  style={{ color: TokenProvider().colorTextHeading }}
                >
                  Forgot password?
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
// };

export default LoginPage;
