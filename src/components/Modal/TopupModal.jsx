import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import axios from "axios";

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
          .filter((val) => !val.disc_price)
          .map(
            (i) => `
                  <div class="denom-btn flex flex-col w-[50%] h-[130px] gap-2 items-start justify-center p-5 border-2 border-[#f9dec2] rounded-[16px] hover:bg-[#f9dec2] cursor-pointer" id="denom-${i.id}">
                    <div class="flex flex-col items-start justify-center">
                      <p class="text-black font-bold">${i.time}</p>
                      <p class="text-[#ED0226] font-bold">Rp${i.price}</p>
                    </div>
                  </div>
                `
          )
          .join("")}
          </div>
          <div class="flex gap-5 flex-row">
            ${denom
          .filter((val) => val.label)
          .map(
            (i) => `
                  <div class="denom-btn flex flex-col w-[50%] h-[130px] gap-1 items-start justify-start border-2 rounded-[16px] border-[#f9dec2] px-5 hover:bg-[#f9dec2] cursor-pointer" id="denom-${i.id}">
                    <label for="denom-${i.id}" class="cursor-pointer">
                      <input type="radio" id="denom-${i.id}" name="denom" value="${i.id}" class="hidden" />
                      <div class="flex flex-col items-start justify-center">
                        <p class="bg-gradient-to-t ${i.labelGradient} text-white px-2 py-1 flex text-center text-[13px] rounded-b-xl">${i.label}</p>
                        <p class="text-black font-bold">${i.time}</p>
                        ${i.promo ? `
                          <div class="flex flex-row gap-2 items-center justify-start">
                            <img src="/icons/promo.png" class="w-6" alt="logo" />
                            <div class="flex flex-col items-start">
                              <p class="text-[#ED0226] font-bold">Rp${i.oldPrice}</p>
                              <p class="text-[#9CA9B9] line-through text-sm">Rp${i.price}</p>
                            </div>
                          </div>
                        ` : `
                          <div class="flex flex-row gap-2 items-center justify-start">
                            <div class="flex flex-col items-start">
                              <p class="text-[#ED0226] font-bold">Rp${i.price}</p>
                            </div>
                          </div>
                        `}
                      </div>
                    </label>
                  </div>
                `
          )
          .join("")}
          </div>
          <button id="myButton" type="submit" class="w-full disabled:text-black bg-gray-600 text-white py-2 rounded-[100px] focus:outline-none h-[50px] cursor-pointer">
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

        document.querySelector("#myButton").addEventListener("click", () => confirmTopup(idDenom));
      },
    });
  };

  return { openTopupModal };
};

export default TopupModal;