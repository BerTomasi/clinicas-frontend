import { getToken } from "../seguranca/Autenticacao";

export const getClinicasAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/clinicas`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const getClinicaPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/clinicas/${codigo}`,
    {
        method : "GET",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const deleteClinicaPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/clinicas/${codigo}`,
    {
        method : "DELETE",
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        }
    });
    const data = await response.json();
    return data;
}

export const cadastrarClinicaAPI = async (metodo, objeto) => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/clinicas`,
    {
        method : metodo,
        headers :  {
            "Content-Type" : "application/json",
            "authorization" : getToken()
        },
        body : JSON.stringify(objeto)
    });
    const data = await response.json();
    return data;
}