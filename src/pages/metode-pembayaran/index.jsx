import { useRouter } from "next/router";

const MetodePembayaran = () => {
    const router = useRouter();
    console.log(router.query.id);

    return (
        <div>
            Metode Pembayaran {router.query.id}
        </div>
    );
}

export default MetodePembayaran;