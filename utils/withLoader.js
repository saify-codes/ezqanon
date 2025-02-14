export async function withLoader(promise, callback){
    
    callback(true)
    try{
        return await promise()
    }catch(error){
        throw error
    }
    finally{
        callback(false)
    }

}