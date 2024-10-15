import { Button, Result } from "antd";
import Link from "next/link";

export default function NotFound () {
    return (
        <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    className="h-[100vh] content-center"
    extra={<Link href="/"><Button type="primary">Back Home</Button></Link>}
  />
    );
};