"use client";
import TokenProvider from '@/lib/providers/antDesign/TokenProvider';
import { Result } from 'antd';

const NotFound = ({message, className=''}:{message:string, className?:string}) => (
  <div className='flex justify-center items-center py-20'>
    <Result
      status="404"
      title="404"
      subTitle={message}
      className={`[&&>div>svg]:w-[400px] ${className}`}
      style={{color: TokenProvider().colorText}}
    />
  </div>
);

export default NotFound;