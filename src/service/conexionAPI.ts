interface FormContact {
    name: string | null;
    email: string | null;
    phone?: string | null;
    business: string | null;
    message: string | null;
}

const API_URL = "https://contactweb-bqmzrvb33q-uc.a.run.app";

export const conexionAPI = async (data:FormContact) => {
    const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return res.json();    
};