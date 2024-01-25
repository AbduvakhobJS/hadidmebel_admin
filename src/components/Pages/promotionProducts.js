import React, {useEffect, useState} from 'react';
import axios from "axios";
function PromotionProducts() {
    const [promotion, setPromotion] = useState([])
    const [id, setId] = useState('')
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [before_price, setBefore_price] = useState('')
    const [material, setMaterial] = useState('')
    const [description, setDescription] = useState('')
    const [FILE, setFILE] = useState('')

    const fetchData = async () => {
        const {data} = await axios.get(`${process.env.REACT_APP_API}/promotion/all`)
        console.log(data)
        setPromotion(data)
    }


    const addPromotion = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('title', title)
        formdata.append('price', price)
        formdata.append('before_price', before_price)
        formdata.append('material', material)
        formdata.append('description', description)
        formdata.append('FILE', FILE)
        await axios.post(`${process.env.REACT_APP_API}/promotion/create`, formdata)
        fetchData()
    }


    const deletePromotion = async (e) => {
        e.preventDefault()
        await axios.delete(`${process.env.REACT_APP_API}/promotion/${id}`)
        fetchData()
    }



    useEffect(() => {
        fetchData()
    }, []);

    return (
        <div>
            <div className={"container"}>
                <form  className={" w-25 mt-5 "} style={{marginLeft: "400px"}}>
                    <div className="">
                        <p className={"text-center"} style={{fontSize: "20px"}}>Aksiyadagi mahsulot  nomini kiriting</p>
                        <label>Mahsulot nomi</label>
                        <input type="text" onChange={e => setTitle(e.target.value)} className="form-control text-bg-dark" />
                        <label>Mahsulot yangi narhi</label>
                        <input type="text" onChange={e => setPrice(e.target.value)} className="form-control text-bg-dark" />
                        <label>Mahsulotning eski narhi</label>
                        <input type="text" onChange={e => setBefore_price(e.target.value)} className="form-control text-bg-dark" />
                        <label>Mahsulotda ishlatilingan material</label>
                        <input type="text" onChange={e => setMaterial(e.target.value)} className="form-control text-bg-dark" />
                        <label>Mahsulot haqida qisqacha</label>
                        <input type="text" onChange={e => setDescription(e.target.value)} className="form-control text-bg-dark" />
                        <label>Mahsulotning Rasmi</label>
                        <input type="file" onChange={e => setFILE(e.target.files[0])} className="form-control text-bg-dark mt-1"/>
                    </div>
                    <button onClick={addPromotion} className="btn btn-primary mt-3">Qo'shish</button>
                </form>
            </div>
            <div className={"container mt-5"}>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nomi</th>
                        <th scope="col">Yangi narh</th>
                        <th scope="col">Eski narh</th>
                        <th scope="col">Material</th>
                        <th scope="col">Qisqacha</th>
                        <th scope="col">Rasm</th>
                        <th className={"text-center"} scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {promotion.map((item, index) => (
                        <tbody>
                        <tr>
                            <th scope="row">{index += 1}</th>
                            <td>{item.title}</td>
                            <td>{item.price}</td>
                            <td>{item.before_price}</td>
                            <td>{item.material}</td>
                            <td>{item.description}</td>
                            <td>
                                <img src={`${process.env.REACT_APP_API_IMAGE}/promotions/${item.image}`} style={{width: "50px", height: "50px"}}/>
                            </td>
                            <td>
                                <div className={"d-flex ms-1"}>
                                    <form className={"ms-1"}>
                                        <button  className={"btn btn-success"}>
                                            Yangilash
                                        </button>
                                    </form>
                                    <form onSubmit={deletePromotion} className={"ms-1"}>
                                        <button onClick={() => setId(item._id)} className={"btn btn-danger"}>
                                            O'chirish
                                        </button>
                                    </form>
                                </div>
                            </td>
                        </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    );
}

export default PromotionProducts;