import React, {useEffect, useState} from 'react';
import axios from "axios";

const Promotion_date = () => {
    const [promotion, setPromotion] = useState([])
    const [promotion_name, setPromotionName] = useState('')
    const [promotion_date, setPromotionDate] = useState('')

    const fetch_promotion = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/promotion_date/all`)
        setPromotion(data)
    }

    const handleClick = async (e) => {
        await axios.post(`${process.env.REACT_APP_API}/promotion_date/create`,{
            promotion_name: promotion_name,
            promotion_date: promotion_date
        })
        fetch_promotion()
    }

    const deletePromotion = async (id) => {
        await axios.delete(`${process.env.REACT_APP_API}/promotion_date/${id}`)
        fetch_promotion()
    }

    const updatePromotion = async (id) => {
        await axios.put(`${process.env.REACT_APP_API}/promotion_date/${id}`,{
            promotion_name: promotion_name,
            promotion_date: promotion_date
        })
        fetch_promotion()
    }

    useEffect(() => {
        fetch_promotion()
    }, []);
    return (
        <div>
            <div className={"container"}>
                <div className={"container"}>
                    <form className={" w-25 mt-5 "} style={{marginLeft: "400px"}}>
                        <div className="">
                            <p className={"text-center"} style={{fontSize: "20px"}}>Aksiyaning malumotlarini kiriting</p>
                            <label>Aksiya nomini kiriting</label>
                            <input type="text" onChange={e => setPromotionName(e.target.value)}  className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <label>Aksiya muddatini kiriting</label>
                            <input type="text" onChange={e => setPromotionDate(e.target.value)}  className="form-control text-bg-dark " id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <button type={"button"} onClick={() => handleClick()} className="btn btn-primary mt-3">Qo'shish</button>
                    </form>
                </div>
            </div>

            <div className={"container mt-5"}>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Aksiya nomi</th>
                        <th scope="col">Aksiyaning amal qilish muddati</th>
                        <th scope="col">Sana</th>
                        <th scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {promotion.map((item, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{index += 1}</th>
                            <td>{item.promotion_name}</td>
                            <td>{item.promotion_date}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                            <td>
                                <button onClick={() => updatePromotion(item._id)} data-bs-toggle="modal" data-bs-target="#exampleModal" className={'btn btn-success'}>Tahrirlash</button>
                                <button onClick={() => deletePromotion(item._id)}  className={'btn btn-danger ms-2'}>O'chirish</button>


                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog ">
                                        <div className="modal-content text-bg-dark">
                                            <div className="modal-header">
                                                <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <div className="">
                                                    <p className={"text-center"} style={{fontSize: "20px"}}>Aksiyaning malumotlarini kiriting</p>
                                                    <input type="text" onChange={e => setPromotionName(e.target.value)}  className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                    <input type="text" onChange={e => setPromotionDate(e.target.value)}  className="form-control text-bg-dark mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                </div>
                                            </div>
                                            <div className={'modal-footer mt-3'}>
                                                <button onClick={() => updatePromotion(item._id)} data-bs-dismiss="modal" aria-label="Close" type="button" className="btn btn-primary ">Saqlash</button>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>

                        </tbody>
                    ))}


                </table>
            </div>
        </div>
    );
};

export default Promotion_date;
