import React from 'react';

const dogs =["d1","d2","d3"];
export default Dogs =(props) =>{
  //   dogs.map((d,i)=>
  //   <p key={i}>{d}</p>
  // )
  const {id} =props.params;
  if(id){
    if(dogs.includes(id)){
      return <p>dog {id} found </p>
    }
    else{
      return <p>Not found</p>
    }
  }
  else {
    dogs.map((d,i)=>
    <p key={i}>{d}</p>
  )
}
}
