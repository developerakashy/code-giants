class apiError extends Error{

    constructor(
        message= "Some thing went wrong",
        statusCode,
        errors=[],
        stack="",

    )
    {
        super(message)
            this.message=message;
            this.statusCode=statusCode;
            this.errors=errors;
            this.data=null;
            this.success=false
        if(stack){
            this.stack=stack
        }
        else{
            Error.captureStackTrace(this,this.constructor);
        }
    }
}

export { apiError };
