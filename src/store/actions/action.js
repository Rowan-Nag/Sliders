import * as actionTypes from './actionTypes';



export const _add = (path,data, userId = null)=>{
    let updates = {}
    if(userId){
        if( path.includes(" ")){
            let second_path = ""
            second_path.concat(path.substring(path.findIndex(" ")));
            updates[path.path.substring(0,path.findIndex(" "))+"/"+userId+"/"+second_path] = data;
        }else{
            updates[path+"/"+userId] = data;
        }
    }else{
        updates[path] = data; 
    }

    return async dispatch =>{
       // await firebase.database().ref().update(updates);
        await dispatch({ type: actionTypes._ADD});
        await dispatch(_get(path, userId));
    }   

}




export const _get = (path, userId =null) =>{
    let data;
   /* let collectionRef = await firebase.database().ref('users/' + userId + '/collection/');
   let wants = [];
    await collectionRef.on('value', async (snapshot)=>{
        let childSnapshot = snapshot.val();
        if (childSnapshot){
            Object.values(childSnapshot).map((wanted)=>{
                        wants.push(wanted.name);
                        
            });
        };
        data = wants;
    };*/
    return async dispatch =>{

        await dispatch( { type: actionTypes._GET, data });
        return

    }
}



export const _update = (path,data,userId = null)=>{
    let updates = {}
    if(userId){
        if( path.includes(" ")){
            let second_path = ""
            second_path.concat(path.substring(path.findIndex(" ")));
            updates[path.path.substring(0,path.findIndex(" "))+"/"+userId+"/"+second_path] = data;
        }else{
            updates[path+"/"+userId] = data;
        }
    }else{
        updates[path] = data; 
    }

    return async dispatch =>{
       // await firebase.database().ref().update(updates);
        await dispatch({ type: actionTypes._UPDATE });
        await dispatch(_get(path, userId));
    }   

}

