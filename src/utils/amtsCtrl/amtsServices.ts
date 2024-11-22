import Swal from "sweetalert2";
import { Amt } from "../../gondola_types/navigationElements";

// type AmtList = Amt[]

export async function getAllAmts() {
    try {
        // const res = await NetWork.get<AmtList>(URLS.GET_AMTS)
        const res = {data:1}
        Swal.close()
        return res.data;
    } catch (e) {
        Swal.close()
        throw new Error(String(e))
    }
}

export async function addNewAmt(data: Amt) {
    try {
        // const res = await NetWork.post(URLS.ADD_AMT, data)
        const res = {data:1}
        Swal.close()
        return res.data;
    } catch (e) {
        Swal.close()
        throw new Error(String(e))
    }
}