const generateError : (error : any) => ErrorResponse = (error: any) => {
    return { 
        code: error.response.data.code,
        msg: error.response.data.message
    }
}

export default generateError;