import React, {useEffect, useState} from 'react';
import axios from "axios";

function Zayavka() {
    const [zayavka, setZayavka] = useState([])
    const [id, setId] = useState('')
    const fetchData = async () => {
        const { data } = await axios.get(`http://165.232.70.6:7000/api/zayavka/all`)
        console.log(data)
        setZayavka(data)
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        await axios.delete(`http://165.232.70.6:7000/api/zayavka/${id}`)
        fetchData()
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <div className={"container"}>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ismi</th>
                        <th scope="col">Familiyasi</th>
                        <th scope="col">Raqami</th>
                        <th scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {zayavka.map((item, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{index += 1}</th>
                            <td>{item.name}</td>
                            <td>{item.surename}</td>
                            <td>{item.phone}</td>
                            <td>
                                <form onSubmit={deleteHandler}>
                                    <button onClick={() => setId(item._id)} className={"btn btn-danger"}>
                                        O'chirish
                                    </button>
                                </form>
                            </td>
                        </tr>
                        </tbody>
                    ))}

                </table>
            </div>
        </div>
    );
}

export default Zayavka;