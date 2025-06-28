
import AxiosInstances from ".";
const createService = async (data) => {
    return await AxiosInstances.post("/service", data)
}

const editService = async (id, data) => {
    // console.log('try edit service service',id);
    
    return await AxiosInstances.put("/service/" +id, data)

}

const getAllServices = async () => {
    return await AxiosInstances.get("/service")

}

const getServicesByMentor = async (mentorId) => {
    console.log(`from api manager mentorId is ${mentorId}`);
    
    return await AxiosInstances.get("/service", mentorId)

}

const getServiceById = async (id) => {
    return await AxiosInstances.get(`/service/${id}`)
}


export default {getAllServices,getServiceById,editService,createService,getServicesByMentor}