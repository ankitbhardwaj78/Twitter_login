import React,{Component} from "react";
import Table from './Table';

export default class TwitterData extends Component{
  constructor(props){
    super(props);
    this.state={value:"",data:""}
  }

  search(){
    Meteor.call("get_followers",this.state.value,Meteor.userId(),(err,res)=>{
      if(err)
      console.log(err);
      else{
        console.log(res);
        this.setState({
           data:res
        })
      }
    })
  }
  onchange(event){
    this.setState({
      value:event.target.value
    })
    console.log(this.state.value);
  }
  onchange(event){
    this.setState({
      value:event.target.value
    })
    console.log(this.state.value);
  }
  render(){
    return(
      <div>
      <input className="form-control mr-sm-2"
      value={this.state.value}
      name="search-bar"
      placeholder="enter your query"
      onChange={this.onchange.bind(this)}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" onClick = {this.search.bind(this)}>Search</button>
      <Table data={this.state.data}/>
      </div>
    )
  }
}
