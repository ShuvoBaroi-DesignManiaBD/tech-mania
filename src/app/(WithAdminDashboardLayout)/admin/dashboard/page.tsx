/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { BsCashCoin } from "react-icons/bs"; 
import { BiShoppingBag } from "react-icons/bi"; 
import { BsBoxes } from "react-icons/bs"; 
import { HiUsers } from "react-icons/hi";
import { useGetAllStatisticsQuery } from "@/redux/features/statistics/statisticsApi";
import { Card, Statistic, Table, Tag } from "antd";
import Title from "antd/es/typography/Title";

import LineChart from "@ant-design/plots/es/components/line";


const Page = () => {
  const { data, isFetching } = useGetAllStatisticsQuery(null);
//   const { data: orders, isFetching: status } = useAllOrdersQuery({ page: 1, limit: 5 });
  const statistics = data?.data || {};

  // Format daily revenue data for the last 30 days
  const dailyRevenueData = (statistics as any).dailyRevenue?.map((revenue) => ({
    date: `${revenue._id.day}/${revenue._id.month}/${revenue._id.year}`, 
    revenue: revenue.dailyRevenue,
  })) || [];

  const config = {
    isStack: false,
    data: dailyRevenueData,
    xField: "date", 
    yField: "revenue", 
    point: {
      size: 5,
      shape: "diamond",
    },
    lineStyle: {
      stroke: '#ff7f0e !important',
    },
    tooltip: {
      showMarkers: true,
    },
    height: 250,
    xAxis: {
      title: {
        text: "Date",
      },
    },
    yAxis: {
      title: {
        text: "Revenue",
      },
    },
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Gateway",
      dataIndex: "gateWay",
      key: "gateWay",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "paid" ? "green" : "volcano"}>
          {status.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date: string) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div className="w-full flex flex-col my-4 gap-6 md:gap-10 md:mt-0">
      <div className="w-full flex flex-col gap-4 md:gap-6">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <Card
            className="shadow-sm w-full [&&_.ant-statistic-content-prefix]:!rounded-full [&&_.ant-statistic-content-prefix]:p-[18px] [&&_.ant-statistic-content-prefix]:bg-dark-textHeading/10"
            hoverable
            loading={isFetching}
          >
            <Title level={2} className="!text-base !text-primary/60 !font-medium absolute left-[105px] top-[26px]">
              Posts
            </Title>
            <Statistic
              prefix={<BsBoxes className="text-primary size-[28px]" />}
              value={(statistics as any)?.postCount ?? 0}
              valueStyle={{ fontSize: "24px", fontWeight: 700, display: "flex",
                alignItems: "end",
                gap: "10px",}}
              className="relative"
            />
          </Card>

          <Card
            className="shadow-sm w-full [&&_.ant-statistic-content-prefix]:!rounded-full [&&_.ant-statistic-content-prefix]:p-[18px] [&&_.ant-statistic-content-prefix]:bg-dark-textHeading/10"
            hoverable
            loading={isFetching}
          >
            <Title level={2} className="!text-base !text-primary/60 !font-medium absolute left-[105px] top-[26px]">
              Total Users
            </Title>
            <Statistic
              prefix={<HiUsers className="text-primary size-[28px]" />}
              value={(statistics as any)?.userCount ?? 0}
              valueStyle={{ fontSize: "24px", fontWeight: 700,  display: "flex",
                alignItems: "end",
                gap: "10px",}}
              className="relative"
            />
          </Card>

          <Card
            className="shadow-sm w-full [&&_.ant-statistic-content-prefix]:!rounded-full [&&_.ant-statistic-content-prefix]:p-[18px] [&&_.ant-statistic-content-prefix]:bg-dark-textHeading/10"
            hoverable
            loading={isFetching}
          >
            <Title level={2} className="!text-base !text-primary/60 !font-medium absolute left-[105px] top-[26px]">
              Verified Users
            </Title>
            <Statistic
              prefix={<BiShoppingBag className="text-primary size-[30px] " />}
              value={(statistics as any)?.verifiedUserCount ?? 0}
              valueStyle={{ fontSize: "24px", fontWeight: 700, display: "flex",
                alignItems: "end",
                gap: "10px", }}
              className="relative"
            />
          </Card>

          <Card
            className="shadow-sm w-full [&&_.ant-statistic-content-prefix]:!rounded-full [&&_.ant-statistic-content-prefix]:p-[18px] [&&_.ant-statistic-content-prefix]:bg-dark-textHeading/10"
            hoverable
            loading={isFetching}
          >
            <Title level={2} className="!text-base !text-primary/60 !font-medium absolute left-[105px] top-[26px]">
              Subscription Revenue
            </Title>
            <Statistic
              prefix={<BsCashCoin className="text-primary size-[30px]" />}
              value={`$${(statistics as any)?.totalSubscriptionRevenue || 0}`}
              valueStyle={{ fontSize: "24px", fontWeight: 700, display: "flex",
                alignItems: "end",
                gap: "10px",}}
              className="relative"
            />
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 pb-10 md:grid-cols-2">
          {/* <Table
            dataSource={orders?.data}
            columns={columns}
            bordered
            title={() => <h2 className="text-xl font-semibold p-1.5">Recent Orders</h2>}
            rowKey={(record) => record._id}
            loading={status}
            scroll={{ x: "100%" }}
            size="small"
            tableLayout="auto"
          /> */}

          <Card className="shadow-sm self-start" loading={isFetching}>
            <h2 className="text-xl font-semibold mb-4 -mt-1.5">
              Daily Revenue (Last 30 Days)
            </h2>
            <LineChart {...config} height={350} />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Page;
