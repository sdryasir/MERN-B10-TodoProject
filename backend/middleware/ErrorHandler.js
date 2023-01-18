export const errorHandler = (err, req, res, next)=>{

    let error = {...err}

    error.message = err.message;

    // Wrong Mongoose Object ID Error
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid: ${err.path}`
        error = new Error(message)
     }

    // Handling Mongoose Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);
        error = new Error(message)
    }

    // Handling Mongoose duplicate key errors
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} entered`
        error = new Error(message)
    }

    res.json({
        success: false,
        message: error.message || 'Internal Server Error'
    })
}