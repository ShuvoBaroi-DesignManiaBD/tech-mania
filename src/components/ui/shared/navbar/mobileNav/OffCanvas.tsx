"use client";
import Button from "@/components/ui/button/Button";
import Logo from "@/components/ui/Logo";
import { selectOffCanvasState, setOffCanvasState } from "@/redux/features/ui/offCanvas/offCanvasSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { CloseOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import MainNavItems from "../mainNav/MainNavItems";

const OffCanvas = () => {
  const dispatch = useAppDispatch();
  const offCanvasState = useAppSelector(selectOffCanvasState);
  const toggleOffCanvas = () => {
    dispatch(setOffCanvasState());
  };
    return (
        <Drawer
        closable={false} // Disable default close button
        width="100vw" // Full width for mobile
        destroyOnClose
        title={
          <div className="flex justify-between items-center">
            <div className="max-w-content flex gap-2 justify-start items-center text-xl">
              <Logo />
            </div>
            <Button
              type="text"
              icon={<CloseOutlined style={{ fontSize: "20px" }} />}
              onClick={toggleOffCanvas}
              style={{ marginRight: 0 }} // Adjust to place it at the edge
            />
          </div>
        }
        placement="right"
        open={offCanvasState}
        onClose={toggleOffCanvas}
        className="z-50"
        styles={{header: { padding: "0.5rem 1rem" }, body:{ padding: "0" }, content:{
          width: "100vw", // Ensure the Drawer covers the full width
          maxWidth: "100vw", // Override internal maxWidth limits
          position: "absolute", // Use absolute positioning to cover the screen
          left: 0, // Ensure alignment to the left
        }}}
        // bodyStyle={{ padding: "0" }} // Remove extra padding inside the drawer
        // headerStyle={{ padding: "0.5rem 1rem" }} // Adjust header padding
        // contentWrapperStyle={{
        //   width: "100vw", // Ensure the Drawer covers the full width
        //   maxWidth: "100vw", // Override internal maxWidth limits
        //   position: "absolute", // Use absolute positioning to cover the screen
        //   left: 0, // Ensure alignment to the left
        // }}
      >
        <ul
          id="mainNav"
          className="flex pt-20 flex-col justify-start items-center gap-5 p-4 text-lg"
        >
          {MainNavItems.map((menu) => (
            <li key={menu.key} className="hover:text-primary" onClick={()=> toggleOffCanvas()}>
              {menu.label}
            </li>
          ))}
          {/* <div className="flex gap-4 mt-4">
            <li>
              <RxMagnifyingGlass size={24} />
            </li>
            <li>
              <MdOutlineFavoriteBorder size={22} />
            </li>
            <li>
              <BiShoppingBag size={22} />
            </li>
          </div> */}
        </ul>
      </Drawer>
    );
};

export default OffCanvas;