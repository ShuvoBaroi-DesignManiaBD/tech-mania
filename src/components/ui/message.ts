// utils/showMessage.ts
import { message } from "antd";

interface IMessage {
  type: "success" | "error" | "warning" | "info";
  message: string;
}

export const showMessage = ({ type, message: msg }: IMessage) => {
  message.open({
    type,
    content: msg,
  });
};


// "use client";
// // utils/showMessage.ts
// import { message } from "antd";

// interface IMessage {
//   type: "success" | "error" | "warning" | "info";
//   message: string;
// }

// export const Message = ({ type, message: msg }: IMessage) => {
//   message.open({
//     type,
//     content: msg,
//   });
// };


// const showMessage = ({ type, message }: IMessage) => {
//   return Message({type, message})
// };

// export default showMessage;