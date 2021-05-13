module.exports = (res, data, msg) => { 
    res.status(200).json({
        success: true,
        data: data || [],
        message: msg || 'Data was send successfully'
    });
};