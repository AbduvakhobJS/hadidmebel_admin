import React, {useEffect, useState} from 'react';
import axios from "axios";

function Material() {
    const [materials, setMaterials] = useState([])
    const [FILE, setFILE] = useState("")
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [id, setId] = useState("")

    const handleClick = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('FILE', FILE)
        formdata.append('title', title)
        formdata.append('description', description)
        await axios.post(`${process.env.REACT_APP_API}/material/create`, formdata)
        FetchData()
    }
    const FetchData = async () => {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/material/all`)
        setMaterials(data)
    }


    const deleteHandler = async (e) => {
        e.preventDefault()
        await axios.delete(`${process.env.REACT_APP_API}/material/${id}`)
        FetchData()
    }


    



    useEffect(() => {
        FetchData()

    }, []);
    return (
        <div>
            <div className={"container"}>
                <div className={"container"}>
                    <form className={" w-25 mt-5 "} style={{marginLeft: "400px"}}>
                        <div className="">
                            <p className={"text-center"} style={{fontSize: "20px"}}>Matrial nomini kiriting</p>
                            <input type="text" onChange={e => setTitle(e.target.value)}  className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <input type="text" onChange={e => setDescription(e.target.value)}  className="form-control text-bg-dark mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <input type="file"  onChange={e => setFILE(e.target.files[0]) } className="form-control text-bg-dark mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        </div>
                        <button type={"button"} onClick={handleClick} className="btn btn-primary mt-3">Qo'shish</button>
                    </form>
                </div>
            </div>

            <div className={"container mt-5 w-50"}>

                <table className="table table-dark ">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nomi</th>
                        <th scope="col">Malumoti</th>
                        <th scope="col">Rasmi</th>
                        <th scope="col">Sozlamlar</th>
                    </tr>
                    </thead>
                    {materials.map((item, index) => {
                        return (
                            <tbody>
                            <tr>
                                <th key={item._id} scope="row">{index += 1}</th>
                                <td>{item.title}</td>
                                <td>{item.description}</td>
                                <td><img src={`${process.env.REACT_APP_API_IMAGE}/materials/${item.image}`} style={{width: "50px", height: "50px"}}/></td>
                                <td>
                                    <div className={"d-flex"}>
                                        <form>
                                            <div typeof={"button"} data-bs-toggle="modal" data-bs-target="#exampleModal" className={"btn btn-success "}>Tahrirlash</div>
                                        </form>
                                        <form onSubmit={deleteHandler}>
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
                        )
                    })}

                </table>

            </div>
        </div>
    );
}

export default Material;