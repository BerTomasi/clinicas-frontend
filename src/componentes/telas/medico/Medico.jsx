import { useState, useEffect } from "react";
import MedicoContext from "./MedicoContext";
import {
    getMedicosAPI, getMedicoPorCodigoAPI,
    deleteMedicoPorCodigoAPI, cadastrarMedicoAPI
} from "../../../servicos/MedicoServico";
import {
    getClinicasAPI
} from "../../../servicos/ClinicaServico";
import Tabela from "./Tabela";
import Carregando from "../../comuns/Carregando";
import Form from "./Form";
import WithAuth from "../../../seguranca/WithAuth";
import { useNavigate } from 'react-router-dom';

function Medico() {
    const [alerta, setAlerta] = useState({ status: "", message: "" });
    
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaClinicas, setlistaClinicas] = useState([]);

    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        cpf: "", crm: "", nome: "",
        especialidade: "", telefone: "", clinica: ""
    });
    const [listaMedicos, setlistaMedicos] = useState([]);

    const [carregando, setCarregando] = useState(true);

    let navigate = useNavigate();

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({ cpf: "", crm: "", nome: "", especialidade: "", telefone: "", clinica: ""});
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getMedicoPorCodigoAPI(codigo));
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaMedicos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getMedicosAPI());
            setCarregando(false);
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const recuperaClinicas = async () => {
        try {
            setlistaClinicas(await getClinicasAPI());
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
    }

    const remover = async (codigo) => {
        if (window.confirm(`Deseja remover este objeto? ${codigo}`)) {
            try {
                let retornoAPI = await deleteMedicoPorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
                recuperaMedicos();
            } catch (err) {
                window.location.reload();
                navigate("/login", { replace: true });
            }
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        let metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastrarMedicoAPI(metodo, objeto);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            window.location.reload();
            navigate("/login", { replace: true });
        }
        recuperaMedicos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({...objeto, [name] : value});
    }

    

    useEffect(() => {
        recuperaClinicas();
        recuperaMedicos();
    }, []);

    return (
        <MedicoContext.Provider value={{
            alerta, setAlerta, 
            listaObjetos, setListaObjetos,
            remover,
            objeto, setObjeto,
            editar, setEditar,
            listaClinicas,
            acaoCadastrar,
            handleChange,
            novoObjeto, editarObjeto
        }}>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Form />

        </MedicoContext.Provider>
    )
}

export default WithAuth(Medico);