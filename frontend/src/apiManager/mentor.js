import AxiosInstances from ".";

const getMentor = ()=>{
    return AxiosInstances.get("/mentor")
}
const getMentorByUser= (userName)=>{
    return AxiosInstances.get("/mentor"+userName)
}
const mentorApi ={
getMentor,
getMentorByUser
}
export default mentorApi