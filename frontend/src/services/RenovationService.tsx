
const API_URL = import.meta.env.VITE_API_URL + "/api/renovations";

export interface renovationType {
    id: Number;
    UserId: string | null;
    title: string;
    description: string;
    isPrivate: boolean;
    catagoryList: string | null;
    cost: Number | null;
    totalDays: Number | null;
    company: string | null;
    location: string | null;
    beforeImageList: string | null;
    afterImageList: string | null;
    timeStamp: string | null;
}

interface addRenovationDtoType {
    userId: string | null;
    title: string;
    description: string;
    isPrivate: boolean;
    catagoryList: string | null;
    cost: Number | null;
    totalDays: Number | null;
    company: string | null;
    location: string | null;
    beforeImageList: string | null;
    afterImageList: string | null;
}

export const RenovationService = {
    getAll: async (): Promise<renovationType[]> => {
        console.log("RenovationService: getAll called")
        const res = await fetch(API_URL + "/public");
        if (!res.ok)
            throw new Error("API call failed");
        const data: renovationType[] = await res.json();
        return data;
    },
    getAllByUser: async (token: string) => {
        const res = await fetch(API_URL + "/byUser", {
            headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok)
            throw new Error("API call failed");
        return res.json();
    },
    get: async (token: string | null, id: Number) => {
        const headers = { Authorization: token ? `Bearer ${token}` : "" }

        const res = await fetch(API_URL + `/${id}`, {
            headers
        });
        if (!res.ok)
            throw new Error("API call failed");
        return res.json();

    },
    add: async (token: string, renovation: addRenovationDtoType) => {
        const res = await fetch(API_URL, {
            method: "POST",
            body: JSON.stringify(renovation),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok)
            throw Error("API call failed");
        return res;
    },
    update: async (token: string, id: Number, renovation: addRenovationDtoType) => {
        const res = await fetch(API_URL + `/${id}`, {
            method: "PUT",
            body: JSON.stringify(renovation),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok)
            throw Error("API call failed");
        return res;
    },
    delete: async (token: string, id: Number) => {
        const res = await fetch(API_URL + `/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        });
        if (!res.ok)
            throw Error("API call failed");
        return res;
    }

}