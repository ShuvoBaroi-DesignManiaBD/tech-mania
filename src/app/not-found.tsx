import { Button, Result } from "antd";
import Link from "next/link";

const NotFound = () => {
    return (
        <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    className="h-[100vh] content-center"
    extra={<Button type="primary"><Link href="/">Back Home</Link></Button>}
  />
    );
};

export default NotFound;