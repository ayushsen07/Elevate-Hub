import AxiosInstances from ".";

const updateUser=async(data)=>{
    return AxiosInstances.put('/user/update-profile', data)
}

const getUser=()=>{
    return AxiosInstances.get('/user')
}

const userAPi = {updateUser,getUser}

export default userAPi;