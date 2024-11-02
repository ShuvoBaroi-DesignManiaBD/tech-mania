import { Skeleton } from "antd";

const UserCardSkeleton = () => (
  <div className="flex items-center gap-2 justify-between">
    <div className="flex items-center gap-0 py-3">
      <Skeleton.Avatar active size={48} className="mr-3" />
      <div>
        <Skeleton.Button active size="small" style={{ width: 100, height: 20, marginBottom: 4 }} />
        <Skeleton.Button active size="small" style={{ width: 30, height: 20, }} />
      </div>
    </div>
    <Skeleton.Button active size="small" style={{ width: 30 }} />
  </div>
);

export default UserCardSkeleton;
