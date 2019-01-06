export const actionStarted = (type) => ({
    type,
})

export const actionSuccess = (type, data) => ({
    type, 
    payload: {
        ...data, 
    }
})

export const actionFailure = (type, error) => ({
    type, 
    payload: { error }
})
