import React from 'react'
import Form from '../Form/Form'
import {connect} from 'react-redux'

const Add =(props)=>{
    return <div>
        <h1>Add</h1>
        <Form addRow={props.addRow} 
        rows={props.rows}
        btnText="Add Record"/>
        
    </div>

}

const mapDispatchToProps=dispatch=>{
    return {
      addRow:(record)=>{dispatch({type:'ADD',payload:record})}
    }
}

const mapStateToProps=state=>{
    return {
        rows:state.rows
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Add)