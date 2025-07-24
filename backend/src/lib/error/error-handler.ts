function responseClientError(err: unknown) {
    if(err instanceof Error){
        console.error('[ERROR]', err.message, err.stack);

        // Return safe message to client
        return {
            status: 500,
            message: 'Internal Server Error',
        };
    }
    // Return safe message to client
    return {
        status: 500,
        message: 'Unexpected Error',
    };
};