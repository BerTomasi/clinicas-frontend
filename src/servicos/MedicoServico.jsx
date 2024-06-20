import { getToken } from "../seguranca/Autenticacao";

export const getMedicosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`,
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

export const getMedicoPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${codigo}`,
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

export const deleteMedicoPorCodigoAPI = async codigo => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos/${codigo}`,
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

export const cadastrarMedicoAPI = async (metodo, objeto) => {
    const response = await 
    fetch(`${process.env.REACT_APP_ENDERECO_API}/medicos`,
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