import { useContext } from "react";
import ClinicaContext from "./ClinicaContext";
import Alerta from "../../comuns/Alerta";

function Tabela() {
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(ClinicaContext);

    return (
        <div style={{ padding: '20px' }}>
            <div className="home">
                <h1><b>Clínicas</b></h1>
            </div>

            <Alerta alerta={alerta} />

            <button type="button" className="btn btn-primary"
                data-bs-toggle="modal" data-bs-target="#modalEdicao"
                onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-plus"></i>
            </button>
            {listaObjetos.length === 0 && <h1>Nenhum registro encontrado</h1>}
            {listaObjetos.length > 0 &&
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col" style={{ textAlign: 'center' }}>Ações</th>
                                <th scope="col">Código</th>
                                <th scope="col">Nome</th>
                                <th scope="col">CEP</th>
                                <th scope="col">Número do Prédio</th>
                                <th scope="col">Telefone</th>
                                <th scope="col">Descrição</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                listaObjetos.map(objeto => (
                                    <tr key={objeto.codigo}>
                                        <td align="center">
                                            <button className="btn btn-info"
                                                title="Editar"
                                                data-bs-toggle="modal"
                                                data-bs-target="#modalEdicao"
                                                onClick={() => editarObjeto(objeto.codigo)} >
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button className="btn btn-danger"
                                                title="Remover"
                                                onClick={() =>
                                                    remover(objeto.codigo)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                        <th scope="row">{objeto.codigo}</th>
                                        <td>{objeto.nome}</td>
                                        <td>{objeto.cep}</td>
                                        <td>{objeto.numpredio}</td>
                                        <td>{objeto.telefone}</td>
                                        <td>{objeto.descricao}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            }

        </div>
    )
}

export default Tabela;