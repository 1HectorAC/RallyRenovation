
const API_URL = import.meta.env.VITE_API_URL = "/api/renovations";

export interface renovationType {
    Id: Number;
    UserId: string | null;
    Title: string;
    Description: string;
    IsPrivate: boolean;
    CatagoryList: string | null;
    Cost: Number | null;
    TotalDays: Number | null;
    Company: string | null;
    Location: string | null;
    BeforeImageList: string | null;
    AfterImageList: string | null;
}

interface addRenovationType {
    UserId: string | null;
    Title: string;
    Description: string;
    IsPrivate: boolean;
    CatagoryList: string | null;
    Cost: Number | null;
    TotalDays: Number | null;
    Company: string | null;
    Location: string | null;
    BeforeImageList: string | null;
    AfterImageList: string | null;
}

export const RenovationService = {
    getAll: async (): Promise<renovationType[]> => {
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
        return res.json;
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
    add: async (token: string, renovation: addRenovationType) => {
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
    update: async (token: string, id: Number, renovation: addRenovationType) => {
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