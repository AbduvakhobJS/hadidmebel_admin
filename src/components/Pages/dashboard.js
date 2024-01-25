import React, {useEffect, useState} from 'react';
import axios from "axios";


function Dashboard() {
    const [order,setOrder] = useState([])
    const FetchOrders = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/order/all`)
        setOrder(data)
    }

    const deleteOrder = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API}/order/${id}`)
        FetchOrders()
    }

    useEffect(() => {
        FetchOrders()
    }, []);

    return (
        <div>
            <div className={"container"}>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ismi</th>

                        <th scope="col">Telefon raqami</th>
                        <th scope="col">Buyurtma nomi</th>
                        <th scope="col">Buyurtma sanasi</th>
                        <th scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {order.map((item, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{index += 1}</th>
                            <td>{item.name}</td>
                            <td>{item.phone}</td>
                            <td>{item.product_name}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                            <td>
                                <button onClick={() => deleteOrder(item._id)} className={'btn btn-danger'}>O'chirish</button>
                            </td>
                        </tr>
                        </tbody>
                    ))}

                </table>
            </div>
        </div>
    );
}

export default Dashboard;