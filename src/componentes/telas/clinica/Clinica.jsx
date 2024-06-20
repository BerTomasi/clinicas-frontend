import { useState, useEffect } from "react";
import ClinicaContext from "./ClinicaContext";
import {
    getClinicasAPI, getClinicaPorCodigoAPI,
    deleteClinicaPorCodigoAPI, cadastrarClinicaAPI
} from "../../../servicos/ClinicaServico";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Clinica() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({codigo : "", nome : "", cep : "", numpredio : "", telefone : "", descricao : ""})

    const [carregando, setCarregando] = useState(true);

    let navigate = useNavigate();

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ codigo : "", nome : "", cep : "", numpredio : "", telefone : "", descricao : "" });
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getClinicaPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaClinicas = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getClinicasAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async (codigo) => {
        if (window.confirm(`Deseja remover este objeto? ${codigo}`)) {
            try {
                let retornoAPI = await deleteClinicaPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaClinicas();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    const recuperar = async codigo => {
        try {
            setObjeto(await getClinicaPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastrarClinicaAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaClinicas();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    

    useEffect(() => {
        recuperaClinicas();
    }, []);

    return (
        <ClinicaContext.Provider value={{
            alerta, setAlerta, 
            listaObjetos, setListaObjetos, 
            recuperaClinicas, 
            remover,
            objeto, setObjeto,
            editar, setEditar,
            recuperar,
            acaoCadastrar,
            handleChange,
            novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />

        </ClinicaContext.Provider>
    )
}

export default WithAuth(Clinica);