import React from "react";
 export default class Input extends React.Component{

    constructor(){
        super();
        this.state={
            name:"",
            lastName:""
        }
    }
    handleName=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    handlelastName=(e)=>{
        this.setState({
            lastName:e.target.value
        })
    }

    render(){
        return(
            <>
            <div className="section">
                <Row label="Name">
                    <input value={this.state.name}
                           onChange={this.handleName}/>
                </Row>
                <Row label="Last Name">
                    <input value={this.state.lastName}
                           onChange={this.handlelastName}/>
                </Row>
            </div>

            <h2>Hello,{this.state.name+" "+this.state.lastName}</h2>

            </>
        )
    }
 }

 function Row(props){
    const{label}=props;
    return(
        <>
        <label>{label}<br/></label>
        {props.children}
        <hr/>
        </>
    )
 }