import formatRupiah from "@/utils/formatRupiah";
import axios from "axios";
import Swal from "sweetalert2";

const StartChatModal = () => {
  const openStartChatModal = async (id) => {
    Swal.fire({
      title: "",
      html: `
          <div class="w-full p-0 z-50 h-full justify-between items-center flex flex-col py-1 gap-3">
            <p class="m-0 absolute right-0 top-0 p-3">X</p>
            <img src="/img/profile-amanda.png" class="w-[160px] mr-2" alt="logo" />
            <div class="flex w-full flex-col justify-start items-start gap-4">
              <p class="text-[16px] text-black font-bold text-start">1 Koin untuk 15 menit, saldo Koin akan terpotong otomatis jika sesi masih berlanjut</p>
              <div class="flex flex-row items-center gap-2 justify-center">
                <input class="w-4 h-4 bg-black" type="checkbox" />
                <p class="text-[13px] text-black text-start mb-0.5">Ingatkan saya lagi 7 hari kedepan</p>
              </div>
              <button 
                id="myButton"
                type="submit" 
                class="w-full flex h-[40px] justify-center items-center bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white rounded-[100px] outline-none"
              >
                <p class="mb-1">Lanjutkan</p>
              </button>
            </div>
          </div>
        `,
      showConfirmButton: false,
      customClass: {
        popup: "bg-white w-[328px] h-auto rounded-xl shadow-lg",
      },
      didOpen: () => {
        document.getElementById("myButton").addEventListener("click", () => {
          const time = sessionData.time;
          console.log("Original time:", time);

          const { minutes, seconds } = parseTime(time);

          const remainingTime = localStorage.getItem("remainingTime");

          const time1 = localStorage.getItem("remainingTime");
          const time2 = sessionData.val_time;

          // Split time strings into hours and minutes
          const [hours1, minutes1] = time1.split(":").map(Number);
          const [hours2, minutes2] = time2.split(":").map(Number);

          // Convert to total minutes
          const totalMinutes1 = hours1 * 60 + minutes1;
          const totalMinutes2 = hours2 * 60 + minutes2;

          // Sum up the total minutes
          const totalMinutes = totalMinutes1 + totalMinutes2;

          // Calculate the new hours and minutes
          const resultHours = Math.floor(totalMinutes / 60);
          const resultMinutes = totalMinutes % 60;

          // Format the result with leading zeros if needed
          const result = `${String(resultHours).padStart(2, "0")}:${String(
            resultMinutes
          ).padStart(2, "0")}`;

          // const remaining = remainingTime
          //   ? parseTime(remainingTime)
          //   : { minutes: 0, seconds: 0 };

          // const totalSeconds =
          //   remaining.minutes * 60 +
          //   remaining.seconds +
          //   minutes * 60 +
          //   seconds;

          console.log("New remaining time:", result);
          // const newTime = formatTimeToMMSS(totalSeconds);

          localStorage.setItem("remainingTime", result);
          // console.log("New remaining time:", newTime);

          Swal.fire({
            title: "Success",
            text: "Remaining time has been successfully updated.",
            icon: "success",
            timer: 3000,
            showConfirmButton: false,
          }).then(() => {
            Swal.close();
          });
        });
      },
    });
  };

  return { openStartChatModal };
};

export default StartChatModal;
