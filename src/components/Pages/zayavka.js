import React, {useEffect, useState} from 'react';
import axios from "axios";

function Zayavka() {
    const [zayavka, setZayavka] = useState([])
    const [id, setId] = useState('')
    const fetchData = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/zayavka/all`)
        console.log(data)
        setZayavka(data)
    }

    const deleteHandler = async (e) => {
        e.preventDefault()
        await axios.delete(`${process.env.REACT_APP_API}/zayavka/${id}`)
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
                        <th scope="col">Raqami</th>
                        <th scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {zayavka.map((item, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{index += 1}</th>
                            <td>{item.name}</td>
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