import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";

function Catalogs() {
    const [catalogs, setCatalogs] = useState([])
    const [FILE, setFILE] = useState("")
    const [name, setName] = useState("")
    const [id, setId] = useState("")
    const [getdata, setGetdata] = useState({})


    const handleClick = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('FILE', FILE)
        formdata.append('name', name)
        await axios.post(`${process.env.REACT_APP_API}/catalog/create`, formdata)
        // await axios.post(`http://api.hadidmebel.uz/api/catalog/create`, formdata)
        FetchData()
    }

    const FetchData = async () => {
        // const {data} = await axios.get(`${process.env.REACT_APP_API}/catalog/all`)
        const {data} = await axios.get(`http://api.hadidmebel.uz/api/catalog/all`)
        setCatalogs(data)
    }

    const getData = async (id) => {
        // const data = await axios.get(`${process.env.REACT_APP_API}/catalog/${id}`)
        const data = await axios.get(`http://api.hadidmebel.uz/api/catalog/${id}`)
        const ResData = await data.data
        // const newobject = {id: ResData._id, title: ResData.name, file: `${process.env.REACT_APP_API_IMAGE}/catalogs/${ResData.image[0]}`}
        const newobject = {id: ResData._id, title: ResData.name, file: `http://api.hadidmebel.uz/catalogs/${ResData.image[0]}`}
        setGetdata({...newobject, ...getdata})
    }


    const deleteHandler = async (id) => {
        // await axios.delete(`${process.env.REACT_APP_API}/catalog/${id}`)
        await axios.delete(`http://api.hadidmebel.uz/api/catalog/${id}`)
        FetchData()
        
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData()
        formdata.append('name', getdata.title)
        formdata.append('FILE', getdata.image)
        console.log(getdata)
        // await axios.put(`${process.env.REACT_APP_API}/catalog/${getdata.id}`, formdata)
        await axios.put(`http://api.hadidmebel.uz/api/catalog/${getdata.id}`, formdata)
        FetchData()
    }




    useEffect(() => {
        FetchData()

    }, []);


    return (
        <div className={""}>
            <div className={"container"}>
                <div className={"container"}>
                    <form className={" w-25 mt-5 "} style={{marginLeft: "400px"}}>
                        <div className="">
                            <p className={"text-center"} style={{fontSize: "20px"}}>Catalog nomini kiriting</p>
                            <input type="text" onChange={e => setName(e.target.value)}  className="form-control text-bg-dark" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                            <input type="file"  onChange={e => setFILE(e.target.files[0])} className="form-control text-bg-dark mt-3" id="exampleInputEmail1" aria-describedby="emailHelp"/>
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
                            <th scope="col">Rasmi</th>
                            <th scope="col">Sozlamlar</th>
                        </tr>
                        </thead>
                        {catalogs.map((item, index) => (
                        <tbody>
                        <tr>
                            <th key={item._id} scope="row">{index += 1}</th>
                            <td>{item.name}</td>
                            {/* <td><img src={`${process.env.REACT_APP_API_IMAGE}/catalogs/${item.image}`} style={{width: "50px", height: "50px"}}/></td> */}
                            <td><img src={`http://api.hadidmebel.uz/catalogs/${item.image}`} style={{width: "50px", height: "50px"}}/></td>
                            <td>
                                <div className={"d-flex"}>
                                    <form>
                                        <div onClick={() => {
                                            getData(item._id)
                                        }} data-bs-toggle="modal" data-bs-target="#exampleModal" className={"btn btn-success "}>Tahrirlash</div>
                                    </form>
                                    {/* <form onSubmit={deleteHandler}> */}
                                        <button onClick={() => deleteHandler(item._id)} className={"btn btn-danger ms-3"}>O'chirish</button>
                                    {/* </form> */}
                                </div>

                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">

                                        <div className="modal-dialog">
                                            <div className="modal-content text-bg-dark">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                    <form onSubmit={handleSubmit} className="modal-body">
                                                        <div className="">
                                                            <p className={"text-center"} style={{fontSize: "20px"}}>Catalog nomini kiriting</p>
                                                            <input type="text" value={getdata?.title} onChange={e => setGetdata({...getdata, title: e.target.value})} className="form-control " id="exampleInputEmail1" aria-describedby="emailHelp"/>
                                                            <label htmlFor={"fileinput"}><img src={getdata?.file} style={{width: "100px"}}/></label>
                                                            <input type="file" onChange={e => setGetdata({ ...getdata, image: e.target.files[0], file: window.URL.createObjectURL(e.target.files[0])})} className="form-control text-bg-dark mt-3" id="fileinput" aria-describedby="emailHelp"/>
                                                        </div>
                                                        <button type={"submit"} data-bs-dismiss="modal" aria-label="Close" className="btn btn-primary mt-3">Tahrirlash</button>
                                                    </form>
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
}

export default Catalogs;