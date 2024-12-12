import talk from "../../styles/assets/img/Talk (1).png";
import model from "../../styles/assets/img/Models.png";
import { IconMicrophone } from "@tabler/icons-react";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: "15px",
      }}
    >
      <div>
        {/* image frame */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            style={{ width: "288px", position: "absolute", marginLeft: "40px" }}
            src={talk}
            alt="err"
          />
          <img style={{ width: "330px" }} src={model} alt="err" />
        </div>

        {/* mulai bicara card */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              backgroundColor: "white",
              alignItems: "center",
              justifyContent: "center",
              height: "124px",
              width: "328px",
              gap: "15px",
              borderRadius: "24px",
              // marginLeft: "40px",
              // marginRight: "40px",
            }}
          >
            <input
              placeholder="Kamu mau cerita apa sama Owdi?"
              style={{
                borderRadius: "8px",
                padding: "1px 8px",
                width: "275px",
                border: "none",
                background: "#001A410D",
                outline: "none",
                height: "32px",
              }}
            />
            <button
              style={{
                borderRadius: "100px",
                border: "none",
                outline: "none",
                color: "white",
                justifyContent: "center",
                alignItems: "center",
                width: "296px",
                height: "40px",
                display: "flex",
                background: "linear-gradient(45deg, #EF2328 0%, #FB942B 100%)",
                gap: "10px",
              }}
            >
              Mulai Bicara
              <IconMicrophone />
            </button>
          </div>
        </div>
      </div>

      {/* categories cards */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "14px 24px",
          background: "#FFFFFF1A",
          gap: "10px",
        }}
      >
        <p style={{ margin: 0, color: "white" }}>
          Mau Owdi ceritakan topik dibawah ini?
        </p>
        <div
          style={{
            display: "flex",
            backgroundColor: "white",
            width: "77px",
            height: "28px",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            textAlign: "center",
            borderRadius: "16px",
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M8.66667 2.16602H4.66667C2.38667 2.16602 1.5 3.05268 1.5 5.33268V10.666C1.5 12.1993 2.33333 13.8327 4.66667 13.8327H8.66667C10.9467 13.8327 11.8333 12.946 11.8333 10.666V5.33268C11.8333 3.05268 10.9467 2.16602 8.66667 2.16602Z"
              fill="url(#paint0_linear_869_71907)"
            />
            <path
              d="M7.66666 7.58674C8.35886 7.58674 8.92 7.02561 8.92 6.33341C8.92 5.64121 8.35886 5.08008 7.66666 5.08008C6.97447 5.08008 6.41333 5.64121 6.41333 6.33341C6.41333 7.02561 6.97447 7.58674 7.66666 7.58674Z"
              fill="url(#paint1_linear_869_71907)"
            />
            <path
              d="M14.4334 4.11373C14.1601 3.97373 13.5867 3.81373 12.8067 4.3604L11.8201 5.05373C11.8267 5.14707 11.8334 5.23373 11.8334 5.33373V10.6671C11.8334 10.7671 11.8201 10.8537 11.8201 10.9471L12.8067 11.6404C13.2201 11.9337 13.5801 12.0271 13.8667 12.0271C14.1134 12.0271 14.3067 11.9604 14.4334 11.8937C14.7067 11.7537 15.1667 11.3737 15.1667 10.4204V5.58707C15.1667 4.63373 14.7067 4.25373 14.4334 4.11373Z"
              fill="url(#paint2_linear_869_71907)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_869_71907"
                x1="1.5"
                y1="13.8327"
                x2="13.0813"
                y2="3.57498"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EF2328" />
                <stop offset="1" stop-color="#FB942B" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_869_71907"
                x1="6.41333"
                y1="7.58674"
                x2="8.92"
                y2="5.08008"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EF2328" />
                <stop offset="1" stop-color="#FB942B" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_869_71907"
                x1="11.8201"
                y1="12.0271"
                x2="17.5267"
                y2="9.65418"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#EF2328" />
                <stop offset="1" stop-color="#FB942B" />
              </linearGradient>
            </defs>
          </svg>

          <p style={{ fontSize: "12px" }}>Film</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
