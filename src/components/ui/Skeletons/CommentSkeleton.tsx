import { Skeleton } from "antd";

const CommentSkeleton = ({ repeat }: { repeat: Array<number> }) => {
  return repeat.map((id) => (
    <div key={id} className="flex items-start justify-between mb-4 p-3 rounded-xl" >
      <div className="flex gap-2 items-start">
        {/* Avatar Skeleton */}
        <Skeleton.Avatar
          active
          size="large"
          shape="circle"
          className="mr-2 z-10 relative"
        />
        {/* <span
          className="w-16 h-[68%] border-l-2 absolute left-8 top-5 rounded-lg"
          style={{ borderColor: "#d9d9d9" }}
        ></span> */}

        {/* Name and Content Skeleton */}
        <div>
          <Skeleton.Input
            active
            size="small"
            style={{ width: 120, marginBottom: 8 }}
          />
          <Skeleton paragraph={{ rows: 1, width: 200 }} active />
        </div>
      </div>

      {/* Upvote / Downvote Skeleton Buttons */}
      <div className="flex items-center space-x-2">
        <Skeleton.Button
          active
          size="small"
          shape="default"
          style={{ width: 50 }}
        />
        <Skeleton.Button
          active
          size="small"
          shape="default"
          style={{ width: 50 }}
        />
      </div>
    </div>
  ));
};

export default CommentSkeleton;
