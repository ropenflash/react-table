import React from 'react'
import Form from '../Form/Form'
import {connect} from 'react-redux'

const Edit =(props)=>{
    return <div>
        <h1>Edit</h1>
        <Form 
        editRow={props.editRow}
        isEdit
        rows={props.rows}
        btnText="Edit Record"/>
        
    </div>

}

const mapDispatchToProps=dispatch=>{
    return {
      editRow:(record)=>{dispatch({type:'EDIT',payload:record})}
    }
}

const mapStateToProps=state=>{
    return {
        rows:state.rows
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Edit)