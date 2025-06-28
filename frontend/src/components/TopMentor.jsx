import React, { useEffect, useState } from 'react'
import mentorApi from '../apiManager/mentor'
import MentorCard from './MentorCard'
import useMentorStore from '../store/mentors'

function TopMentor() {

    const [topMentors, setTopMentors] = useState([])
    const [loading, setLoading] = useState()
    const { setMentorsData } = useMentorStore()

    // select top 4  mentor from the db and display them on homepage 
    const selectTopMentor = (mentors)=>{   
        const topSelectedMentors = [];
        const totalMentors = mentors.length;

        while(topSelectedMentors.length <4 && topSelectedMentors.length<totalMentors){
            const randomIndex = Math.floor(Math.random()*totalMentors)
            const randomMentor = mentors[randomIndex]
            if(!topSelectedMentors.includes(randomMentor)){
                topSelectedMentors.push(randomMentor)
            }
            
        } 
        console.log("top selected mentors from the function :", topSelectedMentors);
        
        return topSelectedMentors;
        
        
    }

    
   // fetch the all mentors into the db 
    const fetchMentorData = async () => {
        try {
            const response = await mentorApi.getMentor()
            console.log("getting data from mentors api");
            console.log(response);
            
            const allMentors = response?.data?.mentors || []
            setMentorsData(allMentors);
            setTopMentors(selectTopMentor(allMentors))

        } catch (error) {
            console.log(error);
        }
    }
     
     
    useEffect(()=>{
        fetchMentorData()
    },[])
    return (
        <div>
            <h1>TopMentor</h1>
            <div>{topMentors.map((mentor)=>(
                <li>{mentor.name}</li>
            ))}</div>
        </div>
    )
}

export default TopMentor