import React, {useEffect, useState} from 'react';
import axios from "axios";


function Products() {
    const [product, setProduct] = useState([])
    const [catalogs, setCatalog] = useState([])
    const [id, setId] = useState('')

    const [catalog_Id, setCatalogId] = useState([])
    const [catalog_name, setCatalogName] = useState([])
    const [title, setTitle] = useState("")
    const [price, setPrice] = useState("")
    const [size, setSize] = useState("")
    const [material, setMaterial] = useState("")
    const [color, setColor] = useState('')
    const [description, setDescription] = useState("")
    const [bonus, setBonus] = useState("")
    const [FILE, setFILE] = useState("")
    

    const fetchCatalog = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/catalog/all`)
        setCatalog(data)
    }


    const fetchData = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/product/all`)
        console.log(data)
        setProduct(data)
    }


    const addProduct = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('catalog_Id', catalog_Id)
        formdata.append('catalog_name', catalog_name)
        formdata.append('title', title)
        formdata.append('price', price)
        formdata.append('size', size)
        formdata.append('material', material)
        formdata.append('color', color)
        formdata.append('description', description)
        formdata.append('bonus', bonus)
        formdata.append('FILE', FILE)
        await axios.post(`${process.env.REACT_APP_API}/product/create`, formdata)
        fetchData()
    }

    const deleteProduct = async (e) => {
        e.preventDefault()
        await axios.delete(`${process.env.REACT_APP_API}/product/${id}`)
        fetchData()
    }





    useEffect(() => {
        fetchCatalog()
        fetchData()
    }, []);

    return (
        <div>
            <div className={"container"}>
                <div className={"container"}>
                    <form className={" w-25 mt-5 "} style={{marginLeft: "400px"}}>
                        <div className="">
                            <p className={"text-center"} style={{fontSize: "20px"}}>Mahsulot nomini kiriting</p>
                            Qaysi catalogga bog'liqligini kiriting
                            <select onChange={e => setCatalogId(e.target.value)} className="form-select form-select text-bg-dark mb-3" aria-label="Large select example">
                                {catalogs.map(item => (
                                    <option value={item._id} selected>{item.name}</option>
                                ))}
                            </select>
                            Catalog nomini kiriting
                            <select onChange={e => setCatalogName(e.target.value)} className="form-select form-select text-bg-dark mb-3" aria-label="Large select example">
                                {catalogs.map(item => (
                                    <option value={item.name} selected>{item.name}</option>
                                ))}
                            </select>
                            <label>Mahsulot nomi</label>
                            <input type="text" onChange={e => setTitle(e.target.value)} className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <label>Mahsulotning narhi</label>
                            <input type="text" onChange={e => setPrice(e.target.value)} className="form-control text-bg-dark mt-1"/>
                            <label>Mahsulot olchamlar</label>
                            <input type="text" onChange={e => setSize(e.target.value)} className="form-control text-bg-dark mt-1"/>
                            <label>Mahsulotdagi Material turi</label>
                            <input type="text" onChange={e => setMaterial(e.target.value)} className="form-control text-bg-dark mt-1" />
                            <label>Mahsulotning Rangi</label>
                            <input type="text" onChange={e => setColor(e.target.value)}  className="form-control text-bg-dark mt-1" />
                            <label>Mahsulot haqida qisqacha</label>
                            <input type="text" onChange={e => setDescription(e.target.value)} className="form-control text-bg-dark mt-1" />
                            <label>Mahsulotga qo'shilgan bonus</label>
                            <input type="text" onChange={e => setBonus(e.target.value)} className="form-control text-bg-dark mt-1" />
                            <label>Mahsulotning rasmi</label>
                            <input type="file" onChange={e => setFILE(e.target.files[0])} className="form-control text-bg-dark mt-1" />
                        </div>
                        <button onClick={ addProduct } className="btn btn-primary mt-3">Qo'shish</button>
                    </form>
                </div>


                <div className={"container mt-5"}>
                    <table className="table table-dark">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Catalog nomi</th>
                            <th scope="col">Nomi</th>
                            <th scope="col">Narxi</th>
                            <th scope="col">O'lchami</th>
                            <th scope="col">Material</th>
                            <th scope="col">Rangi</th>
                            <th scope="col">Bonus</th>
                            <th scope="col">Rasm</th>
                            <th scope="col">Sozlamlar</th>
                        </tr>
                        </thead>

                        {product && product.map((item, index ) => (
                            <tbody>
                            <tr>
                                <th scope="row">{index += 1}</th>
                                <td>{item?.catalog_name}</td>
                                <td>{item.title}</td>
                                <td>{item.price}</td>
                                <td>{item.size}</td>
                                <td>{item.material}</td>
                                <td>{item.color}</td>
                                <td>{item.description}</td>
                                <td>{item.bonus}</td>
                                <td><img src={`${process.env.REACT_APP_API_IMAGE}/products/${item.image}`} style={{width: "50px", height: "50px"}}/></td>
                                <td>
                                    <div className={"d-flex"}>
                                        <button  data-bs-toggle="modal" data-bs-target="#exampleModal" className={"btn btn-success "}>Tahrirlash</button>
                                        <form onSubmit={deleteProduct}>
                                            <button onClick={() => setId(item._id)} className={"btn btn-danger ms-3"}>O'chirish</button>
                                        </form>
                                    </div>

                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div className="modal-dialog">
                                            <div className="modal-content text-bg-dark">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <div className="">
                                                        <p className={"text-center"} style={{fontSize: "20px"}}>Material nomini kiriting</p>
                                                        <input type="text"  className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                        <input type="file"  className="form-control text-bg-dark mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                    </div>
                                                    <button type={"button"}  className="btn btn-primary mt-3">Tahrirlash</button>
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
        </div>
    );
}


export default Products;