import { Outlet } from "react-router-dom";
import MainHeader from "../shared/MainHeader";
import motive from "../../styles/assets/img/image 1.png";

const MainLayout = () => {
  return (
    <div
      style={{
        background: `
          linear-gradient(45deg, #EF2328 0%, #FB942B 100%)
        `,
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "space-between",
      }}
    >
      <img
        style={{
          marginLeft: "15px",
          width: 400,
          minHeight: "100vh",
          position: "absolute",
        }}
        src={motive}
        alt="err"
      />
      <div
        style={{
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          gap: "40px",
          marginBottom: "40px",
        }}
      >
        <MainHeader />
        <Outlet />
      </div>
      <p
        style={{
          textAlign: "center",
          fontSize: "12px",
          color: "white",
          marginBottom: "40px",
          //   paddingBottom: "40px",
        }}
      >
        Copyright © 2024 OWDI. All rights reserved.
      </p>
    </div>
  );
};

export default MainLayout;
