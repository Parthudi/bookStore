const UserError = (name, email, password) => {
    if(!name) {
        ({error: 'Please enter User'})
    }
    if(!email) {
        throw new Error('Please enter Email')
    }
    if(!password) {
        throw new Error('Please enter Password')
    }
    if( 5>name.length || name.length>20) {
        throw new Error(' Name Invalid ')
    }
    if(email.error) {
        throw new Error(email.error)
    }
    if(password.length < 6) {
        throw new Error('Password Should be Strong')
    }
    if(password.error) {
        throw new Error(password.error)
    }
}

exports.module= UserError