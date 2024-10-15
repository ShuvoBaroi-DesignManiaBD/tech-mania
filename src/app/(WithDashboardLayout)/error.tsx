"use client";

import { Button, Result } from "antd";
import ButtonGroup from "antd/es/button/button-group";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    /* eslint-disable no-console */
    console.error(error);
  }, [error]);

  return (
    <Result
      status="500"
      title="500"
      subTitle="Sorry, something went wrong."
      className="!py-28"
      extra={
        <ButtonGroup>
          <Button type="default" href="/">Back Home</Button>
          <Button
            type="primary"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </ButtonGroup>
      }
    />
  );
}
