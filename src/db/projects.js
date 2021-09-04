import {  db } from "../config/firebase";


export const getDesignProjectById = async (id) => {
    try {
        await db.collection("projects").doc(id).get();
    } catch (error) {
        console.log(error)
    }
    
}

export const deleteProjectById = async (id) => {
    try {
        if (window.confirm('estás seguro de eliminar el proyecto?')){
            await db.collection("projects").doc(id).delete()
        }
    } catch (error) {
        console.log(error)
    }
}
