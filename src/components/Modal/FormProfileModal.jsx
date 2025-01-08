import Swal from "sweetalert2";

const FormProfileModal = (FormProfileModal) => {
    const openFormProfileModal = (nomor) => {
        console.log("nomor profile", nomor);

        Swal.fire({
            html: `
            <div class="w-full max-w-sm mx-auto bg-white rounded-lg p-6 z-50">
                <div class="flex justify-start items-center mb-4">
                    <img src="/img/logoLogin.png" class="w-[90px] h-[25px] mr-2" alt="logo" />
                    <h2 class="text-2xl font-semibold">Login</h2>
                </div>

                <form id="loginForm" class="space-y-4">
                    <div>
                        <label class="block text-left text-gray-700 font-medium mb-1" for="username">Username</label> 
                        <input type="text" id="username" class="rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block w-full text-sm p-2.5" placeholder="Isi nama kamu">
                    </div>
                </form>
            </div>
            `,


        })
    }
    return { openFormProfileModal };
}

export default FormProfileModal;