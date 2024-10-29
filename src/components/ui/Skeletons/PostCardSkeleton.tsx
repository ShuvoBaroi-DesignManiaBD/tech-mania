import { Card, Skeleton } from "antd";

const PostCardSkeleton = ({repeat}:{repeat:Array<number>}) => {
    return (
        repeat.map((id) => (
            <Card key={id} loading cover={<Skeleton.Image active className="!w-full !h-[30vh]" />}>Loading posts...</Card>
          ))
    );
};

export default PostCardSkeleton;