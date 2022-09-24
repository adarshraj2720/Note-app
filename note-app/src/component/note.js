import React from "react"
import { useState, useEffect } from "react"



function Note() {

    let [show, setshow] = useState(true)

    let [searchNote, setsearchNote] = useState(true)

    let [searchTerm, setsearchTerm] = useState('')

    let [note, setnote] = useState("")

    let [list, setlist] = useState([])




    useEffect(() => {
        const localItems = localStorage.getItem("list");
        setlist(JSON.parse(localItems));
    }, []);



    function handlesearch() {
        setshow(!show)
        setsearchNote(false)
    }

    function handlechange(event) {
        setnote(event.target.value)

    }

    function handlesubmit(event) {
        event.preventDefault()
        const tempList = list.concat(note);
        setlist(tempList)
        localStorage.setItem("list", JSON.stringify(tempList));
        setnote("")
    };

    function handledelete(event) {
        let id = event.target.id
        let filterid = list.filter((e) => e !== id)
        localStorage.setItem("list", JSON.stringify(filterid));
        setlist(filterid);
    }

    function handleEdit(event) {
        let id = event.target.id
        let filterid = list.filter((e) => e === id)
        let index = list.indexOf(id)
        setnote(filterid)
        list[index]=note
        handleon()
        setsearchNote(false)
       
    }

    function handleoff() {
        setshow(true)
        setsearchNote(true)
        setnote("")
    }

    function handleon() {
        setshow(false)
    }

    return (
        <div className="container note">
            {
                searchNote === true ?
                    <input className="searchteam" onChange={event => { setsearchTerm(event.target.value) }} type="text" placeholder="Search Notes" id="search" name="search"></input>
                    :
                    ""
            }


            {
                show === false ?
                    <div className="notebox">
                        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: "20px", marginBottom: "10px" }}>
                            <button onClick={handleoff}>❌</button>
                        </div>
                        <input type="text" onChange={handlechange} value={note} placeholder="Add Your Note" name="note" id="note" ></input>
                        <button className="addbtn" type="submit" onClick={handlesubmit} >Save</button>
                    </div>
                    :
                    <div className="floterbtn">
                        <i onClick={handlesearch} className="fas fa-plus"></i>
                    </div>
            }

            {

                list.filter((val) => {
                    if (searchTerm === "") {
                        return val
                    } else if (val.toLowerCase().includes(searchTerm.toLowerCase())) {
                        return val
                    }
                })
                    .map((e) => {
                        return (
                            <div id={e} className="flex-between">
                                <ul >
                                    <li>{e}</li>
                                </ul>
                                <div className="flex-20 flex">
                                    <i onClick={handleEdit} id={e} className="fas fa-edit"></i>
                                    <i onClick={handledelete} id={e} className="fas fa-trash"></i>
                                </div>
                            </div>
                        )
                    })
            }


        </div>
    )
}

export default Note