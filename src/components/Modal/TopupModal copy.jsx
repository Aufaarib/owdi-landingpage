import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import formatRupiah from "@/utils/formatRupiah";

const TopupModal = () => {
  const [denom, setDenom] = useState([]);
  const [selectedDenomId, setSelectedDenomId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/session")
      .then((response) => {
        setDenom(response.data);
      })
      .catch((error) => {
        console.error("Error fetching denom data:", error);
      });
  }, []);

  const handleRadioChange = (event) => {
    setSelectedDenomId(event.target.value);
  };

  const confirmTopup = (idselect) => {
    Swal.fire({
      title: "Top Up Confirmed",
      text: `You have selected denomination ID: ${idselect}`,
      icon: "success",
    });
  };

  const openTopupModal = () => {
    Swal.fire({
      title: "",
      html: `
        <div class="w-full bg-white rounded-lg rounded-br-none z-50 h-full flex flex-col gap-5">
          <div class="flex justify-center items-center w-full">
            <img src="/img/TopUpModel.png" class="w-[260px]" alt="logo" />
            <h2 class="text-3xl font-normal max-w-32 text-left">Top Up Sesi Waktu</h2>
          </div>
          <div class="flex gap-5 flex-row">
            ${denom
              .filter((val) => !val.promo)
              .map(
                (i) => `
                  <button class="denom-btn flex flex-col bg-[#fcf4ef] w-[50%] h-[130px] items-start justify-center p-5 border-2 border-[#f9dec2] rounded-[18px] cursor-pointer" id="denom-${
                    i.id
                  }">
                    <div class="flex flex-col items-start justify-center gap-2">
                      <p class="text-black font-bold text-[16px]">${i.time}</p>
                      <p class="text-[#ED0226] font-bold text-[16px]">${formatRupiah(
                        i.price
                      )}</p>
                    </div>
                  </button>
                `
              )
              .join("")}
          </div>
          <div class="flex gap-5 flex-row">
            ${denom
              .filter((val) => val.promo)
              .map(
                (i) => `
                  <button class="denom-btn flex flex-col bg-[#fcf4ef] w-[50%] h-[130px] gap-1 items-start justify-start border-2 rounded-[16px] border-[#f9dec2] px-5" id="denom-${
                    i.id
                  }">
                    <label for="denom-${i.id}">
                      <input type="radio" id="denom-${
                        i.id
                      }" name="denom" value="${i.id}" class="hidden" />
                      <div class="flex flex-col items-start justify-center">
                        <p class="bg-gradient-to-t ${
                          i.labelGradient
                        } text-white px-2 py-1 flex text-center text-[13px] rounded-b-xl">${
                  i.label
                }
                        </p>
                        <p class="text-black font-bold text-[16px] pt-3">${
                          i.time
                        }</p>
                        <div class="flex flex-row gap-2 items-center justify-center pt-1">
                          <img src="/icons/promo.png" class="w-7" alt="logo" />
                          <div class="flex flex-col items-start">
                            <p class="text-[#ED0226] font-bold text-[16px]">${formatRupiah(
                              i.price
                            )}</p>
                            <p class="text-[#9CA9B9] line-through text-sm">${formatRupiah(
                              i.oldPrice
                            )}</p>
                          </div>
                        </div>
                      </div>
                    </label>
                  </button>
                `
              )
              .join("")}
          </div>
          <button id="myButton" type="submit" class="w-full disabled:text-black disabled:bg-gray-600 bg-gradient-to-t from-[#EF2328] to-[#FB942B] text-white py-2 rounded-[100px] focus:outline-none h-[50px] cursor-pointer">
            Beli
          </button>
        </div>
      `,
      showConfirmButton: false,
      showCancelButton: false,
      didRender: () => {
        let idDenom;
        const denomRadios = document.querySelectorAll('input[name="denom"]');

        denomRadios.forEach((radio) => {
          radio.addEventListener("click", (event) => {
            idDenom = event.target.value;
            setSelectedDenomId(idDenom);
          });
        });

        console.log(idDenom);

        document
          .querySelector("#myButton")
          .addEventListener("click", () => confirmTopup(idDenom));
      },
    });
  };

  return { openTopupModal };
};

export default TopupModal;
