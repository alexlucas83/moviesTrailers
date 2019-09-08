import React, { Component } from 'react'
import './search-bar.css'

export default class SearchBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchText:"",
            placeholder:"Tapez votre film ...",
            interval:1000,
            lockRequest:false,
        }
    }

    
    handelChange(e){
      this.setState({searchText:e.target.value})
      if(!this.state.lockRequest){
          this.setState({lockRequest:true})
          setTimeout(function(){
              this.handelOnClick()}.bind(this),
              this.state.interval
              )
      }
    }

    handelOnClick(e){
        this.props.callBack(this.state.searchText)
        this.setState({lockRequest:false})

    }
    render() {
        return (
            <div className="row">
                                    <h2 className="titleSearchBar" >Bandes annonces</h2>
                <div className="col-md-8 input-group">
                <input type="text" className="form-control input-lg"  onChange={this.handelChange.bind(this)} placeholder={this.state.placeholder}/>
                {/* <p>{this.state.searchText}</p> */}
                <span>
                    <button className="btn btn-secondary" onClick={this.handelOnClick.bind(this)}>GO</button>
                </span>
                </div>
            </div>
        )
    }
}
